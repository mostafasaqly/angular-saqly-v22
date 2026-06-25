// Section 25 — Final Review and Next Steps
export default {
  id: 25,
  title: 'مراجعة نهائية و Next Steps',
  titleEn: 'Final Review and Next Steps',
  level: 'كل المستويات',
  levelEn: 'All Levels',
  intro: 'تهانيّ على إتمام الدورة! هذا القسم يُلخّص أهم ما تعلّمته، ويُرشدك لمسار التطوير المستمر: المشاريع الممارسة، المصادر المتقدمة، ومجتمع Angular.',
  introEn: 'Congratulations on completing the course! This section summarizes the most important things you learned and guides you toward continuous growth: practice projects, advanced resources, and the Angular community.',

  lessons: [
    'Course Summary — 25 Sections in Points',
    'Angular v22 vs Previous Versions',
    'Developer Roadmap (Junior → Senior)',
    'Suggested Practice Projects',
    'Advanced Learning Resources',
    'Angular Community and Support',
    'Latest Angular v22 News',
    'ماذا بعد Angular؟',
  ],
  lessonsEn: [
    'Course Summary — 25 Sections in Points',
    'Angular v22 vs Previous Versions',
    'Developer Roadmap (Junior → Senior)',
    'Suggested Practice Projects',
    'Advanced Learning Resources',
    'Angular Community and Support',
    'Latest Angular v22 News',
    'What Comes After Angular?',
  ],

  content: [
    { type: 'heading', text: 'ملخص الدورة — 25 قسم في نقاط' },
    {
      type: 'list',
      items: [
        '1-2: الإعداد والأساسيات — TypeScript، Angular CLI، هيكل المشروع',
        '3-4: Components والقوالب — metadata، template syntax، data binding',
        '5-6: Control Flow والتواصل — @if/@for/@switch، @Input/@Output، ng-content',
        '7-8: Signals — signal()، computed()، effect()، input.required()، model()، linkedSignal، httpResource()',
        '9-10: Directives وServices — Directives، Pipes، DI، inject()',
        '11-12: Routing وForms — lazy loading، guards، Signal Forms، Reactive Forms',
        '13-14: RxJS وHTTP — Observables، operators، HttpClient، interceptors',
        '15-16: الحالة وAuthentication — Signals Store، JWT، authGuard، RBAC',
        '17-18: UI وPerformance — ViewEncapsulation، CSS Variables، OnPush، @defer، Zoneless',
        '19-20: SSR وTesting — Hydration، Incremental Hydration، TestBed، Jasmine',
        '21: أدوات AI — Copilot، Claude، Cursor، Prompts فعّالة',
        '22-23: المشاريع — Admin Dashboard، E-Commerce App',
        '24-25: النشر والمراجعة — Firebase، Vercel، CI/CD، خطوات ما بعد الدورة',
      ],
    },

    { type: 'heading', text: 'مقارنة Angular v22 مع الإصدارات السابقة' },
    {
      type: 'list',
      items: [
        'قبل v14: @Input()/@Output()، NgModule، *ngIf/*ngFor، Zone.js إلزامي',
        'v14-v16: Standalone Components، inject()، أول ظهور للـ Signals كتجربة',
        'v17: @if/@for/@switch بدلاً من *ngIf/*ngFor، @defer، Control Flow الجديد',
        'v18-v19: Signals مستقرة، input()، output()، model()، viewChild()، httpResource()',
        'v20-v22: Signal Forms، Zoneless مستقر، Incremental Hydration، linkedSignal',
        'الخلاصة: Angular v22 أبسط وأسرع وأقل كوداً بكثير من الإصدارات القديمة',
      ],
    },

    { type: 'heading', text: 'خريطة طريق المطوّر (Junior → Senior)' },
    {
      type: 'list',
      items: [
        'Junior: يُنشئ مكوّنات، يُطبّق الأنماط المعروفة، يحل مشاكل بالبحث',
        'Mid: يُصمّم هيكل التطبيق، يُرشد المبتدئين، يُحسّن Performance',
        'Senior: يُقرّر الأنماط والهياكل، يتعامل مع التعقيد الحقيقي، يُقلّل التقنية الدين',
        '',
        'المهارات الفاصلة:',
        '→ TypeScript المتقدم (generics، utility types، conditional types)',
        '→ RxJS متقدم (custom operators، schedulers)',
        '→ فهم المتصفح العميق (Web APIs، Performance، DevTools)',
        '→ قيادة المشاريع واتخاذ القرارات المعمارية',
        '→ اختبار شامل (Unit + Integration + E2E)',
      ],
    },

    { type: 'heading', text: 'مشاريع ممارسة مقترحة' },
    {
      type: 'list',
      items: [
        '🟢 مبتدئ: تطبيق قائمة مهام (Todo) مع localStorage وفلترة',
        '🟡 متوسط: تطبيق طقس يستخدم API خارجي مع httpResource()',
        '🟡 متوسط: منصة مدونة بسيطة مع SSR وprerendering',
        '🔴 متقدم: لوحة تحكم مع مصادقة JWT، CRUD كامل، جداول ديناميكية',
        '🔴 متقدم: تطبيق دردشة فورية مع WebSockets وSignals',
        '⭐ تحدي: Clone لتطبيق معروف (GitHub، Trello، Notion) بـ Angular v22',
      ],
    },

    { type: 'heading', text: 'مصادر التعلم المتقدمة' },
    {
      type: 'list',
      items: [
        'angular.dev — التوثيق الرسمي (يُحدَّث مع كل إصدار)',
        'Angular Blog على blog.angular.dev — آخر الأخبار والميزات',
        'Twitter/X: @angular للإعلانات الرسمية',
      ],
    },

    { type: 'heading', text: 'الخلاصة الأهم' },
    {
      type: 'list',
      items: [
        'Angular v22 يُبسّط كثيراً: input() أبسط من @Input()، Signals أوضح من RxJS لحالة UI',
        'الأنماط الثلاثة الأهم: OnPush + Signals + inject() — طبّقها في كل مكوّن',
        'ابدأ بسيطاً ثم تعقّد — signal() في مكوّن → خدمة مشتركة → NgRx عند الحاجة الحقيقية',
        'Tests ليست اختيارية — كل خدمة مهمة تحتاج unit tests على الأقل',
        'Angular يتطور باستمرار — اشترك في blog.angular.dev وراجع CHANGELOG كل إصدار',
        'المجتمع مصدر قوة — الأسئلة في Discord/Stack Overflow تُسرّع تعلّمك كثيراً',
      ],
    },
    { type: 'cta', text: 'شكراً لإتمامك الدورة! ابدأ بناء مشروعك الآن. أفضل طريقة للتعلم هي بناء شيء حقيقي تفتخر به. 🚀' },
    {
      type: 'qa',
      question: 'ما أول شيء يجب أن أفعله بعد الانتهاء من الدورة؟',
      answer: 'ابنِ مشروعاً حقيقياً — اختر فكرة تُثيرك وطبّق ما تعلّمته. لا تنتظر "تعلّم المزيد" — أفضل تعلّم يحدث عند مواجهة مشاكل حقيقية. أضفه لـ GitHub portfolio وشاركه في المجتمع.',
    },
    {
      type: 'qa',
      question: 'كيف أواكب تطورات Angular بعد الدورة؟',
      answer: 'تابع blog.angular.dev للإعلانات الرسمية. اشترك في Angular Newsletter. شاهد مقاطع Josh Morony على YouTube. انضم لـ Angular Discord. مع كل إصدار جديد، اقرأ CHANGELOG واجرّب الميزات الجديدة في مشروع صغير.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Course Summary — 25 Sections in Points' },
    {
      type: 'list',
      items: [
        '1-2: Setup and basics — TypeScript, Angular CLI, project structure',
        '3-4: Components and templates — metadata, template syntax, data binding',
        '5-6: Control Flow and communication — @if/@for/@switch, @Input/@Output, ng-content',
        '7-8: Signals — signal(), computed(), effect(), input.required(), model(), linkedSignal, httpResource()',
        '9-10: Directives and services — Directives, Pipes, DI, inject()',
        '11-12: Routing and forms — lazy loading, guards, Signal Forms, Reactive Forms',
        '13-14: RxJS and HTTP — Observables, operators, HttpClient, interceptors',
        '15-16: State and auth — Signals Store, JWT, authGuard, RBAC',
        '17-18: UI and performance — ViewEncapsulation, CSS Variables, OnPush, @defer, Zoneless',
        '19-20: SSR and testing — Hydration, Incremental Hydration, TestBed, Jasmine',
        '21: AI tooling — Copilot, Claude, Cursor, effective prompts',
        '22-23: Projects — Admin Dashboard, E-Commerce App',
        '24-25: Deployment and review — Firebase, Vercel, CI/CD, post-course next steps',
      ],
    },

    { type: 'heading', text: 'Angular v22 vs Previous Versions' },
    {
      type: 'list',
      items: [
        'Before v14: @Input()/@Output(), NgModule, *ngIf/*ngFor, Zone.js required',
        'v14-v16: Standalone Components, inject(), first Signals as experimental',
        'v17: @if/@for/@switch replaces *ngIf/*ngFor, @defer, new Control Flow',
        'v18-v19: Signals stable, input(), output(), model(), viewChild(), httpResource()',
        'v20-v22: Signal Forms, stable Zoneless, Incremental Hydration, linkedSignal',
        'Summary: Angular v22 is much simpler, faster, and requires far less boilerplate',
      ],
    },

    { type: 'heading', text: 'Developer Roadmap (Junior → Senior)' },
    {
      type: 'list',
      items: [
        'Junior: creates components, applies known patterns, solves problems by searching',
        'Mid: designs application architecture, mentors juniors, improves performance',
        'Senior: decides patterns and structures, handles real complexity, reduces tech debt',
        '',
        'Key differentiating skills:',
        '→ Advanced TypeScript (generics, utility types, conditional types)',
        '→ Advanced RxJS (custom operators, schedulers)',
        '→ Deep browser knowledge (Web APIs, Performance, DevTools)',
        '→ Leading projects and making architectural decisions',
        '→ Comprehensive testing (Unit + Integration + E2E)',
      ],
    },

    { type: 'heading', text: 'Suggested Practice Projects' },
    {
      type: 'list',
      items: [
        '🟢 Beginner: Todo list app with localStorage and filtering',
        '🟡 Intermediate: Weather app using an external API with httpResource()',
        '🟡 Intermediate: Simple blog platform with SSR and prerendering',
        '🔴 Advanced: Admin dashboard with JWT auth, full CRUD, dynamic tables',
        '🔴 Advanced: Real-time chat app with WebSockets and Signals',
        '⭐ Challenge: Clone a well-known app (GitHub, Trello, Notion) in Angular v22',
      ],
    },

    { type: 'heading', text: 'Advanced Learning Resources' },
    {
      type: 'list',
      items: [
        'angular.dev — official documentation (updated with every release)',
        'Angular Blog at blog.angular.dev — latest news and features',
        'Twitter/X: @angular for official announcements',
      ],
    },

    { type: 'heading', text: 'Key Takeaways' },
    {
      type: 'list',
      items: [
        'Angular v22 simplifies a lot: input() over @Input(), Signals clearer than RxJS for UI state',
        'The three most important patterns: OnPush + Signals + inject() — apply to every component',
        'Start simple then add complexity — signal() in component → shared service → NgRx when truly needed',
        'Tests are not optional — every important service needs unit tests at minimum',
        'Angular keeps evolving — subscribe to blog.angular.dev and review CHANGELOG each release',
        'Community is a force multiplier — questions on Discord/Stack Overflow accelerate your learning',
      ],
    },
    { type: 'cta', text: 'Thank you for completing the course! Start building your project now. The best way to learn is to build something real you are proud of. 🚀' },
    {
      type: 'qa',
      question: 'What is the first thing I should do after finishing the course?',
      answer: 'Build a real project — pick an idea that excites you and apply what you learned. Do not wait to "learn more" — the best learning happens when facing real problems. Add it to your GitHub portfolio and share it with the community.',
    },
    {
      type: 'qa',
      question: 'How do I keep up with Angular developments after the course?',
      answer: 'Follow blog.angular.dev for official announcements. Subscribe to the Angular Newsletter. Watch Josh Morony on YouTube. Join Angular Discord. With each new release, read the CHANGELOG and try the new features in a small project.',
    },
  ],
};
