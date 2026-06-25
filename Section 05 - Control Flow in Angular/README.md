# Section 5: Control Flow in Angular

> **Angular v22 Course** — Section 5 of 25
> Estimated time: ~60 minutes · Level: Beginner–Intermediate

Angular v17 replaced the old structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`) with a built-in **block-based control flow** syntax that lives directly in the template. The new syntax is more readable, faster (the compiler can optimize it statically), and requires no imports. This section covers every control flow block you'll use in real Angular applications.

---

## Table of Contents

1. [Introduction to Angular Control Flow](#1-introduction-to-angular-control-flow)
2. [@if](#2-if)
3. [@else and @else if](#3-else-and-else-if)
4. [@for](#4-for)
5. [track in @for](#5-track-in-for)
6. [@empty](#6-empty)
7. [@switch](#7-switch)
8. [Migrating from \*ngIf and \*ngFor](#8-migrating-from-ngif-and-ngfor)

---

## 1. Introduction to Angular Control Flow

Before Angular v17, conditional rendering and list rendering required **structural directives** — special attributes prefixed with `*` that were actually syntactic sugar over `<ng-template>`. You had to import `NgIf`, `NgFor`, and `NgSwitch` from `@angular/common`.

```html
<!-- Old way (still works but discouraged) -->
<div *ngIf="isLoggedIn">Welcome back!</div>
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
```

The new **block syntax** removes all of that:

```html
<!-- New way (v17+, required in v22) -->
@if (isLoggedIn()) {
  <div>Welcome back!</div>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}
```

### Why the change?

| Concern | Old (`*ngIf`) | New (`@if`) |
|---|---|---|
| Import required | Yes (`NgIf`) | No |
| Compiler optimization | Limited | Full static analysis |
| Readability | Attribute-based | Block-based |
| Type narrowing | Limited | Full TypeScript narrowing |
| `@empty` support | No (manual workaround) | Built-in |

> **Angular v22:** All new projects use the block syntax by default. The schematic `ng update` can migrate existing templates automatically.

---

## 2. @if

`@if` renders its content when the condition is truthy.

### Basic syntax

```html
@if (condition) {
  <!-- rendered when condition is truthy -->
}
```

### Practical example

```typescript
@Component({
  selector: 'app-auth-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isLoggedIn()) {
      <div class="banner success">Welcome, {{ username() }}!</div>
    }
  `
})
export class AuthBannerComponent {
  isLoggedIn = signal(false);
  username = signal('');
}
```

### Conditions can be any truthy expression

```html
@if (user() && user()!.role === 'admin') {
  <button>Admin Panel</button>
}

@if (items().length > 0) {
  <p>You have {{ items().length }} items</p>
}

@if (product()?.inStock) {
  <button>Add to Cart</button>
}
```

### TypeScript type narrowing

`@if` narrows TypeScript types inside the block, just like a regular `if` statement:

```typescript
interface User { name: string; email: string }

currentUser = signal<User | null>(null);
```

```html
@if (currentUser()) {
  <!-- TypeScript knows currentUser() is User here, not User | null -->
  <p>{{ currentUser()!.name }}</p>
}
```

---

## 3. @else and @else if

Chain conditions with `@else if` and provide a fallback with `@else`.

### @else

```html
@if (isLoggedIn()) {
  <p>Welcome back!</p>
} @else {
  <a routerLink="/login">Please log in</a>
}
```

### @else if

```html
@if (status() === 'loading') {
  <app-spinner />
} @else if (status() === 'error') {
  <app-error-message [message]="errorMessage()" />
} @else if (status() === 'empty') {
  <p>No results found.</p>
} @else {
  <app-results [data]="results()" />
}
```

### Practical: role-based UI

```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (role() === 'admin') {
      <app-admin-nav />
    } @else if (role() === 'editor') {
      <app-editor-nav />
    } @else {
      <app-guest-nav />
    }
  `
})
export class NavigationComponent {
  role = signal<'admin' | 'editor' | 'guest'>('guest');
}
```

---

## 4. @for

`@for` iterates over an array (or any iterable) and renders the template block for each item.

### Basic syntax

```html
@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}
```

The `track` expression is **required** — see [section 5](#5-track-in-for) for the full explanation.

### Accessing loop context variables

Inside `@for`, Angular exposes several implicit context variables:

| Variable | Type | Description |
|---|---|---|
| `$index` | `number` | Zero-based index of the current item |
| `$first` | `boolean` | `true` for the first item |
| `$last` | `boolean` | `true` for the last item |
| `$even` | `boolean` | `true` when `$index` is even |
| `$odd` | `boolean` | `true` when `$index` is odd |
| `$count` | `number` | Total number of items |

```html
@for (product of products(); track product.id; let i = $index, last = $last) {
  <div [class.last-item]="last">
    {{ i + 1 }}. {{ product.name }} — ${{ product.price }}
  </div>
}
```

### Nested loops

```html
@for (category of categories(); track category.id) {
  <section>
    <h2>{{ category.name }}</h2>
    @for (item of category.items; track item.id) {
      <p>{{ item.title }}</p>
    }
  </section>
}
```

---

## 5. track in @for

`track` tells Angular how to identify each item in the list across re-renders. It is **required** in `@for` (unlike `trackBy` in `*ngFor` which was optional).

### Why track matters

When the array changes, Angular needs to decide which DOM nodes to reuse, move, or destroy. Without a stable identity:

- Every change re-creates all DOM nodes (expensive)
- Input focus is lost when the list updates
- CSS transitions break

```html
<!-- BAD: track by index — items are re-created on reorder/insert -->
@for (item of items(); track $index) { ... }

<!-- GOOD: track by stable unique ID -->
@for (item of items(); track item.id) { ... }
```

### When to use `$index`

Only use `$index` if the list **never reorders or changes size**, e.g., a static configuration list:

```html
@for (step of setupSteps; track $index) {
  <p>Step {{ $index + 1 }}: {{ step }}</p>
}
```

### track with a computed key

If items don't have an `id`, derive a stable key:

```html
@for (user of users(); track user.email) {
  <span>{{ user.name }}</span>
}
```

---

## 6. @empty

`@empty` is an optional block inside `@for` that renders when the iterable is empty. This replaces the common `*ngIf="items.length === 0"` workaround.

```html
@for (item of cartItems(); track item.id) {
  <app-cart-item [item]="item" />
} @empty {
  <p class="empty-state">Your cart is empty. <a routerLink="/shop">Start shopping</a></p>
}
```

### Practical: table with empty state

```html
<table>
  <thead>
    <tr><th>Name</th><th>Price</th><th>Stock</th></tr>
  </thead>
  <tbody>
    @for (product of filteredProducts(); track product.id) {
      <tr>
        <td>{{ product.name }}</td>
        <td>{{ product.price | currency }}</td>
        <td>{{ product.stock }}</td>
      </tr>
    } @empty {
      <tr>
        <td colspan="3" class="text-center">No products match your search.</td>
      </tr>
    }
  </tbody>
</table>
```

---

## 7. @switch

`@switch` renders one of several branches based on a value — equivalent to a JavaScript `switch` statement.

### Basic syntax

```html
@switch (expression) {
  @case (value1) {
    <!-- rendered when expression === value1 -->
  }
  @case (value2) {
    <!-- rendered when expression === value2 -->
  }
  @default {
    <!-- rendered when no case matches -->
  }
}
```

### Practical: status badge

```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (order().status) {
      @case ('pending') {
        <span class="badge badge-yellow">Pending</span>
      }
      @case ('processing') {
        <span class="badge badge-blue">Processing</span>
      }
      @case ('shipped') {
        <span class="badge badge-purple">Shipped</span>
      }
      @case ('delivered') {
        <span class="badge badge-green">Delivered</span>
      }
      @default {
        <span class="badge badge-gray">Unknown</span>
      }
    }
  `
})
export class OrderStatusComponent {
  order = input.required<Order>();
}
```

### @switch vs @if chains

Use `@switch` when you're comparing **a single value against multiple constants**. Use `@if / @else if` when each branch has a **different condition**.

```html
<!-- @switch: one variable, many constant values ✓ -->
@switch (theme()) {
  @case ('dark') { ... }
  @case ('light') { ... }
}

<!-- @if chain: different conditions per branch ✓ -->
@if (score() >= 90) { <span>A</span> }
@else if (score() >= 80) { <span>B</span> }
@else if (score() >= 70) { <span>C</span> }
@else { <span>F</span> }
```

---

## 8. Migrating from \*ngIf and \*ngFor

Angular ships a built-in schematic to migrate templates automatically.

### Automatic migration

```bash
ng generate @angular/core:control-flow
```

This command scans all templates in your project and converts `*ngIf`, `*ngFor`, and `*ngSwitch` to the new block syntax.

### Manual reference

| Old | New |
|---|---|
| `*ngIf="cond"` | `@if (cond) { }` |
| `*ngIf="cond; else tpl"` | `@if (cond) { } @else { }` |
| `*ngFor="let x of arr; trackBy: fn"` | `@for (x of arr; track fn(x)) { }` |
| `*ngFor="let x of arr; let i = index"` | `@for (x of arr; track x.id; let i = $index) { }` |
| `*ngSwitch` + `*ngSwitchCase` | `@switch` + `@case` |
| `*ngSwitchDefault` | `@default` |

### Do old structural directives still work?

Yes — `*ngIf`, `*ngFor`, and `*ngSwitch` are not removed in v22. You must still import them from `@angular/common` in standalone components. However, they are considered **legacy** and the new block syntax should be used in all new code.

---

## Knowledge Check

**Q1:** What is the key difference between `@for` and `*ngFor` regarding `track`?

**A:** In `@for`, `track` is **required**. In `*ngFor`, `trackBy` was optional (though recommended). Angular's compiler enforces tracking in `@for` to prevent accidental performance bugs.

---

**Q2:** When should you use `@switch` instead of `@if / @else if`?

**A:** Use `@switch` when all branches test the **same expression** against different constant values. Use `@if` chains when each branch has an independent condition (different variables, comparisons, or computed checks).

---

**Q3:** What does the `@empty` block replace?

**A:** It replaces the pattern of using a separate `*ngIf="items.length === 0"` element alongside `*ngFor`. With `@empty`, the empty state is co-located with the loop, making the template more readable and less error-prone.

---

**Next:** [Section 6 — Components Communication](../Section%2006%20-%20Components%20Communication/README.md)
