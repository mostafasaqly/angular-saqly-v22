# Section 9: Directives and Pipes

> **Angular v22 Course** — Section 9 of 25
> Estimated time: ~75 minutes · Level: Intermediate

Angular's template language goes far beyond simple interpolation. **Directives** let you attach behaviour to DOM elements and control how the DOM is structured. **Pipes** let you transform displayed values right inside your templates without touching component logic. Together they are the two most-used extension points in every Angular application. This section teaches both from first principles and finishes with building your own custom directive and your own custom pipe — the skills you will reach for in every real project.

---

## Table of Contents

1. [What are Directives?](#1-what-are-directives)
2. [Built-in Directives](#2-built-in-directives)
3. [Attribute Directives](#3-attribute-directives)
4. [Structural Directives Overview](#4-structural-directives-overview)
5. [Creating a Custom Directive](#5-creating-a-custom-directive)
6. [What are Pipes?](#6-what-are-pipes)
7. [Built-in Pipes](#7-built-in-pipes)
8. [Creating a Custom Pipe](#8-creating-a-custom-pipe)

---

## 1. What are Directives?

A **directive** is a class decorated with `@Directive` that adds behaviour to a DOM element (or a group of elements). Every Angular component is technically a directive — it just happens to have a template. Directives without a template are called **attribute directives** or **structural directives** depending on whether they change styling/behaviour or reshape the DOM.

| Kind | What it does | Example |
|---|---|---|
| **Component** | Directive with its own template | `<app-card>` |
| **Attribute directive** | Changes appearance or behaviour of an existing element | `[ngClass]`, `[appHighlight]` |
| **Structural directive** | Adds, removes, or repeats DOM elements | `@if`, `@for`, `*appUnless` |

### How Angular finds directives

When Angular compiles a template it looks at every element and attribute. If a selector matches a known directive (from `imports` in a standalone component, or an `NgModule`), that directive class is instantiated and attached to the host element.

```typescript
// app.component.ts — standalone component that imports a directive
import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HighlightDirective],
  template: `<p appHighlight>I will be highlighted!</p>`
})
export class AppComponent {}
```

---

## 2. Built-in Directives

Angular ships with a small but powerful set of built-in directives. In Angular v22, most structural logic is expressed with the new **control-flow syntax** (`@if`, `@for`, `@switch`) covered in Section 5, but the classic attribute directives `NgClass` and `NgStyle` remain widely used for dynamic styling.

### NgClass — apply CSS classes dynamically

```typescript
import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    <span
      [ngClass]="{
        'badge--success': status() === 'active',
        'badge--warning': status() === 'pending',
        'badge--danger':  status() === 'inactive'
      }"
      class="badge"
    >
      {{ status() }}
    </span>

    <button (click)="cycle()">Cycle status</button>
  `,
  styles: [`
    .badge { padding: 4px 10px; border-radius: 999px; font-weight: 600; }
    .badge--success  { background: #d1fae5; color: #065f46; }
    .badge--warning  { background: #fef3c7; color: #92400e; }
    .badge--danger   { background: #fee2e2; color: #991b1b; }
  `]
})
export class StatusBadgeComponent {
  readonly statuses = ['active', 'pending', 'inactive'] as const;
  idx = signal(0);
  status = signal<'active' | 'pending' | 'inactive'>('active');

  cycle(): void {
    const next = (this.idx() + 1) % this.statuses.length;
    this.idx.set(next);
    this.status.set(this.statuses[next]);
  }
}
```

### NgStyle — apply inline styles dynamically

```typescript
import { Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-color-box',
  standalone: true,
  imports: [NgStyle],
  template: `
    <div
      [ngStyle]="{
        'background-color': color(),
        'width.px': size(),
        'height.px': size()
      }"
    ></div>
    <input type="color" [value]="color()" (input)="color.set($any($event.target).value)" />
    <input type="range" min="50" max="200" [value]="size()" (input)="size.set(+$any($event.target).value)" />
  `
})
export class ColorBoxComponent {
  color = signal('#6366f1');
  size  = signal(100);
}
```

> **Tip:** Prefer `[class.my-class]="expr"` and `[style.color]="expr"` for single classes/styles. Use `NgClass` / `NgStyle` only when you need to set multiple at once from an object.

---

## 3. Attribute Directives

An **attribute directive** is a `@Directive` class with no template. It receives a reference to the host element through the `ElementRef` injection token and can manipulate it directly, listen to host events via `@HostListener`, or bind to host properties via `@HostBinding`.

### Anatomy of an attribute directive

```typescript
import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // matches any element with appHighlight attribute
  standalone: true
})
export class HighlightDirective implements OnInit {
  // Inject the host element reference
  private el = inject(ElementRef);

  // Accept a color input (e.g. <p appHighlight="yellow">)
  @Input('appHighlight') highlightColor = 'lightyellow';

  ngOnInit(): void {
    this.setBackground('transparent');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.setBackground(this.highlightColor || 'lightyellow');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setBackground('transparent');
  }

  private setBackground(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

Usage in a template:

```html
<p appHighlight>Default yellow highlight on hover</p>
<p appHighlight="lightblue">Blue highlight on hover</p>
```

### Using `Renderer2` instead of direct DOM access

For SSR-compatible directives, prefer `Renderer2` over `ElementRef.nativeElement` so Angular can run the same code on the server:

```typescript
import { Directive, ElementRef, Renderer2, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appFocus]', standalone: true })
export class FocusDirective {
  private el       = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('focus')
  onFocus(): void {
    this.renderer.setStyle(this.el.nativeElement, 'outline', '3px solid #6366f1');
  }

  @HostListener('blur')
  onBlur(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'outline');
  }
}
```

---

## 4. Structural Directives Overview

A **structural directive** reshapes the DOM — it can add elements, remove them, or stamp them multiple times. Angular v22 ships with first-class **block syntax** (`@if`, `@for`, `@switch`) that replaces `*ngIf` and `*ngFor` in all new code. However, you can still write custom structural directives using the `*` micro-syntax when you need reusable DOM-shaping logic.

### How the asterisk works

The `*` prefix is syntactic sugar. Angular expands:

```html
<p *appUnless="isLoggedIn">Please log in</p>
```

into:

```html
<ng-template [appUnless]="isLoggedIn">
  <p>Please log in</p>
</ng-template>
```

The directive receives a `TemplateRef` (the stamped content) and a `ViewContainerRef` (where to insert it).

### Built-in structural directives (legacy NgModule style)

| Directive | Purpose |
|---|---|
| `*ngIf` | Conditional rendering (use `@if` in new code) |
| `*ngFor` | Repeat template per item (use `@for` in new code) |
| `*ngSwitch` | Switch between templates (use `@switch` in new code) |
| `*ngTemplateOutlet` | Stamp a `TemplateRef` — still widely used |

```html
<!-- Preferred Angular v22 syntax -->
@if (user()) {
  <p>Hello, {{ user()!.name }}</p>
} @else {
  <p>Please log in</p>
}

@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
}
```

---

## 5. Creating a Custom Directive

Let's build a practical custom structural directive: `*appUnless` — the opposite of `*ngIf`.

```typescript
// unless.directive.ts
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject
} from '@angular/core';

@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private templateRef = inject(TemplateRef<unknown>);
  private vcr        = inject(ViewContainerRef);

  private hasView = false;

  @Input()
  set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      // Condition is false — stamp the template
      this.vcr.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      // Condition became true — remove the stamped view
      this.vcr.clear();
      this.hasView = false;
    }
  }
}
```

Use it in a component:

```typescript
import { Component, signal } from '@angular/core';
import { UnlessDirective } from './unless.directive';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [UnlessDirective],
  template: `
    <button (click)="loggedIn.update(v => !v)">Toggle login</button>
    <p *appUnless="loggedIn()">You are NOT logged in. Please sign in.</p>
    <p *appUnless="!loggedIn()">Welcome back!</p>
  `
})
export class DemoComponent {
  loggedIn = signal(false);
}
```

---

## 6. What are Pipes?

A **pipe** is a pure function wrapped in a class decorated with `@Pipe`. It transforms a value in a template expression — think of it as the `|` operator in your template binding.

```html
<!-- Without pipe -->
{{ product.price }}                     <!-- 9.5 -->

<!-- With built-in pipe -->
{{ product.price | currency:'USD' }}    <!-- $9.50 -->
```

### Pure vs Impure pipes

| | Pure (default) | Impure |
|---|---|---|
| Re-runs | Only when input reference changes | On every change detection cycle |
| Performance | Fast | Can be slow |
| Use case | Deterministic transforms | Async, mutable collections |

Angular's `AsyncPipe` is impure (it subscribes to observables and signals). Your custom pipes should be pure unless you have a specific reason.

### Pipes vs computed signals

In Angular v22, many transforms that used to need a pipe can instead be done with a **computed signal** in the component class. Use pipes for display formatting that you want to reuse across many templates. Use computed signals for business logic that belongs in the component.

---

## 7. Built-in Pipes

Angular ships a rich library of pipes in `@angular/common`.

### Date pipe

```typescript
import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-demo',
  standalone: true,
  imports: [DatePipe],
  template: `
    <p>Default:      {{ today() | date }}</p>
    <p>Short:        {{ today() | date:'shortDate' }}</p>
    <p>Full:         {{ today() | date:'fullDate' }}</p>
    <p>Custom:       {{ today() | date:'dd MMM yyyy' }}</p>
    <p>With time:    {{ today() | date:'medium' }}</p>
  `
})
export class DateDemoComponent {
  today = signal(new Date());
}
```

### Currency pipe

```typescript
{{ price | currency }}                   // $1,234.56
{{ price | currency:'EUR':'symbol' }}    // €1,234.56
{{ price | currency:'GBP':'code':'1.0-0' }}  // GBP 1,235
```

### Common built-in pipes

| Pipe | Usage | Output |
|---|---|---|
| `uppercase` | `{{ 'hello' \| uppercase }}` | `HELLO` |
| `lowercase` | `{{ 'WORLD' \| lowercase }}` | `world` |
| `titlecase` | `{{ 'john doe' \| titlecase }}` | `John Doe` |
| `currency` | `{{ 9.5 \| currency:'USD' }}` | `$9.50` |
| `date` | `{{ d \| date:'shortDate' }}` | `6/25/2026` |
| `number` | `{{ 1234567 \| number:'1.2-2' }}` | `1,234,567.00` |
| `percent` | `{{ 0.75 \| percent }}` | `75%` |
| `json` | `{{ obj \| json }}` | `{ "key": "val" }` |
| `slice` | `{{ arr \| slice:0:3 }}` | first 3 items |
| `keyvalue` | `@for(e of obj \| keyvalue; ...)` | key-value pairs |
| `async` | `{{ obs$ \| async }}` | unwrapped value |

### Chaining pipes

```html
{{ 'hello world' | titlecase | uppercase }}  <!-- HELLO WORLD -->
{{ amount | currency | lowercase }}           <!-- $9.50 -->
```

### The async pipe

`AsyncPipe` subscribes to an Observable or Promise and automatically unsubscribes when the component is destroyed. In Angular v22, you'll mostly use signals — but the async pipe still matters when working with third-party RxJS-based APIs.

```typescript
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [AsyncPipe],
  template: `<p>Tick: {{ ticker$ | async }}</p>`
})
export class TickerComponent {
  ticker$ = interval(1000).pipe(map(n => n + 1));
}
```

---

## 8. Creating a Custom Pipe

Building a custom pipe requires three things: the `@Pipe` decorator, implementing the `PipeTransform` interface, and a `transform()` method.

### Truncate pipe (most common example)

```typescript
// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  /**
   * @param value  - The source string
   * @param limit  - Maximum character count (default 100)
   * @param trail  - Trailing characters (default '…')
   */
  transform(value: string, limit = 100, trail = '…'): string {
    if (!value) return '';
    return value.length > limit
      ? value.substring(0, limit) + trail
      : value;
  }
}
```

Use it in a template:

```html
{{ longText | truncate }}             <!-- truncates at 100 chars -->
{{ longText | truncate:50 }}          <!-- truncates at 50 chars -->
{{ longText | truncate:50:'[more]' }} <!-- custom trail -->
```

### Pipe with parameters in a component

```typescript
import { Component, signal } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [TruncatePipe],
  template: `
    <article>
      <h2>{{ article().title }}</h2>
      <p>{{ article().body | truncate:150 }}</p>
      <a href="#">Read more</a>
    </article>
  `
})
export class ArticleComponent {
  article = signal({
    title: 'Angular v22 Signals Deep Dive',
    body: 'Angular v22 brings the most significant developer experience ' +
          'improvements since the introduction of the Ivy renderer. The ' +
          'Signal-First approach eliminates the need for Zone.js in new ' +
          'projects, reduces bundle sizes by up to 40%, and makes change ' +
          'detection intuitive enough to reason about locally.'
  });
}
```

### A more complex pipe — `timeAgo`

```typescript
// time-ago.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false // re-run on every CD cycle so "5 seconds ago" updates live
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    const date   = new Date(value);
    const now    = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffS  = Math.round(diffMs / 1000);
    const diffM  = Math.round(diffS / 60);
    const diffH  = Math.round(diffM / 60);
    const diffD  = Math.round(diffH / 24);

    if (diffS < 60)  return `${diffS} second${diffS !== 1 ? 's' : ''} ago`;
    if (diffM < 60)  return `${diffM} minute${diffM !== 1 ? 's' : ''} ago`;
    if (diffH < 24)  return `${diffH} hour${diffH !== 1 ? 's' : ''} ago`;
    return `${diffD} day${diffD !== 1 ? 's' : ''} ago`;
  }
}
```

---

## ✅ Section 9 Recap

| Concept | Key takeaway |
|---|---|
| Attribute directives | `@Directive` with no template; use `ElementRef` + `@HostListener` |
| Structural directives | Use `TemplateRef` + `ViewContainerRef`; prefer new `@if`/`@for` syntax in templates |
| `NgClass` / `NgStyle` | Object binding for multiple dynamic classes / styles |
| Pipes | `@Pipe` + `PipeTransform.transform()` for display-layer transforms |
| Custom pipe | Keep pure; add parameters as extra `transform()` args |
| Impure pipe | Use `pure: false` sparingly — every CD cycle triggers re-run |

---

## Knowledge Check

<details>
<summary>1. What is the difference between an attribute directive and a structural directive?</summary>

An **attribute directive** changes the appearance or behaviour of the host element (e.g., `[ngClass]`). A **structural directive** reshapes the DOM by adding, removing, or stamping elements — it always operates on an `<ng-template>` under the hood and uses a `ViewContainerRef` to insert or clear views.
</details>

<details>
<summary>2. What must you inject to build a custom structural directive?</summary>

`TemplateRef` (the content to stamp) and `ViewContainerRef` (the location in the DOM where stamped views are inserted or cleared). Both are injected via `inject()` in Angular v22.
</details>

<details>
<summary>3. What is the difference between a pure and an impure pipe?</summary>

A **pure pipe** (default) only re-runs its `transform()` when the input value reference changes — this is efficient. An **impure pipe** (`pure: false`) re-runs on every change detection cycle, which can be expensive but is necessary when the pipe depends on mutable state that isn't captured by reference equality (like `AsyncPipe`).
</details>

<details>
<summary>4. How do you pass arguments to a pipe?</summary>

Extra arguments to `transform()` become colon-separated parameters in the template: `{{ value | pipeName:arg1:arg2 }}`. The `transform` signature must declare matching parameters: `transform(value: T, arg1: A, arg2: B): R`.
</details>

<details>
<summary>5. When should you prefer a computed signal over a pipe?</summary>

Use a **computed signal** when the transform is business logic specific to one component — it keeps the logic in the class where it is testable and co-located. Use a **pipe** when you want the same display transform in many templates, because pipes are reusable across the whole app.
</details>

---

**Next up —** [Section 10: Services and Dependency Injection](../Section%2010%20-%20Services%20and%20Dependency%20Injection/README.md)
