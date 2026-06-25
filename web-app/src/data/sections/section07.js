// Section 7 — Signals Fundamentals
export default {
  id: 7,
  title: 'أساسيات Signals',
  titleEn: 'Signals Fundamentals',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'Signals هي المفهوم الأهم في Angular الحديث. إنها تستبدل كشف التغييرات المبني على Zone.js بأساسي تفاعلي دقيق — عندما تتغير قيمة Signal، فقط المكوّنات والحسابات التي تعتمد عليها تُحدَّث. هذا القسم يبني فهماً عميقاً للـ Signals من الصفر.',
  introEn: 'Signals are the single most important concept in modern Angular. They replace Zone.js-based change detection with a precise, reactive primitive — when a Signal\'s value changes, only the components and computations that depend on it update. This section builds a deep understanding of Signals from scratch.',

  lessons: [
    'ما هي Signals؟',
    'إنشاء Signals',
    'قراءة Signals',
    'تحديث Signals',
    'computed Signals',
    'effect',
    'Signals مقابل RxJS',
    'أفضل ممارسات Signals',
  ],
  lessonsEn: [
    'What are Signals?',
    'Creating Signals',
    'Reading Signals',
    'Updating Signals',
    'computed Signals',
    'effect',
    'Signals vs RxJS',
    'Signals Best Practices',
  ],

  content: [
    { type: 'heading', text: 'ما هي Signals؟' },
    { type: 'paragraph', text: 'Signal هو حاوية قيمة تفاعلية. تحمل قيمة وتتتبع من يقرأها. عندما تتغير القيمة، كل من قرأها يُخطَّر ويُحدَّث تلقائياً.' },
    {
      type: 'code',
      code: `import { signal } from '@angular/core';

// إنشاء Signal بقيمة ابتدائية
const count = signal(0);

// قراءة القيمة — استدعاء كدالة
console.log(count());   // 0

// تحديث القيمة — كل القراء يُخطَّرون
count.set(5);
console.log(count());   // 5`,
    },
    {
      type: 'list',
      items: [
        'signal(value) — ينشئ حاوية قيمة تفاعلية قابلة للكتابة',
        'computed(() => …) — Signal مشتق، يتحدث تلقائياً عند تغيير الاعتماديات',
        'effect(() => …) — يُشغّل تأثيراً جانبياً عند تغيير الـ Signals',
      ],
    },
    { type: 'tip', text: 'فكّر في Signal كـ "متغير ذكي" يعرف من يقرأه. عندما تتغير قيمته، يُخبر كل القراء: "تحتاج لإعادة التقييم."' },

    { type: 'heading', text: 'إنشاء Signals' },
    {
      type: 'code',
      code: `import { signal, Injectable, computed } from '@angular/core';

// أنواع بدائية
const name    = signal('أحمد');               // WritableSignal<string>
const age     = signal(25);                  // WritableSignal<number>
const isAdmin = signal(false);               // WritableSignal<boolean>

// مع نوع صريح
type Status = 'idle' | 'loading' | 'success' | 'error';
const status = signal<Status>('idle');

// مصفوفات وكائنات
const items = signal<string[]>([]);
const user  = signal<{ name: string; email: string } | null>(null);

// في الخدمات — Pattern الموصى به
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  // اكشف Signal للقراءة فقط
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(user: User)  { this._user.set(user); }
  logout()           { this._user.set(null); }
}`,
    },

    { type: 'heading', text: 'قراءة Signals' },
    { type: 'paragraph', text: 'قراءة Signal دائماً بنفس الطريقة: استدعِه كدالة. التتبع يحدث فقط داخل السياق التفاعلي (computed، effect، القوالب).' },
    {
      type: 'code',
      code: `const count = signal(10);

// في TypeScript — خارج السياق التفاعلي
const value = count();  // 10 — لا تتبع

// في computed — سياق تفاعلي
const double = computed(() => count() * 2);  // يُتتبع

// في القالب — دائماً سياق تفاعلي
// <p>{{ count() }}</p>
// <p [class.hidden]="!isVisible()">عنصر مشروط</p>

// toSignal: تحويل Observable إلى Signal
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
const tick = toSignal(interval(1000), { initialValue: 0 });
// tick() يُرجع آخر قيمة مُرسَلة`,
    },

    { type: 'heading', text: 'تحديث Signals' },
    {
      type: 'code',
      code: `const count = signal(0);

// .set() — استبدل القيمة كاملاً
count.set(5);

// .update() — احسب القيمة الجديدة من القديمة
count.update(n => n + 1);   // 6
count.update(n => n * 10);  // 60

// مع المصفوفات — دائماً بمرجعية جديدة (لـ OnPush)
const items = signal<string[]>(['أنجولار', 'TypeScript']);
items.update(arr => [...arr, 'Signals']);   // مرجعية جديدة ✓
// items.push('Signals') — خطأ! تعديل في المكان ✗

// مع الكائنات — spread لمرجعية جديدة
const user = signal({ name: 'أحمد', score: 0 });
user.update(u => ({ ...u, score: u.score + 10 }));`,
    },
    { type: 'warning', text: 'تذكر: Angular OnPush (الافتراضي في v22) يُلاحظ التغييرات فقط عند تغيير المرجعية. دائماً استخدم .update(arr => [...arr, item]) للمصفوفات، لا .push().' },

    { type: 'heading', text: 'computed Signals' },
    { type: 'paragraph', text: 'computed Signal يشتق قيمته تلقائياً من Signals أخرى. يُعيد الحساب فقط عند تغيير اعتمادياته. كسول (Lazy) ومُخزَّن مؤقتاً (Memoized).' },
    {
      type: 'code',
      code: `import { signal, computed } from '@angular/core';

const price    = signal(100);
const quantity = signal(3);
const discount = signal(0.1);

// يتحدث تلقائياً عند تغيير أي من الاعتماديات
const subtotal = computed(() => price() * quantity());
const total    = computed(() => subtotal() * (1 - discount()));

console.log(subtotal());  // 300
console.log(total());     // 270

price.set(120);
console.log(subtotal());  // 360 — أُعيد حسابه
console.log(total());     // 324 — أُعيد حسابه

// في المكوّن
export class CartComponent {
  items   = signal<CartItem[]>([]);
  taxRate = signal(0.08);

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );
  tax   = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.tax());
}`,
    },

    { type: 'heading', text: 'effect' },
    { type: 'paragraph', text: 'effect هو دالة تُشغَّل عند تغيير اعتمادياتها من Signals. استخدمه للتأثيرات الجانبية — تسجيل، localStorage، DOM.' },
    {
      type: 'code',
      code: `import { Component, signal, effect } from '@angular/core';

@Component({ ... })
export class ThemeSwitcherComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // يُشغَّل فوراً ثم عند كل تغيير لـ theme()
    effect(() => {
      document.body.classList.toggle('dark', this.theme() === 'dark');
      localStorage.setItem('theme', this.theme());
    });
  }
}

// قاعدة مهمة: لا تُحدِّث signals داخل effect
// effect(() => { this.double.set(this.count() * 2); }); // خطأ! استخدم computed
double = computed(() => this.count() * 2);  // صحيح`,
    },
    { type: 'warning', text: 'قاعدة أساسية: لا تستخدم effect() للقيم المشتقة — هذا ما computed() موجود من أجله. effect() للتأثيرات الجانبية الخارجية فقط (localStorage، DOM، analytics).' },

    { type: 'heading', text: 'Signals مقابل RxJS' },
    {
      type: 'list',
      items: [
        'Signals: مزامن، إدارة حالة UI، سهل الاستخدام، لا يحتاج unsubscribe',
        'RxJS: لاتزامني، تدفقات أحداث، عمليات معقدة (debounce، switchMap، retry)',
        'استخدم Signals لحالة المكوّنات والخدمات وما يُعرض في القوالب',
        'استخدم RxJS للـ HTTP، WebSockets، والأحداث المعقدة',
        'toSignal() لتحويل Observable إلى Signal للقوالب',
        'toObservable() لتحويل Signal إلى Observable لعمليات RxJS',
      ],
    },
    {
      type: 'qa',
      question: 'ما الفرق بين signal() وcomputed() وeffect()؟ اذكر الغرض الرئيسي من كل منها بجملة واحدة.',
      answer: 'signal(v) — ينشئ حاوية قيمة تفاعلية قابلة للكتابة. computed(() => expr) — ينشئ قيمة مشتقة للقراءة فقط تتحدث تلقائياً عند تغيير اعتمادياتها (كسول + مُخزَّن مؤقتاً). effect(() => side) — يُشغّل تأثيراً جانبياً عند تغيير اعتمادياته.',
    },
    {
      type: 'qa',
      question: 'لماذا يجب استخدام .update(arr => [...arr, item]) بدلاً من .push() مع المصفوفات في مكوّنات OnPush؟',
      answer: '.push() يُعدّل المصفوفة في مكانها دون تغيير المرجعية. OnPush يُلاحظ التغييرات فقط عند تغيير المرجعية — فإذا بقيت المرجعية ذاتها، لن يُعيد Angular رسم المكوّن. .update(arr => [...arr, item]) ينشئ مصفوفة جديدة بمرجعية جديدة يكتشفها OnPush.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'What are Signals?' },
    { type: 'paragraph', text: 'A Signal is a reactive value container. It holds a value and tracks who reads it. When the value changes, everyone who read it is notified and updated automatically.' },
    {
      type: 'code',
      code: `import { signal } from '@angular/core';

// Create a signal with initial value
const count = signal(0);

// Read it — call it as a function
console.log(count());   // 0

// Update it — all readers are notified
count.set(5);
console.log(count());   // 5`,
    },
    {
      type: 'list',
      items: [
        'signal(value) — creates a writable reactive value container',
        'computed(() => …) — derived signal, auto-updates when dependencies change',
        'effect(() => …) — runs a side effect when its signals change',
      ],
    },
    { type: 'tip', text: 'Think of a Signal as a "smart variable" that knows who is reading it. When its value changes, it tells all readers: "You need to re-evaluate."' },

    { type: 'heading', text: 'Creating Signals' },
    {
      type: 'code',
      code: `import { signal, Injectable, computed } from '@angular/core';

// Primitive types
const name    = signal('Alice');               // WritableSignal<string>
const age     = signal(25);                   // WritableSignal<number>
const isAdmin = signal(false);                // WritableSignal<boolean>

// With explicit type
type Status = 'idle' | 'loading' | 'success' | 'error';
const status = signal<Status>('idle');

// Arrays and objects
const items = signal<string[]>([]);
const user  = signal<{ name: string; email: string } | null>(null);

// In services — recommended pattern
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  // Expose read-only signal to the outside
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(user: User)  { this._user.set(user); }
  logout()           { this._user.set(null); }
}`,
    },

    { type: 'heading', text: 'Reading Signals' },
    { type: 'paragraph', text: 'Reading a Signal is always the same: call it as a function. Tracking only happens inside a reactive context (computed, effect, templates).' },
    {
      type: 'code',
      code: `const count = signal(10);

// In TypeScript — outside reactive context: just a snapshot
const value = count();  // 10 — no tracking

// In computed — reactive context: tracked
const double = computed(() => count() * 2);

// In templates — always reactive:
// <p>{{ count() }}</p>

// toSignal: convert Observable to Signal
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
const tick = toSignal(interval(1000), { initialValue: 0 });
// tick() returns the latest emitted value`,
    },

    { type: 'heading', text: 'Updating Signals' },
    {
      type: 'code',
      code: `const count = signal(0);

// .set() — replace the value entirely
count.set(5);

// .update() — compute new value from old
count.update(n => n + 1);   // 6
count.update(n => n * 10);  // 60

// Arrays — always with new reference (for OnPush)
const items = signal<string[]>(['Angular', 'TypeScript']);
items.update(arr => [...arr, 'Signals']);   // new reference ✓
// items().push('Signals') — WRONG! mutates in place ✗

// Objects — spread for new reference
const user = signal({ name: 'Alice', score: 0 });
user.update(u => ({ ...u, score: u.score + 10 }));`,
    },
    { type: 'warning', text: 'Remember: Angular OnPush (v22 default) only detects changes when the reference changes. Always use .update(arr => [...arr, item]) for arrays, never .push().' },

    { type: 'heading', text: 'computed Signals' },
    { type: 'paragraph', text: 'A computed signal automatically derives its value from other signals. It re-evaluates only when its dependencies change. It is lazy (runs on first read) and memoized (cached until dependencies change).' },
    {
      type: 'code',
      code: `import { signal, computed } from '@angular/core';

const price    = signal(100);
const quantity = signal(3);
const discount = signal(0.1);

// Auto-updates when any dependency changes
const subtotal = computed(() => price() * quantity());
const total    = computed(() => subtotal() * (1 - discount()));

console.log(subtotal());  // 300
console.log(total());     // 270

price.set(120);
console.log(subtotal());  // 360 — recomputed
console.log(total());     // 324 — recomputed

// In a component
export class CartComponent {
  items   = signal<CartItem[]>([]);
  taxRate = signal(0.08);

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );
  tax   = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.tax());
}`,
    },

    { type: 'heading', text: 'effect' },
    { type: 'paragraph', text: 'An effect is a function that runs whenever its Signal dependencies change. Use it for side effects — logging, localStorage, analytics, DOM manipulation.' },
    {
      type: 'code',
      code: `import { Component, signal, effect } from '@angular/core';

@Component({ ... })
export class ThemeSwitcherComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // Runs immediately, then again whenever theme() changes
    effect(() => {
      document.body.classList.toggle('dark', this.theme() === 'dark');
      localStorage.setItem('theme', this.theme());
    });
  }
}

// Key rule: don't update signals inside effect
// effect(() => { this.double.set(this.count() * 2); }); // WRONG!
double = computed(() => this.count() * 2);  // CORRECT`,
    },
    { type: 'warning', text: 'Core rule: never use effect() for derived values — that\'s what computed() is for. effect() is only for external side effects (localStorage, DOM, analytics).' },

    { type: 'heading', text: 'Signals vs RxJS' },
    {
      type: 'list',
      items: [
        'Signals: synchronous, UI state management, simple API, no unsubscribe needed',
        'RxJS: async streams, event pipelines, rich operators (debounce, switchMap, retry)',
        'Use Signals for component/service state and anything displayed in templates',
        'Use RxJS for HTTP, WebSockets, and complex event handling',
        'toSignal() converts an Observable to a Signal for template binding',
        'toObservable() converts a Signal to an Observable for RxJS operators',
      ],
    },
    {
      type: 'qa',
      question: 'What is the difference between signal(), computed(), and effect()? Give the one-line purpose of each.',
      answer: 'signal(v) — creates a writable reactive value container. computed(() => expr) — creates a read-only derived value that auto-updates when its signal dependencies change (lazy + memoized). effect(() => side) — runs a side effect function whenever its signal dependencies change.',
    },
    {
      type: 'qa',
      question: 'Why must you use .update(arr => [...arr, item]) instead of .push() when working with arrays in OnPush components?',
      answer: '.push() modifies the array in place without changing its reference. OnPush change detection only re-checks a component when input references change. Since .push() doesn\'t change the reference, Angular won\'t re-render. .update(arr => [...arr, item]) creates a new array with a new reference, which OnPush detects correctly.',
    },
  ],
};
