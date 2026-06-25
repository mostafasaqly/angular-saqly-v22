// Section 19 — SSR and Hydration
export default {
  id: 19,
  title: 'SSR and Hydration',
  titleEn: 'SSR and Hydration',
  level: 'متقدم',
  levelEn: 'Advanced',
  intro: 'Server-Side Rendering (SSR) يُولّد HTML على الخادم لتسريع التحميل الأول وتحسين SEO. Angular v22 يدعم SSR مع Hydration تلقائية وIncremental Hydration لإحياء أجزاء الصفحة بشكل تدريجي.',
  introEn: 'Server-Side Rendering (SSR) generates HTML on the server to speed up the first paint and improve SEO. Angular v22 supports SSR with automatic Hydration and Incremental Hydration to progressively bring page sections to life.',

  lessons: [
    'ما هو SSR ولماذا نستخدمه؟',
    'SSR Setup in Angular v22',
    'Automatic Hydration',
    'Incremental Hydration with @defer',
    'Server vs Browser Environment',
    'isPlatformBrowser and isPlatformServer',
    'Static Site Generation (SSG/Prerendering)',
    'Common SSR Errors and Fixes',
  ],
  lessonsEn: [
    'What is SSR and Why Use It?',
    'SSR Setup in Angular v22',
    'Automatic Hydration',
    'Incremental Hydration with @defer',
    'Server vs Browser Environment',
    'isPlatformBrowser and isPlatformServer',
    'Static Site Generation (SSG/Prerendering)',
    'Common SSR Errors and Fixes',
  ],

  content: [
    { type: 'heading', text: 'ما هو SSR ولماذا نستخدمه؟' },
    {
      type: 'list',
      items: [
        'CSR (الافتراضي): المتصفح يُحمّل JavaScript ثم يُولّد HTML — بطيء في التحميل الأول',
        'SSR: الخادم يُولّد HTML كامل ويُرسله — التحميل الأول أسرع بكثير',
        'SEO: محركات البحث تُفهرس محتوى HTML مباشرةً دون تشغيل JavaScript',
        'Core Web Vitals: LCP (أكبر محتوى مرئي) يتحسن بشكل ملحوظ مع SSR',
        'Hydration: بعد تحميل HTML، Angular يُحيي التطبيق ويُضيف التفاعلية',
      ],
    },

    { type: 'heading', text: 'إعداد SSR في Angular v22' },
    {
      type: 'code',
      code: `# إضافة SSR لمشروع موجود
ng add @angular/ssr

# أو عند إنشاء مشروع جديد
ng new my-app --ssr

# الملفات التي تُنشأ:
# - server.ts          الخادم Express
# - app.config.server.ts  إعدادات جانب الخادم

# تشغيل في وضع التطوير مع SSR
ng serve --ssr

# بناء للإنتاج
ng build
node dist/my-app/server/server.mjs`,
    },
    {
      type: 'code',
      code: `// app.config.ts — العميل
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(
      withEventReplay() // يُعيد تشغيل الأحداث التي حدثت قبل Hydration
    ),
  ]
};

// app.config.server.ts — الخادم
import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);`,
    },

    { type: 'heading', text: 'Incremental Hydration مع @defer' },
    {
      type: 'code',
      code: `// app.config.ts — تفعيل Incremental Hydration
import { withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(
      withIncrementalHydration()
    ),
  ]
};

// في القالب — الجمع بين @defer وhydrate
@defer (on viewport; hydrate on interaction) {
  <app-product-gallery [products]="products()" />
} @placeholder {
  <div class="gallery-skeleton">...</div>
}
// الخادم يُولّد HTML
// المتصفح يُحيي فقط عند تفاعل المستخدم → Performance أفضل`,
    },

    { type: 'heading', text: 'الفرق بين بيئة الخادم والمتصفح' },
    { type: 'warning', text: 'في SSR، الكود يُشغَّل أولاً على الخادم. لا يوجد window، document، localStorage، أو أي APIs متصفح على الخادم. وصولك إليها مباشرةً سيُسبب خطأ.' },
    {
      type: 'code',
      code: `import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  getStoredTheme(): string {
    // تحقق أولاً من البيئة
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme') ?? 'light';
    }
    return 'light'; // قيمة افتراضية للخادم
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// بديل أبسط — afterRender وafterNextRender
import { afterNextRender } from '@angular/core';

export class HeroComponent {
  constructor() {
    afterNextRender(() => {
      // هذا يُشغَّل فقط في المتصفح بعد الـ render
      console.log(window.innerWidth);
    });
  }
}`,
    },

    { type: 'heading', text: 'Static Site Generation (SSG)' },
    {
      type: 'code',
      code: `// angular.json — prerender configuration
{
  "prerender": {
    "discoverRoutes": true,
    "routesFile": "routes.txt"
  }
}

// routes.txt — صفحات ثابتة للمعالجة المسبقة
/
/about
/blog/post-1
/blog/post-2

// بناء SSG
ng build --prerender

// النتيجة: ملفات HTML جاهزة لكل مسار
// dist/my-app/browser/
//   index.html
//   about/index.html
//   blog/post-1/index.html`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين SSR وSSG وCSR؟',
      answer: 'CSR: HTML يُولَّد في المتصفح عبر JavaScript — بطيء في التحميل الأول، ضعيف في SEO. SSR: HTML يُولَّد على الخادم عند كل طلب — سريع، جيد لـ SEO، يحتاج خادم Node. SSG: HTML يُولَّد مرة واحدة عند البناء ويُخدَّم كملفات ثابتة — الأسرع، مثالي للمحتوى الثابت كالمدونات.',
    },
    {
      type: 'qa',
      question: 'ما هو Hydration في Angular وكيف يعمل؟',
      answer: 'Hydration هو عملية إحياء HTML الثابت القادم من الخادم. Angular v22 يفعل هذا بدون مسح DOM وإعادة بنائه — بل يُوصّل event listeners على العناصر الموجودة فعلاً. النتيجة: لا وميض (flash) ولا إعادة رسم — تجربة مستخدم أفضل بكثير.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'What is SSR and Why Use It?' },
    {
      type: 'list',
      items: [
        'CSR (default): browser loads JavaScript then generates HTML — slow first paint',
        'SSR: server generates complete HTML and sends it — much faster first paint',
        'SEO: search engines can index HTML content directly without running JavaScript',
        'Core Web Vitals: LCP (Largest Contentful Paint) improves significantly with SSR',
        'Hydration: after the HTML loads, Angular brings the app to life and adds interactivity',
      ],
    },

    { type: 'heading', text: 'SSR Setup in Angular v22' },
    {
      type: 'code',
      code: `# Add SSR to an existing project
ng add @angular/ssr

# Or when creating a new project
ng new my-app --ssr

# Files created:
# - server.ts             Express server
# - app.config.server.ts  Server-side configuration

# Run in development with SSR
ng serve --ssr

# Build for production
ng build
node dist/my-app/server/server.mjs`,
    },
    {
      type: 'code',
      code: `// app.config.ts — client
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(
      withEventReplay() // replays events that fired before hydration
    ),
  ]
};

// app.config.server.ts — server
import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);`,
    },

    { type: 'heading', text: 'Incremental Hydration with @defer' },
    {
      type: 'code',
      code: `// app.config.ts — enable Incremental Hydration
import { withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(
      withIncrementalHydration()
    ),
  ]
};

// In template — combine @defer with hydrate trigger
@defer (on viewport; hydrate on interaction) {
  <app-product-gallery [products]="products()" />
} @placeholder {
  <div class="gallery-skeleton">...</div>
}
// Server generates HTML
// Browser only hydrates on user interaction → better performance`,
    },

    { type: 'heading', text: 'Server vs Browser Environment' },
    { type: 'warning', text: 'With SSR, code runs on the server first. There is no window, document, localStorage, or any browser APIs on the server. Accessing them directly will throw an error.' },
    {
      type: 'code',
      code: `import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  getStoredTheme(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme') ?? 'light';
    }
    return 'light'; // default for server
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

// Simpler alternative — afterNextRender
import { afterNextRender } from '@angular/core';

export class HeroComponent {
  constructor() {
    afterNextRender(() => {
      // only runs in the browser after rendering
      console.log(window.innerWidth);
    });
  }
}`,
    },

    { type: 'heading', text: 'Static Site Generation (SSG)' },
    {
      type: 'code',
      code: `// angular.json — prerender configuration
{
  "prerender": {
    "discoverRoutes": true,
    "routesFile": "routes.txt"
  }
}

// routes.txt — static pages to prerender
/
/about
/blog/post-1
/blog/post-2

// Build SSG
ng build --prerender

// Output: ready HTML files for each route
// dist/my-app/browser/
//   index.html
//   about/index.html
//   blog/post-1/index.html`,
    },
    {
      type: 'qa',
      question: 'What is the difference between SSR, SSG, and CSR?',
      answer: 'CSR: HTML generated in the browser via JavaScript — slow first paint, weak SEO. SSR: HTML generated on the server per request — fast, good SEO, requires a Node server. SSG: HTML generated once at build time and served as static files — fastest, ideal for static content like blogs.',
    },
    {
      type: 'qa',
      question: 'What is Hydration in Angular and how does it work?',
      answer: 'Hydration is the process of bringing static HTML from the server to life. Angular v22 does this without wiping the DOM and rebuilding it — instead it attaches event listeners to existing elements. Result: no flash, no repaint — much better user experience.',
    },
  ],
};
