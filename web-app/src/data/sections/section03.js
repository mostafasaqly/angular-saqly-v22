// Section 3 — Angular Fundamentals
export default {
  id: 3,
  title: 'أساسيات Angular',
  titleEn: 'Angular Fundamentals',
  level: 'مبتدئ',
  levelEn: 'Beginner',
  intro: 'بعد إعداد البيئة، حان وقت كتابة كود Angular حقيقي. هذا القسم يغطي اللبنات الأساسية لكل تطبيق Angular: Components، القوالب، الأنماط، المُحدِّدات (Selectors)، وData Binding. ستفهم كيف يحوّل Angular فئة TypeScript وقالب HTML إلى واجهة مستخدم تفاعلية حية.',
  introEn: 'Now that your environment is ready, it\'s time to write real Angular code. This section covers the core building blocks of every Angular application: components, templates, styles, selectors, and data binding. By the end you\'ll understand how Angular turns a TypeScript class and an HTML template into living, reactive UI.',

  lessons: [
    'ما هو Angular؟',
    'Components في Angular',
    'Standalone Components',
    'Component Metadata',
    'Templates',
    'Styles',
    'Selectors',
    'نظرة عامة على Data Binding',
  ],
  lessonsEn: [
    'What is Angular?',
    'Components in Angular',
    'Standalone Components',
    'Component Metadata',
    'Templates',
    'Styles',
    'Selectors',
    'Data Binding Overview',
  ],

  content: [
    { type: 'heading', text: 'ما هو Angular؟' },
    { type: 'paragraph', text: 'Angular إطار عمل متكامل (Full Framework) من Google لبناء تطبيقات ويب. يأتي بكل شيء جاهزاً: Router، Forms، HTTP Client، DI، وCLI — بدون الحاجة لتجميع مكتبات خارجية.' },
    { type: 'paragraph', text: 'نموذج Angular الذهني: كل تطبيق Angular هو شجرة من Components. في القمة يوجد AppComponent، وكل جزء من واجهة المستخدم هو مكوّن فرعي (child) متداخل بداخله.' },
    { type: 'tip', text: 'Angular v22 في جملة واحدة: إطار عمل signal-first، zoneless، standalone-by-default — حيث كل مكوّن جديد يستخدم OnPush ويتفاعل مع التغييرات عبر Signals.' },

    { type: 'heading', text: 'Components في Angular' },
    { type: 'paragraph', text: 'المكوّن هو اللبنة الأساسية في Angular. كل مكوّن له ثلاثة أجزاء: فئة TypeScript (المنطق والحالة)، قالب HTML (ما يراه المستخدم)، وأنماط CSS (التصميم المحدد للمكوّن).' },
    {
      type: 'code',
      code: `import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h1>مرحباً، {{ name() }}!</h1>
    <p>أهلاً بك في Angular v22.</p>
  \`,
  styles: [\`h1 { color: #dd0031; }\`]
})
export class GreetingComponent {
  name = signal('Angular');
}`,
    },
    { type: 'tip', text: 'لاحظ signal() بدلاً من المتغيرات العادية — هذا هو أسلوب Angular v22 لState Management التفاعلية.' },

    { type: 'heading', text: 'Components المستقلة (Standalone)' },
    { type: 'paragraph', text: 'قبل Angular v15، كان كل مكوّن يحتاج إلى NgModule. في Angular v22، standalone هو الطريقة الوحيدة — المكوّن يُعلن عن اعتمادياته مباشرةً في decorator @Component.' },
    {
      type: 'code',
      code: `@Component({
  selector: 'app-product-card',
  standalone: true,               // دائماً true في v22
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe], // بدلاً من NgModule
  template: \`
    <div class="card">
      <h2>{{ product().name }}</h2>
      <a [routerLink]="['/products', product().id]">عرض التفاصيل</a>
    </div>
  \`
})
export class ProductCardComponent {
  product = signal({ id: 1, name: 'كتاب Angular v22' });
}`,
    },

    { type: 'heading', text: 'بيانات التعريف (Component Metadata)' },
    { type: 'paragraph', text: 'decorator @Component يقبل كائن بيانات يُعرّف سلوك المكوّن. أهم الحقول:' },
    {
      type: 'code',
      code: `@Component({
  selector: 'app-user-card',       // العلامة HTML المخصصة
  standalone: true,                 // دائماً true في v22
  template: \`<p>محتوى مضمّن</p>\`,  // أو templateUrl لملف خارجي
  styles: [\`p { color: red; }\`],   // أو styleUrl لملف CSS خارجي
  imports: [RouterLink, DatePipe],  // مكوّنات/موجّهات/أنابيب مستخدمة
  changeDetection: ChangeDetectionStrategy.OnPush,  // افتراضي في v22
})
export class UserCardComponent { ... }`,
    },

    { type: 'heading', text: 'القوالب (Templates)' },
    { type: 'paragraph', text: 'قالب Angular هو HTML معزّز بصياغة خاصة. يُترجَم وقت البناء إلى تعليمات DOM فعّالة — لا virtual DOM.' },
    {
      type: 'code',
      code: `<!-- استيفاء النص -->
<p>{{ title() }}</p>

<!-- Property Binding -->
<img [src]="imageUrl()" [alt]="imageAlt()" />

<!-- Event Binding -->
<button (click)="handleClick()">اضغط هنا</button>

<!-- Control Flow -->
@if (isLoggedIn()) {
  <p>أهلاً، {{ user().name }}!</p>
} @else {
  <a href="/login">تسجيل الدخول</a>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`,
    },
    { type: 'warning', text: 'القالب مكتوب بـ TypeScript بالكامل — أخطاء الخاصيات تُكتشف وقت البناء، لا وقت التشغيل. هذه من أقوى ميزات Angular.' },

    { type: 'heading', text: 'الأنماط (Styles)' },
    { type: 'paragraph', text: 'Angular يوفر ثلاثة مستويات للأنماط: أنماط عامة (styles.css)، أنماط محدودة نطاق المكوّن (افتراضي)، وShadow DOM حقيقي.' },
    {
      type: 'code',
      code: `/* styles.css — يُطبّق على كامل التطبيق */
:root {
  --color-primary: #dd0031;
}

/* في المكوّن — محدودة النطاق تلقائياً */
@Component({
  styles: [\`
    .card { border-radius: 8px; padding: 16px; }
    /* هذا النمط لن يؤثر على .card في مكوّنات أخرى */
  \`]
})`,
    },
    { type: 'tip', text: 'استخدم :host لتصميم عنصر المكوّن نفسه (علامة <app-card>). مثال: :host { display: block; margin-bottom: 16px; }' },

    { type: 'heading', text: 'المُحدِّدات (Selectors)' },
    { type: 'paragraph', text: 'المُحدِّد في @Component يحدد كيف تستخدم المكوّن في القوالب. Angular يدعم ثلاثة أنواع:' },
    {
      type: 'list',
      items: [
        'مُحدِّد العنصر (الأكثر شيوعاً): selector: "app-hero-card" → <app-hero-card />',
        'مُحدِّد الخاصية: selector: "[appHighlight]" → <div appHighlight>',
        'مُحدِّد الفئة: selector: ".card-widget" → <div class="card-widget"> (نادر)',
      ],
    },
    { type: 'tip', text: 'استخدم دائماً بادئة (app- أو اسم المشروع) لتجنب التعارض مع عناصر HTML القياسية.' },

    { type: 'heading', text: 'نظرة عامة على Data Binding' },
    { type: 'paragraph', text: 'Data Binding هو الطريقة التي يربط بها Angular فئة TypeScript بقالب HTML. أربعة أنواع:' },
    {
      type: 'list',
      items: [
        '{{ expr }} — استيفاء: من الفئة إلى القالب كنص',
        '[property]="expr" — Property Binding: من الفئة إلى القالب (DOM property)',
        '(event)="fn()" — Event Binding: من القالب إلى الفئة',
        '[(ngModel)]="val" — ربط ثنائي الاتجاه: في كلا الاتجاهين',
      ],
    },
    {
      type: 'qa',
      question: 'ما الفرق الرئيسي بين Angular v22 وإصدارات Angular القديمة من حيث هيكل Components؟',
      answer: 'في v22، Components standalone بالكامل — لا NgModule، لا zone.js. كل مكوّن يُعلن عن اعتمادياته مباشرةً في @Component، ويستخدم OnPush افتراضياً مع Signals للتفاعلية.',
    },
    {
      type: 'qa',
      question: 'ما الثلاثة أجزاء التي يتكون منها كل مكوّن Angular؟',
      answer: 'فئة TypeScript (المنطق والحالة)، قالب HTML (ما يراه المستخدم)، وأنماط CSS (التصميم المحدود نطاق المكوّن).',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'What is Angular?' },
    { type: 'paragraph', text: 'Angular is a complete, opinionated front-end framework built by Google. Unlike React (a library) or Vue (a progressive framework), Angular ships with everything you need: Router, Forms, HTTP Client, DI, and CLI — no library shopping required.' },
    { type: 'paragraph', text: 'Angular mental model: every Angular app is a tree of components. At the top sits AppComponent, and every piece of UI is a child component nested inside it — directly or through the router.' },
    { type: 'tip', text: 'Angular v22 in one sentence: a signal-first, zoneless, standalone-by-default framework where every new component uses OnPush and reacts to state changes through Signals.' },

    { type: 'heading', text: 'Components in Angular' },
    { type: 'paragraph', text: 'A component is the fundamental building block of Angular UI. Every component has three parts: a TypeScript class (logic and state), an HTML template (what the user sees), and CSS styles (scoped visual presentation).' },
    {
      type: 'code',
      code: `import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h1>Hello, {{ name() }}!</h1>
    <p>Welcome to Angular v22.</p>
  \`,
  styles: [\`h1 { color: #dd0031; }\`]
})
export class GreetingComponent {
  name = signal('Angular');
}`,
    },
    { type: 'tip', text: 'Notice signal() instead of a plain property — this is the Angular v22 way to manage reactive state.' },

    { type: 'heading', text: 'Standalone Components' },
    { type: 'paragraph', text: 'Before Angular v15, every component had to be declared inside an NgModule. In Angular v22, standalone is the only way — the component declares its own dependencies directly in the @Component decorator.' },
    {
      type: 'code',
      code: `@Component({
  selector: 'app-product-card',
  standalone: true,               // always true in v22
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe], // instead of NgModule
  template: \`
    <div class="card">
      <h2>{{ product().name }}</h2>
      <a [routerLink]="['/products', product().id]">View details</a>
    </div>
  \`
})
export class ProductCardComponent {
  product = signal({ id: 1, name: 'Angular v22 Book' });
}`,
    },

    { type: 'heading', text: 'Component Metadata' },
    { type: 'paragraph', text: 'The @Component decorator accepts a metadata object that configures how the component behaves. The most important fields:' },
    {
      type: 'code',
      code: `@Component({
  selector: 'app-user-card',       // Custom HTML tag
  standalone: true,                 // Always true in v22
  template: \`<p>Inline HTML</p>\`,  // or templateUrl for external file
  styles: [\`p { color: red; }\`],   // or styleUrl for external CSS
  imports: [RouterLink, DatePipe],  // components/directives/pipes used
  changeDetection: ChangeDetectionStrategy.OnPush,  // v22 default
})
export class UserCardComponent { ... }`,
    },

    { type: 'heading', text: 'Templates' },
    { type: 'paragraph', text: 'An Angular template is HTML enhanced with Angular\'s binding syntax. It compiles at build time to efficient DOM instructions — no virtual DOM diffing required.' },
    {
      type: 'code',
      code: `<!-- Interpolation: render value as text -->
<p>{{ title() }}</p>

<!-- Property binding: set a DOM property -->
<img [src]="imageUrl()" [alt]="imageAlt()" />

<!-- Event binding: call method on DOM events -->
<button (click)="handleClick()">Click me</button>

<!-- Control flow blocks -->
@if (isLoggedIn()) {
  <p>Welcome, {{ user().name }}!</p>
} @else {
  <a href="/login">Log in</a>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`,
    },
    { type: 'warning', text: 'Templates are strongly typed — accessing a property that doesn\'t exist on a Signal\'s value is a compile-time error, not a runtime crash. This is one of Angular\'s biggest advantages.' },

    { type: 'heading', text: 'Styles' },
    { type: 'paragraph', text: 'Angular provides three levels of styling: global styles (styles.css), component-scoped styles (default — Emulated encapsulation), and real Shadow DOM.' },
    {
      type: 'code',
      code: `/* styles.css — applied to the entire application */
:root {
  --color-primary: #dd0031;
}

/* Inside a component — automatically scoped */
@Component({
  styles: [\`
    .card { border-radius: 8px; padding: 16px; }
    /* This .card rule won't affect .card in other components */
  \`]
})`,
    },
    { type: 'tip', text: 'Use :host to style the component\'s own host element (the <app-card> tag itself). Example: :host { display: block; margin-bottom: 16px; }' },

    { type: 'heading', text: 'Selectors' },
    { type: 'paragraph', text: 'The selector in @Component determines how you use the component in templates. Angular supports three types:' },
    {
      type: 'list',
      items: [
        'Element selector (most common): selector: "app-hero-card" → <app-hero-card />',
        'Attribute selector: selector: "[appHighlight]" → <div appHighlight>',
        'Class selector: selector: ".card-widget" → <div class="card-widget"> (rare)',
      ],
    },
    { type: 'tip', text: 'Always use a prefix (app- or your project name) to avoid collisions with standard HTML elements.' },

    { type: 'heading', text: 'Data Binding Overview' },
    { type: 'paragraph', text: 'Data binding connects your TypeScript class to the HTML template. Four types:' },
    {
      type: 'list',
      items: [
        '{{ expr }} — Interpolation: class to template as text (read-only)',
        '[property]="expr" — Property binding: class to template (DOM property)',
        '(event)="fn()" — Event binding: template to class',
        '[(ngModel)]="val" — Two-way binding: both directions',
      ],
    },
    {
      type: 'qa',
      question: 'What is the main architectural difference between Angular v22 and older Angular versions?',
      answer: 'In v22, components are fully standalone — no NgModule, no zone.js. Every component declares its own dependencies directly in @Component, uses OnPush by default, and manages state with Signals for fine-grained reactivity.',
    },
    {
      type: 'qa',
      question: 'What are the three parts every Angular component is made of?',
      answer: 'A TypeScript class (logic and state), an HTML template (what the user sees), and CSS styles (visual presentation scoped to the component).',
    },
  ],
};
