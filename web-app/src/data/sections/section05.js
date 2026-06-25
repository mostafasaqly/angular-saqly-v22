// Section 5 — Control Flow in Angular
export default {
  id: 5,
  title: 'Control Flow في Angular',
  titleEn: 'Control Flow in Angular',
  level: 'مبتدئ – متوسط',
  levelEn: 'Beginner–Intermediate',
  intro: 'Angular v17 استبدل Structural Directives القديمة (*ngIf، *ngFor، *ngSwitch) بصياغة تحكم مبنية على كتل مباشرة في القالب. الصياغة الجديدة أكثر قابلية للقراءة، وأسرع (المترجم يُحسّنها ثابتياً)، ولا تحتاج لأي استيرادات.',
  introEn: 'Angular v17 replaced old structural directives (*ngIf, *ngFor, *ngSwitch) with built-in block-based control flow syntax that lives directly in the template. The new syntax is more readable, faster (the compiler can optimize it statically), and requires no imports.',

  lessons: [
    'مقدمة لـ Control Flow في Angular',
    '@if — Conditional Rendering',
    '@else و @else if',
    '@for — Iteration',
    'track في @for',
    '@empty — Empty State',
    '@switch — Switch Statement',
    'الترحيل من *ngIf و *ngFor',
  ],
  lessonsEn: [
    'Introduction to Angular Control Flow',
    '@if — Conditional Rendering',
    '@else and @else if',
    '@for — Iteration',
    'track in @for',
    '@empty — Empty State',
    '@switch — Switch Statement',
    'Migrating from *ngIf and *ngFor',
  ],

  content: [
    { type: 'heading', text: 'مقدمة للتحكم في تدفق Angular' },
    { type: 'paragraph', text: 'قبل Angular v17، كان التحكم الشرطي وتكرار القوائم يتطلبان موجّهات هيكلية خاصة تبدأ بـ *. الصياغة الجديدة تُزيل كل ذلك.' },
    {
      type: 'code',
      code: `<!-- الطريقة القديمة (لا تزال تعمل لكن غير مشجّعة) -->
<div *ngIf="isLoggedIn">مرحباً!</div>
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>

<!-- الطريقة الجديدة (v17+، إلزامية في v22) -->
@if (isLoggedIn()) {
  <div>مرحباً!</div>
}
@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`,
    },
    {
      type: 'list',
      items: [
        'لا يوجد استيراد مطلوب — الصياغة مدمجة في المترجم',
        'تحليل ثابت أفضل من المترجم',
        'تضييق أنواع TypeScript الكامل داخل الكتل',
        'دعم @empty مدمج (لا يحتاج لـ *ngIf منفصل)',
      ],
    },

    { type: 'heading', text: '@if — التحكم الشرطي' },
    { type: 'paragraph', text: '@if يُصيّر محتواه عندما يكون الشرط صحيحاً (truthy).' },
    {
      type: 'code',
      code: `@if (isLoggedIn()) {
  <div class="banner">مرحباً، {{ username() }}!</div>
}

@if (items().length > 0) {
  <p>لديك {{ items().length }} عنصر</p>
}

@if (product()?.inStock) {
  <button>أضف للسلة</button>
}`,
    },
    { type: 'tip', text: '@if يُضيّق أنواع TypeScript داخل الكتلة تماماً مثل جملة if العادية. إذا كان النوع User | null، فداخل @if سيعرفه Angular كـ User.' },

    { type: 'heading', text: '@else و @else if' },
    { type: 'paragraph', text: 'استخدم @else if لسلسلة الشروط و @else كحالة احتياطية.' },
    {
      type: 'code',
      code: `@if (status() === 'loading') {
  <app-spinner />
} @else if (status() === 'error') {
  <app-error-message [message]="errorMessage()" />
} @else if (status() === 'empty') {
  <p>لا توجد نتائج.</p>
} @else {
  <app-results [data]="results()" />
}`,
    },

    { type: 'heading', text: '@for — التكرار' },
    { type: 'paragraph', text: '@for يكرر عبر مصفوفة (أو أي iterable) ويُصيّر كتلة القالب لكل عنصر.' },
    {
      type: 'code',
      code: `@for (product of products(); track product.id) {
  <div class="card">{{ product.name }}</div>
}

<!-- متغيرات السياق المتاحة -->
@for (item of items(); track item.id; let i = $index, last = $last) {
  <div [class.last]="last">
    {{ i + 1 }}. {{ item.name }}
  </div>
}`,
    },
    {
      type: 'list',
      items: [
        '$index — الفهرس (يبدأ من 0)',
        '$first — true للعنصر الأول',
        '$last — true للعنصر الأخير',
        '$even — true عندما يكون $index زوجياً',
        '$odd — true عندما يكون $index فردياً',
        '$count — إجمالي عدد العناصر',
      ],
    },

    { type: 'heading', text: 'track في @for' },
    { type: 'paragraph', text: 'track يُخبر Angular كيف يُعرّف كل عنصر عبر إعادات الرسم. إنه مطلوب في @for (اختياري كان في *ngFor). بدونه يعيد Angular إنشاء كل عقد DOM مع كل تغيير.' },
    {
      type: 'code',
      code: `<!-- سيء: track بالفهرس — يُعيد إنشاء العناصر عند إعادة الترتيب -->
@for (item of items(); track $index) { ... }

<!-- جيد: track بمعرّف مستقر -->
@for (item of items(); track item.id) { ... }

<!-- إذا لم يكن للعناصر id، استخدم حقلاً فريداً آخر -->
@for (user of users(); track user.email) { ... }`,
    },

    { type: 'heading', text: '@empty — الحالة الفارغة' },
    { type: 'paragraph', text: '@empty هو كتلة اختيارية داخل @for تُصيّر عندما تكون المصفوفة فارغة. يستبدل نمط *ngIf="items.length === 0" الشائع.' },
    {
      type: 'code',
      code: `@for (item of cartItems(); track item.id) {
  <app-cart-item [item]="item" />
} @empty {
  <p class="empty-state">سلتك فارغة. <a routerLink="/shop">تسوّق الآن</a></p>
}`,
    },

    { type: 'heading', text: '@switch — التبديل' },
    { type: 'paragraph', text: '@switch يُصيّر أحد الفروع بناءً على قيمة — مكافئ لجملة switch في JavaScript.' },
    {
      type: 'code',
      code: `@switch (order().status) {
  @case ('pending') {
    <span class="badge badge-yellow">في الانتظار</span>
  }
  @case ('processing') {
    <span class="badge badge-blue">قيد المعالجة</span>
  }
  @case ('shipped') {
    <span class="badge badge-purple">تم الشحن</span>
  }
  @case ('delivered') {
    <span class="badge badge-green">تم التسليم</span>
  }
  @default {
    <span class="badge badge-gray">غير معروف</span>
  }
}`,
    },
    { type: 'tip', text: 'استخدم @switch عندما تقارن متغيراً واحداً بعدة قيم ثابتة. استخدم @if / @else if عندما لكل فرع شرط مختلف.' },

    { type: 'heading', text: 'الترحيل من *ngIf و *ngFor' },
    { type: 'paragraph', text: 'Angular يوفر schematic آلياً لترحيل القوالب القديمة.' },
    {
      type: 'code',
      code: `# أمر الترحيل التلقائي
ng generate @angular/core:control-flow

# مرجع يدوي:
# *ngIf="cond"                  →  @if (cond) { }
# *ngIf="cond; else tpl"        →  @if (cond) { } @else { }
# *ngFor="let x of arr"         →  @for (x of arr; track x.id) { }
# *ngSwitch + *ngSwitchCase     →  @switch + @case`,
    },
    {
      type: 'qa',
      question: 'ما الفرق الرئيسي بين @for و *ngFor فيما يخص التتبع (tracking)؟',
      answer: 'في @for، track مطلوب. في *ngFor، كان trackBy اختيارياً (وإن كان موصى به). مترجم Angular يُجبر التتبع في @for لمنع أخطاء Performance غير المقصودة.',
    },
    {
      type: 'qa',
      question: 'ماذا يستبدل @empty في الأسلوب القديم؟',
      answer: 'يستبدل نمط استخدام *ngIf="items.length === 0" بجانب *ngFor منفصلاً. مع @empty، حالة الفراغ موجودة مع الحلقة مباشرةً مما يجعل القالب أكثر قابلية للقراءة وأقل عرضة للأخطاء.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Introduction to Angular Control Flow' },
    { type: 'paragraph', text: 'Before Angular v17, conditional and list rendering required structural directives — special attributes prefixed with * that were syntactic sugar over <ng-template>. The new block syntax removes all of that.' },
    {
      type: 'code',
      code: `<!-- Old way (still works but discouraged) -->
<div *ngIf="isLoggedIn">Welcome!</div>
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>

<!-- New way (v17+, required in v22) -->
@if (isLoggedIn()) {
  <div>Welcome!</div>
}
@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}`,
    },
    {
      type: 'list',
      items: [
        'No imports required — syntax is built into the compiler',
        'Better static analysis by the compiler',
        'Full TypeScript type narrowing inside blocks',
        'Built-in @empty support (no separate *ngIf needed)',
      ],
    },

    { type: 'heading', text: '@if — Conditional Rendering' },
    { type: 'paragraph', text: '@if renders its content when the condition is truthy.' },
    {
      type: 'code',
      code: `@if (isLoggedIn()) {
  <div class="banner">Welcome, {{ username() }}!</div>
}

@if (items().length > 0) {
  <p>You have {{ items().length }} items</p>
}

@if (product()?.inStock) {
  <button>Add to Cart</button>
}`,
    },
    { type: 'tip', text: '@if narrows TypeScript types inside the block just like a regular if statement. If a type is User | null, inside @if Angular knows it as User.' },

    { type: 'heading', text: '@else and @else if' },
    { type: 'paragraph', text: 'Chain conditions with @else if and provide a fallback with @else.' },
    {
      type: 'code',
      code: `@if (status() === 'loading') {
  <app-spinner />
} @else if (status() === 'error') {
  <app-error-message [message]="errorMessage()" />
} @else if (status() === 'empty') {
  <p>No results found.</p>
} @else {
  <app-results [data]="results()" />
}`,
    },

    { type: 'heading', text: '@for — Iteration' },
    { type: 'paragraph', text: '@for iterates over an array (or any iterable) and renders the template block for each item.' },
    {
      type: 'code',
      code: `@for (product of products(); track product.id) {
  <div class="card">{{ product.name }}</div>
}

<!-- Available context variables -->
@for (item of items(); track item.id; let i = $index, last = $last) {
  <div [class.last]="last">
    {{ i + 1 }}. {{ item.name }}
  </div>
}`,
    },
    {
      type: 'list',
      items: [
        '$index — zero-based index of current item',
        '$first — true for the first item',
        '$last — true for the last item',
        '$even — true when $index is even',
        '$odd — true when $index is odd',
        '$count — total number of items',
      ],
    },

    { type: 'heading', text: 'track in @for' },
    { type: 'paragraph', text: 'track tells Angular how to identify each item across re-renders. It is REQUIRED in @for (was optional in *ngFor). Without it, Angular re-creates all DOM nodes on every change.' },
    {
      type: 'code',
      code: `<!-- BAD: track by index — re-creates items on reorder -->
@for (item of items(); track $index) { ... }

<!-- GOOD: track by stable unique ID -->
@for (item of items(); track item.id) { ... }

<!-- If items have no id, use another unique field -->
@for (user of users(); track user.email) { ... }`,
    },

    { type: 'heading', text: '@empty — Empty State' },
    { type: 'paragraph', text: '@empty is an optional block inside @for that renders when the iterable is empty. It replaces the common *ngIf="items.length === 0" pattern.' },
    {
      type: 'code',
      code: `@for (item of cartItems(); track item.id) {
  <app-cart-item [item]="item" />
} @empty {
  <p class="empty-state">Your cart is empty. <a routerLink="/shop">Start shopping</a></p>
}`,
    },

    { type: 'heading', text: '@switch — Switch Statement' },
    { type: 'paragraph', text: '@switch renders one of several branches based on a value — equivalent to a JavaScript switch statement.' },
    {
      type: 'code',
      code: `@switch (order().status) {
  @case ('pending') {
    <span class="badge badge-yellow">Pending</span>
  }
  @case ('processing') {
    <span class="badge badge-blue">Processing</span>
  }
  @case ('shipped') {
    <span class="badge badge-purple">Shipped</span>
  }
  @case ('delivered') {
    <span class="badge badge-green">Delivered</span>
  }
  @default {
    <span class="badge badge-gray">Unknown</span>
  }
}`,
    },
    { type: 'tip', text: 'Use @switch when comparing a single value against multiple constants. Use @if / @else if when each branch has a different condition.' },

    { type: 'heading', text: 'Migrating from *ngIf and *ngFor' },
    { type: 'paragraph', text: 'Angular ships a built-in schematic to migrate templates automatically.' },
    {
      type: 'code',
      code: `# Automatic migration
ng generate @angular/core:control-flow

# Manual reference:
# *ngIf="cond"                  →  @if (cond) { }
# *ngIf="cond; else tpl"        →  @if (cond) { } @else { }
# *ngFor="let x of arr"         →  @for (x of arr; track x.id) { }
# *ngSwitch + *ngSwitchCase     →  @switch + @case`,
    },
    {
      type: 'qa',
      question: 'What is the key difference between @for and *ngFor regarding tracking?',
      answer: 'In @for, track is REQUIRED. In *ngFor, trackBy was optional (though recommended). Angular\'s compiler enforces tracking in @for to prevent accidental performance bugs from re-creating all DOM nodes on every change.',
    },
    {
      type: 'qa',
      question: 'What does the @empty block replace from the old approach?',
      answer: 'It replaces the pattern of using a separate *ngIf="items.length === 0" element alongside *ngFor. With @empty, the empty state is co-located with the loop, making the template more readable and less error-prone.',
    },
  ],
};
