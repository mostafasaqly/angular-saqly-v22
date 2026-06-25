# Section 6: Components Communication

> **Angular v22 Course** — Section 6 of 25
> Estimated time: ~90 minutes · Level: Intermediate

Angular applications are trees of components. A real app might have dozens — a parent dashboard, child cards, grandchild buttons — and they all need to talk to each other. This section covers every communication pattern Angular v22 provides: passing data down with `@Input` and the new signal `input()`, sending events up with `@Output`/`EventEmitter` and the new `output()`, sharing complex objects, composing UIs from multiple children, projecting slotted content with `ng-content`, and the brand-new v22 **selectorless components**. By the end you'll know exactly which pattern to reach for in any situation.

---

## Table of Contents

1. [Parent to Child Communication](#1-parent-to-child-communication)
2. [@Input](#2-input)
3. [Child to Parent Communication](#3-child-to-parent-communication)
4. [@Output](#4-output)
5. [EventEmitter](#5-eventemitter)
6. [Passing Objects Between Components](#6-passing-objects-between-components)
7. [Component Composition](#7-component-composition)
8. [Content Projection with ng-content](#8-content-projection-with-ng-content)
9. [Selectorless Components (new in v22)](#9-selectorless-components-new-in-v22)

---

## 1. Parent to Child Communication

The most common pattern in Angular is a **parent component passing data down to a child**. Angular's data flow is intentionally **one-way**: data flows down the component tree (parent → child) and events flow up (child → parent). This makes applications predictable and easy to debug.

### Why one-way data flow?

Imagine a shopping cart component. The parent holds the list of items. The cart *display* component only needs to show them — it shouldn't be allowed to mutate the list directly. One-way flow enforces this boundary.

### How it works

The parent uses **property binding** (`[propertyName]="expression"`) to pass a value to the child. The child declares the property as an **input**.

```typescript
// parent.component.ts
import { Component, signal } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h2>Parent Component</h2>
    <app-child [title]="pageTitle()" [count]="itemCount()" />
  `
})
export class ParentComponent {
  pageTitle = signal('Hello from Parent');
  itemCount = signal(42);
}
```

```typescript
// child.component.ts (decorator style — still valid)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <p>Title: {{ title }}</p>
    <p>Count: {{ count }}</p>
  `
})
export class ChildComponent {
  @Input() title = '';
  @Input() count = 0;
}
```

> The child does **not** use `()` to read `title` and `count` here — they're plain class properties set by Angular's binding system. In Lesson 2 we'll see the Signal-based `input()` alternative where you *do* call `()`.

---

## 2. @Input

`@Input()` is the **decorator-based** way to declare a property that accepts data from a parent. It has been in Angular since the beginning and is still fully supported in v22. The v22 way is the signal `input()` function — covered right after.

### Basic @Input

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ name }}</h3>
      <p>Age: {{ age }}</p>
    </div>
  `
})
export class UserCardComponent {
  @Input() name: string = '';
  @Input() age: number = 0;
}
```

### Required inputs with @Input

Since Angular v16 you can mark an input as required — the compiler will error if the parent doesn't supply it:

```typescript
@Input({ required: true }) name!: string;
```

### Input aliases

Rename the public property binding without changing the internal property name:

```typescript
// Parent uses [user-name]="...", child uses this.userName internally
@Input({ alias: 'user-name' }) userName: string = '';
```

### Input transforms (v17+)

Transform the incoming value before it hits your property:

```typescript
import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';

@Component({ selector: 'app-tag', standalone: true, template: `...` })
export class TagComponent {
  // Converts "" (HTML attribute) to true
  @Input({ transform: booleanAttribute }) disabled = false;
  // Converts "42" (string attribute) to 42 (number)
  @Input({ transform: numberAttribute }) size = 16;
}
```

### The v22 way — signal input()

Angular v22 encourages the new `input()` function from `@angular/core`. It returns a **Signal**, so you read it with `()` in templates and TypeScript:

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ name() }}</h3>
      <p>Age: {{ age() }}</p>
    </div>
  `
})
export class UserCardComponent {
  // Signal inputs — read with name() in templates and TS
  name = input<string>('');           // optional with default
  age  = input.required<number>();    // required — no default
}
```

Key differences between `@Input` and `input()`:

| Feature | `@Input()` | `input()` |
|---|---|---|
| Returns | Plain property | Signal |
| Read in template | `{{ name }}` | `{{ name() }}` |
| Read in class | `this.name` | `this.name()` |
| Required | `@Input({ required: true })` | `input.required<T>()` |
| Transform | `@Input({ transform: fn })` | `input(default, { transform: fn })` |
| Works with `computed()` | No (not reactive) | Yes — fully reactive |

> **Best practice (v22):** Use `input()` for new code. Keep `@Input()` when working with existing components or libraries that expect it.

---

## 3. Child to Parent Communication

Data flows **down** (parent → child via inputs), but events flow **up** (child → parent via outputs). When something happens in the child — a button click, a form submission, a value change — the child needs to tell the parent.

### The pattern

1. Child declares an **output** (either `@Output()` + `EventEmitter`, or the new `output()`)
2. Child **emits** the output when something happens
3. Parent **listens** to the output using event binding `(outputName)="handler($event)"`

```typescript
// child.component.ts
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-like-button',
  standalone: true,
  template: `<button (click)="like()">❤️ Like</button>`
})
export class LikeButtonComponent {
  liked = output<void>();   // v22 signal output

  like() {
    this.liked.emit();
  }
}
```

```typescript
// parent.component.ts
import { Component, signal } from '@angular/core';
import { LikeButtonComponent } from './like-button.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [LikeButtonComponent],
  template: `
    <p>Likes: {{ likes() }}</p>
    <app-like-button (liked)="onLiked()" />
  `
})
export class PostComponent {
  likes = signal(0);

  onLiked() {
    this.likes.update(n => n + 1);
  }
}
```

---

## 4. @Output

`@Output()` is the classic decorator-based way to declare an event a child can emit to its parent. Pair it with `EventEmitter<T>` where `T` is the type of data the event carries.

### Basic @Output

```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ qty }}</span>
    <button (click)="increment()">+</button>
  `
})
export class QuantitySelectorComponent {
  @Output() quantityChanged = new EventEmitter<number>();
  qty = 1;

  increment() {
    this.qty++;
    this.quantityChanged.emit(this.qty);
  }

  decrement() {
    if (this.qty > 1) {
      this.qty--;
      this.quantityChanged.emit(this.qty);
    }
  }
}
```

Parent listens:

```typescript
// In parent template:
// <app-quantity-selector (quantityChanged)="onQtyChange($event)" />

onQtyChange(newQty: number) {
  console.log('New quantity:', newQty);
}
```

### Output aliases

```typescript
// Parent binds to (qty-change) but internally it's quantityChanged
@Output('qty-change') quantityChanged = new EventEmitter<number>();
```

### The v22 way — output()

```typescript
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ qty }}</span>
    <button (click)="increment()">+</button>
  `
})
export class QuantitySelectorComponent {
  quantityChanged = output<number>();   // v22 way
  qty = 1;

  increment() {
    this.qty++;
    this.quantityChanged.emit(this.qty);
  }

  decrement() {
    if (this.qty > 1) {
      this.qty--;
      this.quantityChanged.emit(this.qty);
    }
  }
}
```

> `output()` does not return a Signal — it returns an `OutputRef`. You still `.emit()` on it, and the parent still binds `(quantityChanged)="handler($event)"`. The difference is cleaner syntax and better tree-shaking.

---

## 5. EventEmitter

`EventEmitter<T>` is the Angular class used with `@Output()` to emit events. It extends RxJS `Subject`, which means it's also an Observable — though you rarely need to use it as one.

### How EventEmitter works

```typescript
import { EventEmitter } from '@angular/core';

// Generic type T is the payload type
const emitter = new EventEmitter<string>();

// Emit a value
emitter.emit('Hello parent!');

// Parent template: (myEvent)="handler($event)"
// $event receives 'Hello parent!'
```

### EventEmitter with complex payloads

```typescript
interface SelectionEvent {
  id: number;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-checkbox-item',
  standalone: true,
  template: `
    <label>
      <input type="checkbox" (change)="onChange($event)" />
      {{ label }}
    </label>
  `
})
export class CheckboxItemComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: number;
  @Output() selectionChange = new EventEmitter<SelectionEvent>();

  onChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectionChange.emit({ id: this.id, label: this.label, checked });
  }
}
```

### EventEmitter vs output() — when to use which

| Scenario | Use |
|---|---|
| New component, v22 project | `output<T>()` |
| Existing codebase with `@Output` | `@Output() + EventEmitter<T>` |
| Need to subscribe to output as Observable | `@Output() + EventEmitter<T>` |
| Migration path | Replace `@Output() x = new EventEmitter<T>()` with `x = output<T>()` |

---

## 6. Passing Objects Between Components

In real apps you pass entire objects — users, products, orders — not just primitive strings and numbers.

### Defining shared interfaces

Always define interfaces in a separate file so both parent and child can import from it:

```typescript
// models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}
```

### Parent passing an object

```typescript
import { Component, signal } from '@angular/core';
import { Product } from './models/product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    @for (product of products(); track product.id) {
      <app-product-card
        [product]="product"
        (addedToCart)="onAddToCart($event)"
      />
    }
  `
})
export class ProductListComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
    { id: 2, name: 'Mouse',  price: 29,  category: 'Accessories', inStock: true },
    { id: 3, name: 'Desk',   price: 349, category: 'Furniture',   inStock: false },
  ]);

  onAddToCart(product: Product) {
    console.log('Added to cart:', product.name);
  }
}
```

### Child receiving and emitting an object

```typescript
import { Component, input, output } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ product().name }}</h3>
      <p>{{ product().price | currency }}</p>
      <p>{{ product().category }}</p>
      <button
        [disabled]="!product().inStock"
        (click)="addToCart()"
      >
        {{ product().inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  `
})
export class ProductCardComponent {
  product  = input.required<Product>();
  addedToCart = output<Product>();

  addToCart() {
    this.addedToCart.emit(this.product());
  }
}
```

### Important: object mutation vs immutability

Angular's OnPush change detection (the default in v22) only checks if the **reference** to an object changed. If you mutate an object in place (`product.price = 999`), OnPush won't detect it.

```typescript
// WRONG — mutates in place, OnPush won't detect
updatePrice(id: number, newPrice: number) {
  const p = this.products().find(p => p.id === id);
  if (p) p.price = newPrice; // mutation — reference unchanged
}

// CORRECT — replace with new array and new object
updatePrice(id: number, newPrice: number) {
  this.products.update(products =>
    products.map(p => p.id === id ? { ...p, price: newPrice } : p)
  );
}
```

---

## 7. Component Composition

**Component composition** means building complex UIs by assembling smaller, focused components. Rather than one massive component that does everything, you split the UI into a tree of single-responsibility components.

### Principles

1. **Single responsibility** — each component does one thing well.
2. **Smart vs dumb** — "smart" (container) components fetch data and hold state; "dumb" (presentational) components just receive inputs and emit outputs.
3. **Inputs down, events up** — the one-way data flow rule.

### A composed dashboard example

```typescript
// dashboard-stats.component.ts — presentational
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="stat-card">
      <span class="label">{{ label() }}</span>
      <span class="value">{{ value() }}</span>
    </div>
  `
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
}
```

```typescript
// dashboard-header.component.ts — presentational
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  template: `
    <header>
      <h1>{{ title() }}</h1>
      <button (click)="refresh.emit()">Refresh</button>
    </header>
  `
})
export class DashboardHeaderComponent {
  title   = input.required<string>();
  refresh = output<void>();
}
```

```typescript
// dashboard.component.ts — smart / container
import { Component, signal } from '@angular/core';
import { StatCardComponent } from './dashboard-stats.component';
import { DashboardHeaderComponent } from './dashboard-header.component';

interface Stats {
  users: number;
  orders: number;
  revenue: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCardComponent, DashboardHeaderComponent],
  template: `
    <app-dashboard-header
      title="Admin Dashboard"
      (refresh)="loadStats()"
    />

    <div class="stats-grid">
      <app-stat-card label="Users"   [value]="stats().users" />
      <app-stat-card label="Orders"  [value]="stats().orders" />
      <app-stat-card label="Revenue" [value]="stats().revenue" />
    </div>
  `
})
export class DashboardComponent {
  stats = signal<Stats>({ users: 1240, orders: 88, revenue: '$12,400' });

  loadStats() {
    // Would call an HTTP service here
    console.log('Refreshing stats...');
  }
}
```

> **Rule of thumb:** if a component has more than ~150 lines of template, it's time to extract child components.

---

## 8. Content Projection with ng-content

Inputs let a parent pass *data* to a child. But sometimes you want to pass **HTML structure** — a button, a custom header, a slot for arbitrary markup. That's **content projection**, and Angular does it with `<ng-content>`.

### Basic single-slot projection

```typescript
// card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-body">
        <ng-content />
      </div>
    </div>
  `
})
export class CardComponent {}
```

Parent uses it like a "wrapper":

```html
<!-- Parent template -->
<app-card>
  <h2>Welcome back!</h2>
  <p>Here's your summary for today.</p>
</app-card>
```

The `<h2>` and `<p>` are projected into the `<ng-content>` slot.

### Named slots with select

Use `select` to create multiple named slots:

```typescript
// modal.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="modal-overlay">
      <div class="modal">
        <header class="modal-header">
          <ng-content select="[modal-header]" />
        </header>
        <div class="modal-body">
          <ng-content select="[modal-body]" />
        </div>
        <footer class="modal-footer">
          <ng-content select="[modal-footer]" />
        </footer>
      </div>
    </div>
  `
})
export class ModalComponent {}
```

Parent fills each named slot:

```html
<app-modal>
  <h2 modal-header>Confirm Deletion</h2>
  <p modal-body>Are you sure you want to delete this item? This cannot be undone.</p>
  <div modal-footer>
    <button (click)="cancel()">Cancel</button>
    <button (click)="confirm()">Delete</button>
  </div>
</app-modal>
```

### Fallback content

Content inside `<ng-content>` acts as fallback when the parent doesn't project anything:

```typescript
template: `
  <ng-content>
    <p>No content provided.</p>
  </ng-content>
`
```

> **When to use ng-content:** When you're building reusable "wrapper" components — cards, modals, tabs, panels, tooltips. If you want to reuse a *layout frame* but let consumers fill in any content, `ng-content` is the right tool.

---

## 9. Selectorless Components (new in v22)

In Angular v22, components no longer need a `selector`. A **selectorless component** is a component with no `selector` property — it cannot be used in HTML templates directly. Instead, it's used programmatically in composition and routing scenarios.

### Why selectorless?

Traditional components need a CSS selector (`app-card`, `app-modal`). But in some patterns — particularly **routed components** and **portal/overlay** rendering — the component is never placed in a template as a tag. The selector exists only for template use, so when you don't template-place a component, having a selector is misleading noise. Selectorless removes it.

### Declaring a selectorless component

Simply omit the `selector` property:

```typescript
import { Component, input, output } from '@angular/core';

// No 'selector' — this is a selectorless component
@Component({
  standalone: true,
  template: `
    <article class="post">
      <h2>{{ title() }}</h2>
      <p>{{ body() }}</p>
      <button (click)="deletePost.emit(id())">Delete</button>
    </article>
  `
})
export class PostDetailComponent {
  id         = input.required<number>();
  title      = input.required<string>();
  body       = input.required<string>();
  deletePost = output<number>();
}
```

### Using selectorless in routing

The most common use is as a **routed component** — Angular Router renders it by component reference, never by selector:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail.component';

export const routes: Routes = [
  {
    path: 'posts/:id',
    component: PostDetailComponent,   // referenced by class, not selector
  }
];
```

### Using selectorless in composition (NgComponentOutlet)

```typescript
import { Component, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';

@Component({
  selector: 'app-post-host',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    <ng-container *ngComponentOutlet="currentComponent" />
  `
})
export class PostHostComponent {
  currentComponent = PostDetailComponent;
}
```

### Selectorless rules

- Omitting `selector` is valid only in `standalone: true` components.
- You'll get a template compiler error if you try to use a selectorless component as `<app-something>` in a template — it has no selector to match.
- Great for: routed pages, lazy-loaded chunks, overlay portals, dynamic rendering via `viewContainerRef`.

---

## ✅ Section 6 Recap

You now understand all Angular component communication patterns:

- **Parent → Child:** `@Input()` (decorator) or `input()` (signal function, v22 preferred). Parent uses `[property]="value"` binding.
- **Child → Parent:** `@Output()` + `EventEmitter<T>` (classic) or `output<T>()` (v22 preferred). Parent uses `(event)="handler($event)"` binding.
- **Objects:** Define shared interfaces, pass them as inputs, always replace (not mutate) when updating with OnPush.
- **Composition:** Split complex UIs into smart (container) and dumb (presentational) components. One-way data flow: inputs down, events up.
- **ng-content:** Project arbitrary HTML into a child component with single-slot or named multi-slot `<ng-content select="...">`.
- **Selectorless components:** New in v22 — components without a `selector`, used by the Router or `NgComponentOutlet` instead of template tags.

### Knowledge Check

1. What is the difference between `@Input()` and `input()` in Angular v22? Name two concrete differences.
2. In a component using `OnPush` change detection, why is it important to replace objects rather than mutate them?
3. What is the purpose of the `select` attribute on `<ng-content>`?
4. When would you use a selectorless component instead of a regular one?

<details>
<summary>Show answers</summary>

1. `@Input()` is a **decorator** that sets a plain class property — you read it as `this.name` or `{{ name }}` in templates. `input()` is a **function** that returns a **Signal** — you read it as `this.name()` or `{{ name() }}`. Signal inputs are reactive and can drive `computed()` values; plain `@Input` properties cannot. Also, `input.required<T>()` vs `@Input({ required: true })`.

2. `OnPush` components only re-render when their input **references** change. If you mutate an object in place (`obj.price = 99`), the reference stays the same and Angular never re-renders the child. Replacing with a new object (`{ ...obj, price: 99 }`) changes the reference, triggering the update.

3. `select` is a CSS selector that tells Angular **which projected content goes into which `<ng-content>` slot**. For example, `<ng-content select="[modal-header]" />` only accepts elements that have the `modal-header` attribute. This enables multi-slot content projection where different pieces of parent markup appear in different parts of the child's template.

4. Use a selectorless component when it will **never appear directly as a tag in a template**. The most common cases are: routed page components (Angular Router renders them by class reference) and dynamically rendered components via `NgComponentOutlet` or `ViewContainerRef`. Having a selector would be misleading since no template will ever use it.

</details>

---

**Next up — [Section 7: Signals Fundamentals](../Section%2007%20-%20Signals%20Fundamentals/README.md)**
We'll dive deep into Angular's reactive primitive — Signals. You'll learn `signal()`, `computed()`, and `effect()` from the ground up and understand how they replace Zone.js-based change detection. 🚀
