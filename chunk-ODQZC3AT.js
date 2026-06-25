import"./chunk-JS3ZFT6L.js";var e={id:12,title:"Forms (Forms)",titleEn:"Forms in Angular",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"Angular v22 \u064A\u0648\u0641\u0631 \u062B\u0644\u0627\u062B\u0629 \u0623\u0633\u0627\u0644\u064A\u0628 \u0644\u0644\u0646\u0645\u0627\u0630\u062C: Signal Forms (\u0627\u0644\u062C\u062F\u064A\u062F \u0648\u0627\u0644\u0645\u0641\u0636\u0651\u0644)\u060C Reactive Forms\u060C \u0648Template-Driven Forms. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u0645\u0639 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u060C \u0627\u0644\u0623\u062E\u0637\u0627\u0621\u060C \u0648\u0627\u0644\u0625\u0631\u0633\u0627\u0644.",introEn:"Angular v22 provides three form approaches: Signal Forms (new, preferred), Reactive Forms, and Template-Driven Forms. This section covers all three with validation, errors, and submission patterns.",lessons:["Signal Forms \u2014 \u0627\u0644\u062C\u062F\u064A\u062F \u0641\u064A v22","\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (Validators)","\u0639\u0631\u0636 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u062A\u062D\u0642\u0642","Reactive Forms","Template-Driven Forms","Forms \u0627\u0644\u0645\u062A\u062F\u0627\u062E\u0644\u0629","\u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629","\u0646\u0645\u0637 \u0625\u0631\u0633\u0627\u0644 Forms"],lessonsEn:["Signal Forms \u2014 New in v22","Validators","Showing Validation Errors","Reactive Forms","Template-Driven Forms","Nested Forms","Dynamic Form Fields","Form Submission Pattern"],content:[{type:"heading",text:"Signal Forms \u2014 \u0627\u0644\u062C\u062F\u064A\u062F \u0641\u064A v22"},{type:"paragraph",text:"Signal Forms \u0647\u064A \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629 \u0644\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A Angular v22. \u0645\u0628\u0646\u064A\u0629 \u0639\u0644\u0649 Signals \u0645\u0639 API \u0623\u0628\u0633\u0637 \u0648\u062A\u0643\u0627\u0645\u0644 \u0643\u0627\u0645\u0644 \u0645\u0639 \u0646\u0638\u0627\u0645 \u0627\u0644\u0623\u0646\u0648\u0627\u0639."},{type:"code",code:`import { Component, ChangeDetectionStrategy } from '@angular/core';
import { signalForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <form (submit)="onSubmit($event)">
      <input [formField]="form.fields.email" type="email" placeholder="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" />
      @if (form.fields.email.invalid() && form.fields.email.touched()) {
        <span class="error">{{ form.fields.email.errors()?.['required'] ? '\u0645\u0637\u0644\u0648\u0628' : '\u0628\u0631\u064A\u062F \u063A\u064A\u0631 \u0635\u0627\u0644\u062D' }}</span>
      }

      <input [formField]="form.fields.password" type="password" placeholder="\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" />

      <button type="submit" [disabled]="form.invalid()">\u062F\u062E\u0648\u0644</button>
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
}`},{type:"heading",text:"\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (Validators)"},{type:"list",items:["Validators.required \u2014 \u0627\u0644\u062D\u0642\u0644 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0641\u0627\u0631\u063A\u0627\u064B","Validators.email \u2014 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","Validators.minLength(n) \u2014 \u062D\u062F \u0623\u062F\u0646\u0649 \u0644\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0648\u0641","Validators.maxLength(n) \u2014 \u062D\u062F \u0623\u0642\u0635\u0649 \u0644\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0648\u0641","Validators.min(n) \u2014 \u062D\u062F \u0623\u062F\u0646\u0649 \u0644\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629","Validators.max(n) \u2014 \u062D\u062F \u0623\u0642\u0635\u0649 \u0644\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629","Validators.pattern(regex) \u2014 \u062A\u0637\u0627\u0628\u0642 \u0646\u0645\u0637 regex","\u0645\u062D\u0642\u0642 \u0645\u062E\u0635\u0635: \u062F\u0627\u0644\u0629 \u062A\u064F\u0631\u062C\u0639 null (\u0635\u0627\u0644\u062D) \u0623\u0648 \u0643\u0627\u0626\u0646 \u062E\u0637\u0623 (\u063A\u064A\u0631 \u0635\u0627\u0644\u062D)"]},{type:"code",code:`// \u0645\u062D\u0642\u0642 \u0645\u062E\u0635\u0635
function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  if (!hasUpper || !hasDigit) {
    return { passwordStrength: '\u064A\u062C\u0628 \u0627\u062D\u062A\u0648\u0627\u0621 \u062D\u0631\u0641 \u0643\u0628\u064A\u0631 \u0648\u0631\u0642\u0645 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644' };
  }
  return null;
}

// \u062A\u062D\u0642\u0642 \u064A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u062D\u0642\u0644 \u0622\u062E\u0631 (\u0645\u0637\u0627\u0628\u0642\u0629 \u0643\u0644\u0645\u062A\u064A \u0627\u0644\u0645\u0631\u0648\u0631)
function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}`},{type:"heading",text:"Reactive Forms"},{type:"code",code:`import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="\u0627\u0644\u0627\u0633\u0645" />
      @if (form.get('name')?.invalid && form.get('name')?.touched) {
        <span>\u0627\u0644\u0627\u0633\u0645 \u0645\u0637\u0644\u0648\u0628</span>
      }

      <input formControlName="email" type="email" placeholder="\u0627\u0644\u0628\u0631\u064A\u062F" />
      <input formControlName="password" type="password" placeholder="\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" />

      <button type="submit" [disabled]="form.invalid">\u062A\u0633\u062C\u064A\u0644</button>
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
}`},{type:"heading",text:"Template-Driven Forms"},{type:"code",code:`import { Component, ChangeDetectionStrategy } from '@angular/core';
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
        placeholder="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"
      />
      @if (emailField.invalid && emailField.touched) {
        <span>\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D</span>
      }

      <textarea name="message" [(ngModel)]="message" required></textarea>

      <button type="submit" [disabled]="contactForm.invalid">\u0625\u0631\u0633\u0627\u0644</button>
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
}`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 \u0627\u0644\u0623\u0633\u0627\u0644\u064A\u0628 \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u0644\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A Angular v22\u061F",answer:"Signal Forms (\u0645\u0641\u0636\u0651\u0644): \u0645\u0628\u0646\u064A \u0639\u0644\u0649 Signals\u060C API \u0646\u0638\u064A\u0641\u060C \u062A\u0643\u0627\u0645\u0644 \u062A\u0627\u0645 \u0645\u0639 \u0646\u0638\u0627\u0645 \u0627\u0644\u0623\u0646\u0648\u0627\u0639. Reactive Forms: \u064A\u064F\u0646\u0634\u0626 \u0646\u0645\u0648\u0630\u062C \u0641\u064A TypeScript \u0628\u0640 FormBuilder\u060C \u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0633\u0647\u0648\u0644\u0629\u060C \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u0639\u0642\u062F\u0629. Template-Driven: \u064A\u064F\u0639\u0631\u0651\u0641 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0640 ngModel\u060C \u0623\u0628\u0633\u0637 \u0644\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0635\u063A\u064A\u0631\u0629\u060C \u0644\u0643\u0646 \u0623\u0635\u0639\u0628 \u0641\u064A Testing."},{type:"qa",question:"\u0643\u064A\u0641 \u062A\u0639\u0631\u0636 \u0631\u0633\u0627\u0644\u0629 \u062E\u0637\u0623 \u062A\u062D\u0642\u0642 \u0641\u0642\u0637 \u0628\u0639\u062F \u0623\u0646 \u064A\u0644\u0645\u0633 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0642\u0644\u061F",answer:'\u0627\u0633\u062A\u062E\u062F\u0645 \u0634\u0631\u0637 .touched \u0623\u0648 .dirty \u0645\u0639 .invalid: @if (field.invalid() && field.touched()) \u2014 \u0641\u064A Signal Forms. \u0623\u0648 form.get("field")?.invalid && form.get("field")?.touched \u2014 \u0641\u064A Reactive Forms. \u0647\u0630\u0627 \u064A\u0645\u0646\u0639 \u0638\u0647\u0648\u0631 \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0642\u0628\u0644 \u0623\u0646 \u064A\u062A\u0641\u0627\u0639\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0639 \u0627\u0644\u062D\u0642\u0644.'}],contentEn:[{type:"heading",text:"Signal Forms \u2014 New in v22"},{type:"paragraph",text:"Signal Forms are the preferred way to handle forms in Angular v22. Built on Signals with a simpler API and full type-system integration."},{type:"code",code:`import { Component, ChangeDetectionStrategy } from '@angular/core';
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
}`},{type:"heading",text:"Validators"},{type:"list",items:["Validators.required \u2014 field cannot be empty","Validators.email \u2014 email format check","Validators.minLength(n) \u2014 minimum character count","Validators.maxLength(n) \u2014 maximum character count","Validators.min(n) \u2014 minimum numeric value","Validators.max(n) \u2014 maximum numeric value","Validators.pattern(regex) \u2014 regex pattern match","Custom validator: function returning null (valid) or error object (invalid)"]},{type:"code",code:`// Custom validator
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
}`},{type:"heading",text:"Reactive Forms"},{type:"code",code:`import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
}`},{type:"heading",text:"Template-Driven Forms"},{type:"code",code:`import { Component, ChangeDetectionStrategy } from '@angular/core';
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
}`},{type:"qa",question:"What is the difference between the three form approaches in Angular v22?",answer:"Signal Forms (preferred): built on Signals, clean API, full type-system integration. Reactive Forms: form defined in TypeScript with FormBuilder, easy to test, great for complex forms. Template-Driven: form defined in the template with ngModel, simpler for small forms, but harder to test and less type-safe."},{type:"qa",question:"How do you show a validation error message only after the user has touched a field?",answer:'Check both .invalid and .touched: in Signal Forms: @if (field.invalid() && field.touched()). In Reactive Forms: form.get("field")?.invalid && form.get("field")?.touched. This prevents error messages from appearing before the user has interacted with the field.'}]};export{e as default};
