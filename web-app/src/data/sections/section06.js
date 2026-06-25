// Section 6 — Components Communication
export default {
  id: 6,
  title: 'التواصل بين المكوّنات',
  titleEn: 'Components Communication',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'تطبيقات Angular هي أشجار من المكوّنات. هذا القسم يغطي كل أنماط التواصل التي يوفرها Angular v22: تمرير البيانات للأسفل بـ input()، إرسال الأحداث للأعلى بـ output()، مشاركة الكائنات، إسقاط المحتوى بـ ng-content، والمكوّنات بدون محدِّد (Selectorless).',
  introEn: 'Angular applications are trees of components. This section covers every communication pattern Angular v22 provides: passing data down with input(), sending events up with output(), sharing objects, projecting content with ng-content, and the new v22 selectorless components.',

  lessons: [
    'التواصل من الأب إلى الابن',
    '@Input وinput() — Signal Input',
    'التواصل من الابن إلى الأب',
    '@Output وoutput()',
    'EventEmitter',
    'تمرير الكائنات بين المكوّنات',
    'تركيب المكوّنات',
    'إسقاط المحتوى بـ ng-content',
    'المكوّنات بدون محدِّد (Selectorless) — جديد في v22',
  ],
  lessonsEn: [
    'Parent to Child Communication',
    '@Input and input() — Signal Input',
    'Child to Parent Communication',
    '@Output and output()',
    'EventEmitter',
    'Passing Objects Between Components',
    'Component Composition',
    'Content Projection with ng-content',
    'Selectorless Components — New in v22',
  ],

  content: [
    { type: 'heading', text: 'التواصل من الأب إلى الابن' },
    { type: 'paragraph', text: 'أكثر نمط شيوعاً في Angular هو تمرير البيانات من الأب إلى الابن. تدفق البيانات في Angular اتجاه واحد: البيانات تنزل (أب → ابن) والأحداث ترتفع (ابن → أب).' },
    {
      type: 'code',
      code: `// parent.component.ts
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: \`
    <app-child [title]="pageTitle()" [count]="itemCount()" />
  \`
})
export class ParentComponent {
  pageTitle = signal('مرحباً من الأب');
  itemCount = signal(42);
}`,
    },

    { type: 'heading', text: '@Input وinput() — Signal Input' },
    { type: 'paragraph', text: 'Angular v22 يُفضّل دالة input() الجديدة التي ترجع Signal. الفائدة: يمكن استخدام المدخل مباشرةً في computed() وeffect() بدون ngOnChanges.' },
    {
      type: 'code',
      code: `// طريقة v22 المفضّلة — input() يُرجع Signal
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <h3>{{ name() }}</h3>       <!-- استدعاء كـ Signal -->
    <p>العمر: {{ age() }}</p>
  \`
})
export class UserCardComponent {
  name = input<string>('');          // اختياري مع قيمة افتراضية
  age  = input.required<number>();   // مطلوب — خطأ وقت البناء إن لم يُمرَّر

  // يمكنك استخدام المدخل في computed مباشرةً
  greeting = computed(() => \`مرحباً \${this.name()}\`);
}`,
    },
    {
      type: 'list',
      items: [
        '@Input() → خاصية عادية، تُقرأ كـ this.name في القالب: {{ name }}',
        'input() → Signal، تُقرأ كـ this.name() في القالب: {{ name() }}',
        'input.required<T>() → مطلوب، خطأ وقت البناء إذا لم يُمرَّر',
        'input(default, { transform: fn }) → تحويل القيمة الواردة',
        'Signal inputs تعمل مع computed() و effect() مباشرةً',
      ],
    },

    { type: 'heading', text: 'التواصل من الابن إلى الأب' },
    { type: 'paragraph', text: 'البيانات تنزل عبر المدخلات، والأحداث ترتفع عبر المخرجات. عندما يحدث شيء في الابن، يُخبر الأب عبر output().' },
    {
      type: 'code',
      code: `// child.component.ts
@Component({
  selector: 'app-like-button',
  standalone: true,
  template: \`<button (click)="like()">❤️ إعجاب</button>\`
})
export class LikeButtonComponent {
  liked = output<void>();   // مخرج v22

  like() {
    this.liked.emit();
  }
}

// parent.component.ts
@Component({
  template: \`
    <p>الإعجابات: {{ likes() }}</p>
    <app-like-button (liked)="onLiked()" />
  \`
})
export class PostComponent {
  likes = signal(0);

  onLiked() {
    this.likes.update(n => n + 1);
  }
}`,
    },

    { type: 'heading', text: '@Output وoutput()' },
    { type: 'paragraph', text: 'output() هو أسلوب v22 للمخرجات — أبسط من @Output() + EventEmitter ومع tree-shaking أفضل.' },
    {
      type: 'code',
      code: `// الطريقة القديمة
@Output() quantityChanged = new EventEmitter<number>();

// طريقة v22 المفضّلة
quantityChanged = output<number>();

// الاستخدام في الأب — نفس الصياغة لكلتا الطريقتين
// <app-qty (quantityChanged)="onQtyChange($event)" />`,
    },

    { type: 'heading', text: 'تمرير الكائنات بين المكوّنات' },
    { type: 'paragraph', text: 'في التطبيقات الحقيقية تُمرّر كائنات كاملة — مستخدمين، منتجات، طلبات. عرّف الواجهات المشتركة في ملف منفصل ليتمكن الأب والابن من استيرادها.' },
    {
      type: 'code',
      code: `// models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// child — يستقبل ويُرسل كائناً
export class ProductCardComponent {
  product    = input.required<Product>();
  addedToCart = output<Product>();

  addToCart() {
    this.addedToCart.emit(this.product());
  }
}`,
    },
    { type: 'warning', text: 'تحديث مهم: OnPush (الافتراضي في v22) يُلاحظ التغييرات فقط عندما تتغير المرجعية. لا تُعدّل الكائنات في مكانها — استبدلها بكائنات جديدة: { ...obj, price: 99 }' },

    { type: 'heading', text: 'إسقاط المحتوى بـ ng-content' },
    { type: 'paragraph', text: 'المدخلات تُمرّر بيانات، لكن أحياناً تريد تمرير هيكل HTML كامل. هذا هو إسقاط المحتوى بـ <ng-content>.' },
    {
      type: 'code',
      code: `// card.component.ts
@Component({
  selector: 'app-card',
  standalone: true,
  template: \`
    <div class="card">
      <ng-content />   <!-- المحتوى المُمرَّر من الأب يظهر هنا -->
    </div>
  \`
})
export class CardComponent {}

// الاستخدام في الأب
<app-card>
  <h2>مرحباً!</h2>
  <p>هذا المحتوى يُسقَط داخل البطاقة.</p>
</app-card>`,
    },

    { type: 'heading', text: 'المكوّنات بدون محدِّد (Selectorless) — جديد في v22' },
    { type: 'paragraph', text: 'في Angular v22، المكوّنات لا تحتاج selector. مكوّن بدون selector لا يمكن استخدامه كعلامة HTML، لكن يمكن استخدامه في التوجيه (Routing) أو NgComponentOutlet.' },
    {
      type: 'code',
      code: `// لا selector — مكوّن بدون محدِّد
@Component({
  standalone: true,
  template: \`
    <article>
      <h2>{{ title() }}</h2>
      <p>{{ body() }}</p>
    </article>
  \`
})
export class PostDetailComponent {
  title = input.required<string>();
  body  = input.required<string>();
}

// يُستخدم في التوجيه بالمرجعية، لا بالعلامة
export const routes: Routes = [
  { path: 'posts/:id', component: PostDetailComponent }
];`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين @Input() وinput() في Angular v22؟',
      answer: '@Input() موجّه (decorator) يُعيّن خاصية عادية — تقرأها كـ this.name في TypeScript وكـ {{ name }} في القالب. input() دالة ترجع Signal — تقرأها كـ this.name() وكـ {{ name() }}. Signal inputs تعمل مباشرةً مع computed() وeffect().',
    },
    {
      type: 'qa',
      question: 'متى تستخدم ng-content بدلاً من المدخلات؟',
      answer: 'استخدم ng-content عندما تبني مكوّنات "غلاف" قابلة لإعادة الاستخدام — بطاقات، نوافذ حوارية، ألسنة، لوحات — حيث تريد أن يملأ المُستخدم إطار التخطيط بأي محتوى يريده. المدخلات للبيانات، ng-content للهيكل.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Parent to Child Communication' },
    { type: 'paragraph', text: 'The most common pattern in Angular is a parent component passing data down to a child. Angular\'s data flow is intentionally one-way: data flows down (parent → child) and events flow up (child → parent).' },
    {
      type: 'code',
      code: `// parent.component.ts
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: \`
    <app-child [title]="pageTitle()" [count]="itemCount()" />
  \`
})
export class ParentComponent {
  pageTitle = signal('Hello from Parent');
  itemCount = signal(42);
}`,
    },

    { type: 'heading', text: '@Input and input() — Signal Input' },
    { type: 'paragraph', text: 'Angular v22 prefers the new input() function that returns a Signal. Benefit: the input can be used directly in computed() and effect() without ngOnChanges.' },
    {
      type: 'code',
      code: `// v22 preferred way — input() returns a Signal
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <h3>{{ name() }}</h3>       <!-- called as Signal -->
    <p>Age: {{ age() }}</p>
  \`
})
export class UserCardComponent {
  name = input<string>('');          // optional with default
  age  = input.required<number>();   // required — compile-time error if missing

  // Use input directly in computed
  greeting = computed(() => \`Hello \${this.name()}\`);
}`,
    },
    {
      type: 'list',
      items: [
        '@Input() → plain property, read as this.name in template: {{ name }}',
        'input() → Signal, read as this.name() in template: {{ name() }}',
        'input.required<T>() → required, compile-time error if not passed',
        'input(default, { transform: fn }) → transform the incoming value',
        'Signal inputs work directly with computed() and effect()',
      ],
    },

    { type: 'heading', text: 'Child to Parent Communication' },
    { type: 'paragraph', text: 'Data flows down via inputs, events flow up via outputs. When something happens in a child, it tells the parent via output().' },
    {
      type: 'code',
      code: `// child.component.ts
@Component({
  selector: 'app-like-button',
  standalone: true,
  template: \`<button (click)="like()">❤️ Like</button>\`
})
export class LikeButtonComponent {
  liked = output<void>();   // v22 output

  like() {
    this.liked.emit();
  }
}

// parent.component.ts
@Component({
  template: \`
    <p>Likes: {{ likes() }}</p>
    <app-like-button (liked)="onLiked()" />
  \`
})
export class PostComponent {
  likes = signal(0);

  onLiked() {
    this.likes.update(n => n + 1);
  }
}`,
    },

    { type: 'heading', text: '@Output and output()' },
    { type: 'paragraph', text: 'output() is the v22 way for outputs — simpler than @Output() + EventEmitter and with better tree-shaking.' },
    {
      type: 'code',
      code: `// Old way
@Output() quantityChanged = new EventEmitter<number>();

// v22 preferred way
quantityChanged = output<number>();

// Parent usage — same syntax for both approaches
// <app-qty (quantityChanged)="onQtyChange($event)" />`,
    },

    { type: 'heading', text: 'Passing Objects Between Components' },
    { type: 'paragraph', text: 'In real apps you pass entire objects — users, products, orders. Define shared interfaces in a separate file so both parent and child can import from it.' },
    {
      type: 'code',
      code: `// models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// Child — receives and emits an object
export class ProductCardComponent {
  product    = input.required<Product>();
  addedToCart = output<Product>();

  addToCart() {
    this.addedToCart.emit(this.product());
  }
}`,
    },
    { type: 'warning', text: 'Important: OnPush (v22 default) only detects changes when the reference changes. Never mutate objects in place — always replace them: { ...obj, price: 99 }' },

    { type: 'heading', text: 'Content Projection with ng-content' },
    { type: 'paragraph', text: 'Inputs pass data, but sometimes you want to pass entire HTML structure. That\'s content projection with <ng-content>.' },
    {
      type: 'code',
      code: `// card.component.ts
@Component({
  selector: 'app-card',
  standalone: true,
  template: \`
    <div class="card">
      <ng-content />   <!-- projected content appears here -->
    </div>
  \`
})
export class CardComponent {}

// Parent usage
<app-card>
  <h2>Welcome!</h2>
  <p>This content is projected into the card.</p>
</app-card>`,
    },

    { type: 'heading', text: 'Selectorless Components — New in v22' },
    { type: 'paragraph', text: 'In Angular v22, components no longer need a selector. A selectorless component can\'t be used as an HTML tag, but can be used in routing or NgComponentOutlet.' },
    {
      type: 'code',
      code: `// No selector — selectorless component
@Component({
  standalone: true,
  template: \`
    <article>
      <h2>{{ title() }}</h2>
      <p>{{ body() }}</p>
    </article>
  \`
})
export class PostDetailComponent {
  title = input.required<string>();
  body  = input.required<string>();
}

// Used in routing by class reference, not by tag
export const routes: Routes = [
  { path: 'posts/:id', component: PostDetailComponent }
];`,
    },
    {
      type: 'qa',
      question: 'What is the difference between @Input() and input() in Angular v22?',
      answer: '@Input() is a decorator that sets a plain class property — read as this.name in TypeScript and {{ name }} in templates. input() is a function that returns a Signal — read as this.name() and {{ name() }}. Signal inputs work directly with computed() and effect() for reactive derivations.',
    },
    {
      type: 'qa',
      question: 'When should you use ng-content instead of inputs?',
      answer: 'Use ng-content when building reusable "wrapper" components — cards, modals, tabs, panels — where you want consumers to fill in a layout frame with any content they want. Inputs are for data, ng-content is for HTML structure.',
    },
  ],
};
