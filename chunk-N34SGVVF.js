import"./chunk-JS3ZFT6L.js";var e={id:10,title:"Services \u0648Dependency Injection",titleEn:"Services and Dependency Injection",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"Services \u0647\u064A \u0641\u0626\u0627\u062A TypeScript \u062A\u062D\u0645\u0644 \u0627\u0644\u0645\u0646\u0637\u0642 \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u0629 \u0639\u0628\u0631 Components. Dependency Injection (DI) \u0647\u0648 \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0630\u064A \u064A\u064F\u0646\u0634\u0626 \u0648\u064A\u0648\u0641\u0631 \u0647\u0630\u0647 Services \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0625\u0646\u0634\u0627\u0621 Services\u060C inject()\u060C \u0646\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u062E\u062F\u0645\u0629\u060C Signals \u0641\u064A Services\u060C \u0648\u0623\u0646\u0645\u0627\u0637 State Management.",introEn:"Services are TypeScript classes that hold shared logic and data across components. Dependency Injection (DI) is the system that creates and provides these services automatically. This section covers creating services, inject(), service scopes, Signals in services, and state management patterns.",lessons:["\u0645\u0627 \u0647\u064A Services\u061F","\u0625\u0646\u0634\u0627\u0621 \u062E\u062F\u0645\u0629","inject() \u2014 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629 \u0641\u064A v22","\u0646\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u062E\u062F\u0645\u0629","Signals \u0641\u064A Services","\u0646\u0645\u0637 State Management","Services \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0629 \u0645\u0642\u0627\u0628\u0644 Dependency Injection","\u0627\u062E\u062A\u0628\u0627\u0631 Services"],lessonsEn:["What are Services?","Creating a Service","inject() \u2014 The v22 Preferred Way","Service Scopes","Signals in Services","State Management Pattern","Service Hierarchies and DI","Testing Services"],content:[{type:"heading",text:"\u0645\u0627 \u0647\u064A Services\u061F"},{type:"paragraph",text:"\u0627\u0644\u062E\u062F\u0645\u0629 \u0647\u064A \u0641\u0626\u0629 TypeScript \u0645\u0632\u064A\u0651\u0646\u0629 \u0628\u0640 @Injectable \u062A\u062D\u0645\u0644: \u0627\u0644\u0645\u0646\u0637\u0642 \u0627\u0644\u0645\u0634\u062A\u0631\u0643 (HTTP\u060C \u062D\u0633\u0627\u0628\u0627\u062A\u060C \u062A\u062D\u0648\u064A\u0644\u0627\u062A)\u060C \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u0629 \u0628\u064A\u0646 Components (\u0633\u0644\u0629 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A\u060C \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u064A)\u060C \u0623\u0648 \u0627\u0644\u062A\u062C\u0631\u064A\u062F \u0639\u0646 \u0648\u0627\u062C\u0647\u0627\u062A API \u062E\u0627\u0631\u062C\u064A\u0629."},{type:"list",items:["\u064A\u0645\u0643\u0646 \u062D\u0642\u0646\u0647\u0627 \u0641\u064A \u0623\u064A \u0645\u0643\u0648\u0651\u0646 \u0623\u0648 \u062E\u062F\u0645\u0629 \u0623\u062E\u0631\u0649",'providedIn: "root" \u2192 singleton \u0648\u0627\u062D\u062F \u0644\u0643\u0627\u0645\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642',"\u062A\u0641\u0635\u0644 \u0627\u0644\u0645\u0646\u0637\u0642 \u0639\u0646 \u0637\u0628\u0642\u0629 \u0627\u0644\u0639\u0631\u0636","\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0633\u0647\u0648\u0644\u0629 \u2014 \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u0628\u062F\u0627\u0644\u0647\u0627 \u0628\u0640 mock \u0641\u064A Tests"]},{type:"heading",text:"\u0625\u0646\u0634\u0627\u0621 \u062E\u062F\u0645\u0629"},{type:"code",code:`import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',   // singleton \u0639\u0627\u0644\u0645\u064A \u2014 \u0646\u0633\u062E\u0629 \u0648\u0627\u062D\u062F\u0629 \u0644\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0623\u0643\u0645\u0644\u0647
})
export class CounterService {
  private _count = signal(0);

  // \u0643\u0634\u0641 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 \u2014 Components \u0644\u0627 \u064A\u0645\u0643\u0646\u0647\u0627 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0645\u0628\u0627\u0634\u0631\u0629\u064B
  readonly count = this._count.asReadonly();
  readonly double = computed(() => this._count() * 2);

  increment(): void { this._count.update(n => n + 1); }
  decrement(): void { this._count.update(n => n - 1); }
  reset(): void     { this._count.set(0); }
}

// \u062A\u0648\u0644\u064A\u062F \u062E\u062F\u0645\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 CLI:
// ng generate service counter
// ng g s counter`},{type:"heading",text:"inject() \u2014 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629 \u0641\u064A v22"},{type:"paragraph",text:"\u0641\u064A Angular v22\u060C inject() \u0647\u0648 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629 \u0644Dependency Injection \u0628\u062F\u0644\u0627\u064B \u0645\u0646 constructor injection."},{type:"code",code:`import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>\u0627\u0644\u0639\u062F\u0627\u062F: {{ counter.count() }}</p>
    <p>\u0627\u0644\u0645\u0636\u0627\u0639\u0641: {{ counter.double() }}</p>
    <button (click)="counter.increment()">+1</button>
    <button (click)="counter.decrement()">-1</button>
    <button (click)="counter.reset()">\u0625\u0639\u0627\u062F\u0629</button>
  \`
})
export class CounterComponent {
  // inject() \u0628\u062F\u0644\u0627\u064B \u0645\u0646 constructor(private counter: CounterService)
  counter = inject(CounterService);
}`},{type:"tip",text:"inject() \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0641\u064A \u0623\u064A \u0633\u064A\u0627\u0642 \u062D\u0642\u0646 \u0646\u0634\u0637: \u062D\u0642\u0644 \u0627\u0644\u0641\u0626\u0629\u060C constructor\u060C \u0648 \u0641\u064A Angular v22 \u0623\u064A\u0636\u0627\u064B \u062F\u0627\u062E\u0644 effect() \u0648computed() \u0648\u063A\u064A\u0631\u0647\u0627."},{type:"heading",text:"Signals \u0641\u064A Services"},{type:"paragraph",text:"Services \u0645\u0639 Signals \u0647\u064A \u0646\u0645\u0637 State Management \u0627\u0644\u0645\u0641\u0636\u0651\u0644 \u0641\u064A Angular v22 \u0644\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629 \u0648\u0627\u0644\u0643\u0628\u064A\u0631\u0629."},{type:"code",code:`import { Injectable, signal, computed, effect } from '@angular/core';

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
    // \u062D\u0641\u0638 \u062A\u0644\u0642\u0627\u0626\u064A \u0639\u0646\u062F \u0643\u0644 \u062A\u063A\u064A\u064A\u0631
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
}`},{type:"heading",text:"\u0646\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u062E\u062F\u0645\u0629"},{type:"list",items:['providedIn: "root" \u2014 singleton \u0639\u0627\u0644\u0645\u064A\u060C \u0646\u0633\u062E\u0629 \u0648\u0627\u062D\u062F\u0629 \u0644\u0643\u0627\u0645\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 (\u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u064A\u0648\u0639\u0627\u064B)',"providers: [MyService] \u0641\u064A @Component \u2014 \u0646\u0633\u062E\u0629 \u0645\u062D\u0644\u064A\u0629 \u0644\u0644\u0645\u0643\u0648\u0651\u0646 \u0648\u0623\u0628\u0646\u0627\u0626\u0647","providers: [...] \u0641\u064A Routing \u2014 \u0646\u0633\u062E\u0629 \u062E\u0627\u0635\u0629 \u0644\u0643\u0644 \u0645\u0633\u0627\u0631",'\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0631\u064A\u0642\u0629 \u0644\u0640 "feature module scope" \u0641\u064A standalone \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 route providers']},{type:"heading",text:"\u0646\u0645\u0637 State Management"},{type:"paragraph",text:"Services + Signals = \u0625\u062F\u0627\u0631\u0629 \u062D\u0627\u0644\u0629 \u0628\u0633\u064A\u0637\u0629 \u0648\u0642\u0648\u064A\u0629 \u0644\u0645\u0639\u0638\u0645 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A. \u0644\u0627 \u062A\u062D\u062A\u0627\u062C NgRx \u0625\u0644\u0627 \u0639\u0646\u062F \u0627\u0644\u062A\u0639\u0642\u064A\u062F \u0627\u0644\u0634\u062F\u064A\u062F."},{type:"code",code:`// \u2705 \u0646\u0645\u0637 \u0645\u0648\u0635\u0649 \u0628\u0647: \u062E\u062F\u0645\u0629 \u0628\u0633\u064A\u0637\u0629 \u0645\u0639 Signals
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

// \u0641\u064A \u0623\u064A \u0645\u0643\u0648\u0651\u0646:
@Component({ ... })
export class HeaderComponent {
  theme = inject(ThemeService);
}
// \u0627\u0644\u0642\u0627\u0644\u0628: [class.dark]="theme.isDark()"
//          (click)="theme.toggle()"`},{type:"qa",question:'\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 providedIn: "root" \u0648\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062E\u062F\u0645\u0629 \u0641\u064A providers \u0645\u0643\u0648\u0651\u0646\u061F',answer:'providedIn: "root" \u064A\u064F\u0646\u0634\u0626 singleton \u0648\u0627\u062D\u062F\u0627\u064B \u064A\u064F\u0634\u0627\u0631\u0643\u0647 \u0643\u0627\u0645\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u2014 \u062C\u0645\u064A\u0639 Components \u062A\u062D\u0635\u0644 \u0639\u0644\u0649 \u0646\u0641\u0633 \u0627\u0644\u0646\u0633\u062E\u0629. \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062E\u062F\u0645\u0629 \u0641\u064A providers \u0645\u0643\u0648\u0651\u0646 \u064A\u064F\u0646\u0634\u0626 \u0646\u0633\u062E\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0633\u062A\u0642\u0644\u0629 \u0644\u0644\u0645\u0643\u0648\u0651\u0646 \u0648\u0623\u0628\u0646\u0627\u0626\u0647 \u2014 \u062A\u064F\u062F\u0645\u064E\u0651\u0631 \u0645\u0639 \u062F\u0645\u0627\u0631 \u0627\u0644\u0645\u0643\u0648\u0651\u0646. \u0645\u062B\u0627\u0644\u064A \u0644\u062E\u062F\u0645\u0627\u062A \u062A\u062D\u062A\u0627\u062C \u062D\u0627\u0644\u0629 \u0645\u062D\u0644\u064A\u0629.'},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u064A\u064F\u0641\u0636\u064E\u0651\u0644 inject() \u0639\u0644\u0649 constructor injection \u0641\u064A Angular v22\u061F",answer:"inject() \u0623\u0643\u062B\u0631 \u0645\u0631\u0648\u0646\u0629 \u2014 \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0641\u064A \u062D\u0642\u0648\u0644 \u0627\u0644\u0641\u0626\u0629 (field initializers) \u0645\u0645\u0627 \u064A\u064F\u0645\u0643\u0651\u0646 \u0643\u062A\u0627\u0628\u0629 \u0643\u0648\u062F \u0623\u0643\u062B\u0631 \u0625\u064A\u062C\u0627\u0632\u0627\u064B. \u064A\u0639\u0645\u0644 \u0623\u064A\u0636\u0627\u064B \u062E\u0627\u0631\u062C \u0627\u0644\u0640 constructor \u0641\u064A \u0628\u0639\u0636 \u0627\u0644\u0633\u064A\u0627\u0642\u0627\u062A. \u0644\u0627 \u064A\u062D\u062A\u0627\u062C \u0644\u062A\u0639\u0631\u064A\u0641 \u0646\u0648\u0639 \u0635\u0631\u064A\u062D \u0641\u064A constructor parameters. \u0648\u0627\u0644\u0623\u0647\u0645: \u064A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0623\u0641\u0636\u0644 \u0645\u0639 TypeScript strict mode."}],contentEn:[{type:"heading",text:"What are Services?"},{type:"paragraph",text:"A service is a TypeScript class decorated with @Injectable that holds: shared logic (HTTP, calculations, transformations), shared state across components (cart, current user), or abstractions over external APIs."},{type:"list",items:["Injectable into any component or other service",'providedIn: "root" \u2192 one singleton for the entire application',"Separates business logic from the presentation layer","Easy to test \u2014 can be replaced with mocks in tests"]},{type:"heading",text:"Creating a Service"},{type:"code",code:`import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',   // global singleton \u2014 one instance for the whole app
})
export class CounterService {
  private _count = signal(0);

  // Read-only exposure \u2014 components can't directly mutate
  readonly count  = this._count.asReadonly();
  readonly double = computed(() => this._count() * 2);

  increment(): void { this._count.update(n => n + 1); }
  decrement(): void { this._count.update(n => n - 1); }
  reset(): void     { this._count.set(0); }
}

// Generate a service with the CLI:
// ng generate service counter
// ng g s counter`},{type:"heading",text:"inject() \u2014 The v22 Preferred Way"},{type:"paragraph",text:"In Angular v22, inject() is the preferred way to inject dependencies instead of constructor injection."},{type:"code",code:`import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
}`},{type:"tip",text:"inject() can be used in any active injection context: class field initializers, constructor, and in Angular v22 also inside effect() and computed()."},{type:"heading",text:"Signals in Services"},{type:"paragraph",text:"Services with Signals are the preferred state management pattern in Angular v22 for most applications."},{type:"code",code:`import { Injectable, signal, computed, effect } from '@angular/core';

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
}`},{type:"heading",text:"Service Scopes"},{type:"list",items:['providedIn: "root" \u2014 global singleton, one instance for the whole app (most common)',"providers: [MyService] in @Component \u2014 new instance scoped to that component and its children","providers: [...] in route config \u2014 new instance per route navigation",'No "feature module scope" in standalone \u2014 use route providers instead']},{type:"heading",text:"State Management Pattern"},{type:"code",code:`// \u2705 Recommended pattern: simple service with Signals
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
//           (click)="theme.toggle()"`},{type:"qa",question:`What is the difference between providedIn: "root" and adding a service to a component's providers array?`,answer:`providedIn: "root" creates a single singleton shared by the entire application \u2014 all components get the same instance. Adding to a component's providers creates a new, independent instance scoped to that component and its children \u2014 destroyed when the component is destroyed. Use component providers for services that need local, isolated state.`},{type:"qa",question:"Why is inject() preferred over constructor injection in Angular v22?",answer:"inject() is more flexible \u2014 it can be used in class field initializers, enabling more concise code. It also works in some contexts outside the constructor. It doesn't require explicit type declarations in constructor parameters. Most importantly: it works better with TypeScript strict mode and enables cleaner functional patterns."}]};export{e as default};
