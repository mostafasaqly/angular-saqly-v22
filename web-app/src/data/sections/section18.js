// Section 18 — Performance and Optimization
export default {
  id: 18,
  title: 'الأداء والتحسين',
  titleEn: 'Performance and Optimization',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'Angular v22 يأتي بأداء ممتاز افتراضياً بفضل Signals وZoneless. هذا القسم يغطي أبرز تقنيات تحسين الأداء: OnPush، Lazy Loading، التحميل المؤجل للصور، ودمج Profiler لقياس الأداء.',
  introEn: 'Angular v22 delivers excellent performance by default thanks to Signals and Zoneless mode. This section covers the top performance optimization techniques: OnPush, Lazy Loading, deferred image loading, and using the Profiler to measure performance.',

  lessons: [
    'لماذا Signals تُحسّن الأداء؟',
    'ChangeDetectionStrategy.OnPush',
    'Zoneless Angular (provideZonelessChangeDetection)',
    'Lazy Loading للمكوّنات والمسارات',
    '@defer — التحميل المؤجل للمكوّنات',
    'NgOptimizedImage للصور',
    'trackBy وعمليات @for الفعّالة',
    'قياس الأداء بأدوات المتصفح',
  ],
  lessonsEn: [
    'Why Signals Improve Performance',
    'ChangeDetectionStrategy.OnPush',
    'Zoneless Angular (provideZonelessChangeDetection)',
    'Lazy Loading Components and Routes',
    '@defer — Deferred Component Loading',
    'NgOptimizedImage for Images',
    'trackBy and Efficient @for',
    'Measuring Performance with Browser Tools',
  ],

  content: [
    { type: 'heading', text: 'لماذا Signals تُحسّن الأداء؟' },
    { type: 'paragraph', text: 'في Angular القديمة، Zone.js يُشغّل كشف التغييرات على كل الشجرة عند أي حدث. مع Signals:' },
    {
      type: 'list',
      items: [
        'كشف التغييرات يحدث فقط في المكوّنات التي تقرأ Signal تغيّرت قيمتها',
        'لا حاجة لـ markForCheck() أو detectChanges() — الإطار يتكفل بكل شيء',
        'مع provideZonelessChangeDetection()، تتخلص من Zone.js كلياً',
        'computed() يُعيد حساب قيمته فقط عند تغيير أحد المدخلات',
        'النتيجة: أداء أسرع بكثير في التطبيقات الكبيرة',
      ],
    },

    { type: 'heading', text: 'ChangeDetectionStrategy.OnPush' },
    { type: 'paragraph', text: 'OnPush يخبر Angular: "تحقق من هذا المكوّن فقط عند تغيير المدخلات أو حدوث حدث داخله أو إشارة Signal." القاعدة: ضعه على كل مكوّن.' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // ← دائماً
  template: \`
    <div class="card">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
      @if (isExpanded()) {
        <div>{{ user().bio }}</div>
      }
      <button (click)="toggle()">
        {{ isExpanded() ? 'أخفِ' : 'أظهر' }} التفاصيل
      </button>
    </div>
  \`
})
export class UserCardComponent {
  user       = input.required<User>();
  isExpanded = signal(false);

  toggle() { this.isExpanded.update(v => !v); }
}`,
    },

    { type: 'heading', text: 'Zoneless Angular' },
    {
      type: 'code',
      code: `// app.config.ts — تفعيل الوضع Zoneless
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // احذف provideZone() إذا كانت موجودة
  ]
};

// package.json — احذف zone.js من polyfills
// angular.json — أزل "zone.js" من polyfills

// النتيجة:
// - حزمة أصغر (zone.js ≈ 11KB)
// - بدء تشغيل أسرع
// - لا monkey-patching للـ browser APIs
// - كشف تغييرات دقيق فقط عبر Signals`,
    },
    { type: 'tip', text: 'Zoneless هو الاتجاه المستقبلي لـ Angular. إذا كان تطبيقك يستخدم Signals بشكل كامل، يمكنك التحويل الآن بثقة.' },

    { type: 'heading', text: '@defer — التحميل المؤجل للمكوّنات' },
    {
      type: 'code',
      code: `<!-- تحميل مؤجل حتى يُصبح المكوّن مرئياً -->
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="skeleton" style="height: 300px"></div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>فشل تحميل الرسم البياني</p>
}

<!-- تحميل عند تفاعل المستخدم -->
@defer (on interaction) {
  <app-comments [postId]="postId()" />
} @placeholder {
  <button>عرض التعليقات</button>
}

<!-- تحميل بعد تأخير -->
@defer (on timer(3s)) {
  <app-newsletter-banner />
}`,
    },

    { type: 'heading', text: 'NgOptimizedImage للصور' },
    {
      type: 'code',
      code: `// في المكوّن — استيراد NgOptimizedImage
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: \`
    <!-- صورة فوق الطي — أولوية عالية -->
    <img
      ngSrc="/assets/hero.webp"
      width="1200"
      height="600"
      priority
      alt="صورة رئيسية"
    />

    <!-- صورة تحت الطي — تحميل كسول -->
    <img
      ngSrc="/assets/product.webp"
      width="400"
      height="300"
      alt="منتج"
    />
    <!-- Angular يُضيف تلقائياً: loading="lazy", srcset, sizes -->
  \`
})
export class HeroComponent { }`,
    },
    {
      type: 'qa',
      question: 'لماذا يُعدّ @defer أفضل من *ngIf للمكوّنات الثقيلة؟',
      answer: '*ngIf يُخفي أو يُظهر المكوّن لكن الكود الخاص به يُحمَّل دائماً في bundle الرئيسي. @defer يُقسّم الكود (code splitting) ويُحمّله فعلياً فقط عند الحاجة — يُقلّل حجم الـ bundle الأولي بشكل كبير.',
    },
    {
      type: 'qa',
      question: 'متى يجب إضافة ChangeDetectionStrategy.OnPush؟',
      answer: 'على كل مكوّن بشكل افتراضي في v22. مع Signals، كل التحديثات تعمل بشكل صحيح مع OnPush دون أي جهد إضافي. لا يوجد سبب لعدم استخدامه — فوائده دائماً تتجاوز تكلفته الصفرية.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Why Signals Improve Performance' },
    { type: 'paragraph', text: 'In older Angular, Zone.js triggers change detection on the whole tree for any event. With Signals:' },
    {
      type: 'list',
      items: [
        'Change detection only runs on components that read a Signal whose value changed',
        'No need for markForCheck() or detectChanges() — the framework handles everything',
        'With provideZonelessChangeDetection(), you eliminate Zone.js entirely',
        'computed() only recalculates when one of its inputs changes',
        'Result: significantly faster performance in large applications',
      ],
    },

    { type: 'heading', text: 'ChangeDetectionStrategy.OnPush' },
    { type: 'paragraph', text: 'OnPush tells Angular: "only check this component when inputs change, an event occurs inside it, or a Signal it reads changes." Rule: put it on every component.' },
    {
      type: 'code',
      code: `import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // ← always
  template: \`
    <div class="card">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
      @if (isExpanded()) { <div>{{ user().bio }}</div> }
      <button (click)="toggle()">
        {{ isExpanded() ? 'Hide' : 'Show' }} details
      </button>
    </div>
  \`
})
export class UserCardComponent {
  user       = input.required<User>();
  isExpanded = signal(false);
  toggle()   { this.isExpanded.update(v => !v); }
}`,
    },

    { type: 'heading', text: 'Zoneless Angular' },
    {
      type: 'code',
      code: `// app.config.ts — enable Zoneless mode
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
  ]
};

// Remove zone.js from polyfills in angular.json
// Benefits:
// - Smaller bundle (zone.js ≈ 11KB saved)
// - Faster startup
// - No monkey-patching of browser APIs
// - Precise change detection driven purely by Signals`,
    },
    { type: 'tip', text: 'Zoneless is the future direction of Angular. If your application uses Signals fully, you can make the switch now with confidence.' },

    { type: 'heading', text: '@defer — Deferred Component Loading' },
    {
      type: 'code',
      code: `<!-- Defer until the component enters the viewport -->
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="skeleton" style="height: 300px"></div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>Failed to load chart</p>
}

<!-- Defer until user interaction -->
@defer (on interaction) {
  <app-comments [postId]="postId()" />
} @placeholder {
  <button>Show comments</button>
}

<!-- Defer with a timer -->
@defer (on timer(3s)) {
  <app-newsletter-banner />
}`,
    },

    { type: 'heading', text: 'NgOptimizedImage for Images' },
    {
      type: 'code',
      code: `import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: \`
    <!-- Above-the-fold image — high priority -->
    <img
      ngSrc="/assets/hero.webp"
      width="1200"
      height="600"
      priority
      alt="Hero image"
    />

    <!-- Below-the-fold image — lazy loaded -->
    <img
      ngSrc="/assets/product.webp"
      width="400"
      height="300"
      alt="Product"
    />
    <!-- Angular automatically adds: loading="lazy", srcset, sizes -->
  \`
})
export class HeroComponent { }`,
    },
    {
      type: 'qa',
      question: 'Why is @defer better than *ngIf for heavy components?',
      answer: '*ngIf shows or hides the component but its code is always included in the main bundle. @defer does code splitting — the component code is only loaded when it is actually needed — significantly reducing the initial bundle size.',
    },
    {
      type: 'qa',
      question: 'When should you add ChangeDetectionStrategy.OnPush?',
      answer: 'On every component, by default, in v22. With Signals, all updates work correctly with OnPush without any extra work. There is no reason not to use it — the benefits always outweigh the zero cost.',
    },
  ],
};
