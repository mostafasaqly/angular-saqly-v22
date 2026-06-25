// Section 10 — Services and Dependency Injection
export default {
  id: 10,
  title: 'Services and Dependency Injection',
  titleEn: 'Services and Dependency Injection',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'Services هي فئات TypeScript تحمل المنطق والبيانات المشتركة عبر Components. Dependency Injection (DI) هو النظام الذي يُنشئ ويوفر هذه Services تلقائياً. هذا القسم يغطي إنشاء Services، inject()، نطاقات الخدمة، Signals في Services، وأنماط State Management.',
  introEn: 'Services are TypeScript classes that hold shared logic and data across components. Dependency Injection (DI) is the system that creates and provides these services automatically. This section covers creating services, inject(), service scopes, Signals in services, and state management patterns.',

  lessons: [
    'ما هي Services؟',
    'إنشاء Service',
    'inject() — الطريقة المفضّلة في v22',
    'Service Scopes',
    'Signals في Services',
    'State Management Pattern',
    'Service Hierarchies and DI',
    'Testing Services',
  ],
  lessonsEn: [
    'What are Services?',
    'Creating a Service',
    'inject() — The v22 Preferred Way',
    'Service Scopes',
    'Signals in Services',
    'State Management Pattern',
    'Service Hierarchies and DI',
    'Testing Services',
  ],

  content: [
    { type: 'heading', text: 'ما هي Services؟' },
    { type: 'paragraph', text: 'الخدمة هي فئة TypeScript مزيّنة بـ @Injectable تحمل: المنطق المشترك (HTTP، حسابات، تحويلات)، الحالة المشتركة بين Components (سلة المشتريات، المستخدم الحالي)، أو التجريد عن واجهات API خارجية.' },
    {
      type: 'list',
      items: [
        'يمكن حقنها في أي مكوّن أو خدمة أخرى',
        'providedIn: "root" → singleton واحد لكامل التطبيق',
        'تفصل المنطق عن طبقة العرض',
        'قابلة للاختبار بسهولة — يمكن استبدالها بـ mock في Tests',
      ],
    },

    { type: 'heading', text: 'إنشاء خدمة' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',   // singleton عالمي — نسخة واحدة للتطبيق بأكمله
})
export class CounterService {
  private _count = signal(0);

  // كشف للقراءة فقط — Components لا يمكنها التعديل مباشرةً
  readonly count = this._count.asReadonly();
  readonly double = computed(() => this._count() * 2);

  increment(): void { this._count.update(n => n + 1); }
  decrement(): void { this._count.update(n => n - 1); }
  reset(): void     { this._count.set(0); }
}

// توليد خدمة بواسطة CLI:
// ng generate service counter
// ng g s counter`,
    },

    { type: 'heading', text: 'inject() — الطريقة المفضّلة في v22' },
    { type: 'paragraph', text: 'في Angular v22، inject() هو الطريقة المفضّلة لDependency Injection بدلاً من constructor injection.' },
    {
      type: 'code',
      code: `import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>العداد: {{ counter.count() }}</p>
    <p>المضاعف: {{ counter.double() }}</p>
    <button (click)="counter.increment()">+1</button>
    <button (click)="counter.decrement()">-1</button>
    <button (click)="counter.reset()">إعادة</button>
  \`
})
export class CounterComponent {
  // inject() بدلاً من constructor(private counter: CounterService)
  counter = inject(CounterService);
}`,
    },
    { type: 'tip', text: 'inject() يمكن استخدامه في أي سياق حقن نشط: حقل الفئة، constructor، و في Angular v22 أيضاً داخل effect() وcomputed() وغيرها.' },

    { type: 'heading', text: 'Signals في Services' },
    { type: 'paragraph', text: 'Services مع Signals هي نمط State Management المفضّل في Angular v22 للتطبيقات المتوسطة والكبيرة.' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed, effect } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';
  private _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items    = this._items.asReadonly();
  readonly count    = computed(() => this._items().reduce((s, i) => s + i.quantity, 0));
  readonly subtotal = computed(() => this._items().reduce((s, i) => s + i.price * i.quantity, 0));

  constructor() {
    // حفظ تلقائي عند كل تغيير
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  addItem(item: Omit<CartItem, 'quantity'>): void {
    this._items.update(items => {
      const existing = items.find(i => i.id === item.id);
      if (existing) {
        return items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { ...item, quantity: 1 }];
    });
  }

  removeItem(id: number): void {
    this._items.update(items => items.filter(i => i.id !== id));
  }

  clear(): void { this._items.set([]); }

  private loadFromStorage(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}`,
    },

    { type: 'heading', text: 'نطاقات الخدمة' },
    {
      type: 'list',
      items: [
        'providedIn: "root" — singleton عالمي، نسخة واحدة لكامل التطبيق (الأكثر شيوعاً)',
        'providers: [MyService] في @Component — نسخة محلية للمكوّن وأبنائه',
        'providers: [...] في Routing — نسخة خاصة لكل مسار',
        'لا توجد طريقة لـ "feature module scope" في standalone — استخدم route providers',
      ],
    },

    { type: 'heading', text: 'نمط State Management' },
    { type: 'paragraph', text: 'Services + Signals = إدارة حالة بسيطة وقوية لمعظم التطبيقات. لا تحتاج NgRx إلا عند التعقيد الشديد.' },
    {
      type: 'code',
      code: `// ✅ نمط موصى به: خدمة بسيطة مع Signals
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<'light' | 'dark'>('light');

  readonly theme  = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  toggle(): void {
    const next = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
}

// في أي مكوّن:
@Component({ ... })
export class HeaderComponent {
  theme = inject(ThemeService);
}
// القالب: [class.dark]="theme.isDark()"
//          (click)="theme.toggle()"`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين providedIn: "root" وإضافة الخدمة في providers مكوّن؟',
      answer: 'providedIn: "root" يُنشئ singleton واحداً يُشاركه كامل التطبيق — جميع Components تحصل على نفس النسخة. إضافة الخدمة في providers مكوّن يُنشئ نسخة جديدة مستقلة للمكوّن وأبنائه — تُدمَّر مع دمار المكوّن. مثالي لخدمات تحتاج حالة محلية.',
    },
    {
      type: 'qa',
      question: 'لماذا يُفضَّل inject() على constructor injection في Angular v22؟',
      answer: 'inject() أكثر مرونة — يمكن استخدامه في حقول الفئة (field initializers) مما يُمكّن كتابة كود أكثر إيجازاً. يعمل أيضاً خارج الـ constructor في بعض السياقات. لا يحتاج لتعريف نوع صريح في constructor parameters. والأهم: يعمل بشكل أفضل مع TypeScript strict mode.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'What are Services?' },
    { type: 'paragraph', text: 'A service is a TypeScript class decorated with @Injectable that holds: shared logic (HTTP, calculations, transformations), shared state across components (cart, current user), or abstractions over external APIs.' },
    {
      type: 'list',
      items: [
        'Injectable into any component or other service',
        'providedIn: "root" → one singleton for the entire application',
        'Separates business logic from the presentation layer',
        'Easy to test — can be replaced with mocks in tests',
      ],
    },

    { type: 'heading', text: 'Creating a Service' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',   // global singleton — one instance for the whole app
})
export class CounterService {
  private _count = signal(0);

  // Read-only exposure — components can't directly mutate
  readonly count  = this._count.asReadonly();
  readonly double = computed(() => this._count() * 2);

  increment(): void { this._count.update(n => n + 1); }
  decrement(): void { this._count.update(n => n - 1); }
  reset(): void     { this._count.set(0); }
}

// Generate a service with the CLI:
// ng generate service counter
// ng g s counter`,
    },

    { type: 'heading', text: 'inject() — The v22 Preferred Way' },
    { type: 'paragraph', text: 'In Angular v22, inject() is the preferred way to inject dependencies instead of constructor injection.' },
    {
      type: 'code',
      code: `import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>Count: {{ counter.count() }}</p>
    <p>Double: {{ counter.double() }}</p>
    <button (click)="counter.increment()">+1</button>
    <button (click)="counter.decrement()">-1</button>
    <button (click)="counter.reset()">Reset</button>
  \`
})
export class CounterComponent {
  // inject() instead of constructor(private counter: CounterService)
  counter = inject(CounterService);
}`,
    },
    { type: 'tip', text: 'inject() can be used in any active injection context: class field initializers, constructor, and in Angular v22 also inside effect() and computed().' },

    { type: 'heading', text: 'Signals in Services' },
    { type: 'paragraph', text: 'Services with Signals are the preferred state management pattern in Angular v22 for most applications.' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed, effect } from '@angular/core';

interface CartItem {
  id: number; name: string; price: number; quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'cart_items';
  private _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items    = this._items.asReadonly();
  readonly count    = computed(() => this._items().reduce((s, i) => s + i.quantity, 0));
  readonly subtotal = computed(() => this._items().reduce((s, i) => s + i.price * i.quantity, 0));

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  addItem(item: Omit<CartItem, 'quantity'>): void {
    this._items.update(items => {
      const existing = items.find(i => i.id === item.id);
      if (existing) {
        return items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...item, quantity: 1 }];
    });
  }

  removeItem(id: number): void {
    this._items.update(items => items.filter(i => i.id !== id));
  }

  clear(): void { this._items.set([]); }

  private loadFromStorage(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]'); }
    catch { return []; }
  }
}`,
    },

    { type: 'heading', text: 'Service Scopes' },
    {
      type: 'list',
      items: [
        'providedIn: "root" — global singleton, one instance for the whole app (most common)',
        'providers: [MyService] in @Component — new instance scoped to that component and its children',
        'providers: [...] in route config — new instance per route navigation',
        'No "feature module scope" in standalone — use route providers instead',
      ],
    },

    { type: 'heading', text: 'State Management Pattern' },
    {
      type: 'code',
      code: `// ✅ Recommended pattern: simple service with Signals
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<'light' | 'dark'>('light');

  readonly theme  = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  toggle(): void {
    const next = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
}

// In any component:
@Component({ ... })
export class HeaderComponent {
  theme = inject(ThemeService);
}
// Template: [class.dark]="theme.isDark()"
//           (click)="theme.toggle()"`,
    },
    {
      type: 'qa',
      question: 'What is the difference between providedIn: "root" and adding a service to a component\'s providers array?',
      answer: 'providedIn: "root" creates a single singleton shared by the entire application — all components get the same instance. Adding to a component\'s providers creates a new, independent instance scoped to that component and its children — destroyed when the component is destroyed. Use component providers for services that need local, isolated state.',
    },
    {
      type: 'qa',
      question: 'Why is inject() preferred over constructor injection in Angular v22?',
      answer: 'inject() is more flexible — it can be used in class field initializers, enabling more concise code. It also works in some contexts outside the constructor. It doesn\'t require explicit type declarations in constructor parameters. Most importantly: it works better with TypeScript strict mode and enables cleaner functional patterns.',
    },
  ],
};
