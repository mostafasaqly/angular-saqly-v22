// Section 4 — Templates and Binding
export default {
  id: 4,
  title: 'Templates and Binding',
  titleEn: 'Templates and Binding',
  level: 'مبتدئ – متوسط',
  levelEn: 'Beginner–Intermediate',
  intro: 'هذا القسم يغوص عميقاً في كل آلية ربط في لغة قوالب Angular: Interpolation، Property Binding، Event Binding، Two-Way Binding، Template Reference Variables، Class Binding، Style Binding، وProperty Binding. بعد هذا القسم ستقدر تربط أي بيانات بأي جزء من واجهة المستخدم.',
  introEn: 'This section covers every binding mechanism in Angular\'s template language — interpolation, property binding, event binding, two-way binding, template reference variables, class binding, style binding, and attribute binding — with real examples and the rules that govern each one.',

  lessons: [
    'Interpolation {{ }}',
    'Property Binding [property]',
    'Event Binding (event)',
    'Two-Way Binding [( )]',
    'Template Reference Variables #ref',
    'Class Binding [class]',
    'Style Binding [style]',
    'Attribute Binding [attr]',
  ],
  lessonsEn: [
    'Interpolation {{ }}',
    'Property Binding [property]',
    'Event Binding (event)',
    'Two-Way Binding [( )]',
    'Template Reference Variables #ref',
    'Class Binding [class]',
    'Style Binding [style]',
    'Attribute Binding [attr]',
  ],

  content: [
    { type: 'heading', text: 'Interpolation {{ }} Interpolation' },
    { type: 'paragraph', text: 'Interpolation يُضمّن تعبير TypeScript في القالب كنص. الصياغة المزدوجة {{ }} تخبر Angular بتقييم التعبير وتحويل النتيجة إلى نص.' },
    {
      type: 'code',
      code: `@Component({
  template: \`
    <h1>{{ title() }}</h1>
    <p>العناصر: {{ items().length }} (مضاعف: {{ items().length * 2 }})</p>
    <p>الحالة: {{ isActive() ? 'نشط' : 'غير نشط' }}</p>
    <p>التاريخ: {{ today() | date:'longDate' }}</p>
  \`
})
export class ProfileComponent {
  title = signal('ملفي الشخصي');
  items = signal(['أنجولار', 'Signals', 'TypeScript']);
  isActive = signal(true);
  today = signal(new Date());
}`,
    },
    { type: 'warning', text: 'Interpolation interpolation للقراءة فقط — لا يمكنك التعيين (count = 5) ولا استخدام new ولا template literals داخله.' },

    { type: 'heading', text: 'Property Binding [property]' },
    { type: 'paragraph', text: 'Property Binding يُعيّن خاصية DOM لعنصر HTML أو مدخل (input) لمكوّن. الصياغة: [property]="expression"' },
    {
      type: 'code',
      code: `<!-- خصائص DOM -->
<img [src]="user().avatarUrl" [alt]="user().name" />
<button [disabled]="isLoading()">إرسال</button>
<input [value]="defaultValue()" />

<!-- مدخلات المكوّن -->
<app-user-card [user]="currentUser()" [showActions]="canEdit()" />`,
    },
    { type: 'tip', text: 'الفرق الحاسم: [src]="url" يُعيّن خاصية DOM (صحيح). src="{{ url }}" يُعيّن HTML attribute (قد يسبب وميضاً مؤقتاً). استخدم دائماً Property Binding للقيم الديناميكية.' },

    { type: 'heading', text: 'Event Binding (event)' },
    { type: 'paragraph', text: 'Event Binding يستمع لأحداث DOM ويستدعي دالة في الفئة عند وقوعها. الصياغة: (eventName)="handler($event)"' },
    {
      type: 'code',
      code: `<button (click)="save()">حفظ</button>
<input (keydown.enter)="submit()" (keydown.escape)="cancel()" />
<form (submit)="onSubmit($event)">...</form>

// في الفئة:
onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  this.searchTerm.set(value);
}`,
    },
    { type: 'tip', text: 'Angular يوفر فلترة اختصارية لأحداث لوحة المفاتيح: (keydown.enter)، (keydown.escape)، (keydown.ctrl.s). لا تحتاج لفحص event.key يدوياً.' },

    { type: 'heading', text: 'Two-Way Binding [( )]' },
    { type: 'paragraph', text: 'Two-Way Binding يجمع Property Binding وEvent Binding في صياغة مختصرة. يُسمّى "الموزة في الصندوق" بسبب شكل الأقواس [()].' },
    {
      type: 'code',
      code: `import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],   // مطلوب لـ ngModel
  template: \`
    <input [(ngModel)]="searchQuery" placeholder="البحث..." />
    <p>تبحث عن: {{ searchQuery }}</p>
  \`
})
export class SearchComponent {
  searchQuery = '';   // ngModel يعمل مع الخصائص العادية والـ signals
}`,
    },
    { type: 'tip', text: 'في Angular v22، استخدم Signal Forms للنماذج الحقيقية. استخدم ngModel فقط للربط الثنائي البسيط خارج Forms.' },

    { type: 'heading', text: 'Template Reference Variables #ref' },
    { type: 'paragraph', text: 'متغير مرجع القالب هو اسم مرجعي لعنصر أو مكوّن داخل القالب. تُعلنه بـ #name وتستخدمه في أي مكان آخر بنفس القالب.' },
    {
      type: 'code',
      code: `<!-- مرجع لعنصر DOM native -->
<input #searchInput type="text" placeholder="بحث..." />
<button (click)="search(searchInput.value)">بحث</button>
<button (click)="searchInput.focus()">تركيز</button>

<!-- مرجع لنسخة المكوّن -->
<app-datepicker #picker />
<button (click)="picker.open()">فتح التقويم</button>`,
    },

    { type: 'heading', text: 'Class Binding [class]' },
    { type: 'paragraph', text: 'Class Binding يُضيف أو يُزيل فئات CSS ديناميكياً على عنصر DOM.' },
    {
      type: 'code',
      code: `<!-- فئة واحدة: تُضاف عندما تكون الحالة true -->
<div [class.active]="isActive()">نشط</div>

<!-- عدة فئات دفعة واحدة: كائن (مفتاح=اسم الفئة، قيمة=شرط) -->
<button [class]="{ loading: isLoading(), error: hasError(), large: isLarge() }">
  إرسال
</button>

<!-- الفئات الثابتة والديناميكية تتعايش -->
<button class="btn btn--primary" [class.btn--loading]="loading()">
  حفظ
</button>`,
    },

    { type: 'heading', text: 'Style Binding [style]' },
    { type: 'paragraph', text: 'Style Binding يُعيّن أنماط CSS مضمّنة ديناميكياً.' },
    {
      type: 'code',
      code: `<!-- نمط واحد -->
<div [style.color]="textColor()">نص ملوّن</div>
<div [style.width.px]="widthPx()">عرض بالبكسل</div>
<div [style.opacity]="opacity()">شفافية 0-1</div>

<!-- عدة أنماط: كائن CSS -->
<div [style]="{ color: textColor(), fontSize: fontSize() + 'px' }">
  نص متعدد الأنماط
</div>`,
    },
    { type: 'tip', text: 'افضّل Class Binding على Style Binding للحالات المرئية (active, disabled, error). احتفظ بStyle Binding للقيم المحسوبة رقمياً (عرض، ارتفاع، شفافية).' },

    { type: 'heading', text: 'Attribute Binding [attr]' },
    { type: 'paragraph', text: 'بعض معاملات HTML لا تملك خاصية DOM مقابلة. لهذه الحالات، استخدم Attribute Binding بالبادئة attr.' },
    {
      type: 'code',
      code: `<!-- معاملات ARIA — لا خاصية DOM مقابلة -->
<button [attr.aria-label]="deleteLabel()">حذف</button>
<div [attr.aria-expanded]="isOpen()" [attr.aria-controls]="panelId">
  تبديل
</div>

<!-- data-* attributes -->
<li [attr.data-id]="item.id" [attr.data-category]="item.category">
  {{ item.name }}
</li>

<!-- إزالة معامل: اضبطه على null -->
<button [attr.aria-controls]="canEdit() ? panelId : null">تعديل</button>`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين [src]="url" و src="{{ url }}" وأيهما أفضل ولماذا؟',
      answer: '[src]="url" يُعيّن خاصية DOM مباشرةً — آمن ودقيق. src="{{ url }}" يُعيّن HTML attribute عبر دمج نص — قد يسبب وميضاً مؤقتاً حيث يحاول المتصفح تحميل "[object Object]" قبل أن يعمل Angular. استخدم دائماً [src] للقيم الديناميكية.',
    },
    {
      type: 'qa',
      question: 'متى تستخدم [attr.x] بدلاً من [x]؟',
      answer: 'استخدم [attr.x] عندما لا يكون للمعامل خاصية DOM مقابلة — أساساً: معاملات ARIA (aria-label، aria-expanded)، data-* attributes، colspan (مقابل colSpan)، ومعاملات SVG. استخدم [x] العادي لكل معامل له خاصية DOM مقابلة.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Interpolation {{ }}' },
    { type: 'paragraph', text: 'Interpolation embeds a TypeScript expression into a template as text. The double-curly-brace syntax {{ }} tells Angular\'s template compiler to evaluate the expression and convert the result to a string.' },
    {
      type: 'code',
      code: `@Component({
  template: \`
    <h1>{{ title() }}</h1>
    <p>Items: {{ items().length }} (doubled: {{ items().length * 2 }})</p>
    <p>Status: {{ isActive() ? 'Active' : 'Inactive' }}</p>
    <p>Date: {{ today() | date:'longDate' }}</p>
  \`
})
export class ProfileComponent {
  title = signal('My Profile');
  items = signal(['Angular', 'Signals', 'TypeScript']);
  isActive = signal(true);
  today = signal(new Date());
}`,
    },
    { type: 'warning', text: 'Interpolation is read-only — no assignment (count = 5), no new keyword, no template literals inside {{ }}.' },

    { type: 'heading', text: 'Property Binding [property]' },
    { type: 'paragraph', text: 'Property binding sets a DOM element\'s JavaScript property or a component\'s input to the value of a TypeScript expression. Syntax: [property]="expression"' },
    {
      type: 'code',
      code: `<!-- DOM properties -->
<img [src]="user().avatarUrl" [alt]="user().name" />
<button [disabled]="isLoading()">Submit</button>
<input [value]="defaultValue()" />

<!-- Component inputs -->
<app-user-card [user]="currentUser()" [showActions]="canEdit()" />`,
    },
    { type: 'tip', text: 'Key distinction: [src]="url" sets the DOM property (correct). src="{{ url }}" sets the HTML attribute (may cause a brief broken-image flash). Always use property binding for dynamic values.' },

    { type: 'heading', text: 'Event Binding (event)' },
    { type: 'paragraph', text: 'Event binding listens to DOM events and calls a class method when they fire. Syntax: (eventName)="handler($event)"' },
    {
      type: 'code',
      code: `<button (click)="save()">Save</button>
<input (keydown.enter)="submit()" (keydown.escape)="cancel()" />
<form (submit)="onSubmit($event)">...</form>

// In the class:
onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  this.searchTerm.set(value);
}`,
    },
    { type: 'tip', text: 'Angular provides keyboard event filters: (keydown.enter), (keydown.escape), (keydown.ctrl.s). No need to check event.key manually.' },

    { type: 'heading', text: 'Two-Way Binding [( )]' },
    { type: 'paragraph', text: 'Two-way binding combines property binding and event binding into one concise syntax. The "banana-in-a-box" [()] keeps a class property and a template input in sync in both directions.' },
    {
      type: 'code',
      code: `import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],   // REQUIRED for ngModel
  template: \`
    <input [(ngModel)]="searchQuery" placeholder="Search..." />
    <p>Searching for: {{ searchQuery }}</p>
  \`
})
export class SearchComponent {
  searchQuery = '';   // ngModel works with both plain props and signals
}`,
    },
    { type: 'tip', text: 'In Angular v22, use Signal Forms for real forms. Use ngModel only for simple two-way bindings outside of forms.' },

    { type: 'heading', text: 'Template Reference Variables #ref' },
    { type: 'paragraph', text: 'A template reference variable is a named reference to an element or component in the template. Declare with #name and use it anywhere else in the same template.' },
    {
      type: 'code',
      code: `<!-- Reference to a native DOM element -->
<input #searchInput type="text" placeholder="Search..." />
<button (click)="search(searchInput.value)">Search</button>
<button (click)="searchInput.focus()">Focus</button>

<!-- Reference to a component instance -->
<app-datepicker #picker />
<button (click)="picker.open()">Open Calendar</button>`,
    },

    { type: 'heading', text: 'Class Binding [class]' },
    { type: 'paragraph', text: 'Class binding conditionally adds or removes CSS classes on a DOM element based on a TypeScript expression.' },
    {
      type: 'code',
      code: `<!-- Single class: added when condition is true -->
<div [class.active]="isActive()">Active</div>

<!-- Multiple classes at once: object (key=class name, value=boolean) -->
<button [class]="{ loading: isLoading(), error: hasError(), large: isLarge() }">
  Submit
</button>

<!-- Static and dynamic classes coexist -->
<button class="btn btn--primary" [class.btn--loading]="loading()">
  Save
</button>`,
    },

    { type: 'heading', text: 'Style Binding [style]' },
    { type: 'paragraph', text: 'Style binding sets individual inline CSS styles or multiple styles dynamically.' },
    {
      type: 'code',
      code: `<!-- Single style -->
<div [style.color]="textColor()">Colored text</div>
<div [style.width.px]="widthPx()">Width in pixels</div>
<div [style.opacity]="opacity()">Opacity 0-1</div>

<!-- Multiple styles: CSS object -->
<div [style]="{ color: textColor(), fontSize: fontSize() + 'px' }">
  Multi-styled text
</div>`,
    },
    { type: 'tip', text: 'Prefer class binding over style binding for visual UI states (active, disabled, error). Reserve style binding for computed numeric values (width, height, opacity).' },

    { type: 'heading', text: 'Attribute Binding [attr]' },
    { type: 'paragraph', text: 'Some HTML attributes don\'t have a corresponding DOM property. For these, use attribute binding with the attr. prefix.' },
    {
      type: 'code',
      code: `<!-- ARIA attributes — no DOM property equivalent -->
<button [attr.aria-label]="deleteLabel()">Delete</button>
<div [attr.aria-expanded]="isOpen()" [attr.aria-controls]="panelId">
  Toggle
</div>

<!-- data-* attributes -->
<li [attr.data-id]="item.id" [attr.data-category]="item.category">
  {{ item.name }}
</li>

<!-- Remove an attribute: set to null -->
<button [attr.aria-controls]="canEdit() ? panelId : null">Edit</button>`,
    },
    {
      type: 'qa',
      question: 'What is the difference between [src]="url" and src="{{ url }}", and which is correct?',
      answer: '[src]="url" sets the DOM property directly — safe and correct. src="{{ url }}" sets the HTML attribute via string concatenation and may cause a brief broken-image flash where the browser tries to load "[object Object]" before Angular runs. Always use [src] for dynamic values.',
    },
    {
      type: 'qa',
      question: 'When should you use [attr.x] instead of [x]?',
      answer: 'Use [attr.x] when the attribute has no corresponding DOM JavaScript property — primarily ARIA attributes (aria-label, aria-expanded), data-* attributes, colspan (vs colSpan), and SVG attributes. Use plain [x] for any attribute that has a DOM property equivalent.',
    },
  ],
};
