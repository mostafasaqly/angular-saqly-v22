# Section 13: RxJS Essentials

> **Angular v22 Course** — Section 13 of 25
> Estimated time: ~2 hours · Level: Intermediate

Even in the Signal era, **RxJS remains an essential skill for Angular developers**. HTTP calls return Observables. Router events are Observables. Angular Material and many third-party libraries are Observable-first. Understanding RxJS lets you compose complex async flows, stream real-time data, debounce search inputs, and gracefully handle errors — all in a declarative style that's testable and predictable.

In this section you'll master Observables, Subjects, BehaviorSubjects, and the operators you'll reach for in real production apps. You'll also develop a clear intuition for *when to use RxJS* versus *when to use Signals*.

---

## Table of Contents

1. [What is RxJS?](#1-what-is-rxjs)
2. [Observables](#2-observables)
3. [Subscriptions](#3-subscriptions)
4. [Subjects](#4-subjects)
5. [BehaviorSubject](#5-behaviorsubject)
6. [Common RxJS Operators](#6-common-rxjs-operators)
7. [map](#7-map)
8. [filter](#8-filter)
9. [switchMap](#9-switchmap)
10. [catchError](#10-catcherror)
11. [takeUntilDestroyed](#11-takeuntildestroyed)
12. [RxJS vs Signals — When to Use Each](#12-rxjs-vs-signals--when-to-use-each)

---

## 1. What is RxJS?

**RxJS** (Reactive Extensions for JavaScript) is a library for composing **asynchronous event streams** using **Observables** and a rich set of operators.

The core idea: instead of imperatively asking "give me the value now," you *declare* "whenever a value arrives, do this with it."

```
Producer (Observable) ──emit──▶ Operator ──transform──▶ Observer (subscriber)
                                pipe(map, filter, switchMap...)
```

### Why Angular uses RxJS

Angular's core APIs — `HttpClient`, `Router`, `Forms.valueChanges`, `ActivatedRoute.params` — all return Observables. RxJS is not optional; it is woven into the framework. Understanding it makes you dramatically more productive.

### The mental model in three lines

```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(map(n => n * 10)).subscribe(console.log);
// 10, 20, 30
```

1. `of(1, 2, 3)` — creates an Observable that emits three values then completes.
2. `.pipe(map(n => n * 10))` — transforms each emission.
3. `.subscribe(console.log)` — executes the stream and receives each value.

---

## 2. Observables

An **Observable** is a lazy, cancellable stream of values over time. It does nothing until you `.subscribe()`.

### Creating Observables

```typescript
import { Observable, of, from, interval, fromEvent } from 'rxjs';

// of — emits a fixed set of values synchronously, then completes
const numbers$ = of(1, 2, 3);

// from — converts an Array, Promise, or iterable to an Observable
const fromArray$   = from([10, 20, 30]);
const fromPromise$ = from(fetch('/api/users').then(r => r.json()));

// interval — emits an incrementing integer every N milliseconds
const ticker$ = interval(1000); // 0, 1, 2, 3 ... (every second)

// fromEvent — wraps a DOM event
const clicks$ = fromEvent(document, 'click');

// Manual Observable (most powerful, least common)
const custom$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => {
    subscriber.next(3);
    subscriber.complete();    // signals no more values
  }, 1000);
});
```

### Observable properties

| Property | Description |
|---|---|
| **Lazy** | Does nothing until `.subscribe()` is called |
| **Unicast** | Each subscriber gets its own independent execution |
| **Cancellable** | Call `subscription.unsubscribe()` to stop it |
| **May be async** | Values can arrive synchronously or asynchronously |

---

## 3. Subscriptions

`.subscribe()` activates an Observable and starts receiving its values.

```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const sub = interval(500).pipe(take(5)).subscribe({
  next:     value    => console.log('Value:', value),   // called for each emission
  error:    err      => console.error('Error:', err),   // called once on error
  complete: ()       => console.log('Done!'),           // called when stream ends
});

// Unsubscribe to stop receiving values and free memory
sub.unsubscribe();
```

### The subscription leak problem

If you subscribe inside a component and never unsubscribe, the Observable keeps running after the component is destroyed — this is a **memory leak**. Angular provides `takeUntilDestroyed()` to solve this elegantly (see Lesson 11).

```typescript
// BAD — subscription lives forever:
ngOnInit(): void {
  this.myService.data$.subscribe(d => this.data = d);
}

// GOOD — use the async pipe in templates (auto-unsubscribes):
// In template: {{ data$ | async }}

// GOOD — use takeUntilDestroyed() in TypeScript:
// See Lesson 11 for the full pattern.
```

### The async pipe — the easiest solution

```html
<!-- Angular's async pipe subscribes and unsubscribes automatically -->
<ul>
  @for (user of users$ | async; track user.id) {
    <li>{{ user.name }}</li>
  }
</ul>
```

---

## 4. Subjects

A **Subject** is both an Observable *and* an Observer. It bridges the gap between imperative code ("push a value now") and reactive streams.

```typescript
import { Subject } from 'rxjs';

const clicks$ = new Subject<string>();

// Multiple subscribers — each one gets every future emission
clicks$.subscribe(v => console.log('Subscriber A:', v));
clicks$.subscribe(v => console.log('Subscriber B:', v));

// Imperatively push a value to all active subscribers
clicks$.next('click!');
// Subscriber A: click!
// Subscriber B: click!

// A Subject does NOT replay past values to new subscribers
clicks$.next('second click');
// Later subscriber sees nothing about 'first click'
```

### Common Subject use cases

1. **User action broadcasting** — emit events from one service to multiple components.
2. **Bridging imperative to reactive** — wrap a callback-based API with a Subject.
3. **Manual trigger** — `refresh$ = new Subject<void>()` to re-run an HTTP call.

```typescript
// Pattern: manual refresh trigger
export class ProductService {
  private refresh$ = new Subject<void>();

  readonly products$ = this.refresh$.pipe(
    startWith(undefined),                          // trigger on init
    switchMap(() => this.http.get<Product[]>('/api/products'))
  );

  refresh(): void {
    this.refresh$.next();                          // re-run the HTTP call
  }
}
```

---

## 5. BehaviorSubject

A **BehaviorSubject** is a Subject that:
1. Requires an **initial value**.
2. **Replays the most recent value** to any new subscriber.
3. Exposes the current value synchronously via `.getValue()`.

```typescript
import { BehaviorSubject } from 'rxjs';

const count$ = new BehaviorSubject<number>(0);   // initial value: 0

// New subscriber immediately gets the current value
count$.subscribe(v => console.log('A:', v));    // A: 0

count$.next(1);  // A: 1
count$.next(2);  // A: 2

// Late subscriber immediately receives the latest value (2)
count$.subscribe(v => console.log('B:', v));    // B: 2

// Synchronous read
console.log(count$.getValue());                 // 2
```

### BehaviorSubject in a service (classic state management)

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem { id: number; name: string; qty: number; price: number; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  // Expose as read-only Observable — consumers can't push to it
  readonly cart$: Observable<CartItem[]> = this.items$.asObservable();

  readonly total$ = this.cart$.pipe(
    map(items => items.reduce((sum, item) => sum + item.price * item.qty, 0))
  );

  addItem(item: CartItem): void {
    this.items$.next([...this.items$.getValue(), item]);
  }

  clearCart(): void {
    this.items$.next([]);
  }
}
```

> Note: In v22, you can replace BehaviorSubject with `signal()` for local state. BehaviorSubject is still useful when you need Observable composition (pipe, combineLatest, etc.).

---

## 6. Common RxJS Operators

Operators are **pure functions** applied inside `.pipe()`. They take an Observable in and return a new Observable out, without mutating the original.

```typescript
source$.pipe(
  operator1(),
  operator2(),
  operator3()
).subscribe(observer);
```

The most-used operators in Angular apps:

| Operator | Category | What it does |
|---|---|---|
| `map` | Transform | Transform each emitted value |
| `filter` | Filter | Only pass values that match a predicate |
| `tap` | Utility | Side-effect (logging, debugging) without altering the stream |
| `switchMap` | Higher-order | Map to inner Observable, cancel previous inner if new one arrives |
| `mergeMap` | Higher-order | Map to inner Observable, run all concurrently |
| `exhaustMap` | Higher-order | Map to inner Observable, ignore new outer emissions until inner completes |
| `catchError` | Error handling | Recover from errors in the stream |
| `debounceTime` | Time | Emit only after N ms of silence |
| `distinctUntilChanged` | Filter | Skip emission if value is the same as previous |
| `take` | Filter | Complete after N emissions |
| `takeUntilDestroyed` | Lifecycle | Complete when the Angular context is destroyed |
| `combineLatest` | Combination | Emit array of latest values from multiple Observables |
| `startWith` | Transform | Prepend an initial value to the stream |

---

## 7. map

`map` transforms every emitted value, exactly like `Array.prototype.map` but for streams.

```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

// Transform numbers
of(1, 2, 3).pipe(
  map(n => n * n)
).subscribe(console.log);
// 1, 4, 9

// Transform objects (e.g., HTTP response → domain model)
interface ApiUser  { id: number; full_name: string; email_address: string; }
interface DomUser  { id: number; name: string; email: string; }

http.get<ApiUser[]>('/api/users').pipe(
  map(users => users.map(u => ({
    id:    u.id,
    name:  u.full_name,
    email: u.email_address,
  } as DomUser)))
);

// Pluck a single property
http.get<{ data: Product[] }>('/api/products').pipe(
  map(response => response.data)
);
```

---

## 8. filter

`filter` only lets values through that satisfy a predicate.

```typescript
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

from([1, 2, 3, 4, 5, 6]).pipe(
  filter(n => n % 2 === 0)
).subscribe(console.log);
// 2, 4, 6

// Practical: filter empty search terms
searchInput$.pipe(
  filter(term => term.trim().length >= 2),   // don't search until 2+ chars
  debounceTime(300),
  switchMap(term => http.get<Product[]>(`/api/products?q=${term}`))
);

// Type guard filter — narrows TypeScript type
events$.pipe(
  filter((e): e is MouseEvent => e instanceof MouseEvent)
);
```

---

## 9. switchMap

`switchMap` is the most important higher-order operator for HTTP. When a new outer value arrives, it **cancels the previous inner Observable** and switches to a new one.

```typescript
import { fromEvent } from 'rxjs';
import { switchMap, debounceTime, map } from 'rxjs/operators';

// Classic search pattern:
const searchInput = document.querySelector('#search') as HTMLInputElement;

fromEvent(searchInput, 'input').pipe(
  map(event => (event.target as HTMLInputElement).value),
  debounceTime(300),                          // wait 300ms after user stops typing
  distinctUntilChanged(),                     // skip if value didn't change
  switchMap(term =>                           // cancel old request, start new one
    http.get<Product[]>(`/api/search?q=${term}`)
  )
).subscribe(results => {
  this.searchResults = results;
});
```

### switchMap vs mergeMap vs exhaustMap

```typescript
// switchMap — CANCELS previous. Use for: search, navigation, "latest wins"
search$.pipe(switchMap(term => http.get(`/search?q=${term}`)));

// mergeMap — runs ALL concurrently. Use for: parallel requests, fire-and-forget
ids$.pipe(mergeMap(id => http.delete(`/items/${id}`)));

// exhaustMap — IGNORES new until current completes. Use for: login button (prevent double-submit)
loginClick$.pipe(exhaustMap(() => http.post('/auth/login', credentials)));
```

### In an Angular component

```typescript
import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input (input)="onSearch($event)" placeholder="Search products..." />
    @for (p of results(); track p.id) {
      <p>{{ p.name }}</p>
    }
  `
})
export class ProductSearchComponent {
  private http    = inject(HttpClient);
  results         = signal<{ id: number; name: string }[]>([]);
  private search$ = new Subject<string>();

  constructor() {
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.http.get<{ id: number; name: string }[]>(`/api/products?q=${term}`)),
      takeUntilDestroyed()              // auto-cancel when component destroys
    ).subscribe(products => this.results.set(products));
  }

  onSearch(event: Event): void {
    this.search$.next((event.target as HTMLInputElement).value);
  }
}
```

---

## 10. catchError

`catchError` intercepts errors in a stream and lets you either recover (return a fallback Observable) or re-throw.

```typescript
import { of, throwError, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Recovery — return a fallback value
http.get<User[]>('/api/users').pipe(
  catchError(err => {
    console.error('Failed to load users:', err);
    return of([]);   // emit empty array instead of propagating the error
  })
);

// Re-throw with enriched message
http.get<Product>(`/api/products/${id}`).pipe(
  catchError(err => {
    if (err.status === 404) {
      return throwError(() => new Error(`Product ${id} not found`));
    }
    return throwError(() => err);   // re-throw other errors unchanged
  })
);

// Silently swallow — emit nothing and complete
http.get('/api/optional-feature').pipe(
  catchError(() => EMPTY)    // EMPTY completes immediately with no emissions
);
```

### Pattern: error state in a component

```typescript
@Component({ /* ... */ })
export class UserListComponent {
  private http = inject(HttpClient);
  users        = signal<User[]>([]);
  error        = signal<string | null>(null);
  isLoading    = signal(false);

  constructor() {
    this.isLoading.set(true);
    this.http.get<User[]>('/api/users').pipe(
      takeUntilDestroyed()
    ).subscribe({
      next:     users => { this.users.set(users); this.isLoading.set(false); },
      error:    err   => { this.error.set(err.message); this.isLoading.set(false); },
    });
  }
}
```

---

## 11. takeUntilDestroyed

`takeUntilDestroyed` is Angular's built-in solution for subscription cleanup. It completes an Observable when the current **DestroyRef** is destroyed — i.e., when the component, directive, or service is torn down.

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-ticker',
  standalone: true,
  template: `<p>Count: {{ count }}</p>`
})
export class TickerComponent {
  count = 0;

  constructor() {
    // takeUntilDestroyed() uses the injection context (constructor) automatically
    interval(1000).pipe(
      takeUntilDestroyed()    // completes when TickerComponent is destroyed
    ).subscribe(() => this.count++);
  }
}
```

### Using outside the injection context

If you need to use `takeUntilDestroyed` outside a constructor (e.g., in `ngOnInit`), inject `DestroyRef` explicitly:

```typescript
import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({ /* ... */ })
export class MyComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    interval(1000).pipe(
      takeUntilDestroyed(this.destroyRef)  // pass it explicitly
    ).subscribe(() => console.log('tick'));
  }
}
```

### Why not `ngOnDestroy` + a Subject?

```typescript
// OLD pattern (Angular 2-16) — verbose and easy to forget:
private destroy$ = new Subject<void>();

ngOnInit() {
  someObservable$.pipe(takeUntil(this.destroy$)).subscribe(...);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// NEW pattern (Angular v17+) — two fewer lifecycle hooks:
constructor() {
  someObservable$.pipe(takeUntilDestroyed()).subscribe(...);
}
```

---

## 12. RxJS vs Signals — When to Use Each

This is the most common question in modern Angular development. The answer is not "pick one" — it's **use both for what they're best at**.

### Use Signals for

- Local component state (`count`, `isOpen`, `selectedTab`)
- Derived/computed values (`totalPrice = computed(() => ...)`)
- State that drives the template directly
- Simple service state that doesn't need to be composed with other async sources

```typescript
// Classic Signal use case:
count    = signal(0);
doubled  = computed(() => this.count() * 2);
isEven   = computed(() => this.count() % 2 === 0);
```

### Use RxJS for

- HTTP requests (Angular's `HttpClient` returns Observables)
- Real-time streams (WebSocket, SSE, polling intervals)
- Complex async composition (`combineLatest`, `switchMap`, `mergeMap`)
- Event debouncing and throttling (`debounceTime`, `throttleTime`)
- Router events and query params (Angular Router returns Observables)
- Anything that needs to be cancelled on demand

```typescript
// Classic RxJS use case:
searchResults$ = this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.http.get<Result[]>(`/api/search?q=${term}`)),
  catchError(() => of([]))
);
```

### Bridging: `toSignal` and `toObservable`

Angular provides two functions to convert between the two worlds:

```typescript
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';

// Observable → Signal (use it in the template like a signal)
readonly users = toSignal(this.http.get<User[]>('/api/users'), { initialValue: [] });
// users() in template — no async pipe needed!

// Signal → Observable (compose it with RxJS operators)
readonly searchTerm = signal('');
readonly results$   = toObservable(this.searchTerm).pipe(
  debounceTime(300),
  switchMap(term => this.http.get<Result[]>(`/api/search?q=${term}`))
);
```

### Decision summary

```
Is the value the RESULT of an async operation (HTTP, WebSocket)?
  YES → Start with RxJS Observable; optionally convert to Signal with toSignal()
  NO  → Use a Signal

Does the value need to be COMPOSED with other async sources?
  YES → RxJS (pipe, combineLatest, switchMap)
  NO  → Signals are simpler

Is this LOCAL component state (UI toggles, counters, form state)?
  YES → Signals
  NO  → Consider whether it belongs in a service (possibly RxJS BehaviorSubject or Signal)
```

---

## ✅ Section 13 Recap

You now know:
- What an **Observable** is — a lazy, cancellable, possibly-async stream.
- How to **subscribe** safely and avoid memory leaks.
- The difference between **Subject** (no memory) and **BehaviorSubject** (replays latest value).
- How to use **map**, **filter**, and **switchMap** — the three most important operators.
- How to handle errors with **catchError** and recover gracefully.
- How to auto-clean up subscriptions with **takeUntilDestroyed**.
- When to choose **RxJS vs Signals** — and how to bridge between them with `toSignal` / `toObservable`.

### Knowledge Check

1. What is the difference between a Subject and a BehaviorSubject?
2. When should you use `switchMap` instead of `mergeMap`?
3. What does `takeUntilDestroyed()` replace in pre-v17 Angular?
4. How would you convert an Observable to a Signal in a component?
5. Name one scenario where you would prefer RxJS over Signals.

<details>
<summary>Show answers</summary>

1. A `Subject` does not emit a current value to new subscribers — they only receive future emissions. A `BehaviorSubject` replays its most recent value to any new subscriber immediately on subscription, and requires an initial value.
2. Use `switchMap` when the latest value wins and you want to cancel in-flight inner Observables (e.g., HTTP search — if the user types a new term, abort the old request). Use `mergeMap` when you want all inner Observables to run concurrently (e.g., deleting multiple items in parallel).
3. `takeUntilDestroyed()` replaces the classic `takeUntil(this.destroy$)` + `ngOnDestroy` pattern. Instead of managing a `Subject` and implementing `ngOnDestroy`, you add one operator in the constructor.
4. Use `toSignal()` from `@angular/core/rxjs-interop`: `readonly users = toSignal(this.users$, { initialValue: [] });` — then use `users()` in the template.
5. Any valid answer: HTTP streaming/pagination, WebSocket real-time feeds, search debouncing with `debounceTime + switchMap`, combining multiple async sources with `combineLatest`, Angular Router event streams, or anything requiring explicit cancellation.

</details>

---

**Next up — [Section 14: HTTP and APIs](../Section%2014%20-%20HTTP%20and%20APIs/README.md)**
We'll cover Angular's `HttpClient`, the new Fetch-based transport in v22, declarative data fetching with `httpResource()`, interceptors, and building a clean API service layer.
