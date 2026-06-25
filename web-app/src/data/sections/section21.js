// Section 21 — AI Tooling and Developer Experience
export default {
  id: 21,
  title: 'أدوات الذكاء الاصطناعي وتجربة المطوّر',
  titleEn: 'AI Tooling and Developer Experience',
  level: 'مبتدئ – متوسط',
  levelEn: 'Beginner–Intermediate',
  intro: 'الذكاء الاصطناعي غيّر كيفية كتابة Angular. هذا القسم يغطي كيف تستخدم أدوات مثل GitHub Copilot وClaude وCursor لتسريع تطويرك، وأفضل ممارسات استخدامها في مشاريع Angular v22.',
  introEn: 'AI has transformed how Angular is written. This section covers how to use tools like GitHub Copilot, Claude, and Cursor to speed up your development, and best practices for using them in Angular v22 projects.',

  lessons: [
    'الذكاء الاصطناعي في تطوير Angular',
    'GitHub Copilot — الإعداد والاستخدام',
    'Claude في كتابة المكوّنات',
    'Cursor IDE والـ AI-first workflow',
    'كتابة Prompts فعّالة للكود Angular',
    'توليد الاختبارات بالذكاء الاصطناعي',
    'مراجعة الكود بالذكاء الاصطناعي',
    'حدود الذكاء الاصطناعي في البرمجة',
  ],
  lessonsEn: [
    'AI in Angular Development',
    'GitHub Copilot — Setup and Usage',
    'Claude for Writing Components',
    'Cursor IDE and AI-First Workflow',
    'Writing Effective Angular Prompts',
    'Generating Tests with AI',
    'AI Code Review',
    'Limits of AI in Programming',
  ],

  content: [
    { type: 'heading', text: 'الذكاء الاصطناعي في تطوير Angular' },
    { type: 'paragraph', text: 'الذكاء الاصطناعي لا يستبدل المطوّر — يُضخّم قدراته. مطوّر Angular يفهم المفاهيم + يستخدم AI = إنتاجية أعلى بكثير.' },
    {
      type: 'list',
      items: [
        'توليد المكوّنات المتكررة (forms، cards، tables) بشكل أسرع',
        'اقتراح أنماط Angular الحديثة (Signals، input()، inject())',
        'كتابة الاختبارات الممّلة تلقائياً',
        'شرح الكود المعقّد وأخطاء TypeScript',
        'إعادة الهيكلة (Refactoring) من أنماط قديمة للحديثة',
      ],
    },

    { type: 'heading', text: 'كتابة Prompts فعّالة للكود Angular' },
    { type: 'paragraph', text: 'جودة الناتج = جودة الـ Prompt. كوّن مساعدك بالسياق الصحيح.' },
    {
      type: 'code',
      code: `// Prompt جيد لتوليد مكوّن Angular:
/*
أنشئ مكوّن Angular v22 standalone باستخدام:
- ChangeDetectionStrategy.OnPush
- input() وoutput() وsignal() (وليس @Input@، @Output)
- inject() بدلاً من constructor injection
- @for و@if (وليس *ngFor و*ngIf)

المكوّن: ProductCardComponent
المدخلات: product: Product، showRating: boolean (اختياري، افتراضي false)
المخرجات: addToCart يُرسل Product

النوع Product:
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
}
*/

// Prompt ضعيف:
// "أنشئ مكوّن angular لعرض منتج"`,
    },

    { type: 'heading', text: 'توليد الاختبارات بالذكاء الاصطناعي' },
    {
      type: 'code',
      code: `// مثال على Prompt لتوليد اختبارات:
/*
اكتب اختبارات Jasmine/TestBed لهذا المكوّن Angular v22:

[الصق كود المكوّن هنا]

اكتب اختبارات لـ:
1. العرض الأولي للمحتوى
2. التفاعل مع المستخدم (الضغط على الأزرار)
3. تغيير المدخلات وتحديث العرض
4. حالات الحافة (مصفوفة فارغة، قيم null)

استخدم data-testid للاستعلام عن العناصر
*/

// نصيحة: راجع الاختبارات الناتجة — AI يُنشئ اختبارات
// التنفيذ الداخلي أحياناً بدلاً من السلوك الخارجي`,
    },

    { type: 'heading', text: 'حدود الذكاء الاصطناعي في البرمجة' },
    {
      type: 'list',
      items: [
        'AI لا يعرف متطلبات مشروعك الخاص — دائماً راجع الكود الناتج',
        'قد يُولّد أنماط Angular قديمة إذا لم تُوضّح الإصدار',
        'لا يفهم السياق التجاري — قد يُبسّط المنطق المعقّد',
        'الاختبارات الناتجة قد تختبر التنفيذ لا السلوك — راجعها',
        'الثقة العمياء بـ AI تُنتج كوداً يعمل لكن لا يُصان',
        'الاستخدام الأمثل: AI يكتب، أنت تُراجع وتُفكّر',
      ],
    },
    { type: 'warning', text: 'لا تقبل كود الذكاء الاصطناعي دون فهمه أولاً. إذا لم تفهم ما يفعله الكود، لا يمكنك تصحيحه عند وجود مشكلة — وستكون هناك مشكلة دائماً.' },

    { type: 'heading', text: 'Angular CLI والأدوات المدمجة' },
    {
      type: 'code',
      code: `# توليد مكوّن standalone
ng generate component features/product-card --standalone

# توليد خدمة
ng generate service core/services/auth

# توليد guard
ng generate guard core/guards/auth --functional

# توليد pipe
ng generate pipe shared/pipes/truncate

# تحديث Angular لآخر إصدار
ng update @angular/core @angular/cli

# تحليل حجم الـ bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/my-app/browser/stats.json

# التحقق من الأداء
ng build --configuration production
lighthouse http://localhost:4000 --view`,
    },
    {
      type: 'qa',
      question: 'كيف تُوضّح للذكاء الاصطناعي استخدام الأنماط الحديثة في Angular v22؟',
      answer: 'في بداية كل محادثة أو Prompt، أضف: "استخدم Angular v22 مع: input() وoutput() وsignal() وcomputed()، وinject() بدلاً من constructor، و@if و@for بدلاً من *ngIf و*ngFor، وChangeDetectionStrategy.OnPush على كل مكوّن." هذا يُوجّه النموذج للأنماط الصحيحة.',
    },
    {
      type: 'qa',
      question: 'ما هو الـ AI-first workflow في Cursor IDE؟',
      answer: 'Cursor يُدمج AI في المحرر نفسه — يمكنك تحديد كتلة كود والضغط Ctrl+K لتعديلها أو Ctrl+L لسؤال AI عنها. يرى AI كل ملفات مشروعك تلقائياً. الفارق عن Copilot: يمكنه رؤية السياق الكامل للمشروع وليس فقط الملف الحالي.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'AI in Angular Development' },
    { type: 'paragraph', text: 'AI does not replace the developer — it amplifies their capabilities. An Angular developer who understands the concepts + uses AI = far higher productivity.' },
    {
      type: 'list',
      items: [
        'Generate repetitive components (forms, cards, tables) much faster',
        'Suggest modern Angular patterns (Signals, input(), inject())',
        'Automatically write tedious tests',
        'Explain complex code and TypeScript errors',
        'Refactor from old patterns to modern ones',
      ],
    },

    { type: 'heading', text: 'Writing Effective Angular Prompts' },
    { type: 'paragraph', text: 'Quality output = quality prompt. Prime your AI assistant with the right context.' },
    {
      type: 'code',
      code: `// Good Angular prompt:
/*
Create a standalone Angular v22 component using:
- ChangeDetectionStrategy.OnPush
- input(), output(), signal() (NOT @Input, @Output)
- inject() instead of constructor injection
- @for and @if (NOT *ngFor and *ngIf)

Component: ProductCardComponent
Inputs: product: Product, showRating: boolean (optional, default false)
Outputs: addToCart emitting Product

Product type:
interface Product {
  id: number; name: string; price: number;
  rating: number; imageUrl: string;
}
*/

// Bad prompt:
// "create an angular component to show a product"`,
    },

    { type: 'heading', text: 'Generating Tests with AI' },
    {
      type: 'code',
      code: `// Example prompt to generate tests:
/*
Write Jasmine/TestBed tests for this Angular v22 component:

[Paste component code here]

Write tests for:
1. Initial content rendering
2. User interaction (button clicks)
3. Input changes and view updates
4. Edge cases (empty array, null values)

Use data-testid to query elements.
*/

// Note: review AI-generated tests — AI sometimes writes
// implementation tests instead of behavior tests`,
    },

    { type: 'heading', text: 'Limits of AI in Programming' },
    {
      type: 'list',
      items: [
        'AI does not know your specific project requirements — always review generated code',
        'May generate old Angular patterns if you do not specify the version',
        'Does not understand business context — may oversimplify complex logic',
        'Generated tests may test implementation not behavior — review them',
        'Blind trust in AI produces code that works but cannot be maintained',
        'Optimal use: AI writes, you review and think',
      ],
    },
    { type: 'warning', text: 'Never accept AI code without understanding it first. If you do not understand what the code does, you cannot fix it when something goes wrong — and something will always go wrong.' },

    { type: 'heading', text: 'Angular CLI and Built-in Tooling' },
    {
      type: 'code',
      code: `# Generate standalone component
ng generate component features/product-card --standalone

# Generate service
ng generate service core/services/auth

# Generate functional guard
ng generate guard core/guards/auth --functional

# Generate pipe
ng generate pipe shared/pipes/truncate

# Update Angular to the latest version
ng update @angular/core @angular/cli

# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/my-app/browser/stats.json

# Measure performance
ng build --configuration production
lighthouse http://localhost:4000 --view`,
    },
    {
      type: 'qa',
      question: 'How do you tell AI to use modern Angular v22 patterns?',
      answer: 'At the start of every conversation or prompt, add: "Use Angular v22 with: input(), output(), signal(), computed(), inject() instead of constructor, @if and @for instead of *ngIf and *ngFor, and ChangeDetectionStrategy.OnPush on every component." This guides the model toward the correct patterns.',
    },
    {
      type: 'qa',
      question: 'What is the AI-first workflow in Cursor IDE?',
      answer: 'Cursor embeds AI directly into the editor — you can select a code block and press Ctrl+K to modify it or Ctrl+L to ask AI about it. AI automatically sees all your project files. The key difference from Copilot: it can see the full project context, not just the current file.',
    },
  ],
};
