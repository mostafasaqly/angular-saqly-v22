// Section 17 — UI, Styling, and Accessibility
export default {
  id: 17,
  title: 'واجهة المستخدم، التصميم، وإمكانية الوصول',
  titleEn: 'UI, Styling, and Accessibility',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'هذا القسم يغطي كيفية بناء واجهات جميلة وقابلة للوصول في Angular v22: تضمين التصميم في المكوّن، CSS Variables للسمات، Angular Material v3، استراتيجيات تغيير القيم، وأفضل ممارسات إمكانية الوصول (a11y).',
  introEn: 'This section covers how to build beautiful, accessible UIs in Angular v22: encapsulating styles in components, CSS variables for theming, Angular Material v3, change detection strategies, and accessibility (a11y) best practices.',

  lessons: [
    'تضمين التصميم في المكوّن',
    'CSS Variables والسمات الديناميكية',
    'Angular Material v3',
    'استراتيجية OnPush وتحسين الأداء',
    'الأنماط الشرطية (Dynamic Classes)',
    'أنيماشن Angular',
    'إمكانية الوصول (a11y)',
    'دعم RTL والتدويل',
  ],
  lessonsEn: [
    'Component Style Encapsulation',
    'CSS Variables and Dynamic Theming',
    'Angular Material v3',
    'OnPush Strategy and Performance',
    'Dynamic Classes and Styles',
    'Angular Animations',
    'Accessibility (a11y)',
    'RTL Support and Internationalization',
  ],

  content: [
    { type: 'heading', text: 'تضمين التصميم في المكوّن' },
    { type: 'paragraph', text: 'Angular يُضمّن تصميم المكوّن بشكل افتراضي (Emulated ViewEncapsulation) — الأنماط لا تتسرب للمكوّنات الأخرى.' },
    {
      type: 'code',
      code: `import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  // Emulated (الافتراضي): يُضيف سمات فريدة للـ CSS selector
  // None: لا تضمين — الأنماط عالمية
  // ShadowDom: Web Components Shadow DOM حقيقي
  encapsulation: ViewEncapsulation.Emulated,
  styles: [\`
    :host {
      display: block;
      border-radius: 8px;
      padding: 16px;
      box-shadow: var(--shadow-md);
    }

    :host(.featured) {
      border: 2px solid var(--color-primary);
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
    }
  \`],
  template: \`
    <h3 class="title">{{ title }}</h3>
    <ng-content />
  \`,
})
export class CardComponent {
  title = input.required<string>();
}`,
    },

    { type: 'heading', text: 'CSS Variables والسمات الديناميكية' },
    {
      type: 'code',
      code: `/* styles.css — المتغيرات العالمية */
:root {
  --color-primary:   #6366f1;
  --color-bg:        #ffffff;
  --color-text:      #1e293b;
  --color-surface:   #f8fafc;
  --shadow-md:       0 4px 6px -1px rgb(0 0 0 / 0.1);
  --border-radius:   8px;
}

[data-theme="dark"] {
  --color-bg:      #0f172a;
  --color-text:    #f1f5f9;
  --color-surface: #1e293b;
}

/* في Angular — تطبيق السمة ديناميكياً */
// في ThemeStore.service.ts:
effect(() => {
  const theme = this._theme();
  document.documentElement.setAttribute('data-theme', theme);
});`,
    },
    { type: 'tip', text: 'استخدم CSS Variables بدلاً من تعريف صفوف .dark-mode على كل عنصر. بتغيير سمة data-theme على :root يتغير المظهر بالكامل فوراً.' },

    { type: 'heading', text: 'الأنماط الشرطية (Dynamic Classes)' },
    {
      type: 'code',
      code: `@Component({
  template: \`
    <!-- ربط صف واحد -->
    <div [class.active]="isActive()">محتوى</div>

    <!-- ربط كائن من الصفوف -->
    <button
      [ngClass]="{
        'btn-primary': isPrimary(),
        'btn-disabled': isDisabled(),
        'btn-lg': size() === 'large'
      }"
    >زر</button>

    <!-- ربط الأنماط المضمّنة -->
    <div
      [style.background-color]="color()"
      [style.font-size.px]="fontSize()"
    ></div>

    <!-- كائن أنماط -->
    <div [ngStyle]="{ color: textColor(), opacity: opacity() }"></div>
  \`
})
export class DemoComponent {
  isActive   = signal(false);
  isPrimary  = signal(true);
  isDisabled = signal(false);
  size       = signal<'small' | 'medium' | 'large'>('medium');
  color      = signal('#6366f1');
  fontSize   = signal(16);
  textColor  = signal('red');
  opacity    = signal(0.8);
}`,
    },

    { type: 'heading', text: 'إمكانية الوصول (a11y)' },
    {
      type: 'list',
      items: [
        'استخدم عناصر HTML الدلالية: <button> وليس <div> قابل للنقر',
        'أضف aria-label للعناصر التفاعلية بدون نص واضح (الأيقونات)',
        'أضف role="alert" للرسائل الديناميكية التي تحتاج قراءة من قِبل screen readers',
        'aria-live="polite" — يُعلن التغيير عند انتهاء المستخدم من القراءة',
        'aria-expanded وaria-controls للقوائم المنسدلة والأكورديون',
        'تأكد أن tabIndex صحيح — العناصر التفاعلية يجب أن تكون في ترتيب المنطقي',
        'لا تُزيل outline على :focus — استبدله بتصميم مخصص لكن لا تُخفيه',
      ],
    },
    {
      type: 'code',
      code: `@Component({
  template: \`
    <!-- زر مع نص مخفي للـ screen readers -->
    <button (click)="close()" aria-label="إغلاق النافذة">
      <svg>...</svg>
    </button>

    <!-- تنبيه ديناميكي — screen reader يقرأه تلقائياً -->
    @if (error()) {
      <div role="alert" aria-live="assertive" class="error">
        {{ error() }}
      </div>
    }

    <!-- قائمة منسدلة قابلة للوصول -->
    <button
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="'dropdown-' + id"
      (click)="toggle()"
    >القائمة</button>

    <ul [id]="'dropdown-' + id" [hidden]="!isOpen()">
      @for (item of items(); track item.id) {
        <li><a [href]="item.url">{{ item.label }}</a></li>
      }
    </ul>
  \`
})
export class AccessibleMenuComponent { ... }`,
    },

    { type: 'heading', text: 'دعم RTL' },
    {
      type: 'code',
      code: `/* CSS منطقي — يعمل مع كل من RTL وLTR */
.card {
  /* بدلاً من margin-left / margin-right */
  margin-inline-start: 16px;  /* يسار في LTR، يمين في RTL */
  margin-inline-end:   16px;

  /* بدلاً من padding-left / padding-right */
  padding-inline: 24px;
  padding-block:  16px;

  /* بدلاً من border-left */
  border-inline-start: 3px solid var(--color-primary);

  /* بدلاً من text-align: left */
  text-align: start;
}

/* في HTML */
/* <html dir="rtl" lang="ar"> أو <html dir="ltr" lang="en"> */`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين ViewEncapsulation.Emulated وViewEncapsulation.None؟',
      answer: 'Emulated (الافتراضي): Angular يُضيف سمات فريدة للعناصر والـ CSS selectors لضمان أن الأنماط تنطبق فقط على هذا المكوّن. None: لا تضمين — الأنماط تصبح عالمية وقد تتعارض مع مكوّنات أخرى. استخدم None فقط إذا كنت تريد تصميم عالمي لمكوّن جذري مثل app-root.',
    },
    {
      type: 'qa',
      question: 'لماذا نفضّل CSS منطقي (logical CSS) مثل margin-inline-start بدلاً من margin-left؟',
      answer: 'لأن CSS المنطقي يتكيف تلقائياً مع اتجاه الكتابة. margin-inline-start يعني "يسار في اتجاه LTR" و"يمين في اتجاه RTL" — تكتب الكود مرة واحدة ويعمل في كلا الاتجاهين دون شرط @if أو dir.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Component Style Encapsulation' },
    { type: 'paragraph', text: 'Angular encapsulates component styles by default (Emulated ViewEncapsulation) — styles do not leak to other components.' },
    {
      type: 'code',
      code: `import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  // Emulated (default): Angular adds unique attributes to CSS selectors
  // None: no encapsulation — styles become global
  // ShadowDom: real Web Components Shadow DOM
  encapsulation: ViewEncapsulation.Emulated,
  styles: [\`
    :host {
      display: block;
      border-radius: 8px;
      padding: 16px;
      box-shadow: var(--shadow-md);
    }

    :host(.featured) {
      border: 2px solid var(--color-primary);
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
    }
  \`],
  template: \`<h3 class="title">{{ title }}</h3><ng-content />\`,
})
export class CardComponent {
  title = input.required<string>();
}`,
    },

    { type: 'heading', text: 'CSS Variables and Dynamic Theming' },
    {
      type: 'code',
      code: `/* styles.css — global variables */
:root {
  --color-primary:   #6366f1;
  --color-bg:        #ffffff;
  --color-text:      #1e293b;
  --color-surface:   #f8fafc;
  --shadow-md:       0 4px 6px -1px rgb(0 0 0 / 0.1);
}

[data-theme="dark"] {
  --color-bg:      #0f172a;
  --color-text:    #f1f5f9;
  --color-surface: #1e293b;
}

/* In Angular — apply theme dynamically from ThemeStore */
effect(() => {
  const theme = this._theme();
  document.documentElement.setAttribute('data-theme', theme);
});`,
    },
    { type: 'tip', text: 'Use CSS Variables instead of adding .dark-mode classes to every element. Changing data-theme on :root instantly switches the entire theme.' },

    { type: 'heading', text: 'Dynamic Classes and Styles' },
    {
      type: 'code',
      code: `@Component({
  template: \`
    <!-- Single class binding -->
    <div [class.active]="isActive()">Content</div>

    <!-- Object of classes -->
    <button
      [ngClass]="{
        'btn-primary':  isPrimary(),
        'btn-disabled': isDisabled(),
        'btn-lg':       size() === 'large'
      }"
    >Button</button>

    <!-- Inline style binding -->
    <div
      [style.background-color]="color()"
      [style.font-size.px]="fontSize()"
    ></div>
  \`
})
export class DemoComponent {
  isActive   = signal(false);
  isPrimary  = signal(true);
  isDisabled = signal(false);
  size       = signal<'small' | 'medium' | 'large'>('medium');
  color      = signal('#6366f1');
  fontSize   = signal(16);
}`,
    },

    { type: 'heading', text: 'Accessibility (a11y)' },
    {
      type: 'list',
      items: [
        'Use semantic HTML elements: <button> not a clickable <div>',
        'Add aria-label to interactive elements without visible text (icons)',
        'Add role="alert" to dynamic messages that need to be read by screen readers',
        'aria-live="polite" — announces changes when the user finishes their current task',
        'aria-expanded and aria-controls for dropdowns and accordions',
        'Ensure correct tabIndex — interactive elements must follow logical tab order',
        'Never remove :focus outline — replace it with a custom style but never hide it',
      ],
    },
    {
      type: 'code',
      code: `@Component({
  template: \`
    <!-- Button with hidden text for screen readers -->
    <button (click)="close()" aria-label="Close dialog">
      <svg>...</svg>
    </button>

    <!-- Dynamic alert — screen reader reads it automatically -->
    @if (error()) {
      <div role="alert" aria-live="assertive" class="error">
        {{ error() }}
      </div>
    }

    <!-- Accessible dropdown -->
    <button
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="'dropdown-' + id"
      (click)="toggle()"
    >Menu</button>

    <ul [id]="'dropdown-' + id" [hidden]="!isOpen()">
      @for (item of items(); track item.id) {
        <li><a [href]="item.url">{{ item.label }}</a></li>
      }
    </ul>
  \`
})
export class AccessibleMenuComponent { ... }`,
    },

    { type: 'heading', text: 'RTL Support' },
    {
      type: 'code',
      code: `/* Logical CSS — works with both RTL and LTR */
.card {
  /* Instead of margin-left / margin-right */
  margin-inline-start: 16px;  /* left in LTR, right in RTL */
  margin-inline-end:   16px;

  /* Instead of padding-left / padding-right */
  padding-inline: 24px;
  padding-block:  16px;

  /* Instead of border-left */
  border-inline-start: 3px solid var(--color-primary);

  /* Instead of text-align: left */
  text-align: start;
}

/* In HTML */
/* <html dir="rtl" lang="ar"> or <html dir="ltr" lang="en"> */`,
    },
    {
      type: 'qa',
      question: 'What is the difference between ViewEncapsulation.Emulated and ViewEncapsulation.None?',
      answer: 'Emulated (default): Angular adds unique attributes to elements and CSS selectors, ensuring styles only apply to this component. None: no encapsulation — styles become global and may conflict with other components. Only use None for a root component like app-root that intentionally provides global styles.',
    },
    {
      type: 'qa',
      question: 'Why prefer logical CSS (margin-inline-start) over margin-left?',
      answer: 'Logical CSS automatically adapts to writing direction. margin-inline-start means "left in LTR" and "right in RTL" — you write the code once and it works in both directions without @if conditions or dir checks.',
    },
  ],
};
