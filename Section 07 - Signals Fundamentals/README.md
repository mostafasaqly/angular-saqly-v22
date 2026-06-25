# Section 7: Signals Fundamentals

> **Angular v22 Course** — Section 7 of 25
> Estimated time: ~75 minutes · Level: Intermediate

Signals are the single most important concept in modern Angular. They replace Zone.js-based change detection with a precise, reactive primitive — when a Signal's value changes, *only* the components and computations that depend on it update. This section builds a deep understanding of Signals from scratch: what they are, how to create and read them, how to update them, how to derive new values with `computed()`, and how to run side effects with `effect()`. We'll also compare Signals with RxJS Observables so you know when to use which.

---

## Table of Contents

1. [What are Signals?](#1-what-are-signals)
2. [Creating Signals](#2-creating-signals)
3. [Reading Signals](#3-reading-signals)
4. [Updating Signals](#4-updating-signals)
5. [computed Signals](#5-computed-signals)
6. [effect](#6-effect)
7. [Signals vs RxJS](#7-signals-vs-rxjs)
8. [Signals Best Practices](#8-signals-best-practices)

---

## 1. What are Signals?

A **Signal** is a reactive value container. It holds a value and tracks who reads it. When the value changes, everyone who read it is notified and updated automatically.

### The core idea

```typescript
import { signal } from '@angular/core';

// Create a signal with initial value
const count = signal(0);

// Read it — returns the current value
console.log(count());   // 0

// Update it — all readers are notified
count.set(5);
console.log(count());   // 5
```

### Why do we need Signals?

Before Signals (Angular 1–16), Angular used **Zone.js** to detect changes:
- Zone.js monkey-patched every async API (setTimeout, Promise, addEventListener, etc.)
- After any async event, Angular checked the **entire component tree** for changes
- This "dirty checking" was expensive and hard to reason about

With Signals, Angular knows **exactly** which component depends on which value. When `count` changes, Angular updates only the components that read `count()` — nothing else. This is why Angular v22 can ship **Zoneless** by default.

### Signals at a glance

```
signal(value)     — creates a reactive value container
computed(() => …) — derived signal: auto-updates when dependencies change
effect(() => …)   — runs a side effect when its signals change
```

### Mental model

Think of a Signal as a "smart variable" that knows who is reading it. When its value changes, it tells all readers: "You need to re-evaluate."

In a template:
```html
<!-- Angular reads count() during render -->
<p>{{ count() }}</p>

<!-- When count.set(5) is called, Angular re-renders only this component -->
```

The `()` call is the read — and Angular's template engine tracks every `()` call. This tracking is called the **reactive context**.

---

## 2. Creating Signals

### signal(initialValue)

```typescript
import { signal } from '@angular/core';

// Primitive types — Angular infers the type
const name    = signal('Alice');          // WritableSignal<string>
const age     = signal(30);              // WritableSignal<number>
const isAdmin = signal(false);           // WritableSignal<boolean>
const nothing = signal<string | null>(null); // WritableSignal<string | null>

// Arrays
const items = signal<string[]>([]);

// Objects
const user = signal<{ name: string; email: string }>({
  name: 'Alice',
  email: 'alice@example.com',
});
```

### The WritableSignal type

`signal()` returns a `WritableSignal<T>`. You can:
- Read: call it as a function — `count()`
- Write: `.set()`, `.update()`, `.mutate()` (see Lesson 4)

### Typed signals

Always type your signals explicitly when the initial value doesn't make the type obvious:

```typescript
import { signal } from '@angular/core';

type Status = 'idle' | 'loading' | 'success' | 'error';

const status = signal<Status>('idle');
const selectedId = signal<number | null>(null);
```

### Signals inside a component class

Signals are typically class properties in a component:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  template: `<p>{{ message() }}</p>`
})
export class MyComponent {
  message = signal('Hello, Signals!');
  count   = signal(0);
  tags    = signal<string[]>([]);
}
```

### Signals in services (global state)

Signals in services stay alive for the service's lifetime — great for app-level state:

```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  // Expose read-only signal to the outside
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(user: User) {
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
  }
}
```

> **Pattern:** Keep the writable signal private with `_` prefix. Expose a read-only version via `.asReadonly()`. This is Angular's equivalent of `private set` in Kotlin or Swift.

---

## 3. Reading Signals

Reading a Signal is always the same: **call it as a function**.

### In TypeScript

```typescript
import { signal, computed, effect } from '@angular/core';

const count = signal(10);
const name  = signal('Bob');

// Reading outside a reactive context — just returns the value
const value = count();  // 10
console.log(name());    // 'Bob'

// Reading inside computed — creates a reactive dependency
const double = computed(() => count() * 2);  // re-computes when count changes

// Reading inside effect — creates a reactive dependency
effect(() => {
  console.log('Count changed to:', count());
});
```

### In templates

Templates are always a reactive context — every signal call is tracked:

```typescript
@Component({
  template: `
    <p>Count: {{ count() }}</p>
    <p>Name: {{ user().name }}</p>
    <p [class.hidden]="!isVisible()">Conditional element</p>
    <input [value]="searchTerm()" />
  `
})
```

### Reactive context matters

The tracking only happens *inside a reactive context* (computed, effect, or template):

```typescript
// OUTSIDE reactive context — just reads the value, no tracking
const snapshot = count();   // 10 — won't re-read if count changes

// INSIDE computed — tracked
const doubled = computed(() => count() * 2);   // tracked

// INSIDE effect — tracked
effect(() => {
  document.title = `Count: ${count()}`;        // tracked
});
```

### toSignal — converting Observables to Signals

If you have an Observable you want to read as a Signal:

```typescript
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

// Convert timer$ Observable to a Signal
const tick = toSignal(interval(1000), { initialValue: 0 });
// tick() returns the latest emitted value — updates every second
```

---

## 4. Updating Signals

### .set(newValue) — replace the value

```typescript
const count = signal(0);

count.set(5);     // count() is now 5
count.set(10);    // count() is now 10

// Type safety — this would be a TypeScript error:
// count.set('hello');  // Error: Argument of type 'string' is not assignable to 'number'
```

### .update(fn) — compute new value from old

Use when the new value depends on the current value:

```typescript
const count = signal(0);

count.update(n => n + 1);   // 1
count.update(n => n + 1);   // 2
count.update(n => n * 10);  // 20

// Arrays
const items = signal<string[]>(['a', 'b']);
items.update(arr => [...arr, 'c']);   // ['a', 'b', 'c'] — new array reference

// Objects
const user = signal({ name: 'Alice', score: 0 });
user.update(u => ({ ...u, score: u.score + 10 }));  // immutable update
```

### .mutate(fn) — mutate the value in place (use sparingly)

> **Important:** `.mutate()` was available in early Angular Signals and may be deprecated. Prefer `.update()` with spread syntax. Shown here for awareness:

```typescript
// AVOID in OnPush components — mutate doesn't change the reference
const tags = signal<string[]>(['ts', 'angular']);
tags.mutate(arr => arr.push('signals'));  // same reference — OnPush may not see it

// PREFER — .update() with new reference
tags.update(arr => [...arr, 'signals']);  // new array — OnPush detects change
```

### Batch multiple updates

By default each `.set()` or `.update()` triggers change detection. `untracked()` reads a signal without creating a dependency. For batching, the Angular team provides utilities:

```typescript
import { signal } from '@angular/core';

const firstName = signal('Alice');
const lastName  = signal('Johnson');
const email     = signal('alice@example.com');

// All three trigger individual updates — fine for most cases
function updateUser(first: string, last: string, mail: string) {
  firstName.set(first);
  lastName.set(last);
  email.set(mail);
}
```

> In practice, Angular batches signal updates within the same event handler automatically, so three `.set()` calls in one click handler only cause one re-render.

---

## 5. computed Signals

A **computed signal** automatically derives its value from other signals. It re-evaluates only when its signal dependencies change.

### Basic computed

```typescript
import { signal, computed } from '@angular/core';

const price    = signal(100);
const quantity = signal(3);
const discount = signal(0.1);  // 10%

// Auto-updates when price, quantity, or discount changes
const subtotal = computed(() => price() * quantity());
const total    = computed(() => subtotal() * (1 - discount()));

console.log(subtotal());  // 300
console.log(total());     // 270

price.set(120);
console.log(subtotal());  // 360 — recomputed automatically
console.log(total());     // 324 — recomputed automatically
```

### Computed is lazy and memoized

- **Lazy:** the function doesn't run until you read the computed value
- **Memoized:** if none of its signal dependencies changed, it returns the cached value without re-running

```typescript
let callCount = 0;
const expensive = computed(() => {
  callCount++;
  return data().reduce((sum, n) => sum + n, 0);
});

const a = expensive();  // runs once → callCount = 1
const b = expensive();  // cached   → callCount still 1
data.set([1, 2]);
const c = expensive();  // runs again → callCount = 2
```

### Computed with conditional dependencies

Angular tracks which signals were read during the last run:

```typescript
const showDetails = signal(false);
const userId      = signal(1);
const userName    = signal('Alice');

const displayText = computed(() => {
  if (showDetails()) {
    // userId is only a dependency when showDetails() is true
    return `User #${userId()}: ${userName()}`;
  }
  return 'Details hidden';
});
```

### Chaining computeds

```typescript
const items  = signal<number[]>([1, 2, 3, 4, 5]);
const filter = signal<'all' | 'even' | 'odd'>('all');

const filtered = computed(() => {
  const f = filter();
  return f === 'all' ? items()
       : f === 'even' ? items().filter(n => n % 2 === 0)
       : items().filter(n => n % 2 !== 0);
});

const total = computed(() =>
  filtered().reduce((sum, n) => sum + n, 0)
);

const count = computed(() => filtered().length);
```

### Computed in a component

```typescript
@Component({
  template: `
    <p>Subtotal: {{ subtotal() | currency }}</p>
    <p>Tax: {{ tax() | currency }}</p>
    <p>Total: {{ total() | currency }}</p>
  `
})
export class CartComponent {
  items    = signal<CartItem[]>([]);
  taxRate  = signal(0.08);

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  tax   = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.tax());
}
```

---

## 6. effect

An **effect** is a function that runs whenever its signal dependencies change. Use it for *side effects* — things that happen *outside* the component tree (logging, localStorage, analytics, DOM manipulation).

### Basic effect

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  template: `
    <button (click)="toggleTheme()">
      Current theme: {{ theme() }}
    </button>
  `
})
export class ThemeSwitcherComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // Effect runs immediately, then again whenever theme() changes
    effect(() => {
      document.body.classList.toggle('dark', this.theme() === 'dark');
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}
```

### Cleanup in effects

If an effect sets up a subscription, timer, or event listener, clean it up with the `onCleanup` callback:

```typescript
import { signal, effect } from '@angular/core';

const roomId = signal('general');

effect((onCleanup) => {
  const ws = new WebSocket(`wss://chat.example.com/${roomId()}`);

  ws.onmessage = (e) => console.log(e.data);

  // Cleanup: called before the effect re-runs or the component destroys
  onCleanup(() => ws.close());
});

// When roomId changes, the old WebSocket closes and a new one opens
roomId.set('angular-help');
```

### effect with untracked reads

Sometimes you need to read a signal inside an effect without making it a dependency:

```typescript
import { signal, effect, untracked } from '@angular/core';

const query   = signal('angular');
const results = signal<string[]>([]);

effect(() => {
  const q = query();   // tracked — effect re-runs when query changes

  // Read results without making it a dependency
  const currentResults = untracked(() => results());

  console.log(`Query "${q}" returned ${currentResults.length} results`);
});
```

### Where to create effects

Effects must be created in a reactive context — typically the constructor or field initializer of a component or service:

```typescript
@Component({ ... })
export class MyComponent {
  count = signal(0);

  // Field initializer — valid reactive context
  private logEffect = effect(() => {
    console.log('Count:', this.count());
  });

  constructor() {
    // Constructor — valid reactive context
    effect(() => {
      localStorage.setItem('count', String(this.count()));
    });
  }
}
```

> **Do NOT use effects to update signals.** Updating a signal inside an effect creates a cycle. If you need to derive a value, use `computed()` instead.

```typescript
// WRONG — don't update signals inside effects
effect(() => {
  this.double.set(this.count() * 2);  // This is what computed() is for!
});

// CORRECT — use computed
double = computed(() => this.count() * 2);
```

---

## 7. Signals vs RxJS

Both Signals and RxJS deal with reactive data, but they have different strengths.

### Core comparison

| | Signals | RxJS Observables |
|---|---|---|
| **Primary use** | Synchronous reactive state (UI) | Async streams, events |
| **Complexity** | Simple API | Rich but complex |
| **Angular integration** | Native — drives change detection | External — needs `async` pipe or `toSignal` |
| **Subscription management** | Automatic (no unsubscribe needed) | Manual (`takeUntilDestroyed`, `async` pipe) |
| **Value access** | `signal()` — pull the current value | `observable.subscribe()` — push model |
| **Derived values** | `computed()` — lazy, memoized | `map()`, `combineLatest()` — eager |
| **Side effects** | `effect()` | `tap()`, `subscribe()` |
| **Best for** | Component state, UI binding | HTTP, WebSockets, timers, complex event pipelines |

### When to use Signals

- Component state (count, list, toggle)
- Shared app state in services
- Derived/computed values shown in templates
- Replacing simple `BehaviorSubject` usage

### When to use RxJS

- HTTP requests with operators (retry, debounce, switchMap)
- WebSocket streams
- Complex event pipelines (search with debounce, autocomplete)
- When you need operators like `combineLatest`, `mergeMap`, `takeUntil`

### Using them together

The bridge APIs let you combine both:

```typescript
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal }    from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';

// Signal → Observable (for using RxJS operators)
const searchTerm = signal('');
const searchTerm$ = toObservable(searchTerm);

// RxJS pipeline with Signal as the source
const results$ = searchTerm$.pipe(
  debounceTime(300),
  switchMap(term => fetch(`/api/search?q=${term}`).then(r => r.json()))
);

// Observable → Signal (for template binding)
const results = toSignal(results$, { initialValue: [] });

// Now use results() in the template — fully reactive
```

### Side-by-side example

```typescript
// RxJS approach (old way)
import { BehaviorSubject, combineLatest, map } from 'rxjs';

class CartServiceRxJS {
  private items$   = new BehaviorSubject<CartItem[]>([]);
  private discount$ = new BehaviorSubject<number>(0);

  total$ = combineLatest([this.items$, this.discount$]).pipe(
    map(([items, discount]) =>
      items.reduce((s, i) => s + i.price * i.qty, 0) * (1 - discount)
    )
  );
}
```

```typescript
// Signals approach (v22 way)
import { signal, computed } from '@angular/core';

class CartServiceSignals {
  items    = signal<CartItem[]>([]);
  discount = signal(0);

  total = computed(() =>
    this.items().reduce((s, i) => s + i.price * i.qty, 0) * (1 - this.discount())
  );
}
```

The Signals version is shorter, more readable, and has zero subscription management overhead.

---

## 8. Signals Best Practices

### 1. Keep signals in the right place

- **Component state** → `signal()` in the component class
- **Cross-component state** → `signal()` in a service with `providedIn: 'root'`
- **Derived values** → always `computed()`, never duplicate logic

### 2. Expose read-only signals from services

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private _currentUser = signal<User | null>(null);

  // Public read-only view — consumers can't accidentally mutate
  readonly currentUser = this._currentUser.asReadonly();

  setUser(user: User) {
    this._currentUser.set(user);
  }
}
```

### 3. Prefer computed over effect for derived state

```typescript
// WRONG — using effect to keep a derived value in sync
effect(() => {
  this.total.set(this.items().reduce((s, i) => s + i.price, 0));
});

// RIGHT — computed is simpler, lazy, and memoized
total = computed(() => this.items().reduce((s, i) => s + i.price, 0));
```

### 4. Always update immutably with arrays and objects

```typescript
// WRONG — mutation
this.items().push(newItem);  // reference unchanged, OnPush won't re-render

// RIGHT — new reference
this.items.update(arr => [...arr, newItem]);
```

### 5. Avoid reading signals inside constructor (before template mounts)

```typescript
@Component({ ... })
export class MyComponent {
  count = signal(0);

  constructor() {
    // Fine — reading in an effect inside the constructor is OK
    effect(() => console.log(this.count()));

    // Also fine — reading directly (snapshot, not tracked)
    const initial = this.count();
  }
}
```

### 6. Use `untracked` to opt out of tracking

```typescript
import { signal, effect, untracked } from '@angular/core';

const a = signal(1);
const b = signal(2);

effect(() => {
  // Only re-runs when `a` changes, NOT when `b` changes
  const sum = a() + untracked(() => b());
  console.log('Sum when a changes:', sum);
});
```

### 7. Don't create signals in template expressions

```typescript
// WRONG — creates a new signal on every render
// template: `{{ signal(count)() }}`

// RIGHT — create in the class, read in the template
count = signal(0);
// template: `{{ count() }}`
```

---

## ✅ Section 7 Recap

Signals are Angular's reactive primitive. Here's the core model:

- **`signal(value)`** — create a writable reactive container
- **`signal()()`** — read the current value (the `()` call)
- **`.set(v)`** — replace the value
- **`.update(fn)`** — compute new value from old
- **`computed(() => ...)`** — derive a lazy, memoized value from other signals
- **`effect(() => ...)`** — run a side effect when dependencies change
- **Signals vs RxJS** — Signals for sync UI state, RxJS for async streams; use `toSignal`/`toObservable` to bridge
- **Best practices** — private writable + public readonly, immutable updates, `computed` over `effect` for derived state

### Knowledge Check

1. What is the difference between `signal()`, `computed()`, and `effect()`? Give the one-line purpose of each.
2. Why should you use `.update(arr => [...arr, item])` instead of `.mutate(arr => arr.push(item))` when working with OnPush components?
3. When would you choose RxJS over Signals? Give one concrete example.
4. What does `untracked(() => value())` do inside an `effect()`?

<details>
<summary>Show answers</summary>

1. `signal(v)` — creates a writable reactive value container. `computed(() => expr)` — creates a read-only derived value that auto-updates when its signal dependencies change (lazy + memoized). `effect(() => sideEffect)` — runs a function as a side effect whenever its signal dependencies change (logging, localStorage, DOM changes).

2. `.mutate()` modifies the array **in place** without changing its reference. `OnPush` change detection only re-checks a component when input **references** change. A mutated array has the same reference, so `OnPush` doesn't notice the change and skips re-rendering. `.update()` with spread (`[...arr, item]`) creates a **new array reference**, which `OnPush` detects correctly.

3. RxJS is better for **async streams with complex operators** — for example, a search autocomplete that needs `debounceTime(300)` to wait for the user to stop typing, then `switchMap` to cancel the previous HTTP request and fire a new one. Doing this with Signals alone requires more manual orchestration; RxJS pipelines express it declaratively.

4. `untracked(() => value())` reads `value()` **without registering a reactive dependency**. The effect won't re-run when `value` changes — only when the other tracked signals in the effect change. Use it when you need to snapshot a signal's current value without making the effect depend on it.

</details>

---

**Next up — [Section 8: Advanced Signals](../Section%2008%20-%20Advanced%20Signals/README.md)**
We'll go deeper with signal inputs, model inputs, signal-based queries (`viewChild`, `contentChild`), linked signals, and the Resource API for async data. 🚀
