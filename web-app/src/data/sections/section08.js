// Section 8 — Advanced Signals
export default {
  id: 8,
  title: 'Signals المتقدمة',
  titleEn: 'Advanced Signals',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'هذا القسم يأخذ Signals إلى مستوى أعمق: مدخلات Signal (input.required، transforms)، model inputs، استعلامات Signal (viewChild، contentChild)، linkedSignal، وResource API لجلب البيانات بشكل تصريحي.',
  introEn: 'This section takes Signals deeper: signal inputs (input.required, transforms), model inputs for two-way binding, signal queries (viewChild, contentChild), linkedSignal, and the Resource API for declarative async data fetching.',

  lessons: [
    'Signal Inputs',
    'input.required and Transforms',
    'model() — Two-Way Binding',
    'Signal Queries (viewChild, contentChild)',
    'linkedSignal',
    'Resource API — httpResource()',
    'Async Patterns with Signals',
    'Common Signal Mistakes',
  ],
  lessonsEn: [
    'Signal Inputs',
    'input.required and Transforms',
    'model() — Two-Way Binding',
    'Signal Queries (viewChild, contentChild)',
    'linkedSignal',
    'Resource API — httpResource()',
    'Async Patterns with Signals',
    'Common Signal Mistakes',
  ],

  content: [
    { type: 'heading', text: 'مدخلات Signal (Signal Inputs)' },
    { type: 'paragraph', text: 'بدلاً من @Input() الكلاسيكي، Angular v22 يوفر input() الذي يُرجع Signal مباشرةً. هذا يُمكّنك من استخدام المدخل في computed() وeffect() دون الحاجة لـ ngOnChanges.' },
    {
      type: 'code',
      code: `import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: \`
    <div [class.featured]="featured()">
      <h3>{{ name() }}</h3>
      <p>{{ formattedPrice() }}</p>
      @if (discount() > 0) {
        <span class="badge">{{ discount() }}% خصم</span>
      }
    </div>
  \`
})
export class ProductCardComponent {
  name     = input.required<string>();
  price    = input.required<number>();
  currency = input<string>('USD');
  discount = input(0, { transform: numberAttribute });   // "10" → 10
  featured = input(false, { transform: booleanAttribute }); // "" → true

  formattedPrice = computed(() =>
    new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: this.currency(),
    }).format(this.price())
  );
}`,
    },

    { type: 'heading', text: 'model() — ربط ثنائي الاتجاه' },
    { type: 'paragraph', text: 'model() هو Signal خاص يمكن للأب ربطه بصيغة [( )] (ثنائي الاتجاه). الابن يقرأه ويعدّله، والتغييرات تنتشر للأعلى تلقائياً.' },
    {
      type: 'code',
      code: `import { Component, model, ChangeDetectionStrategy } from '@angular/core';

// مكوّن الابن
@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button (click)="toggle()" [class.active]="checked()">
      {{ checked() ? 'تفعيل' : 'تعطيل' }}
    </button>
  \`
})
export class ToggleComponent {
  checked = model(false);   // model Signal — قابل للقراءة والكتابة

  toggle() {
    this.checked.update(v => !v);
  }
}

// مكوّن الأب
@Component({
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <app-toggle [(checked)]="darkMode" />
    <p>الوضع الليلي: {{ darkMode() }}</p>
  \`
})
export class SettingsComponent {
  darkMode = signal(false);
}`,
    },

    { type: 'heading', text: 'استعلامات Signal (viewChild، contentChild)' },
    { type: 'paragraph', text: 'viewChild() وcontentChild() هما بديل v22 لـ @ViewChild و @ContentChild — يُرجعان Signals بدلاً من خصائص عادية.' },
    {
      type: 'code',
      code: `import { Component, viewChild, contentChild, ElementRef,
         AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-autofocus',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <input #emailInput type="email" placeholder="البريد الإلكتروني" />
    <button (click)="clearAndFocus()">مسح</button>
  \`
})
export class AutofocusComponent implements AfterViewInit {
  // Signal query — يُرجع Signal يحمل العنصر
  emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  ngAfterViewInit(): void {
    this.emailInput().nativeElement.focus();
  }

  clearAndFocus(): void {
    const el = this.emailInput().nativeElement;
    el.value = '';
    el.focus();
  }
}`,
    },

    { type: 'heading', text: 'linkedSignal' },
    { type: 'paragraph', text: 'linkedSignal هو Signal مرتبط بـ Signal آخر — يتحدث تلقائياً عند تغيير الاعتمادية، لكن يمكن الكتابة عليه يدوياً أيضاً. مثالي لـ "إعادة التعيين عند التغيير".' },
    {
      type: 'code',
      code: `import { Component, signal, linkedSignal, computed, ChangeDetectionStrategy } from '@angular/core';

const countries = {
  'السعودية': ['الرياض', 'جدة', 'الدمام'],
  'مصر': ['القاهرة', 'الإسكندرية', 'أسيوط'],
  'الإمارات': ['دبي', 'أبوظبي', 'الشارقة'],
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="selectedCountry.set($any($event.target).value)">
      @for (c of countriesList; track c) {
        <option [value]="c">{{ c }}</option>
      }
    </select>

    <select (change)="selectedCity.set($any($event.target).value)">
      @for (city of filteredCities(); track city) {
        <option [value]="city">{{ city }}</option>
      }
    </select>
  \`
})
export class LocationPickerComponent {
  countriesList = Object.keys(countries);
  selectedCountry = signal('السعودية');

  filteredCities = computed(() => countries[this.selectedCountry() as keyof typeof countries] ?? []);

  // يتحدث تلقائياً عند تغيير الدولة، لكن يمكن للمستخدم تعديله
  selectedCity = linkedSignal(() => this.filteredCities()[0]);
}`,
    },

    { type: 'heading', text: 'Resource API — httpResource()' },
    { type: 'paragraph', text: 'httpResource() طريقة تصريحية لجلب البيانات. مرّر Signal يُحدد الـ URL، واحصل على كائن بـ Signals: value، isLoading، error. يُعيد التحميل تلقائياً عند تغيير الـ URL.' },
    {
      type: 'code',
      code: `import { Component, signal, input, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

interface Post { id: number; title: string; body: string; }

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="userId.set(+$any($event.target).value)">
      @for (id of [1,2,3,4,5]; track id) {
        <option [value]="id">مستخدم {{ id }}</option>
      }
    </select>

    @if (posts.isLoading()) {
      <p>جارٍ التحميل...</p>
    } @else if (posts.error()) {
      <p class="error">خطأ في التحميل</p>
    } @else {
      @for (post of posts.value(); track post.id) {
        <div class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      }
    }

    <button (click)="posts.reload()">إعادة التحميل</button>
  \`
})
export class PostsComponent {
  userId = signal(1);

  posts = httpResource<Post[]>(
    () => \`https://jsonplaceholder.typicode.com/posts?userId=\${this.userId()}\`
  );
}`,
    },
    { type: 'tip', text: 'httpResource() يُعيد التحميل تلقائياً عند تغيير الـ URL Signal. لا تحتاج لـ subscribe() أو ngOnInit().' },

    { type: 'heading', text: 'الأخطاء الشائعة في Signals' },
    {
      type: 'list',
      items: [
        'استخدام effect() للقيم المشتقة — استخدم computed() بدلاً من ذلك',
        'تعديل المصفوفات في مكانها (.push) بدلاً من إنشاء مرجعية جديدة',
        'إنشاء signal() داخل تعبيرات القالب — أنشئها في الفئة',
        'عدم كشف Signal للقراءة فقط من Services — استخدم .asReadonly()',
        'قراءة signal داخل ngOnInit بدلاً من computed() للقيم المشتقة',
      ],
    },
    {
      type: 'qa',
      question: 'ما الفرق بين input() وmodel()؟',
      answer: 'input() للمدخلات الواردة فقط — الأب يُمرّر قيمة، الابن يقرأها (Signal للقراءة فقط). model() للربط الثنائي — الأب يُمرّر قيمة والابن يمكنه تعديلها وترتفع التغييرات للأعلى تلقائياً. الأب يستخدم [(property)]="signal" مع model().',
    },
    {
      type: 'qa',
      question: 'ما الفائدة الرئيسية من httpResource() مقارنة بـ HttpClient.get()؟',
      answer: 'httpResource() تصريحي — مرّر Signal للـ URL، واحصل مباشرةً على value()، isLoading()، وerror() كـ Signals. يُعيد التحميل تلقائياً عند تغيير الـ URL. HttpClient.get() يُرجع Observable يحتاج لـ subscribe يدوي وإدارة حالة التحميل والأخطاء بنفسك.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Signal Inputs' },
    { type: 'paragraph', text: 'Instead of the classic @Input() decorator, Angular v22 provides input() which returns a Signal directly. This lets you use the input in computed() and effect() without needing ngOnChanges.' },
    {
      type: 'code',
      code: `import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div [class.featured]="featured()">
      <h3>{{ name() }}</h3>
      <p>{{ formattedPrice() }}</p>
      @if (discount() > 0) {
        <span class="badge">{{ discount() }}% off</span>
      }
    </div>
  \`
})
export class ProductCardComponent {
  name     = input.required<string>();
  price    = input.required<number>();
  currency = input<string>('USD');
  discount = input(0, { transform: numberAttribute });     // "10" → 10
  featured = input(false, { transform: booleanAttribute }); // "" → true

  formattedPrice = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency(),
    }).format(this.price())
  );
}`,
    },

    { type: 'heading', text: 'model() — Two-Way Binding' },
    { type: 'paragraph', text: 'model() is a special Signal the parent can bind with [( )] syntax (two-way). The child reads and updates it, and changes propagate upward automatically.' },
    {
      type: 'code',
      code: `import { Component, model, ChangeDetectionStrategy } from '@angular/core';

// Child component
@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button (click)="toggle()" [class.active]="checked()">
      {{ checked() ? 'On' : 'Off' }}
    </button>
  \`
})
export class ToggleComponent {
  checked = model(false);   // model Signal — readable and writable

  toggle() {
    this.checked.update(v => !v);
  }
}

// Parent component
@Component({
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <app-toggle [(checked)]="darkMode" />
    <p>Dark mode: {{ darkMode() }}</p>
  \`
})
export class SettingsComponent {
  darkMode = signal(false);
}`,
    },

    { type: 'heading', text: 'Signal Queries (viewChild, contentChild)' },
    { type: 'paragraph', text: 'viewChild() and contentChild() are the v22 replacements for @ViewChild and @ContentChild — they return Signals instead of plain properties.' },
    {
      type: 'code',
      code: `import { Component, viewChild, ElementRef,
         AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-autofocus',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <input #emailInput type="email" placeholder="Email" />
    <button (click)="clearAndFocus()">Clear</button>
  \`
})
export class AutofocusComponent implements AfterViewInit {
  // Signal query — returns a Signal holding the element
  emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  ngAfterViewInit(): void {
    this.emailInput().nativeElement.focus();
  }

  clearAndFocus(): void {
    const el = this.emailInput().nativeElement;
    el.value = '';
    el.focus();
  }
}`,
    },

    { type: 'heading', text: 'linkedSignal' },
    { type: 'paragraph', text: 'linkedSignal is a Signal linked to another Signal — it auto-updates when the dependency changes, but can also be written to manually. Perfect for "reset on change" patterns.' },
    {
      type: 'code',
      code: `import { Component, signal, linkedSignal, computed, ChangeDetectionStrategy } from '@angular/core';

const countries = {
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam'],
  'Egypt': ['Cairo', 'Alexandria', 'Assiut'],
  'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah'],
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="selectedCountry.set($any($event.target).value)">
      @for (c of countriesList; track c) {
        <option [value]="c">{{ c }}</option>
      }
    </select>

    <select (change)="selectedCity.set($any($event.target).value)">
      @for (city of filteredCities(); track city) {
        <option [value]="city">{{ city }}</option>
      }
    </select>
  \`
})
export class LocationPickerComponent {
  countriesList = Object.keys(countries);
  selectedCountry = signal('Saudi Arabia');

  filteredCities = computed(() =>
    countries[this.selectedCountry() as keyof typeof countries] ?? []
  );

  // Auto-resets when country changes, but user can still pick any city
  selectedCity = linkedSignal(() => this.filteredCities()[0]);
}`,
    },

    { type: 'heading', text: 'Resource API — httpResource()' },
    { type: 'paragraph', text: 'httpResource() is a declarative way to fetch data. Pass a Signal that determines the URL, get back an object with Signals: value, isLoading, error. It auto-reloads when the URL Signal changes.' },
    {
      type: 'code',
      code: `import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

interface Post { id: number; title: string; body: string; }

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <select (change)="userId.set(+$any($event.target).value)">
      @for (id of [1,2,3,4,5]; track id) {
        <option [value]="id">User {{ id }}</option>
      }
    </select>

    @if (posts.isLoading()) {
      <p>Loading...</p>
    } @else if (posts.error()) {
      <p class="error">Failed to load</p>
    } @else {
      @for (post of posts.value(); track post.id) {
        <div class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      }
    }

    <button (click)="posts.reload()">Reload</button>
  \`
})
export class PostsComponent {
  userId = signal(1);

  posts = httpResource<Post[]>(
    () => \`https://jsonplaceholder.typicode.com/posts?userId=\${this.userId()}\`
  );
}`,
    },
    { type: 'tip', text: 'httpResource() auto-reloads when the URL Signal changes. No subscribe(), no ngOnInit() needed.' },

    { type: 'heading', text: 'Common Signal Mistakes' },
    {
      type: 'list',
      items: [
        'Using effect() for derived values — use computed() instead',
        'Mutating arrays in place (.push()) instead of creating a new reference',
        'Creating signal() inside template expressions — create them in the class',
        'Not exposing read-only signals from services — use .asReadonly()',
        'Reading signals in ngOnInit for derived values — use computed() instead',
      ],
    },
    {
      type: 'qa',
      question: 'What is the difference between input() and model()?',
      answer: 'input() is for incoming data only — the parent passes a value, the child reads it (read-only Signal). model() is for two-way binding — the parent passes a value and the child can update it, with changes propagating upward automatically. The parent uses [(property)]="signal" syntax with model().',
    },
    {
      type: 'qa',
      question: 'What is the main advantage of httpResource() over HttpClient.get()?',
      answer: 'httpResource() is declarative — pass a URL Signal, get value(), isLoading(), and error() back as Signals. It auto-reloads when the URL changes. HttpClient.get() returns a cold Observable that needs manual subscribe(), and you must manage loading/error state yourself.',
    },
  ],
};
