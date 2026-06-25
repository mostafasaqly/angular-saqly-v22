# Section 10: Services and Dependency Injection

> **Angular v22 Course** — Section 10 of 25
> Estimated time: ~70 minutes · Level: Intermediate

Components handle the UI. **Services** handle everything else — data fetching, business logic, caching, and state that needs to be shared between components. Angular's built-in **Dependency Injection (DI)** system wires services into components and other services automatically, so you never have to manually create instances or pass objects through props. This section builds a complete mental model of DI, covers the `inject()` function pattern that Angular v22 strongly prefers, and finishes with building a full CRUD service backed by Signals.

---

## Table of Contents

1. [What is a Service?](#1-what-is-a-service)
2. [Creating Services](#2-creating-services)
3. [Dependency Injection Overview](#3-dependency-injection-overview)
4. [providedIn: 'root'](#4-providedin-root)
5. [Injecting Services](#5-injecting-services)
6. [inject() Function](#6-inject-function)
7. [Service Scope](#7-service-scope)
8. [Sharing Data with Services](#8-sharing-data-with-services)

---

## 1. What is a Service?

A **service** is any TypeScript class decorated with `@Injectable`. The decorator tells Angular's DI system that this class can be injected into other classes.

Services are the recommended home for:

| Concern | Example |
|---|---|
| Data fetching | `UserService.getAll()` calls an API |
| Business logic | `CartService.applyDiscount()` calculates totals |
| Shared state | `AuthService.currentUser` accessible from any component |
| Caching | `ProductService` caches the last fetched product list |
| Communication | `EventBus` distributes events across unrelated components |

### What services are NOT for

- Template rendering logic (that belongs in components)
- Display formatting (that belongs in pipes)
- DOM manipulation (that belongs in directives)

### A minimal service

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Angular creates one instance for the whole app
})
export class GreetingService {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
```

---

## 2. Creating Services

### Using the Angular CLI

```bash
# Generates src/app/core/user.service.ts
ng generate service core/user

# Short form
ng g s core/user
```

The CLI generates:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {}
```

### Naming convention

Services end in `Service` by convention: `UserService`, `CartService`, `AuthService`. The file is named `user.service.ts`.

### Service with HTTP (preview)

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/users';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
```

---

## 3. Dependency Injection Overview

Angular's DI system works in three steps:

1. **Register** — tell Angular *how* to create a value (usually by decorating a class with `@Injectable({ providedIn: 'root' })`)
2. **Request** — a component or service declares it needs a dependency via `inject()` or a constructor parameter
3. **Resolve** — Angular looks up the dependency in its injector hierarchy and provides the right instance

### The Injector Tree

Angular maintains a tree of injectors that mirrors the component tree:

```
Root Injector           ← providedIn: 'root' services live here (singleton)
  └── Environment Injector
        └── Component Injector (AppComponent)
              ├── Component Injector (HeaderComponent)
              └── Component Injector (MainComponent)
                    ├── Component Injector (ProductListComponent)
                    └── Component Injector (CartComponent)
```

When a component requests `UserService`, Angular walks up the injector tree until it finds a provider. This is why a root-provided service is a **singleton** — there is only one instance in the root injector.

### Tokens

Every dependency is looked up by a **token**. For classes, the token is the class itself. For other values you can create an `InjectionToken`:

```typescript
import { InjectionToken } from '@angular/core';

// A typed token for a configuration object
export const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');
```

---

## 4. providedIn: 'root'

`providedIn: 'root'` is the recommended approach for almost all services. It has two major advantages:

1. **Tree-shakeable** — if no component ever injects `ReportService`, it is removed from the production bundle automatically.
2. **Singleton** — one instance shared across the entire application.

```typescript
@Injectable({ providedIn: 'root' })
export class CounterService {
  count = signal(0);
  increment(): void { this.count.update(n => n + 1); }
  decrement(): void { this.count.update(n => n - 1); }
  reset():     void { this.count.set(0); }
}
```

### Other providedIn options

| Value | Scope | When to use |
|---|---|---|
| `'root'` | App-wide singleton | Almost always |
| `'platform'` | Shared across multiple Angular apps on the same page | Micro-frontend setups |
| `'any'` | Separate instance per lazy-loaded module | Legacy NgModule setups |
| a `Component` class | One instance per component instance | See Service Scope section |

---

## 5. Injecting Services

### Constructor injection (traditional)

```typescript
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({ selector: 'app-users', standalone: true, template: '...' })
export class UsersComponent {
  constructor(private userService: UserService) {}

  loadUsers(): void {
    this.userService.getAll().subscribe(users => console.log(users));
  }
}
```

### inject() function (preferred in Angular v22)

```typescript
import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({ selector: 'app-users', standalone: true, template: '...' })
export class UsersComponent {
  private userService = inject(UserService);

  loadUsers(): void {
    this.userService.getAll().subscribe(users => console.log(users));
  }
}
```

Both are equivalent. The Angular team recommends `inject()` for new code because:
- Works in functional injection contexts (guards, interceptors, resolvers)
- Better tree-shaking potential
- Less boilerplate
- Enables composition utilities (mixins, standalone injection helpers)

---

## 6. inject() Function

`inject()` must be called in an **injection context**:
- During class field initialisation
- In a constructor body
- In a function called during construction (factory, mixin helper)

```typescript
import { Component, inject, computed, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { AuthService }    from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Welcome, {{ userName() }}</h1>
    <p>Count: {{ count() }}</p>
    <button (click)="counterSvc.increment()">+</button>
    <button (click)="counterSvc.decrement()">−</button>
  `
})
export class DashboardComponent {
  // inject() at field level — the correct place
  counterSvc = inject(CounterService);
  authSvc    = inject(AuthService);

  // Expose signals from services
  count    = this.counterSvc.count;
  userName = computed(() => this.authSvc.currentUser()?.name ?? 'Guest');
}
```

### inject() in utility functions

`inject()` makes it easy to build reusable composition utilities:

```typescript
// composable: useCounter.ts
import { inject } from '@angular/core';
import { CounterService } from './counter.service';

export function useCounter() {
  const svc = inject(CounterService); // called during construction ✓
  return {
    count:     svc.count,
    increment: () => svc.increment(),
    decrement: () => svc.decrement(),
  };
}

// In a component:
export class MyComponent {
  counter = useCounter(); // svc injected during field init ✓
}
```

---

## 7. Service Scope

### Root scope (default)

One instance for the whole app. All components share the same state.

### Component scope

Provide a service in a component's `providers` array to get a **fresh instance** scoped to that component and its children:

```typescript
@Component({
  selector: 'app-form',
  standalone: true,
  providers: [FormStateService], // new instance per <app-form>
  template: '...'
})
export class FormComponent {}
```

When `FormComponent` is destroyed, so is its `FormStateService` instance.

### Environment scope (lazy routes)

When you configure providers in `bootstrapApplication` or a route's `providers` array, those services are scoped to that environment:

```typescript
// In routes
{
  path: 'admin',
  providers: [AdminDataService], // fresh instance only in /admin
  loadComponent: () => import('./admin/admin.component')
}
```

---

## 8. Sharing Data with Services

The most common pattern in Angular v22 is a service that holds **signal-based state** — any component can read from the signals and any component can call methods to update them.

### Signal-based shared state service

```typescript
import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // Private mutable signal
  private _items = signal<CartItem[]>([]);

  // Public read-only views
  readonly items   = this._items.asReadonly();
  readonly total   = computed(() =>
    this._items().reduce((sum, i) => sum + i.price * i.qty, 0)
  );
  readonly count   = computed(() =>
    this._items().reduce((sum, i) => sum + i.qty, 0)
  );

  addItem(item: Omit<CartItem, 'qty'>): void {
    this._items.update(list => {
      const existing = list.find(i => i.productId === item.productId);
      if (existing) {
        return list.map(i =>
          i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...list, { ...item, qty: 1 }];
    });
  }

  removeItem(productId: number): void {
    this._items.update(list => list.filter(i => i.productId !== productId));
  }

  clear(): void {
    this._items.set([]);
  }
}
```

Any number of components can `inject(CartService)` and access `items`, `total`, and `count`. When any component calls `addItem()`, all components that read the signals update automatically.

---

## ✅ Section 10 Recap

| Concept | Key takeaway |
|---|---|
| Service | `@Injectable` class for logic and state outside of components |
| `providedIn: 'root'` | Singleton for the whole app; tree-shakeable |
| Constructor injection | Classic pattern; still valid |
| `inject()` function | Preferred in Angular v22; works in functional contexts |
| Component-scoped service | Add to component `providers` for a fresh instance |
| Signal-based service | `signal()` + `computed()` inside a service = reactive shared state |
| Private signal / readonly view | Use `.asReadonly()` to expose state without allowing external mutation |

---

## Knowledge Check

<details>
<summary>1. What does `providedIn: 'root'` do?</summary>

It registers the service with the root injector, making it a **singleton** — Angular creates exactly one instance that is shared across the entire application. It is also **tree-shakeable**: if no class injects the service, the bundler can remove it from the production output.
</details>

<details>
<summary>2. Where must inject() be called?</summary>

`inject()` must be called in an **injection context**: during class field initialisation, inside a constructor body, or in a factory function invoked during construction. Calling it in lifecycle hooks like `ngOnInit` or in event handlers will throw a runtime error.
</details>

<details>
<summary>3. How do you scope a service to a single component?</summary>

Add the service class to the component's `providers` array. Angular creates a new instance each time that component is instantiated, and destroys it when the component is destroyed. Children of that component share the same scoped instance.
</details>

<details>
<summary>4. What is the difference between a signal in a component and a signal in a service?</summary>

A signal in a **component** is local to that component instance. A signal in a **service** (with `providedIn: 'root'`) is shared — any component that injects the service can read the signal, and when one component updates it, every component watching that signal re-renders automatically.
</details>

<details>
<summary>5. Why use .asReadonly() when exposing a signal from a service?</summary>

`signal.asReadonly()` returns a `Signal<T>` (not a `WritableSignal<T>`), so consumers can read the value but cannot call `.set()` or `.update()` on it from outside the service. This enforces encapsulation — only the service's own methods can mutate the state.
</details>

---

**Next up —** [Section 11: Routing](../Section%2011%20-%20Routing/README.md)
