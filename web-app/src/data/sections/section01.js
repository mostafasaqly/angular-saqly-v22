// القسم 1 — مقدمة الكورس
export default {
  id: 1,
  title: "مقدمة الكورس",
  titleEn: "Course Introduction",
  level: "مبتدئ",
  levelEn: "Beginner",
  intro:
    "أهلاً بك في كورس أنجولار v22! هذا القسم يجهّزك للبداية — لا يوجد كود بعد، بل نتعرّف على: ما هو أنجولار، ما الذي ستبنيه، ما الجديد في الإصدار 22، والفرق بينه وبين React وVue، وكيف تستفيد من هذا الكورس بأفضل طريقة.",
  introEn:
    "Welcome to the Angular v22 course! This section gets you ready to start — no code yet. We'll cover: what Angular is, what you'll build, what's new in v22, how it compares to React and Vue, and how to get the most out of this course.",

  lessons: [
    "مرحباً، أنا مصطفى سقلى",
    "ماذا ستبني في هذا الكورس",
    "المتطلبات وخريطة الكورس",
    "نظرة عامة على أنجولار v22 — عصر Signals",
    "الجديد في v22 (Signal Forms، OnPush، Zoneless)",
    "أنجولار مقابل React مقابل Vue",
    "متى تستخدم أنجولار",
    "كيف تستفيد من هذا الكورس",
  ],
  lessonsEn: [
    "Hello, I'm Mostafa Saqly",
    "What You Will Build",
    "Prerequisites & Course Roadmap",
    "Angular v22 Overview — The Signal-First Era",
    "What's New in v22 (Signal Forms, OnPush by Default, Zoneless)",
    "Angular vs React vs Vue",
    "When to Use Angular",
    "How to Get the Most Out of This Course",
  ],

  content: [
    // ===== المقدمة الشخصية =====
    { type: "heading", text: "👋 مرحباً، أنا مصطفى سقلى" },
    {
      type: "paragraph",
      text: "صمّمت هذا الكورس لمساعدة أي شخص يريد تعلّم أنجولار من الصفر بأسلوب عربي واضح ومنظّم. جمّعت لك أفضل الممارسات والتقنيات الحديثة لأنجولار v22 في مكان واحد — بدون تشتّت.",
    },
    {
      type: "paragraph",
      text: "الفكرة بسيطة: توفير وقتك من البحث في المنتديات ومشاهدة عشرات الفيديوهات. كل ما تحتاجه موجود هنا — مرتّب، مختصر، وقابل للتطبيق مباشرةً.",
    },
    {
      type: "cta",
      text: "لو محتاج تدريب متخصص على مسار كامل،",
      linkLabel: "ادخل من هنا →",
      link: "https://saqly.com/individual-training",
    },
    {
      type: "tip",
      text: "اقرأ وطبّق. كل درس فيه أمثلة عملية جاهزة للتشغيل على جهازك مباشرةً.",
    },

    // ===== الدرس 1 =====
    { type: "heading", text: "1. ماذا ستبني في هذا الكورس" },
    {
      type: "paragraph",
      text: "ستبني في نهاية الكورس مشروعَين كاملَين جاهزَين لمعرض أعمالك: لوحة تحكم إدارية (Admin Dashboard) ومتجر إلكتروني مصغّر (E-Commerce Mini App) — بالإضافة إلى عشرات الأمثلة الصغيرة على كل مفهوم.",
    },
    {
      type: "list",
      items: [
        "🗂️ المشروع الأول: لوحة تحكم — عرض بيانات API، بحث، إضافة/تعديل/حذف، نماذج Signal Forms، حماية المسارات",
        "🛒 المشروع الثاني: متجر مصغّر — صفحات منتجات، سلّة مشتريات، إدارة الكميات، تخزين البيانات محلياً",
        "⚡ أمثلة تطبيقية: Signals، HTTP، Routing، Forms، RxJS، SSR، وأكثر",
      ],
    },

    // ===== الدرس 2 =====
    { type: "heading", text: "2. المتطلبات وخريطة الكورس" },
    {
      type: "paragraph",
      text: "المشكلة: كثير من الناس يبدؤون أنجولار وعندهم فجوات في المعرفة الأساسية، فيُصابون بالإحباط عند أول تحدٍّ. أنجولار إطار عمل متكامل — وهو يبني على HTML وCSS وTypeScript ومفاهيم البرمجة الكائنية.",
    },
    {
      type: "paragraph",
      text: "الحل: قبل البدء، تأكّد أنك مرتاح مع هذه الأساسيات:",
    },
    {
      type: "list",
      items: [
        "HTML و CSS — البنية والتصميم",
        "TypeScript الأساسي — الأنواع، الواجهات، الديكوراتورات",
        "مفاهيم OOP — الصفوف (Classes) والوراثة",
        "Node.js (v22+) و npm — إدارة الحزم",
        "JavaScript الحديثة — async/await، Promises، ES Modules",
      ],
    },
    {
      type: "warning",
      text: "إذا كان TypeScript غريباً عليك تماماً، اقضِ ساعتين في أساسياته أولاً. أنجولار مكتوب بـ TypeScript وليس بـ JavaScript العادية.",
    },
    {
      type: "paragraph",
      text: "خريطة الكورس: 25 قسماً — من أساسيات المكوّنات وحتى النشر والاختبارات — مع مشروعَين تطبيقيَّين في النهاية.",
    },

    // ===== الدرس 3 =====
    { type: "heading", text: "3. نظرة عامة على أنجولار v22 — عصر Signals" },
    {
      type: "paragraph",
      text: "أنجولار إطار عمل متكامل (Full Framework) من Google لبناء تطبيقات ويب من المؤسسات. يختلف عن React وVue في أنه يأتي بكل شيء جاهزاً: التوجيه، النماذج، HTTP، الاختبارات، إدارة الحالة — دون الحاجة لمكتبات خارجية.",
    },
    {
      type: "list",
      items: [
        "المكوّنات (Components) — لبنات البناء الأساسية، مكتوبة بـ TypeScript + HTML + CSS",
        "Signals — النظام التفاعلي الجديد لإدارة الحالة بكفاءة",
        "Standalone Components — مكوّنات مستقلة بدون NgModule",
        "Dependency Injection — حقن التبعيات المدمج",
        "Angular CLI — أداة سطر أوامر قوية تُنشئ وتبني وتختبر",
      ],
    },
    {
      type: "tip",
      text: "أنجولار v22 يُسمّى 'عصر Signals' لأن الإشارات (Signals) أصبحت الطريقة الافتراضية لإدارة الحالة في أي مكوّن جديد.",
    },

    // ===== الدرس 4 =====
    { type: "heading", text: "4. الجديد في v22" },
    { type: "subheading", text: "⚡ Signal Forms — النماذج التفاعلية الجديدة" },
    {
      type: "paragraph",
      text: "المشكلة: النماذج في أنجولار كانت دائماً معقّدة — إما Template-Driven (صعب الاختبار) أو Reactive Forms (كود طويل). Signal Forms تُبسّط كل ذلك.",
    },
    {
      type: "paragraph",
      text: "الحل: Signal Forms أصبحت الطريقة الافتراضية في v22 — نماذج تُبنى على Signals، أقل كوداً، وأسهل للاختبار.",
    },
    {
      type: "code",
      code: `import { signalForm, Validators } from '@angular/forms';

// Signal Form — جديد في v22
const form = signalForm({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
});

// قراءة القيمة كـ Signal
console.log(form.value()); // { name: '', email: '' }`,
    },
    { type: "subheading", text: "🎯 OnPush كاستراتيجية افتراضية" },
    {
      type: "paragraph",
      text: "في v22، كل مكوّن جديد يُنشأ باستراتيجية OnPush تلقائياً — وهذا يعني أداءً أفضل بدون أي جهد إضافي. الاستراتيجية القديمة 'Default' أُعيدت تسميتها إلى 'Eager'.",
    },
    { type: "subheading", text: "🌐 Zoneless بالافتراضي" },
    {
      type: "paragraph",
      text: "المشاريع الجديدة في v22 لا تستخدم Zone.js بشكل افتراضي. هذا يُحسّن الأداء بشكل ملحوظ ويُقلّل حجم الحزمة.",
    },
    {
      type: "list",
      items: [
        "Signal Forms مستقرة وهي الطريقة الافتراضية",
        "OnPush استراتيجية افتراضية لكل مكوّن جديد",
        "Zoneless هو الإعداد الافتراضي للمشاريع الجديدة",
        "Resource API مستقرة (resource, rxResource, httpResource)",
        "Selectorless Components — مكوّنات بدون selector (جديد)",
        "Angular Aria — إمكانية الوصول مدمجة (مستقرة)",
        "Navigation API — دعم Web Navigation API في الـ Router",
      ],
    },

    // ===== الدرس 5 =====
    { type: "heading", text: "5. أنجولار مقابل React مقابل Vue" },
    {
      type: "paragraph",
      text: "المشكلة: الكثير يتساءل 'ماذا أتعلّم؟' — والجواب يعتمد على طبيعة المشروع وحجم الفريق والسياق.",
    },
    {
      type: "list",
      items: [
        "أنجولار — إطار عمل متكامل، TypeScript أولاً، مثالي لتطبيقات المؤسسات والفرق الكبيرة",
        "React — مكتبة للواجهات، مرونة عالية، نظام بيئي ضخم، مثالي للشركات الناشئة والمشاريع المتنوعة",
        "Vue — سهل التعلم، مزيج من أنجولار وReact، مثالي للمشاريع المتوسطة والتكاملات السريعة",
      ],
    },
    {
      type: "tip",
      text: "أنجولار يُوفّر 'رأياً محدداً' (opinionated) — يعني هناك طريقة واحدة موصى بها لكل شيء. هذا يُقلّل الاختيارات ويُوحّد الكود في الفرق الكبيرة.",
    },

    // ===== الدرس 6 =====
    { type: "heading", text: "6. متى تستخدم أنجولار" },
    {
      type: "paragraph",
      text: "أنجولار ليس الخيار الأمثل دائماً — اخترْه عندما تنطبق هذه الشروط:",
    },
    {
      type: "list",
      items: [
        "✅ تطبيق مؤسسي كبير يحتاج اتساقاً على مدى سنوات",
        "✅ فريق كبير يحتاج قواعد واضحة وهيكل محدد",
        "✅ TypeScript ومبادئ OOP جزء أساسي من المشروع",
        "✅ تحتاج كل شيء جاهزاً (Forms، HTTP، Router، DI) بدون تجميع مكتبات",
        "❌ موقع بسيط أو صفحة هبوط — استخدم HTML/CSS أو Astro",
        "❌ مشروع صغير بفريق واحد أو اثنين — React أو Vue أبسط",
      ],
    },
    {
      type: "warning",
      text: "أنجولار له منحنى تعلّم أعلى من React وVue. لكن بعد إتقانه، إنتاجيتك في المشاريع الكبيرة ستكون أعلى بكثير.",
    },

    // ===== الدرس 7 =====
    { type: "heading", text: "7. كيف تستفيد من هذا الكورس" },
    {
      type: "list",
      items: [
        "اكتب الكود بنفسك — لا تكتفِ بالقراءة",
        "اكسر الأشياء عن قصد وشاهد ماذا يحدث",
        "أجب على أسئلة المراجعة بكلماتك الخاصة",
        "أنجز المشروعَين كاملَين حتى النشر",
        "خذ فترات راحة — الدماغ يحتاج وقتاً لترسيخ المعلومات",
      ],
    },
    {
      type: "tip",
      text: "القاعدة الذهبية: أفضل طريقة لإتقان أنجولار هي البناء بأنجولار.",
    },

    // ===== الملخص =====
    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "أنجولار إطار عمل متكامل من Google — TypeScript أولاً",
        "v22 يُركّز على Signals كطريقة افتراضية لإدارة الحالة",
        "الجديد: Signal Forms، OnPush بالافتراضي، Zoneless، Resource API",
        "أنجولار مثالي للفرق الكبيرة والمشاريع طويلة الأمد",
        "ستبني مشروعَين كاملَين في نهاية الكورس",
      ],
    },
    {
      type: "qa",
      question: "1. بجملة واحدة، ما الفرق الرئيسي بين أنجولار وReact؟",
      answer:
        "أنجولار إطار عمل متكامل يوفر كل شيء جاهزاً (Forms، HTTP، Router، DI)، بينما React مكتبة للواجهات فقط وتحتاج لتجميع مكتبات خارجية.",
    },
    {
      type: "qa",
      question: "2. ما أبرز ثلاثة تغييرات في أنجولار v22؟",
      answer:
        "Signal Forms مستقرة وافتراضية، OnPush أصبحت استراتيجية الكشف الافتراضية، وZoneless هو الإعداد الافتراضي للمشاريع الجديدة.",
    },
    {
      type: "qa",
      question: "3. متى يكون أنجولار الخيار الأمثل؟",
      answer:
        "عند بناء تطبيقات مؤسسية كبيرة بفرق ضخمة تحتاج اتساقاً وهيكلاً واضحاً على مدى سنوات، أو عندما يكون TypeScript ومبادئ OOP جزءاً أساسياً من المشروع.",
    },
  ],

  contentEn: [
    // ===== Personal Intro =====
    { type: "heading", text: "👋 Hello, I'm Mostafa Saqly" },
    {
      type: "paragraph",
      text: "I designed this course to help anyone learn Angular from scratch in a clear, structured way. I've gathered the best practices and modern techniques for Angular v22 all in one place — no scattered resources.",
    },
    {
      type: "paragraph",
      text: "The idea is simple: save you time from browsing forums and watching dozens of videos. Everything you need is here — organized, concise, and immediately applicable.",
    },
    {
      type: "cta",
      text: "Need one-on-one training on a complete learning path?",
      linkLabel: "Enter here →",
      link: "https://saqly.com/individual-training",
    },
    {
      type: "tip",
      text: "Read and apply. Every lesson has practical examples you can run immediately on your machine.",
    },

    // ===== Lesson 1 =====
    { type: "heading", text: "1. What You Will Build" },
    {
      type: "paragraph",
      text: "By the end of this course you'll have built two complete applications ready for your portfolio: an Admin Dashboard and an E-Commerce Mini App — plus dozens of small examples covering every concept.",
    },
    {
      type: "list",
      items: [
        "🗂️ Project 1: Admin Dashboard — API data display, search, add/edit/delete, Signal Forms, route guards",
        "🛒 Project 2: E-Commerce Mini App — product pages, shopping cart, quantity management, local data persistence",
        "⚡ Practice examples: Signals, HTTP, Routing, Forms, RxJS, SSR, and more",
      ],
    },

    // ===== Lesson 2 =====
    { type: "heading", text: "2. Prerequisites & Course Roadmap" },
    {
      type: "paragraph",
      text: "Problem: Many people start Angular with gaps in foundational knowledge and get frustrated at the first challenge. Angular is a complete framework — it builds on HTML, CSS, TypeScript, and object-oriented programming concepts.",
    },
    {
      type: "paragraph",
      text: "Solution: Before starting, make sure you're comfortable with these fundamentals:",
    },
    {
      type: "list",
      items: [
        "HTML & CSS — structure and styling",
        "Basic TypeScript — types, interfaces, decorators",
        "OOP concepts — classes and inheritance",
        "Node.js (v22+) & npm — package management",
        "Modern JavaScript — async/await, Promises, ES Modules",
      ],
    },
    {
      type: "warning",
      text: "If TypeScript is completely unfamiliar, spend a couple of hours on the basics first. Angular is written in TypeScript, not plain JavaScript.",
    },
    {
      type: "paragraph",
      text: "Course roadmap: 25 sections — from component fundamentals to deployment and testing — with two hands-on projects at the end.",
    },

    // ===== Lesson 3 =====
    { type: "heading", text: "3. Angular v22 Overview — The Signal-First Era" },
    {
      type: "paragraph",
      text: "Angular is a complete framework from Google for building enterprise web applications. Unlike React and Vue, Angular comes with everything built in: routing, forms, HTTP, testing, state management — no external libraries needed.",
    },
    {
      type: "list",
      items: [
        "Components — the fundamental building blocks, written in TypeScript + HTML + CSS",
        "Signals — the new reactive system for efficient state management",
        "Standalone Components — self-contained components without NgModule",
        "Dependency Injection — the built-in DI system",
        "Angular CLI — a powerful command-line tool to generate, build, and test",
      ],
    },
    {
      type: "tip",
      text: "Angular v22 is called the 'Signal-First Era' because Signals are now the default way to manage state in any new component.",
    },

    // ===== Lesson 4 =====
    { type: "heading", text: "4. What's New in v22" },
    { type: "subheading", text: "⚡ Signal Forms — Stable in v22" },
    {
      type: "paragraph",
      text: "Problem: Angular forms were always complex — either Template-Driven (hard to test) or Reactive Forms (too much boilerplate). Signal Forms simplify everything.",
    },
    {
      type: "paragraph",
      text: "Solution: Signal Forms are now the default approach in v22 — forms built on Signals, less code, easier to test.",
    },
    {
      type: "code",
      code: `import { signalForm, Validators } from '@angular/forms';

// Signal Form — new in v22
const form = signalForm({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
});

// Read the value as a Signal
console.log(form.value()); // { name: '', email: '' }`,
    },
    { type: "subheading", text: "🎯 OnPush as the Default Strategy" },
    {
      type: "paragraph",
      text: "In v22, every new component is created with OnPush change detection by default — better performance with zero extra effort. The old 'Default' strategy has been renamed to 'Eager'.",
    },
    { type: "subheading", text: "🌐 Zoneless by Default" },
    {
      type: "paragraph",
      text: "New projects in v22 no longer use Zone.js by default. This significantly improves performance and reduces bundle size.",
    },
    {
      type: "list",
      items: [
        "Signal Forms stable and the default approach",
        "OnPush is the default change detection strategy",
        "Zoneless is the default for new projects",
        "Resource API stable (resource, rxResource, httpResource)",
        "Selectorless Components — components without a selector (new)",
        "Angular Aria — built-in accessibility support (stable)",
        "Navigation API — Web Navigation API support in the Router",
      ],
    },

    // ===== Lesson 5 =====
    { type: "heading", text: "5. Angular vs React vs Vue" },
    {
      type: "paragraph",
      text: "Problem: Many ask 'what should I learn?' — the answer depends on the project type, team size, and context.",
    },
    {
      type: "list",
      items: [
        "Angular — complete framework, TypeScript-first, ideal for enterprise apps and large teams",
        "React — UI library, high flexibility, massive ecosystem, ideal for startups and diverse projects",
        "Vue — easy to learn, a blend of Angular and React, ideal for mid-size projects and quick integrations",
      ],
    },
    {
      type: "tip",
      text: "Angular is 'opinionated' — there's one recommended way to do everything. This reduces choices and unifies code across large teams.",
    },

    // ===== Lesson 6 =====
    { type: "heading", text: "6. When to Use Angular" },
    {
      type: "paragraph",
      text: "Angular isn't always the best choice — pick it when these conditions apply:",
    },
    {
      type: "list",
      items: [
        "✅ Large enterprise app that needs consistency over years",
        "✅ Big team that needs clear rules and a defined structure",
        "✅ TypeScript and OOP principles are core to the project",
        "✅ You need everything ready (Forms, HTTP, Router, DI) without assembling libraries",
        "❌ Simple site or landing page — use plain HTML/CSS or Astro",
        "❌ Small project with one or two developers — React or Vue is simpler",
      ],
    },
    {
      type: "warning",
      text: "Angular has a steeper learning curve than React and Vue. But once mastered, your productivity on large projects will be significantly higher.",
    },

    // ===== Lesson 7 =====
    { type: "heading", text: "7. How to Get the Most Out of This Course" },
    {
      type: "list",
      items: [
        "Write the code yourself — don't just read",
        "Break things on purpose and watch what happens",
        "Answer review questions in your own words",
        "Complete both projects through to deployment",
        "Take breaks — your brain needs time to consolidate knowledge",
      ],
    },
    {
      type: "tip",
      text: "Golden rule: the best way to master Angular is to build with Angular.",
    },

    // ===== Summary =====
    { type: "heading", text: "✅ Section Summary" },
    {
      type: "list",
      items: [
        "Angular is a complete framework from Google — TypeScript-first",
        "v22 focuses on Signals as the default state management approach",
        "New: Signal Forms, OnPush by default, Zoneless, Resource API",
        "Angular is ideal for large teams and long-term projects",
        "You'll build two complete projects by the end of the course",
      ],
    },
    {
      type: "qa",
      question: "1. In one sentence, what is the main difference between Angular and React?",
      answer:
        "Angular is a complete framework that provides everything out of the box (Forms, HTTP, Router, DI), while React is a UI library only and requires assembling external libraries.",
    },
    {
      type: "qa",
      question: "2. What are the three most notable changes in Angular v22?",
      answer:
        "Signal Forms are stable and the default, OnPush is now the default change detection strategy, and Zoneless is the default setting for new projects.",
    },
    {
      type: "qa",
      question: "3. When is Angular the best choice?",
      answer:
        "When building large enterprise applications with large teams that need consistency and a clear structure over many years, or when TypeScript and OOP principles are core to the project.",
    },
  ],
};
