# Section 3: Angular Fundamentals

> **Angular v22 Course** — Section 3 of 25
> Estimated time: ~60 minutes · Level: Beginner

Now that your environment is ready, it's time to write real Angular code. This section covers the core building blocks that every Angular application is made of: components, templates, styles, selectors, and data binding. By the end you'll understand how Angular turns a TypeScript class + HTML template into living, reactive UI — and you'll have written your first standalone component from scratch.

---

## Table of Contents

1. [What is Angular?](#1-what-is-angular)
2. [Components in Angular](#2-components-in-angular)
3. [Standalone Components](#3-standalone-components)
4. [Component Metadata](#4-component-metadata)
5. [Templates](#5-templates)
6. [Styles](#6-styles)
7. [Selectors](#7-selectors)
8. [Data Binding Overview](#8-data-binding-overview)

---

## 1. What is Angular?

Angular is a **complete, opinionated front-end framework** built and maintained by Google. Unlike React (a library) or Vue (a progressive framework), Angular ships with everything you need out of the box:

| Built-in feature | What it does |
|---|---|
| Components | The primary UI primitive — class + template + styles |
| Router | Client-side navigation with guards and lazy loading |
| HTTP Client | Typed, interceptable HTTP with `httpResource` |
| Forms | Signal Forms, Reactive Forms, Template-Driven Forms |
| Dependency Injection | First-class IoC container for services and values |
| Angular CLI | Project scaffolding, generation, build, test, deploy |

### The Angular mental model

Every Angular application is a **tree of components**. At the top sits the root component (`AppComponent`). Every other piece of UI is a child component nested inside it — directly, or through the router.

```
AppComponent
  ├── NavbarComponent
  ├── RouterOutlet
  │     ├── HomePageComponent
  │     └── ProductListComponent
  │           └── ProductCardComponent (×n)
  └── FooterComponent
```

When a Signal changes inside any component, Angular surgically updates only the affected part of the DOM — no full re-render, no virtual DOM diffing required.

### Angular v22 in one sentence

> Angular v22 is a **signal-first, zoneless, standalone-by-default** framework where every new component uses OnPush change detection and reacts to state changes through Signals.

---

## 2. Components in Angular

A **component** is the fundamental building block of Angular UI. Every component has three parts:

| Part | Purpose |
|---|---|
| TypeScript class | Logic, state (Signals), lifecycle hooks |
| HTML template | What the user sees; may contain binding syntax |
| CSS styles | Visual presentation, scoped to the component |

### Your first component

```typescript
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Hello, {{ name() }}!</h1>
    <p>Welcome to Angular v22.</p>
  `,
  styles: [`
    h1 { color: #3f51b5; }
  `]
})
export class GreetingComponent {
  name = signal('Angular');
}
```

Let's break down what's happening:

1. `@Component` — the decorator that turns a plain TypeScript class into an Angular component.
2. `selector: 'app-greeting'` — the custom HTML tag you use to render this component.
3. `standalone: true` — no `NgModule` needed; the component manages its own dependencies.
4. `changeDetection: ChangeDetectionStrategy.OnPush` — the v22 default; Angular only checks this component when its Signal inputs change.
5. `template` — inline HTML (or `templateUrl` for an external file).
6. `styles` — inline CSS array (or `styleUrl` for an external file).
7. `name = signal('Angular')` — a Signal holding the component's state.
8. `{{ name() }}` — interpolation that reads the Signal's value.

### Using the component

Once defined, you render it anywhere in a parent template:

```html
<!-- in some parent template -->
<app-greeting />
```

Or as the root component in `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { GreetingComponent } from './greeting.component';

bootstrapApplication(GreetingComponent);
```

---

## 3. Standalone Components

Before Angular v15, every component had to be declared inside an `NgModule`. In Angular v22, **standalone is the only way** — `NgModule` still exists for legacy compatibility but is never needed for new code.

### What standalone means

A standalone component declares its own imports directly in its `@Component` decorator:

```typescript
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],   // <-- instead of declaring in NgModule
  template: `
    <div class="card">
      <h2>{{ product().name }}</h2>
      <a [routerLink]="['/products', product().id]">View details</a>
    </div>
  `
})
export class ProductCardComponent {
  product = signal({ id: 1, name: 'Angular v22 Book' });
}
```

### Key points about standalone

- `imports` in `@Component` replaces the `declarations` + `imports` arrays that used to live in an `NgModule`.
- You import Angular built-ins (`RouterLink`, `AsyncPipe`, etc.) directly.
- Tree-shaking works better — only what you actually import is included in the bundle.
- Each component is self-describing: reading its `@Component` decorator tells you everything it needs.

### Bootstrapping a standalone app

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

No `AppModule`, no `NgModule` — just a component and a configuration object.

---

## 4. Component Metadata

The `@Component` decorator accepts a metadata object that configures how the component behaves. Here are all the properties you'll use regularly:

```typescript
@Component({
  // --- Identity ---
  selector: 'app-user-card',        // Custom HTML tag (or attribute/class — see Lesson 7)

  // --- Standalone ---
  standalone: true,                  // Always true in v22 projects

  // --- Template (choose one) ---
  template: `<p>Inline HTML here</p>`,
  templateUrl: './user-card.html',   // Path to external HTML file

  // --- Styles (choose one or both) ---
  styles: [`p { color: red; }`],     // Inline CSS array
  styleUrl: './user-card.css',       // Single external CSS file
  styleUrls: ['./a.css', './b.css'], // Multiple external CSS files

  // --- Dependencies ---
  imports: [RouterLink, DatePipe],   // Other components, directives, pipes

  // --- Change Detection ---
  changeDetection: ChangeDetectionStrategy.OnPush,  // Default in v22

  // --- View Encapsulation ---
  encapsulation: ViewEncapsulation.Emulated,  // Default: scoped styles
})
export class UserCardComponent { ... }
```

### The most important fields

| Field | Required? | Notes |
|---|---|---|
| `selector` | Recommended | Can be omitted for selectorless components (v22 feature) |
| `standalone` | Yes | Always `true` in v22 |
| `template` or `templateUrl` | Yes | Must have exactly one |
| `changeDetection` | No | Defaults to `OnPush` in v22 |
| `imports` | When needed | List every component/directive/pipe used in the template |

### `templateUrl` vs inline `template`

Use **`templateUrl`** for anything more than ~5 lines — you get syntax highlighting, formatting, and Angular Language Service support in a dedicated `.html` file.

Use **inline `template`** for tiny, self-contained components or examples.

---

## 5. Templates

An Angular **template** is an HTML file (or string) enhanced with Angular's template syntax. It's not plain HTML — it compiles to TypeScript code that creates and updates DOM nodes efficiently.

### Template syntax quick reference

```html
<!-- Interpolation: read a value and render it as text -->
<p>{{ title() }}</p>

<!-- Property binding: set a DOM property -->
<img [src]="imageUrl()" [alt]="imageAlt()" />

<!-- Event binding: call a method on DOM events -->
<button (click)="handleClick()">Click me</button>

<!-- Two-way binding: keep input and signal in sync -->
<input [(ngModel)]="username" />

<!-- Control flow: conditionals and loops -->
@if (isLoggedIn()) {
  <p>Welcome back, {{ user().name }}!</p>
} @else {
  <a href="/login">Log in</a>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}
```

### The template is strongly typed

The Angular compiler knows the types of everything referenced in the template. If you try to access a property that doesn't exist:

```typescript
// TypeScript class
export class MyComponent {
  user = signal({ name: 'Alice' });
}
```

```html
<!-- Template — this is a compile-time error: -->
<p>{{ user().email }}</p>
<!-- Error: Property 'email' does not exist on type '{ name: string }' -->
```

This is one of Angular's biggest advantages over React/Vue — template errors are caught at **build time**, not at runtime.

### Template compilation

Templates are compiled by `@angular/compiler` into efficient TypeScript/JavaScript. You never run the compiler manually — the CLI does it during `ng serve` and `ng build`. The output is a set of DOM-manipulation instructions, not virtual DOM nodes.

---

## 6. Styles

Angular offers **three levels of styling**:

### 1. Global styles

In `src/styles.css` — applied to the entire application:

```css
/* styles.css */
*, *::before, *::after { box-sizing: border-box; }
body { font-family: 'Segoe UI', sans-serif; margin: 0; }
:root {
  --color-primary: #3f51b5;
  --color-accent:  #ff4081;
}
```

### 2. Component styles (default — Emulated encapsulation)

Styles defined in a component apply **only to that component's view** by default. Angular emulates Shadow DOM encapsulation by adding unique attribute selectors to your CSS at compile time.

```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="card"><ng-content /></div>`,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      /* This .card rule won't accidentally affect other .card elements */
    }
  `]
})
export class CardComponent {}
```

### 3. View Encapsulation modes

| Mode | Behavior |
|---|---|
| `Emulated` | Default. Angular adds attribute selectors (`_nghost-xxx`) to scope styles |
| `ShadowDom` | Real Shadow DOM — maximum isolation, limited browser support edge-cases |
| `None` | No scoping — styles bleed out to the whole page (use with care) |

```typescript
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-global-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,  // styles apply globally
  template: `<button class="btn">Click</button>`,
  styles: [`.btn { background: var(--color-primary); color: white; }`]
})
export class GlobalBtnComponent {}
```

### `:host` and `:host-context`

To style the component's **own element** (the `<app-card>` tag itself):

```css
:host {
  display: block;       /* components are inline by default */
  margin-bottom: 16px;
}

:host(.featured) {
  border-color: var(--color-accent);
}
```

---

## 7. Selectors

The `selector` in `@Component` determines how you use the component in templates. Angular supports three types:

### 1. Element selector (most common)

```typescript
@Component({ selector: 'app-hero-card', ... })
export class HeroCardComponent {}
```

Usage:
```html
<app-hero-card />
```

By convention, Angular app selectors use a **prefix** (`app-` by default) to avoid colliding with standard HTML elements. You can change the prefix in `angular.json`.

### 2. Attribute selector

```typescript
@Component({ selector: '[appHighlight]', ... })
export class HighlightComponent {}
```

Usage:
```html
<div appHighlight>This div is the component host</div>
```

Attribute selectors are rare for components but common for **directives** (covered in Section 9).

### 3. Class selector

```typescript
@Component({ selector: '.card-widget', ... })
export class CardWidgetComponent {}
```

Usage:
```html
<div class="card-widget">This div is the component host</div>
```

Class selectors are rarely used — they're harder to find in a codebase and can conflict with CSS class names.

### Selector best practices

- Use **element selectors** for components — they're the most explicit.
- Use **attribute selectors** for directives that enhance existing elements.
- Always use a **prefix** (`app-`, or your project's prefix) to avoid name collisions with HTML elements or third-party components.
- Use **camelCase** for attribute/class selectors: `[appTooltip]`, not `[app-tooltip]`.

### Selectorless Components (v22 new feature)

Angular v22 introduced **selectorless components** — components without a `selector` that can only be used via composition (directly imported and rendered by another component). Covered in Section 6.

```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // No selector — this component can't be used in HTML directly
  template: `<p>I am a selectorless component</p>`
})
export class HelperComponent {}
```

---

## 8. Data Binding Overview

**Data binding** is how Angular connects your TypeScript class to the HTML template. There are four types:

### 1. Interpolation `{{ }}`

One-way, from class to template. Reads a Signal (or property) and renders it as text.

```typescript
export class AppComponent {
  title = signal('My Angular App');
  count = signal(42);
  today = signal(new Date());
}
```

```html
<h1>{{ title() }}</h1>
<p>Count: {{ count() }}</p>
<p>Date: {{ today() | date:'longDate' }}</p>
<p>Expression: {{ count() * 2 + 1 }}</p>
```

> Interpolation automatically calls `toString()` — it only works for text content, not for setting DOM properties.

### 2. Property Binding `[property]="expression"`

One-way, from class to template. Sets a DOM property or component input.

```html
<img [src]="imageUrl()" [alt]="imageAlt()" />
<button [disabled]="isLoading()">Submit</button>
<input [value]="username()" />
<app-card [title]="cardTitle()" [data]="cardData()" />
```

> Note the difference: `[src]` sets the `src` **property** of the DOM element; `src="{{ }}"` sets the `src` **attribute**. Use property binding for anything that isn't plain text.

### 3. Event Binding `(event)="handler()"`

One-way, from template to class. Listens for DOM events and calls class methods.

```html
<button (click)="increment()">+1</button>
<input (input)="onInput($event)" />
<form (submit)="onSubmit($event)">...</form>
<div (keydown.enter)="onEnter()">Press Enter</div>
```

```typescript
export class CounterComponent {
  count = signal(0);

  increment(): void {
    this.count.update(n => n + 1);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
  }
}
```

### 4. Two-Way Binding `[(ngModel)]` / `[(property)]`

Combines property binding + event binding in a single syntax. Requires `FormsModule` for `ngModel`.

```typescript
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="name" placeholder="Enter your name" />
    <p>Hello, {{ name }}!</p>
  `
})
export class NameEditorComponent {
  name = '';   // plain property — ngModel works with both plain props and signals
}
```

> In Angular v22, Signal Forms replace `ngModel` for form management in most cases. `ngModel` / `FormsModule` remain available for simple two-way bindings outside forms.

### Summary table

| Syntax | Direction | Example |
|---|---|---|
| `{{ expr }}` | Class → Template (text) | `{{ user().name }}` |
| `[prop]="expr"` | Class → Template (property) | `[disabled]="isLoading()"` |
| `(event)="fn()"` | Template → Class | `(click)="save()"` |
| `[(prop)]="val"` | Both directions | `[(ngModel)]="email"` |

We'll explore each binding type in depth in **Section 4: Templates and Binding**.

---

## ✅ Section 3 Recap

You now understand Angular's core building blocks:

- **What Angular is** — a complete, signal-first framework with components, router, forms, HTTP, and DI.
- **Components** — the primary UI primitive: TypeScript class + HTML template + CSS styles.
- **Standalone components** — self-describing components with their own `imports` array; no `NgModule` needed.
- **Component metadata** — the `@Component` decorator fields: `selector`, `template`, `styles`, `imports`, `changeDetection`.
- **Templates** — Angular-enhanced HTML with binding syntax, compiled at build time to efficient DOM instructions.
- **Styles** — three levels (global, component-scoped, Shadow DOM); `:host` for the component's own element.
- **Selectors** — element (`app-foo`), attribute (`[appFoo]`), or class (`.foo`) — use element selectors for components.
- **Data binding** — four types: interpolation, property binding, event binding, two-way binding.

### Knowledge Check

1. What are the three parts every Angular component is made of?
2. What does `standalone: true` replace compared to older Angular?
3. What change detection strategy do Angular v22 components use by default, and what does it mean?
4. Name the four types of data binding and their syntax.
5. What is the difference between `<img src="{{ url() }}" />` and `<img [src]="url()" />`?

<details>
<summary>Show answers</summary>

1. A TypeScript class (logic and state), an HTML template (what the user sees), and CSS styles (visual presentation scoped to the component).
2. `standalone: true` replaces the need to declare the component in an `NgModule`. The component lists its own dependencies in its `imports` array inside `@Component`.
3. `ChangeDetectionStrategy.OnPush`. It means Angular only re-checks the component's template when one of its Signal inputs changes or when an event originates from within the component — instead of checking on every change anywhere in the app.
4. Interpolation `{{ expr }}` (class → template, text), Property Binding `[prop]="expr"` (class → template, DOM property), Event Binding `(event)="fn()"` (template → class), Two-Way Binding `[(prop)]="val"` (both directions).
5. The first sets the HTML **attribute** via string concatenation (which briefly flashes `src="[object Object]"` before Angular runs). The second sets the DOM **property** directly, which is the correct and safe approach for dynamic values.

</details>

---

**Next up — [Section 4: Templates and Binding](../Section%2004%20-%20Templates%20and%20Binding/README.md)**
We'll go deep on every binding type: interpolation, property binding, event binding, two-way binding, template reference variables, class binding, style binding, and attribute binding — with real examples for each.
