# Section 18: Performance and Optimization

> **Angular v22 Course** — Section 18 of 25
> Estimated time: ~90 minutes · Level: Intermediate

Angular v22 ships with performance-first defaults: every new component uses `OnPush` change detection, new projects run Zoneless (no Zone.js), and the template engine gives you `@defer` blocks for fine-grained lazy loading. This section explains *why* these defaults exist, *how* they work under the hood, and *how* to squeeze even more performance out of your Angular applications.

---

## Table of Contents

1. [Angular Rendering Overview](#1-angular-rendering-overview)
2. [Change Detection Basics](#2-change-detection-basics)
3. [OnPush as the Default Strategy in v22](#3-onpush-as-the-default-strategy-in-v22)
4. [The Eager Strategy (formerly "Default") and When to Use It](#4-the-eager-strategy-formerly-default-and-when-to-use-it)
5. [Zoneless Angular (default for new projects)](#5-zoneless-angular-default-for-new-projects)
6. [Lazy Loading](#6-lazy-loading)
7. [Deferrable Views with @defer](#7-deferrable-views-with-defer)
8. [Image Optimization](#8-image-optimization)
9. [track in @for](#9-track-in-for)
10. [Bundle Size Optimization](#10-bundle-size-optimization)
11. [Performance Best Practices](#11-performance-best-practices)

---

## 1. Angular Rendering Overview

When a user opens your Angular app, the following happens:

1. The browser downloads and parses your JavaScript bundle.
2. Angular **bootstraps** the root component (`AppComponent`) and mounts it to the DOM.
3. Angular's **change detection** system keeps the DOM in sync with your component state.
4. When state changes, Angular figures out which parts of the UI need to update and patches only those parts.

### The rendering pipeline

```
Signal changes / Events
        ↓
Change Detection runs
        ↓
Angular diffs the virtual component tree
        ↓
Only dirty components are re-checked
        ↓
DOM is patched (only changed nodes)
```

### What slows Angular down?

| Problem | Symptom | Fix |
|---|---|---|
| Too many change detection cycles | Janky UI at 60fps | OnPush + Signals |
| Large initial bundle | Slow first paint | Lazy loading + @defer |
| Zone.js patching all async APIs | Extra overhead | Zoneless mode |
| Large images not optimized | Slow LCP score | NgOptimizedImage |
| Re-rendering entire lists on any change | List flicker | `track` in `@for` |

> Angular v22 addresses all five of these problems with out-of-the-box defaults. Understanding *why* each fix works makes you a better Angular developer.

---

## 2. Change Detection Basics

**Change detection (CD)** is Angular's mechanism for keeping the DOM in sync with component state. When something changes (a user clicks, an HTTP response arrives, a timer fires), Angular needs to know *which components* are affected and re-render them.

### The component tree

Angular renders your app as a **tree of components**. Change detection walks this tree, checking each component to see if anything changed.

```
AppComponent
├── NavbarComponent
├── ProductListComponent
│   ├── ProductCardComponent  (×10)
│   └── PaginationComponent
└── FooterComponent
```

### How a change detection cycle works

Without any optimization, Angular would walk every node in this tree on every event — even if only one `ProductCardComponent` changed. That's inefficient for large apps.

### Two strategies

Angular has two change detection strategies:

| Strategy | Old name | v22 name | Behavior |
|---|---|---|---|
| `ChangeDetectionStrategy.OnPush` | OnPush | **OnPush (default)** | CD runs only when inputs change, signals read by the template emit, or an event originates inside the component |
| `ChangeDetectionStrategy.Default` | Default | **Eager** | CD runs on every cycle for this component regardless of whether its inputs changed |

In v22, the CLI generates every component with `OnPush`. You opt into `Eager` only when you need it.

---

## 3. OnPush as the Default Strategy in v22

`OnPush` tells Angular: "only re-check this component when one of these conditions is true:"

1. An `input()` signal (or classic `@Input`) value changes (by reference).
2. A signal read inside the component's template changes.
3. An event fires from inside this component's template (click, input, etc.).
4. You manually call `ChangeDetectorRef.markForCheck()`.

Because Angular v22 is **Signal-first**, condition 2 covers almost everything — your reactive state lives in signals, so Angular always knows exactly which component templates to update.

### CLI-generated component (v22)

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,  // ← generated automatically
  template: `...`
})
export class ProductCardComponent {}
```

### OnPush + signals = surgical updates

```typescript
import { Component, ChangeDetectionStrategy, signal, input } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Name: {{ name() }}</p>
    <button (click)="increment()">+1</button>
  `
})
export class CounterComponent {
  // Signal input — Angular tracks this automatically
  name = input<string>('World');

  // Local signal state
  count = signal(0);

  increment() {
    this.count.update(n => n + 1);
    // Angular sees the signal changed → marks this component dirty → re-renders
    // No other component in the tree is touched
  }
}
```

### Why OnPush is better by default

```
Without OnPush (Eager on all components):
  User clicks a button anywhere → Angular checks ALL 50 components

With OnPush (v22 default):
  User clicks a button → Angular checks ONLY the component that contains the button
  + any ancestor that reads a signal that changed
```

> For a component tree with 100 components, OnPush can reduce the number of checked components per event from 100 to 1-3.

---

## 4. The Eager Strategy (formerly "Default") and When to Use It

In Angular v22, the old `ChangeDetectionStrategy.Default` is renamed **Eager** in documentation and tooling (though the enum value stays the same for backward compatibility).

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-legacy-widget',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default, // Eager — rarely needed in v22
  template: `<p>{{ getCurrentTime() }}</p>`
})
export class LegacyWidgetComponent {
  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
```

### When Eager is appropriate

You need `Eager` (Default) when:

1. **Integrating third-party libraries** that mutate state outside Angular's signal system and don't emit events you can hook into.
2. **Migrating legacy code** that uses mutable objects (not signals) and relies on Angular checking the whole tree.
3. **Calling impure functions in templates** that return different values on every call without any signal input (like `Date.now()` — though this is an anti-pattern).

> In new Angular v22 code, you should almost never use `Eager`. If you find yourself reaching for it, that's usually a signal (pun intended) that your state should be in a `signal()` instead.

---

## 5. Zoneless Angular (default for new projects)

### What is Zone.js?

Historically, Angular used `Zone.js` — a library that **monkey-patches** every asynchronous API in the browser (`setTimeout`, `Promise`, `fetch`, `addEventListener`, etc.). When any async operation completed, Zone.js notified Angular to run change detection.

```
User clicks → Zone.js intercepts → Angular CD runs → DOM updated
setTimeout fires → Zone.js intercepts → Angular CD runs → DOM updated
fetch completes → Zone.js intercepts → Angular CD runs → DOM updated
```

Zone.js adds ~15KB to your bundle and adds latency to every async operation.

### Zoneless mode (Angular v22 default)

In v22, new projects use **Zoneless** — Angular relies on Signals instead of Zone.js. When a signal changes, Angular knows *exactly* which component(s) read that signal and marks only those components for re-render.

```typescript
// app.config.ts — v22 default for new projects
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), // ← no Zone.js needed
    provideRouter(routes),
    provideHttpClient(),
  ]
};
```

> Note: `provideExperimentalZonelessChangeDetection` is the current API name. The "Experimental" label reflects that some edge cases are still being hardened — but it is the production default for new v22 projects.

### Benefits of Zoneless

| Benefit | Detail |
|---|---|
| Smaller bundle | ~15KB savings (no zone.js) |
| Faster startup | No async API patching at boot |
| No false positives | CD only runs when signals actually change |
| Better DevTools integration | Angular DevTools shows exact signal changes |
| Native async compatibility | Works with native `async/await` without patches |

### Rule of thumb

If you're on v22 and created your project with the CLI, you're already Zoneless. You don't need to do anything extra — just use Signals for your state and Angular handles the rest.

---

## 6. Lazy Loading

**Lazy loading** splits your application into smaller chunks that are loaded on demand — only when the user navigates to a route that needs them. This dramatically reduces the **initial bundle size** and improves **Time to Interactive (TTI)**.

### Lazy loading a route

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent),
    // AdminComponent is only downloaded when the user visits /admin
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then(m => m.PRODUCT_ROUTES),
    // Entire products sub-route tree is lazy loaded
  },
];
```

### `loadComponent` vs `loadChildren`

| API | Use case |
|---|---|
| `loadComponent` | Single standalone component route |
| `loadChildren` | A sub-router with multiple child routes |

### Preloading strategies

By default, lazy chunks are loaded when the user navigates to them. You can preload chunks in the background after initial boot:

```typescript
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ]
};
```

---

## 7. Deferrable Views with @defer

`@defer` is Angular's template-level lazy loading. You can delay the rendering — and downloading — of a component or block of template until a specific trigger fires.

### Basic syntax

```html
@defer {
  <app-heavy-chart />
} @loading {
  <p>Loading chart...</p>
} @error {
  <p>Failed to load chart.</p>
} @placeholder {
  <div class="chart-skeleton"></div>
}
```

- `@defer` — the content to lazy load (downloaded and rendered after trigger)
- `@placeholder` — shown before the trigger fires (synchronous, immediate)
- `@loading` — shown while the deferred content is being fetched
- `@error` — shown if the deferred content fails to load

### Built-in triggers

| Trigger | When it fires |
|---|---|
| `on idle` | When the browser is idle (default) |
| `on viewport` | When the deferred block scrolls into view |
| `on interaction` | When the user clicks or touches the placeholder |
| `on hover` | When the user hovers over the placeholder |
| `on timer(2s)` | After a specified delay |
| `when condition` | When a signal or expression becomes truthy |
| `on immediate` | Immediately (loads as soon as possible without blocking) |

### Trigger examples

```html
<!-- Load when scrolled into view -->
@defer (on viewport) {
  <app-product-reviews />
} @placeholder {
  <div class="reviews-placeholder">Reviews loading...</div>
}

<!-- Load after user clicks "Show Details" -->
@defer (on interaction) {
  <app-product-details />
} @placeholder {
  <button>Show Details</button>
}

<!-- Load when a signal becomes true -->
@defer (when isLoggedIn()) {
  <app-user-dashboard />
}

<!-- Minimum loading time to avoid flash -->
@defer (on viewport; minimum 500ms) {
  <app-analytics-widget />
} @loading (minimum 300ms) {
  <app-skeleton />
}
```

### @defer and bundle splitting

When you use `@defer`, the components inside are **automatically code-split** into separate chunks by the Angular compiler. You don't need to configure anything — putting a component inside `@defer` makes it lazy.

```typescript
// Heavy chart component in a @defer block:
// → ChartComponent is NOT in the initial bundle
// → It's downloaded as a separate .js chunk when the trigger fires
```

> `@defer` is one of the most powerful performance tools in Angular v22. Use it for any component that is not needed for the initial render: modals, tabs, below-the-fold content, analytics, heavy third-party widgets.

---

## 8. Image Optimization

Angular's `NgOptimizedImage` directive (`[ngSrc]`) automatically applies web performance best practices to every image:

- Sets `width` and `height` to prevent layout shift (CLS)
- Generates `srcset` for responsive images
- Applies `loading="lazy"` for below-the-fold images
- Warns if images are too large for their display size
- Supports image CDN integrations (Cloudinary, Imgix, etc.)

### Setup

```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <!-- Use ngSrc instead of src -->
    <img
      ngSrc="/assets/product.jpg"
      width="400"
      height="300"
      alt="Product photo"
    />

    <!-- Mark above-the-fold images as priority (no lazy loading) -->
    <img
      ngSrc="/assets/hero.jpg"
      width="1200"
      height="600"
      alt="Hero banner"
      priority
    />

    <!-- Fill mode — image fills its parent container -->
    <div style="position: relative; width: 100%; height: 300px;">
      <img ngSrc="/assets/background.jpg" fill alt="Background" />
    </div>
  `
})
export class ProductImageComponent {}
```

### Image CDN integration

```typescript
import { provideImgixLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideImgixLoader('https://my-cdn.imgix.net'),
    // Now ngSrc="/product.jpg" becomes
    // "https://my-cdn.imgix.net/product.jpg?auto=format&w=400"
  ]
};
```

### Core Web Vitals impact

| Metric | Problem | NgOptimizedImage Fix |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Hero image loads too late | `priority` attribute preloads it |
| **CLS** (Cumulative Layout Shift) | Images without dimensions cause reflow | Required `width`/`height` attributes |
| **INP** (Interaction to Next Paint) | Unoptimized large images block thread | `srcset` serves correct size for device |

---

## 9. track in @for

Every `@for` loop in Angular requires a `track` expression. This tells Angular how to identify items in the list so it can efficiently add, remove, and reorder DOM nodes without re-creating the whole list.

### Without tracking (not allowed in v22)

```html
<!-- This causes a compile error in v22 — track is required -->
@for (item of items) {
  <app-item [data]="item" />
}
```

### track by identity (default — use when items are stable objects)

```html
@for (item of items; track item) {
  <app-item [data]="item" />
}
<!-- Angular tracks by object reference — works when the array contains
     the same object references across renders -->
```

### track by property (recommended when items come from an API)

```html
@for (product of products(); track product.id) {
  <app-product-card [product]="product" />
}
<!-- Angular tracks by product.id — safe even when the array is
     re-fetched and objects are recreated -->
```

### track by index (last resort)

```html
@for (item of items; track $index) {
  <li>{{ item.name }}</li>
}
<!-- Only use for static lists that never reorder — tracking by index
     causes the entire list to re-render on any change -->
```

### Performance impact

```
Without track (or with track $index):
  Array changes → Angular destroys ALL DOM nodes → Creates ALL DOM nodes
  For a 100-item list: 200 DOM operations

With track product.id:
  Array changes → Angular patches only added/removed/moved nodes
  For 1 item added to a 100-item list: 1 DOM operation
```

---

## 10. Bundle Size Optimization

A smaller bundle means faster downloads and faster Time to Interactive. Here are the key tools Angular v22 provides.

### Tree shaking

Angular's build system (esbuild) automatically removes unused code. Write code in a tree-shakeable way:

```typescript
// Bad — imports the whole library
import * as _ from 'lodash';

// Good — import only what you need (tree-shakeable)
import { debounce } from 'lodash-es';
```

### Analyze your bundle

```bash
# Build with stats
ng build --stats-json

# Then use webpack-bundle-analyzer (works with Angular's stats.json)
npx webpack-bundle-analyzer dist/my-app/stats.json
```

### Source map explorer (alternative)

```bash
ng build --source-map
npx source-map-explorer dist/my-app/browser/*.js
```

### Common bundle wins

| Technique | Potential saving |
|---|---|
| Remove Zone.js (Zoneless) | ~15KB |
| Lazy load route chunks | Initial bundle 50-80% smaller |
| Use `@defer` for heavy components | Per-component savings |
| Replace moment.js with date-fns | ~200KB → ~20KB |
| Use `NgOptimizedImage` | Smaller image payloads |
| Enable Brotli compression on server | 60-80% smaller files over the wire |

### Production build

```bash
ng build
# Automatically: tree-shaking, minification, dead code elimination
# Output: dist/my-app/browser/ (static files ready to deploy)
```

---

## 11. Performance Best Practices

A summary of rules to follow in every Angular v22 project.

### Component level

```typescript
// 1. Always use OnPush (it's the default — don't change it)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})

// 2. Keep expensive computations in computed()
readonly filteredProducts = computed(() =>
  this.products().filter(p => p.price < this.maxPrice())
);

// 3. Avoid calling functions in templates — use signals/computed
// Bad:
// template: `{{ getFullName() }}`  ← called on every CD cycle

// Good:
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
// template: `{{ fullName() }}`     ← only recomputes when inputs change
```

### Template level

```html
<!-- Use track in every @for -->
@for (item of items(); track item.id) {
  <app-item [data]="item" />
}

<!-- Defer below-the-fold content -->
@defer (on viewport) {
  <app-heavy-section />
}

<!-- Use NgOptimizedImage for all images -->
<img ngSrc="/product.jpg" width="200" height="200" alt="..." />
```

### Application level

```typescript
// Lazy load routes
{
  path: 'reports',
  loadComponent: () => import('./reports/reports.component')
    .then(m => m.ReportsComponent)
}

// Use httpResource for declarative data fetching
readonly products = httpResource<Product[]>('/api/products');
// Automatic caching, loading state, and error state
```

### Checklist before shipping

- [ ] All components use `OnPush`
- [ ] New project uses Zoneless (`provideExperimentalZonelessChangeDetection`)
- [ ] Routes are lazy loaded with `loadComponent` / `loadChildren`
- [ ] Heavy or below-the-fold components use `@defer`
- [ ] All images use `NgOptimizedImage` (`ngSrc`)
- [ ] All `@for` loops have a meaningful `track` expression (not `$index`)
- [ ] No functions called in templates — use `computed()` instead
- [ ] Bundle analyzed with `--stats-json` before first release

---

## ✅ Section 18 Recap

You now know:
- **Angular's rendering pipeline** — how Angular goes from signal change to DOM patch.
- **Change detection strategies** — `OnPush` (v22 default) checks only when signals/inputs change; `Eager` (formerly Default) checks on every cycle.
- **Zoneless Angular** — no Zone.js, Signals drive all CD, smaller bundle and faster startup.
- **Lazy loading** — `loadComponent` and `loadChildren` split routes into separate JS chunks.
- **@defer blocks** — template-level lazy loading with triggers (`on viewport`, `on interaction`, `when`).
- **NgOptimizedImage** — automatic `srcset`, `loading="lazy"`, and layout-shift prevention.
- **track in @for** — required in v22; track by a stable unique ID for best performance.
- **Bundle optimization** — tree shaking, `--stats-json` analysis, Brotli compression.

### Knowledge Check

1. What are the three conditions that cause an `OnPush` component to re-render?
2. What does `provideExperimentalZonelessChangeDetection()` replace, and what is the main benefit?
3. What is the difference between `@placeholder` and `@loading` in a `@defer` block?
4. Why is `track $index` considered a last resort in `@for` loops?

<details>
<summary>Show answers</summary>

1. An `OnPush` component re-renders when: (1) an `input()` signal or `@Input` value changes by reference, (2) a signal read inside the component's template emits a new value, or (3) an event originates from inside this component's template (click, input, etc.). You can also manually trigger it via `ChangeDetectorRef.markForCheck()`.

2. `provideExperimentalZonelessChangeDetection()` replaces `Zone.js` — a library that monkey-patched all async browser APIs to trigger change detection. The main benefit is a **~15KB smaller bundle** and faster startup because Angular no longer needs to patch `setTimeout`, `Promise`, `fetch`, etc. — it uses Signals instead to know exactly what changed.

3. `@placeholder` is shown **immediately** (synchronously) before the deferred block's trigger fires — it's part of the initial render and cannot be async. `@loading` is shown **while the deferred content is being downloaded** after the trigger fires. The `@placeholder` is replaced by `@loading` when the download starts, and `@loading` is replaced by the deferred content when the download completes.

4. `track $index` tracks items by their position in the array. If an item is removed from the middle, every item after it shifts index — Angular destroys and recreates all those DOM nodes even though the items themselves didn't change. Tracking by a stable unique ID (like `product.id`) means Angular only adds/removes/moves the exact DOM nodes that correspond to added/removed/moved items.

</details>

---

**Next up — [Section 19: SSR and Hydration](../Section%2019%20-%20SSR%20and%20Hydration/README.md)**
We'll add server-side rendering to an Angular app, enable hydration so the client takes over seamlessly, and explore incremental hydration for maximum performance. 🚀
