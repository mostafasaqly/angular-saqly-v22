// Section 12 — Forms in Angular
export default {
  id: 12,
  title: 'النماذج (Forms)',
  titleEn: 'Forms in Angular',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'Angular v22 يوفر ثلاثة أساليب للنماذج: Signal Forms (الجديد والمفضّل)، Reactive Forms، وTemplate-Driven Forms. هذا القسم يغطي الثلاثة مع التحقق من صحة البيانات، الأخطاء، والإرسال.',
  introEn: 'Angular v22 provides three form approaches: Signal Forms (new, preferred), Reactive Forms, and Template-Driven Forms. This section covers all three with validation, errors, and submission patterns.',

  lessons: [
    'Signal Forms — الجديد في v22',
    'التحقق من صحة البيانات (Validators)',
    'عرض أخطاء التحقق',
    'Reactive Forms',
    'Template-Driven Forms',
    'النماذج المتداخلة',
    'الحقول الديناميكية',
    'نمط إرسال النماذج',
  ],
  lessonsEn: [
    'Signal Forms — New in v22',
    'Validators',
    'Showing Validation Errors',
    'Reactive Forms',
    'Template-Driven Forms',
    'Nested Forms',
    'Dynamic Form Fields',
    'Form Submission Pattern',
  ],

  content: [
    { type: 'heading', text: 'Signal Forms — الجديد في v22' },
    { type: 'paragraph', text: 'Signal Forms هي الطريقة المفضّلة للنماذج في Angular v22. مبنية على Signals مع API أبسط وتكامل كامل مع نظام الأنواع.' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { signalForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <form (submit)="onSubmit($event)">
      <input [formField]="form.fields.email" type="email" placeholder="البريد الإلكتروني" />
      @if (form.fields.email.invalid() && form.fields.email.touched()) {
        <span class="error">{{ form.fields.email.errors()?.['required'] ? 'مطلوب' : 'بريد غير صالح' }}</span>
      }

      <input [formField]="form.fields.password" type="password" placeholder="كلمة المرور" />

      <button type="submit" [disabled]="form.invalid()">دخول</button>
    </form>
  \`
})
export class LoginFormComponent {
  form = signalForm({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (this.form.valid()) {
      const { email, password } = this.form.value();
      console.log('Login:', email, password);
    }
  }
}`,
    },

    { type: 'heading', text: 'التحقق من صحة البيانات (Validators)' },
    {
      type: 'list',
      items: [
        'Validators.required — الحقل لا يمكن أن يكون فارغاً',
        'Validators.email — تنسيق البريد الإلكتروني',
        'Validators.minLength(n) — حد أدنى لعدد الحروف',
        'Validators.maxLength(n) — حد أقصى لعدد الحروف',
        'Validators.min(n) — حد أدنى للقيمة الرقمية',
        'Validators.max(n) — حد أقصى للقيمة الرقمية',
        'Validators.pattern(regex) — تطابق نمط regex',
        'محقق مخصص: دالة تُرجع null (صالح) أو كائن خطأ (غير صالح)',
      ],
    },
    {
      type: 'code',
      code: `// محقق مخصص
function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  if (!hasUpper || !hasDigit) {
    return { passwordStrength: 'يجب احتواء حرف كبير ورقم على الأقل' };
  }
  return null;
}

// تحقق يعتمد على حقل آخر (مطابقة كلمتي المرور)
function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}`,
    },

    { type: 'heading', text: 'Reactive Forms' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="الاسم" />
      @if (form.get('name')?.invalid && form.get('name')?.touched) {
        <span>الاسم مطلوب</span>
      }

      <input formControlName="email" type="email" placeholder="البريد" />
      <input formControlName="password" type="password" placeholder="كلمة المرور" />

      <button type="submit" [disabled]="form.invalid">تسجيل</button>
    </form>
  \`
})
export class RegisterComponent {
  fb   = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name:     ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
    }
  }
}`,
    },

    { type: 'heading', text: 'Template-Driven Forms' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: \`
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
      <input
        name="email"
        [(ngModel)]="email"
        required
        email
        #emailField="ngModel"
        placeholder="البريد الإلكتروني"
      />
      @if (emailField.invalid && emailField.touched) {
        <span>بريد إلكتروني غير صالح</span>
      }

      <textarea name="message" [(ngModel)]="message" required></textarea>

      <button type="submit" [disabled]="contactForm.invalid">إرسال</button>
    </form>
  \`
})
export class ContactComponent {
  email   = '';
  message = '';

  onSubmit(form: any) {
    if (form.valid) {
      console.log({ email: this.email, message: this.message });
    }
  }
}`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين الأساليب الثلاثة للنماذج في Angular v22؟',
      answer: 'Signal Forms (مفضّل): مبني على Signals، API نظيف، تكامل تام مع نظام الأنواع. Reactive Forms: يُنشئ نموذج في TypeScript بـ FormBuilder، قابل للاختبار بسهولة، مناسب للنماذج المعقدة. Template-Driven: يُعرّف النموذج في القالب بـ ngModel، أبسط للنماذج الصغيرة، لكن أصعب في الاختبار.',
    },
    {
      type: 'qa',
      question: 'كيف تعرض رسالة خطأ تحقق فقط بعد أن يلمس المستخدم الحقل؟',
      answer: 'استخدم شرط .touched أو .dirty مع .invalid: @if (field.invalid() && field.touched()) — في Signal Forms. أو form.get("field")?.invalid && form.get("field")?.touched — في Reactive Forms. هذا يمنع ظهور الأخطاء قبل أن يتفاعل المستخدم مع الحقل.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Signal Forms — New in v22' },
    { type: 'paragraph', text: 'Signal Forms are the preferred way to handle forms in Angular v22. Built on Signals with a simpler API and full type-system integration.' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { signalForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <form (submit)="onSubmit($event)">
      <input [formField]="form.fields.email" type="email" placeholder="Email" />
      @if (form.fields.email.invalid() && form.fields.email.touched()) {
        <span class="error">
          {{ form.fields.email.errors()?.['required'] ? 'Required' : 'Invalid email' }}
        </span>
      }

      <input [formField]="form.fields.password" type="password" placeholder="Password" />

      <button type="submit" [disabled]="form.invalid()">Log In</button>
    </form>
  \`
})
export class LoginFormComponent {
  form = signalForm({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (this.form.valid()) {
      const { email, password } = this.form.value();
      console.log('Login:', email, password);
    }
  }
}`,
    },

    { type: 'heading', text: 'Validators' },
    {
      type: 'list',
      items: [
        'Validators.required — field cannot be empty',
        'Validators.email — email format check',
        'Validators.minLength(n) — minimum character count',
        'Validators.maxLength(n) — maximum character count',
        'Validators.min(n) — minimum numeric value',
        'Validators.max(n) — maximum numeric value',
        'Validators.pattern(regex) — regex pattern match',
        'Custom validator: function returning null (valid) or error object (invalid)',
      ],
    },
    {
      type: 'code',
      code: `// Custom validator
function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  if (!hasUpper || !hasDigit) {
    return { passwordStrength: 'Must contain at least one uppercase letter and one digit' };
  }
  return null;
}

// Cross-field validator (password match)
function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}`,
    },

    { type: 'heading', text: 'Reactive Forms' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name" />
      @if (form.get('name')?.invalid && form.get('name')?.touched) {
        <span>Name is required</span>
      }

      <input formControlName="email" type="email" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Password" />

      <button type="submit" [disabled]="form.invalid">Register</button>
    </form>
  \`
})
export class RegisterComponent {
  fb   = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name:     ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
    }
  }
}`,
    },

    { type: 'heading', text: 'Template-Driven Forms' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: \`
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
      <input
        name="email"
        [(ngModel)]="email"
        required
        email
        #emailField="ngModel"
        placeholder="Email"
      />
      @if (emailField.invalid && emailField.touched) {
        <span>Invalid email address</span>
      }

      <textarea name="message" [(ngModel)]="message" required></textarea>

      <button type="submit" [disabled]="contactForm.invalid">Send</button>
    </form>
  \`
})
export class ContactComponent {
  email   = '';
  message = '';

  onSubmit(form: any) {
    if (form.valid) {
      console.log({ email: this.email, message: this.message });
    }
  }
}`,
    },
    {
      type: 'qa',
      question: 'What is the difference between the three form approaches in Angular v22?',
      answer: 'Signal Forms (preferred): built on Signals, clean API, full type-system integration. Reactive Forms: form defined in TypeScript with FormBuilder, easy to test, great for complex forms. Template-Driven: form defined in the template with ngModel, simpler for small forms, but harder to test and less type-safe.',
    },
    {
      type: 'qa',
      question: 'How do you show a validation error message only after the user has touched a field?',
      answer: 'Check both .invalid and .touched: in Signal Forms: @if (field.invalid() && field.touched()). In Reactive Forms: form.get("field")?.invalid && form.get("field")?.touched. This prevents error messages from appearing before the user has interacted with the field.',
    },
  ],
};
