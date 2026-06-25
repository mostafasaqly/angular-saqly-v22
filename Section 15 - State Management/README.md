# Section 15 — State Management

> Angular v22 Course — Section 15 of 25 | Estimated time: 3 hours | Level: Intermediate

State management is the discipline of deciding **where your application's data lives, how it flows, and who can change it**. Angular v22 ships several powerful primitives — Signals, RxJS, and the emerging Signal Store pattern — that make state management cleaner than ever without necessarily reaching for heavy third-party libraries like NgRx.

---

## Table of Contents

1. [What is State Management?](#1-what-is-state-management)
2. [Local Component State](#2-local-component-state)
3. [Service-Based State](#3-service-based-state)
4. [Signals for State Management](#4-signals-for-state-management)
5. [RxJS for State Management](#5-rxjs-for-state-management)
6. [When to Use NgRx](#6-when-to-use-ngrx)
7. [Simple Store with Signals](#7-simple-store-with-signals)
8. [State Management Best Practices](#8-state-management-best-practices)
- [Section 15 Recap](#-section-15-recap)
- [Knowledge Check](#knowledge-check)

---

## 1. What is State Management?

**State** is any data that can change over time and that your UI must reflect. Angular applications deal with several kinds of state:

| Kind | Examples | Scope |
|------|----------|-------|
| **Local UI state** | dialog open/closed, form dirty flag | One component |
| **Shared feature state** | currently logged-in user, shopping cart | Feature module / route |
| **Global app state** | theme, locale, notifications | Entire application |
| **Server cache** | paginated API results | Anywhere |

**State management** is the set of patterns and tools you use to:
- Store data in a single, predictable location
- Read that data in a reactive way (so the UI auto-updates)
- Mutate data through well-defined operations
- Debug what changed and why

Angular v22 gives you three built-in layers:
1. **Signals** — synchronous reactive primitives (recommended for most cases)
2. **RxJS** — stream-based reactivity (great for async / complex event chains)
3. **Services** — the container that lives between components

Third-party choices (NgRx, Elf, Akita) add structure on top of these.

---

## 2. Local Component State

Local state lives inside a single component and never needs to be shared. In Angular v22 you declare it with `signal()`.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);

  increment() { this.count.update(c => c + 1); }
  decrement() { this.count.update(c => c - 1); }
  reset()     { this.count.set(0); }
}
```

**Rules for local state:**
- Use `signal()` for primitive values.
- Use `computed()` for derived values — they recalculate automatically.
- Never expose the writable signal itself through a public API (use a read-only view with `asReadonly()` if the parent needs to read it).

---

## 3. Service-Based State

When two or more components need the same data, move state into a **singleton service** provided at the root level. Any component that injects the service shares the same signal instance.

```typescript
// cart.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);

  // Public read-only view
  readonly items = this._items.asReadonly();
  readonly total = computed(() =>
    this._items().reduce((sum, i) => sum + i.price * i.qty, 0)
  );
  readonly itemCount = computed(() =>
    this._items().reduce((sum, i) => sum + i.qty, 0)
  );

  addItem(item: CartItem): void {
    this._items.update(items => {
      const existing = items.find(i => i.id === item.id);
      if (existing) {
        return items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...items, item];
    });
  }

  removeItem(id: number): void {
    this._items.update(items => items.filter(i => i.id !== id));
  }

  clear(): void {
    this._items.set([]);
  }
}
```

A component then injects and reads from the service:

```typescript
import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  template: `<span class="badge">{{ cart.itemCount() }}</span>`,
})
export class CartBadgeComponent {
  cart = inject(CartService);
}
```

---

## 4. Signals for State Management

Angular Signals (stable since v17, matured in v22) are the recommended reactive primitive. Key APIs:

```typescript
import { signal, computed, effect, Signal } from '@angular/core';

// --- Writable signal ---
const name = signal('Alice');
name.set('Bob');            // replace
name.update(n => n + '!'); // transform

// --- Computed (derived, read-only) ---
const greeting = computed(() => `Hello, ${name()}`);

// --- Effect (side-effects) ---
effect(() => {
  console.log('Name changed to', name()); // runs whenever name changes
});

// --- Read-only view ---
const readOnlyName: Signal<string> = name.asReadonly();
```

**Why Signals beat BehaviorSubject for local/shared state:**
- No `.subscribe()` / `.unsubscribe()` boilerplate
- Angular's change detection knows exactly which signals a template reads — only those components re-render
- Computed signals are lazy and memoised
- Works seamlessly with `OnPush`

### Connecting Signals to RxJS

```typescript
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

// Signal → Observable (useful for debounce, switchMap, etc.)
const query = signal('');
const query$ = toObservable(query);

// Observable → Signal
import { HttpClient } from '@angular/common/http';
const http = inject(HttpClient);
const users = toSignal(http.get<User[]>('/api/users'), { initialValue: [] });
```

---

## 5. RxJS for State Management

RxJS `BehaviorSubject` is the classic Angular approach and still a great choice when you need stream composition, async pipelines, or want to expose an Observable API to the rest of the app.

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface AppState {
  theme: 'light' | 'dark';
  language: string;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _state = new BehaviorSubject<AppState>({
    theme: 'light',
    language: 'en',
  });

  readonly state$: Observable<AppState> = this._state.asObservable();
  readonly theme$ = this._state.pipe(map(s => s.theme));
  readonly language$ = this._state.pipe(map(s => s.language));

  setTheme(theme: 'light' | 'dark'): void {
    this._state.next({ ...this._state.value, theme });
  }

  setLanguage(language: string): void {
    this._state.next({ ...this._state.value, language });
  }
}
```

In a component use `async` pipe or `toSignal()`:

```typescript
@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <body [attr.data-theme]="theme$ | async">...</body>
  `,
})
export class AppShellComponent {
  appState = inject(AppStateService);
  theme$ = this.appState.theme$;
}
```

---

## 6. When to Use NgRx

NgRx (@ngrx/store) is an opinionated Redux-style state container. It adds boilerplate but also strict conventions and excellent DevTools support. Use it when:

| Scenario | Use NgRx? |
|----------|-----------|
| < 5 shared state slices | No — service + signals is fine |
| Complex async flows (optimistic updates, rollback) | Yes |
| Large team with strict conventions needed | Yes |
| Need time-travel debugging | Yes |
| Simple CRUD app | No |
| Server-sent events or complex websocket state | Consider it |

**NgRx Signal Store** (`@ngrx/signals`) is the v18+ evolution that replaces class-based reducers with a Signal-first API — far less boilerplate. This is what new projects should reach for if they need NgRx at all.

```typescript
// With @ngrx/signals (simplified)
import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withComputed(({ count }) => ({
    double: computed(() => count() * 2),
  })),
  withMethods(store => ({
    increment: () => patchState(store, s => ({ count: s.count + 1 })),
    decrement: () => patchState(store, s => ({ count: s.count - 1 })),
  }))
);
```

---

## 7. Simple Store with Signals

You can build a lightweight, NgRx-style store with plain Angular Signals — no third-party library required. The pattern: an `Injectable` class that holds private writable signals and exposes public read-only signals plus mutator methods.

```typescript
// product.store.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private http = inject(HttpClient);

  // --- Private writable state ---
  private _products = signal<Product[]>([]);
  private _loading  = signal(false);
  private _error    = signal<string | null>(null);

  // --- Public read-only signals ---
  readonly products   = this._products.asReadonly();
  readonly loading    = this._loading.asReadonly();
  readonly error      = this._error.asReadonly();
  readonly totalValue = computed(() =>
    this._products().reduce((sum, p) => sum + p.price * p.stock, 0)
  );
  readonly inStock = computed(() =>
    this._products().filter(p => p.stock > 0)
  );

  // --- Actions ---
  loadProducts(): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<Product[]>('/api/products').subscribe({
      next: products => {
        this._products.set(products);
        this._loading.set(false);
      },
      error: err => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  addProduct(product: Product): void {
    this._products.update(list => [...list, product]);
  }

  updateStock(id: number, delta: number): void {
    this._products.update(list =>
      list.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)
    );
  }

  removeProduct(id: number): void {
    this._products.update(list => list.filter(p => p.id !== id));
  }
}
```

---

## 8. State Management Best Practices

1. **Start local, then lift.** Begin with `signal()` inside the component. Only move state into a service when a second component needs it. Only reach for NgRx when a service becomes unwieldy.

2. **Keep state minimal.** Store the raw data; derive everything else with `computed()`. Never duplicate computed values as separate signals.

3. **Make mutations explicit.** Expose named methods (`addItem`, `removeItem`) rather than letting consumers call `signal.set()` directly. This makes the allowed operations self-documenting.

4. **Immutability by convention.** Always spread arrays and objects in `update()`. Never mutate in place.

5. **Colocate related state.** A `CartStore` should own cart items, total, and loading — not split across three services.

6. **Use `asReadonly()` for public signals.** Prevents external code from accidentally calling `.set()` on shared state.

7. **Async with RxJS, sync with Signals.** Signals are synchronous. For HTTP calls, use RxJS and bridge with `toSignal()`.

8. **One source of truth.** Never copy server data into multiple signals. Keep one authoritative copy and derive views from it.

---

## ✅ Section 15 Recap

| Concept | Tool | When |
|---------|------|------|
| Single component data | `signal()` | Always start here |
| Shared across components | `Injectable` service + signals | Two+ components |
| Async data streams | RxJS + `toSignal()` | HTTP, websockets |
| Complex app with large team | NgRx Signal Store | Large-scale apps |
| Derived data | `computed()` | Never store what you can derive |

---

## Knowledge Check

<details>
<summary>Q1: What is the difference between <code>signal.set()</code> and <code>signal.update()</code>?</summary>

**A:** `set()` replaces the value entirely with a new value. `update()` takes a function that receives the current value and returns the new value — useful when the new value depends on the old one (e.g., `count.update(c => c + 1)`).
</details>

<details>
<summary>Q2: Why should you expose signals as <code>asReadonly()</code> from a service?</summary>

**A:** `asReadonly()` returns a `Signal<T>` (not `WritableSignal<T>`), so consumers cannot call `.set()` or `.update()` on it. This enforces that all mutations go through the service's explicit methods, keeping state changes predictable and traceable.
</details>

<details>
<summary>Q3: When would you choose RxJS over Signals for state?</summary>

**A:** When you need to compose asynchronous streams — e.g., debouncing user input before an HTTP call, switching to a new request when a param changes (`switchMap`), or merging multiple event sources. Signals are synchronous; RxJS handles time and async naturally. Use `toSignal()` to consume an Observable in a Signal-friendly way.
</details>

<details>
<summary>Q4: What is the "lift state" rule?</summary>

**A:** Start by keeping state local to the component that owns it. If a sibling or parent needs the same data, "lift" it up — move the signal/state into a shared service or parent component. This avoids over-engineering and keeps state as close to where it's used as possible.
</details>

<details>
<summary>Q5: What makes <code>computed()</code> more efficient than a regular getter?</summary>

**A:** `computed()` is memoised. It re-runs only when one of the signals it depends on changes, not on every change detection cycle. A regular class getter runs on every render. This makes computed signals much more efficient for expensive derivations.
</details>

---

**Next up —** [Section 16 — Authentication and Guards](../Section%2016%20-%20Authentication%20and%20Guards/README.md)
