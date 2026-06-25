# Section 8: Advanced Signals

> **Angular v22 Course** — Section 8 of 25
> Estimated time: ~90 minutes · Level: Intermediate–Advanced

Section 7 covered the foundation: `signal()`, `computed()`, and `effect()`. This section goes deeper into the advanced Signal APIs that power modern Angular components — signal-based inputs and queries, linked signals, and the stable **Resource API** (`resource`, `rxResource`, `httpResource`) for declarative async data fetching. After this section, you will write components with no lifecycle hooks and no manual subscriptions.

---

## Table of Contents

1. [Signal Inputs](#1-signal-inputs)
2. [Model Inputs](#2-model-inputs)
3. [Signal Queries](#3-signal-queries)
4. [Linked Signals](#4-linked-signals)
5. [Resources — resource, rxResource, httpResource](#5-resources)
6. [Async Data with Signals](#6-async-data-with-signals)
7. [Signal-Based State Management](#7-signal-based-state-management)
8. [Common Signal Mistakes](#8-common-signal-mistakes)

---

## 1. Signal Inputs

Angular v17.1 introduced **signal-based inputs** — a replacement for the `@Input()` decorator that returns a read-only Signal instead of a plain property.

### Creating signal inputs

```typescript
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>{{ name() }}</h2>
      <p>{{ email() }}</p>
      @if (role()) {
        <span class="badge">{{ role() }}</span>
      }
    </div>
  `
})
export class UserCardComponent {
  // Required input — parent MUST provide this
  name = input.required<string>();

  // Required input with transform
  email = input.required<string>();

  // Optional input with default value
  role = input<string>('user');
}
```

### @Input() vs input()

| Feature | `@Input()` | `input()` |
|---|---|---|
| Value type | Plain property | Read-only Signal |
| Reactivity | ngOnChanges | `computed()`, `effect()` |
| Required enforcement | Runtime error | Compile-time error |
| Transform support | No | `input({ transform })` |
| Works with OnPush | Requires ChangeDetectorRef | Automatic |

### Input with transform

```typescript
import { input, booleanAttribute, numberAttribute } from '@angular/core';

@Component({ standalone: true, /* ... */ template: `` })
export class ButtonComponent {
  // Accepts "disabled" attribute without value (HTML boolean attribute)
  disabled = input(false, { transform: booleanAttribute });

  // Converts string attribute to number
  size = input(16, { transform: numberAttribute });
}
```

### Using signal inputs in computed()

Because `input()` returns a Signal, you can derive values from it with `computed()` — no `ngOnChanges` needed:

```typescript
export class PriceDisplayComponent {
  price = input.required<number>();
  currency = input<string>('USD');

  // Automatically recomputes when price or currency changes
  formatted = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency()
    }).format(this.price())
  );
}
```

---

## 2. Model Inputs

A **model input** is a two-way-bindable signal input — it exposes both an input value and a corresponding output event, enabling `[(ngModel)]`-style binding with child components.

```typescript
import { Component, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="toggle()" [class.active]="checked()">
      {{ checked() ? 'ON' : 'OFF' }}
    </button>
  `
})
export class ToggleComponent {
  // Creates both an input signal and an output event named "checkedChange"
  checked = model(false);

  toggle() {
    this.checked.update(v => !v);
  }
}
```

```html
<!-- Parent: two-way binding with banana-in-a-box -->
<app-toggle [(checked)]="isEnabled" />

<!-- Equivalent long form: -->
<app-toggle [checked]="isEnabled()" (checkedChange)="isEnabled.set($event)" />
```

### When to use model vs input + output

- Use `model()` when a child component owns an editable value that the parent needs to sync (toggles, inputs, pickers).
- Use `input()` + `output()` for one-directional data flow where the parent fully controls the value.

---

## 3. Signal Queries

Signal queries replace `@ViewChild`, `@ViewChildren`, `@ContentChild`, and `@ContentChildren` with Signal-based equivalents.

### viewChild and viewChildren

```typescript
import { Component, viewChild, viewChildren, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input #nameInput placeholder="Enter name" />
    <div #item>Item 1</div>
    <div #item>Item 2</div>
  `
})
export class FormComponent {
  // Single element query — returns Signal<ElementRef | undefined>
  nameInput = viewChild<ElementRef>('nameInput');

  // Required variant — returns Signal<ElementRef> (throws if not found)
  nameInputRequired = viewChild.required<ElementRef>('nameInput');

  // Multiple elements — returns Signal<readonly ElementRef[]>
  items = viewChildren<ElementRef>('item');

  focusInput() {
    this.nameInput()?.nativeElement.focus();
  }
}
```

### contentChild and contentChildren

```typescript
import { Component, contentChild, contentChildren } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  template: `<ng-content />`
})
export class TabsComponent {
  // Query projected content
  activeTab = contentChild(TabComponent);
  allTabs = contentChildren(TabComponent);
}
```

### Why signal queries are better

- No lifecycle hook needed (`AfterViewInit`, `AfterContentInit`)
- Value updates tracked reactively — use in `computed()` and `effect()`
- Type-safe: `viewChild.required()` guarantees non-undefined

---

## 4. Linked Signals

`linkedSignal()` creates a writable signal whose value can be **reset** when a source signal changes. This solves the common pattern of tracking a derived value that can also be user-edited.

```typescript
import { Component, signal, linkedSignal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select (change)="selectShipping($event)">
      @for (opt of shippingOptions(); track opt.id) {
        <option [value]="opt.id">{{ opt.name }} — ${{ opt.price }}</option>
      }
    </select>

    <p>Selected: {{ selectedOption()?.name }}</p>
    <button (click)="resetToDefault()">Reset</button>
  `
})
export class ShippingPickerComponent {
  shippingOptions = signal([
    { id: 1, name: 'Standard', price: 5 },
    { id: 2, name: 'Express', price: 15 },
    { id: 3, name: 'Overnight', price: 35 },
  ]);

  // Automatically resets to first option when shippingOptions changes
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  selectShipping(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    const found = this.shippingOptions().find(o => o.id === id);
    if (found) this.selectedOption.set(found);
  }

  resetToDefault() {
    // linkedSignal can be set manually too
    this.selectedOption.set(this.shippingOptions()[0]);
  }
}
```

### Use cases for linkedSignal

- Selection state that resets when the list changes (dropdown, tab, active item)
- Form field that mirrors a prop but can be edited locally
- Pagination page that resets to 1 when filter changes

---

## 5. Resources

The **Resource API** (stable in Angular v22) provides a declarative way to load async data and expose its state (loading, error, value) as Signals — no subscriptions, no `ngOnInit`.

### resource() — Promise-based

```typescript
import { Component, signal, resource, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (usersResource.isLoading()) {
      <p>Loading...</p>
    } @else if (usersResource.error()) {
      <p>Error: {{ usersResource.error() }}</p>
    } @else {
      @for (user of usersResource.value(); track user.id) {
        <p>{{ user.name }}</p>
      }
    }
  `
})
export class UsersComponent {
  usersResource = resource({
    loader: () => fetch('/api/users').then(r => r.json())
  });
}
```

### resource() with a reactive request

The loader re-runs automatically when any signal used in `request` changes:

```typescript
export class UserDetailsComponent {
  userId = signal(1);

  userResource = resource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) =>
      fetch(`/api/users/${request.id}`).then(r => r.json())
  });
}
```

### rxResource() — Observable-based

```typescript
import { rxResource } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ProductsComponent {
  private http = inject(HttpClient);
  categoryId = signal(1);

  productsResource = rxResource({
    request: () => ({ category: this.categoryId() }),
    loader: ({ request }) =>
      this.http.get<Product[]>(`/api/products?category=${request.category}`)
  });
}
```

### httpResource() — The simplest option

`httpResource()` is a thin wrapper around `rxResource` + `HttpClient`. Provide a URL signal and get a resource back:

```typescript
import { httpResource } from '@angular/common/http';

export class ProductsComponent {
  categoryId = signal(1);

  // URL is reactive — resource reloads when categoryId() changes
  productsResource = httpResource<Product[]>(
    () => `/api/products?category=${this.categoryId()}`
  );
}
```

### Resource status signals

Every resource exposes these signals:

| Signal | Type | Description |
|---|---|---|
| `.value()` | `T \| undefined` | The loaded data |
| `.isLoading()` | `boolean` | True while request is in flight |
| `.error()` | `unknown` | The error if the request failed |
| `.status()` | `ResourceStatus` | `'idle' \| 'loading' \| 'resolved' \| 'error'` |

---

## 6. Async Data with Signals

### Pattern: local loading state with signal + async

When you can't use `httpResource()` (e.g., complex POST logic), combine `signal()` with an async method:

```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) { <app-spinner /> }
    @if (error()) { <p class="error">{{ error() }}</p> }
    @if (data()) { <pre>{{ data() | json }}</pre> }
    <button (click)="load()" [disabled]="loading()">Load</button>
  `
})
export class ManualFetchComponent {
  private http = inject(HttpClient);

  loading = signal(false);
  error = signal<string | null>(null);
  data = signal<unknown>(null);

  async load() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(this.http.get('/api/data'));
      this.data.set(result);
    } catch (e) {
      this.error.set('Failed to load data.');
    } finally {
      this.loading.set(false);
    }
  }
}
```

---

## 7. Signal-Based State Management

For application-wide state, create a service that exposes signals. Components inject the service and read signals directly — no Store pattern required for simple cases.

```typescript
import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartSignalService {
  private items = signal<CartItem[]>([]);

  // Derived signals — update automatically
  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  total = computed(() => this.items().reduce((sum, i) => sum + i.price * i.quantity, 0));
  isEmpty = computed(() => this.items().length === 0);

  addItem(item: Omit<CartItem, 'quantity'>) {
    this.items.update(list => {
      const existing = list.find(i => i.id === item.id);
      if (existing) {
        return list.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...list, { ...item, quantity: 1 }];
    });
  }

  removeItem(id: number) {
    this.items.update(list => list.filter(i => i.id !== id));
  }

  clear() {
    this.items.set([]);
  }
}
```

---

## 8. Common Signal Mistakes

### Mistake 1: Calling a signal inside effect without reactive context

```typescript
// BAD: reading signal outside of reactive context
const count = signal(0);
const doubled = count() * 2;  // reads once, never updates

// GOOD:
const doubled = computed(() => count() * 2);  // reactive
```

### Mistake 2: Mutating signal value directly

```typescript
const items = signal<string[]>([]);

// BAD: mutates the array in place — Angular won't detect the change
items().push('new item');

// GOOD: replace the reference
items.update(list => [...list, 'new item']);
```

### Mistake 3: Creating infinite effect loops

```typescript
const counter = signal(0);

// BAD: writing to counter inside an effect that reads counter → infinite loop
effect(() => {
  counter.set(counter() + 1);
});

// GOOD: use allowSignalWrites only when necessary, and only write to a DIFFERENT signal
const doubled = signal(0);
effect(() => {
  doubled.set(counter() * 2);
});
```

### Mistake 4: Using effect() for derived values

```typescript
// BAD: manual sync with effect
const fullName = signal('');
effect(() => {
  fullName.set(`${firstName()} ${lastName()}`);
});

// GOOD: use computed() for derived values
const fullName = computed(() => `${firstName()} ${lastName()}`);
```

### Mistake 5: Not cleaning up effects

Effects created inside a component are cleaned up automatically. Effects created outside of injection context (e.g., in a standalone function) need manual cleanup:

```typescript
const cleanup = effect(() => {
  console.log(counter());
});

// Later:
cleanup.destroy();
```

---

## Knowledge Check

**Q1:** What is the main advantage of `input()` over `@Input()`?

**A:** `input()` returns a **read-only Signal**, so it integrates directly with `computed()`, `effect()`, and the template change detection system. No `ngOnChanges` needed. Also, `input.required()` enforces the requirement at compile time, not runtime.

---

**Q2:** When would you use `linkedSignal()` instead of `computed()`?

**A:** When you need a derived value that is also **writable by the user**. `computed()` is always read-only. `linkedSignal()` can be set manually but also resets automatically when its source signal changes.

---

**Q3:** What is the difference between `resource()`, `rxResource()`, and `httpResource()`?

**A:**
- `resource()` — Promise-based, works with any async function
- `rxResource()` — Observable-based, works with Angular's HttpClient and other RxJS streams
- `httpResource()` — Convenience wrapper: takes a URL signal, uses HttpClient internally, zero boilerplate

---

**Next:** [Section 9 — Directives and Pipes](../Section%2009%20-%20Directives%20and%20Pipes/README.md)
