// Section 9 — Directives and Pipes
export default {
  id: 9,
  title: 'Directives and Pipes',
  titleEn: 'Directives and Pipes',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'Directives تُضيف سلوكاً على عناصر DOM موجودة. Pipes تحوّل القيم في القوالب. هذا القسم يغطي Directives المدمجة (NgClass، NgStyle)، إنشاء موجّهات مخصصة (سمات وهيكلية)، وPipes المدمجة والمخصصة.',
  introEn: 'Directives add behavior to existing DOM elements. Pipes transform values in templates. This section covers built-in directives (NgClass, NgStyle), creating custom directives (attribute and structural), and built-in and custom pipes.',

  lessons: [
    'ما هي Directives؟',
    'Built-in Attribute Directives',
    'إنشاء Custom Attribute Directive',
    'Custom Structural Directives',
    'ما هي Pipes؟',
    'Built-in Pipes',
    'إنشاء Custom Pipe',
    'Pure vs Impure Pipes',
  ],
  lessonsEn: [
    'What are Directives?',
    'Built-in Attribute Directives',
    'Creating a Custom Attribute Directive',
    'Custom Structural Directives',
    'What are Pipes?',
    'Built-in Pipes',
    'Creating a Custom Pipe',
    'Pure vs Impure Pipes',
  ],

  content: [
    { type: 'heading', text: 'ما هي Directives؟' },
    { type: 'paragraph', text: 'الموجّه هو فئة TypeScript مزيّنة بـ @Directive تُضيف سلوكاً أو وظيفة لعنصر DOM أو مكوّن. لا تملك قالباً خاصاً — تُغيّر العنصر الذي تُطبَّق عليه.' },
    {
      type: 'list',
      items: [
        'موجّهات السمة (Attribute) — تُغيّر مظهر أو سلوك عنصر: NgClass، NgStyle، والمخصصة',
        'Structural Directives (Structural) — تُضيف أو تُزيل عناصر من DOM: *ngIf، *ngFor (الآن @if، @for)',
        'موجّهات المكوّن (Component) — Components نفسها هي نوع خاص من Directives',
      ],
    },

    { type: 'heading', text: 'Attribute Directives المدمجة' },
    {
      type: 'code',
      code: `import { NgClass, NgStyle } from '@angular/common';

@Component({
  imports: [NgClass, NgStyle],
  template: \`
    <!-- NgClass: إضافة/إزالة فئات CSS -->
    <div [ngClass]="{ active: isActive(), highlighted: isHighlighted() }">
      محتوى
    </div>

    <!-- NgStyle: أنماط CSS مضمّنة ديناميكية -->
    <div [ngStyle]="{ color: textColor(), 'font-size': fontSize() + 'px' }">
      نص ملوّن
    </div>
  \`
})
// ملاحظة: في v22، يُفضَّل استخدام [class] و[style] المباشرَين بدلاً من NgClass/NgStyle
// [class]="{ active: isActive() }" بدلاً من [ngClass]`,
    },

    { type: 'heading', text: 'إنشاء موجّه سمة مخصص' },
    {
      type: 'code',
      code: `import { Directive, ElementRef, HostListener, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlight]',   // يُطبَّق على أي عنصر بهذه السمة
  standalone: true,
})
export class HighlightDirective {
  appHighlight = input<string>('yellow');   // لون الإبراز — مدخل Signal

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      this.el.nativeElement.style.setProperty(
        '--highlight-color',
        this.appHighlight()
      );
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

// الاستخدام في القالب:
// <p appHighlight="lightblue">مرحباً بDirectives!</p>`,
    },

    { type: 'heading', text: 'ما هي Pipes؟' },
    { type: 'paragraph', text: 'الأنبوب هو دالة TypeScript مزيّنة بـ @Pipe تحوّل قيمة إلى تمثيل مختلف في القالب. تُستخدم بصياغة | في التعبيرات.' },
    {
      type: 'code',
      code: `<!-- صياغة الأنبوب: value | pipeName:arg1:arg2 -->
<p>{{ today() | date:'yyyy/MM/dd' }}</p>
<p>{{ price() | currency:'SAR':'symbol':'1.2-2' }}</p>
<p>{{ name() | uppercase }}</p>
<p>{{ text() | slice:0:100 }}</p>
<p>{{ longText() | slice:0:50 }}...</p>`,
    },

    { type: 'heading', text: 'Pipes المدمجة' },
    {
      type: 'list',
      items: [
        'DatePipe — | date:"yyyy-MM-dd" — تنسيق التواريخ',
        'CurrencyPipe — | currency:"USD" — تنسيق العملات',
        'DecimalPipe — | number:"1.2-2" — تنسيق الأرقام',
        'UpperCasePipe — | uppercase — تحويل للحروف الكبيرة',
        'LowerCasePipe — | lowercase — تحويل للحروف الصغيرة',
        'TitleCasePipe — | titlecase — أول حرف كبير لكل كلمة',
        'SlicePipe — | slice:0:10 — تقطيع المصفوفات والنصوص',
        'JsonPipe — | json — تحويل كائن إلى JSON للعرض (للتطوير)',
        'AsyncPipe — | async — الاشتراك في Observable / Promise',
        'KeyValuePipe — | keyvalue — تحويل كائن إلى مصفوفة [{key, value}]',
      ],
    },

    { type: 'heading', text: 'إنشاء أنبوب مخصص' },
    {
      type: 'code',
      code: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true,   // الافتراضي — يُحسب فقط عند تغيير المدخل
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 50, suffix: string = '...'): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength) + suffix;
  }
}

// الاستخدام:
// <p>{{ longText() | truncate:100:'...' }}</p>
// <p>{{ title() | truncate }}</p>  ← يستخدم القيمة الافتراضية 50`,
    },

    { type: 'heading', text: 'Pure Pipes مقابل غير النقية' },
    {
      type: 'list',
      items: [
        'الأنبوب النقي (pure: true، الافتراضي): يُحسب فقط عند تغيير مرجعية المدخل — Performance ممتاز',
        'الأنبوب غير النقي (pure: false): يُحسب في كل دورة تغيير — استخدم بحذر شديد',
        'AsyncPipe هو مثال على أنبوب غير نقي — يحتاج التحقق من كل دورة',
        'إذا كنت تحتاج لتحويل مصفوفة تتغير محتوياتها، استخدم computed() بدلاً من أنبوب غير نقي',
      ],
    },
    {
      type: 'qa',
      question: 'ما الفرق بين الموجّه (Directive) والمكوّن (Component)؟',
      answer: 'المكوّن يمتلك قالب HTML خاص به — يُنشئ واجهة مستخدم. الموجّه لا يملك قالباً — يُضيف سلوكاً أو تحويلاً لعنصر DOM موجود. من الناحية التقنية، المكوّن هو موجّه مع قالب.',
    },
    {
      type: 'qa',
      question: 'متى يُعيد Angular حساب الأنبوب النقي (pure pipe)؟',
      answer: 'فقط عند تغيير مرجعية المدخل (للأنواع البدائية: تغيير القيمة. للكائنات والمصفوفات: مرجعية جديدة). لهذا يجب استخدام .update() مع المصفوفات بدلاً من .push() — وإلا لن يُحسب الأنبوب من جديد.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'What are Directives?' },
    { type: 'paragraph', text: 'A directive is a TypeScript class decorated with @Directive that adds behavior or functionality to an existing DOM element or component. It has no template of its own — it modifies the element it\'s applied to.' },
    {
      type: 'list',
      items: [
        'Attribute directives — change appearance or behavior: NgClass, NgStyle, and custom ones',
        'Structural directives — add or remove DOM elements: *ngIf, *ngFor (now @if, @for)',
        'Component directives — components themselves are a special type of directive with a template',
      ],
    },

    { type: 'heading', text: 'Built-in Attribute Directives' },
    {
      type: 'code',
      code: `import { NgClass, NgStyle } from '@angular/common';

@Component({
  imports: [NgClass, NgStyle],
  template: \`
    <!-- NgClass: conditionally add/remove CSS classes -->
    <div [ngClass]="{ active: isActive(), highlighted: isHighlighted() }">
      Content
    </div>

    <!-- NgStyle: dynamic inline CSS styles -->
    <div [ngStyle]="{ color: textColor(), 'font-size': fontSize() + 'px' }">
      Styled text
    </div>
  \`
})
// Note: In v22, prefer direct [class] and [style] bindings over NgClass/NgStyle
// [class]="{ active: isActive() }" instead of [ngClass]`,
    },

    { type: 'heading', text: 'Creating a Custom Attribute Directive' },
    {
      type: 'code',
      code: `import { Directive, ElementRef, HostListener, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlight]',   // applied to any element with this attribute
  standalone: true,
})
export class HighlightDirective {
  appHighlight = input<string>('yellow');   // highlight color — signal input

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      this.el.nativeElement.style.setProperty(
        '--highlight-color',
        this.appHighlight()
      );
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

// Usage in template:
// <p appHighlight="lightblue">Hello Directives!</p>`,
    },

    { type: 'heading', text: 'What are Pipes?' },
    { type: 'paragraph', text: 'A pipe is a TypeScript class decorated with @Pipe that transforms a value into a different representation in templates. Used with the | syntax in expressions.' },
    {
      type: 'code',
      code: `<!-- Pipe syntax: value | pipeName:arg1:arg2 -->
<p>{{ today() | date:'yyyy/MM/dd' }}</p>
<p>{{ price() | currency:'USD':'symbol':'1.2-2' }}</p>
<p>{{ name() | uppercase }}</p>
<p>{{ text() | slice:0:100 }}</p>`,
    },

    { type: 'heading', text: 'Built-in Pipes' },
    {
      type: 'list',
      items: [
        'DatePipe — | date:"yyyy-MM-dd" — format dates',
        'CurrencyPipe — | currency:"USD" — format currency',
        'DecimalPipe — | number:"1.2-2" — format numbers',
        'UpperCasePipe — | uppercase — convert to uppercase',
        'LowerCasePipe — | lowercase — convert to lowercase',
        'TitleCasePipe — | titlecase — first letter uppercase per word',
        'SlicePipe — | slice:0:10 — slice arrays or strings',
        'JsonPipe — | json — object to JSON string (for debugging)',
        'AsyncPipe — | async — subscribe to Observable / Promise',
        'KeyValuePipe — | keyvalue — convert object to [{key, value}] array',
      ],
    },

    { type: 'heading', text: 'Creating a Custom Pipe' },
    {
      type: 'code',
      code: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true,   // default — only recomputes when input reference changes
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 50, suffix: string = '...'): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength) + suffix;
  }
}

// Usage:
// <p>{{ longText() | truncate:100:'...' }}</p>
// <p>{{ title() | truncate }}</p>  ← uses default of 50`,
    },

    { type: 'heading', text: 'Pure vs Impure Pipes' },
    {
      type: 'list',
      items: [
        'Pure pipe (pure: true, default): only recomputes when the input reference changes — great performance',
        'Impure pipe (pure: false): recomputes every change detection cycle — use sparingly',
        'AsyncPipe is an example of an impure pipe — it needs to check every cycle for new emissions',
        'If you need to transform an array whose contents change, use computed() instead of an impure pipe',
      ],
    },
    {
      type: 'qa',
      question: 'What is the difference between a Directive and a Component?',
      answer: 'A Component has its own HTML template — it creates UI. A Directive has no template — it adds behavior or transformation to an existing DOM element. Technically, a Component is a Directive with a template.',
    },
    {
      type: 'qa',
      question: 'When does Angular recompute a pure pipe?',
      answer: 'Only when the input reference changes (for primitives: value change; for objects/arrays: new reference). This is why you must use .update(arr => [...arr, item]) with arrays instead of .push() — otherwise the pipe won\'t recompute.',
    },
  ],
};
