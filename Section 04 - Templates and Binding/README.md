# Section 4: Templates and Binding

> **Angular v22 Course** — Section 4 of 25
> Estimated time: ~75 minutes · Level: Beginner–Intermediate

Section 3 gave you a 30,000-foot view of data binding. Now we go deep. This section covers every binding mechanism in Angular's template language — interpolation, property binding, event binding, two-way binding, template reference variables, class binding, style binding, and attribute binding — with real examples and the rules that govern each one. After this section, you'll be able to connect any piece of data to any part of your UI.

---

## Table of Contents

1. [Interpolation](#1-interpolation)
2. [Property Binding](#2-property-binding)
3. [Event Binding](#3-event-binding)
4. [Two-Way Binding](#4-two-way-binding)
5. [Template Reference Variables](#5-template-reference-variables)
6. [Class Binding](#6-class-binding)
7. [Style Binding](#7-style-binding)
8. [Attribute Binding](#8-attribute-binding)

---

## 1. Interpolation

**Interpolation** embeds a TypeScript expression into a template as **text**. The double-curly-brace syntax `{{ }}` tells Angular's template compiler to evaluate the expression and convert the result to a string.

### Basic usage

```typescript
@Component({
  selector: 'app-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>{{ title() }}</h1>
    <p>{{ description() }}</p>
  `
})
export class ProfileComponent {
  title = signal('My Profile');
  description = signal('Angular developer building cool things.');
}
```

### Expressions allowed inside `{{ }}`

```html
<!-- Arithmetic -->
<p>Items: {{ itemCount() }} (doubled: {{ itemCount() * 2 }})</p>

<!-- Comparison (renders true/false as text) -->
<p>Over limit: {{ itemCount() > 10 }}</p>

<!-- Ternary -->
<p>Status: {{ isActive() ? 'Active' : 'Inactive' }}</p>

<!-- String concatenation -->
<p>Greeting: {{ 'Hello, ' + username() + '!' }}</p>

<!-- Method call -->
<p>Summary: {{ getSummary() }}</p>

<!-- Pipe — transforms the value before rendering -->
<p>Joined: {{ joinedDate() | date:'longDate' }}</p>
<p>Balance: {{ balance() | currency:'USD' }}</p>
```

### What interpolation **cannot** do

```html
<!-- No assignment -->
{{ count = 5 }}       <!-- ERROR -->

<!-- No new keyword -->
{{ new Date() }}      <!-- ERROR -->

<!-- No template literals -->
{{ `Hello ${name()}` }} <!-- ERROR -->

<!-- No chained statements -->
{{ a(); b() }}        <!-- ERROR -->
```

> Interpolation is always **read-only**. It renders values — it doesn't modify them. For DOM properties (not text), use Property Binding.

### Interpolation vs Property Binding for attributes

```html
<!-- WRONG: interpolation on src can cause brief broken-image flash -->
<img src="{{ imageUrl() }}" />

<!-- RIGHT: property binding sets the DOM property directly -->
<img [src]="imageUrl()" />
```

Use interpolation for **text content**. Use property binding for **HTML attributes and DOM properties**.

---

## 2. Property Binding

**Property binding** sets a DOM element's JavaScript property or a component's `@Input()` property to the value of a TypeScript expression.

### Syntax: `[property]="expression"`

```html
<!-- DOM properties -->
<img [src]="user().avatarUrl" [alt]="user().name" />
<input [value]="defaultValue()" />
<button [disabled]="isLoading()">Submit</button>
<textarea [rows]="textareaRows()"></textarea>

<!-- Component @Input properties -->
<app-user-card [user]="currentUser()" [showActions]="canEdit()" />
```

### DOM property vs HTML attribute

This distinction is critical:

| HTML attribute | DOM property | Notes |
|---|---|---|
| `colspan` | `colSpan` | camelCase in DOM |
| `for` (label) | `htmlFor` | reserved word conflict |
| `class` | `className` | different name entirely |
| `readonly` | `readOnly` | camelCase |
| `tabindex` | `tabIndex` | camelCase |

Angular property binding targets the **DOM property** (JavaScript), not the HTML attribute:

```html
<!-- Sets the DOM property 'colSpan' (not the HTML attribute 'colspan') -->
<td [colSpan]="spanCount()"></td>

<!-- Sets the DOM property 'htmlFor' -->
<label [htmlFor]="inputId()">Label text</label>
```

### Binding to component inputs

```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    @for (product of products(); track product.id) {
      <app-product-card
        [product]="product"
        [showPrice]="showPrices()"
        [currency]="selectedCurrency()"
      />
    }
  `
})
export class ProductListComponent {
  products = signal<Product[]>([]);
  showPrices = signal(true);
  selectedCurrency = signal('USD');
}
```

### One-time binding with signal inputs (v22)

In Angular v22, child components use **signal inputs** (`input()`) instead of the traditional `@Input()` decorator:

```typescript
// Child component — v22 pattern
export class ProductCardComponent {
  product  = input.required<Product>();  // required signal input
  showPrice = input(true);               // optional with default
  currency  = input('USD');
}
```

The parent binds the same way:
```html
<app-product-card [product]="p" [showPrice]="showPrices()" />
```

---

## 3. Event Binding

**Event binding** listens to DOM events and calls a method on the component class when the event fires.

### Syntax: `(eventName)="handler($event)"`

```html
<!-- Mouse events -->
<button (click)="save()">Save</button>
<div (dblclick)="onDoubleClick()">Double click me</div>
<div (mouseover)="onHover()" (mouseout)="onLeave()">Hover area</div>

<!-- Keyboard events -->
<input (keyup)="onKeyUp($event)" />
<input (keydown.enter)="onEnter()" />
<input (keydown.escape)="onEscape()" />

<!-- Form events -->
<form (submit)="onSubmit($event)">...</form>
<input (input)="onInput($event)" (blur)="onBlur()" (focus)="onFocus()" />

<!-- Custom component events -->
<app-modal (closed)="onModalClose()" (confirmed)="onConfirm($event)" />
```

### The `$event` object

`$event` is always the native DOM event object. Its type depends on the event:

```typescript
export class FormComponent {
  username = signal('');

  onInput(event: Event): void {
    // Cast to the correct HTML element type for proper TypeScript types
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();  // prevent form reload
    console.log('Submitted:', this.username());
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.username.set('');
    }
  }
}
```

### Key event filtering

Angular provides a shorthand for filtering keyboard events:

```html
<!-- Only fires when Enter is pressed -->
<input (keydown.enter)="submit()" />

<!-- Only fires when Escape is pressed -->
<input (keydown.escape)="cancel()" />

<!-- Modifier keys -->
<input (keydown.ctrl.s)="save()" />
<input (keydown.shift.enter)="newLine()" />
```

### Stopping event propagation

```typescript
onButtonClick(event: MouseEvent): void {
  event.stopPropagation();  // don't let the click bubble to parent elements
  event.preventDefault();   // don't follow href, don't submit form, etc.
  this.doWork();
}
```

---

## 4. Two-Way Binding

**Two-way binding** combines property binding and event binding into one concise syntax. It keeps a class property and a template input in sync in both directions simultaneously.

### The banana-in-a-box syntax `[( )]`

Think of it as a **property binding wrapped in an event binding**:

```
[( )]  →  [(ngModel)]
 └┘         └──────┘
 box       banana in a box
```

It desugars to:

```html
<!-- Two-way binding shorthand: -->
<input [(ngModel)]="searchTerm" />

<!-- Equivalent expanded form: -->
<input [ngModel]="searchTerm" (ngModelChange)="searchTerm = $event" />
```

### `ngModel` with FormsModule

```typescript
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],  // REQUIRED for ngModel
  template: `
    <input
      [(ngModel)]="query"
      (ngModelChange)="onQueryChange($event)"
      placeholder="Search..."
    />
    <p>Searching for: {{ query }}</p>
    <button (click)="clearSearch()">Clear</button>
  `
})
export class SearchComponent {
  query = '';  // plain property — ngModel works with both plain props and signals

  onQueryChange(newValue: string): void {
    // Optional: react to changes with side effects
    console.log('Query changed:', newValue);
  }

  clearSearch(): void {
    this.query = '';
  }
}
```

### Two-way binding with Signal Forms (v22 preferred approach for forms)

For real forms in Angular v22, use Signal Forms instead of `ngModel`:

```typescript
import { signalForm, Validators } from '@angular/forms';

export class LoginComponent {
  form = signalForm({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid()) {
      console.log(this.form.value());
    }
  }
}
```

> Use `ngModel` + `FormsModule` for simple, non-form two-way bindings. Use Signal Forms for actual form management (covered in Section 12).

### Custom two-way binding with `@Output` + `EventEmitter`

You can build your own `[( )]`-compatible components:

```typescript
// Pattern: input named 'value', output named 'valueChange'
@Component({ selector: 'app-counter', ... })
export class CounterComponent {
  value = input(0);                              // signal input
  valueChange = output<number>();                // signal output

  increment() { this.valueChange.emit(this.value() + 1); }
  decrement() { this.valueChange.emit(this.value() - 1); }
}

// Parent usage: [(value)]="myCount" works because Angular expects
// an input named 'value' and an output named 'valueChange'
// <app-counter [(value)]="myCount" />
```

---

## 5. Template Reference Variables

A **template reference variable** (also called a template variable) is a named reference to an element or directive in the template. You declare one with `#name` and use it elsewhere in the same template.

### Syntax: `#variableName`

```html
<!-- #inputRef is a reference to the native <input> HTMLElement -->
<input #searchInput type="text" placeholder="Search..." />
<button (click)="search(searchInput.value)">Search</button>
<button (click)="searchInput.focus()">Focus Input</button>
```

### Referencing a component instance

When `#ref` is placed on a component element, it references the component class instance:

```html
<!-- #datepicker references the DatepickerComponent instance -->
<app-datepicker #datepicker />
<button (click)="datepicker.open()">Open Calendar</button>
<p>Selected: {{ datepicker.selectedDate() | date }}</p>
```

### Using `@ViewChild` to access template variables in the class

For complex interactions, use `viewChild()` in the component class (the v22 Signal API for view queries):

```typescript
import { Component, viewChild, ElementRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-autofocus',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input #emailInput type="email" placeholder="Email" />
    <button (click)="clearAndFocus()">Clear</button>
  `
})
export class AutofocusComponent implements AfterViewInit {
  // viewChild() — Signal-based query (v22 replacement for @ViewChild)
  emailInput = viewChild.required<ElementRef<HTMLInputElement>>('emailInput');

  ngAfterViewInit(): void {
    // Access the underlying DOM element via .nativeElement
    this.emailInput().nativeElement.focus();
  }

  clearAndFocus(): void {
    const el = this.emailInput().nativeElement;
    el.value = '';
    el.focus();
  }
}
```

### Template variables and `ngIf` / `@if` scoping

Template variables are scoped to the template block they are defined in:

```html
<!-- This works — both on same level -->
<input #myInput />
<button (click)="log(myInput.value)">Log</button>

<!-- This does NOT work — myInput is inside @if, hidden from the button -->
@if (showInput()) {
  <input #myInput />
}
<button (click)="log(myInput.value)">Log</button>  <!-- ERROR: myInput undefined -->
```

---

## 6. Class Binding

**Class binding** conditionally adds or removes CSS classes on a DOM element based on a TypeScript expression.

### Single class: `[class.className]="condition"`

```html
<div [class.active]="isActive()">Active when isActive() is true</div>
<button [class.loading]="isLoading()" [class.error]="hasError()">
  Submit
</button>
```

### Multiple classes: `[class]="expression"`

The `[class]` binding accepts several forms:

```html
<!-- String: space-separated class names -->
<div [class]="'card card--primary featured'">...</div>

<!-- Object: key = class name, value = boolean condition -->
<div [class]="{ active: isActive(), disabled: isDisabled(), large: isLarge() }">...</div>

<!-- Array: list of class names (always applied) -->
<div [class]="['card', 'shadow']">...</div>
```

### Class binding in practice

```typescript
@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="alert"
      [class.alert--dismissible]="dismissible()"
      [class]="alertTypeClass()"
    >
      {{ message() }}
      @if (dismissible()) {
        <button (click)="dismiss()" class="alert__close">&times;</button>
      }
    </div>
  `
})
export class AlertComponent {
  message   = signal('Something happened.');
  type      = signal<'info' | 'success' | 'warning' | 'error'>('info');
  dismissible = signal(true);
  visible   = signal(true);

  alertTypeClass = computed(() => `alert--${this.type()}`);

  dismiss(): void {
    this.visible.set(false);
  }
}
```

### Static classes + dynamic classes

```html
<!-- Static classes (from 'class') and dynamic classes ([class.x]) coexist -->
<button class="btn btn--primary" [class.btn--loading]="loading()" [class.btn--disabled]="disabled()">
  Submit
</button>
```

> Angular merges static `class` and dynamic `[class.*]` binding — the static classes are never overwritten.

---

## 7. Style Binding

**Style binding** sets individual CSS styles or a set of styles on a DOM element.

### Single style: `[style.property]="value"`

```html
<div [style.color]="textColor()">Colored text</div>
<div [style.font-size]="fontSize() + 'px'">Dynamic font size</div>
<div [style.background-color]="bgColor()">Background</div>

<!-- With units — Angular handles the unit suffix -->
<div [style.width.px]="widthPx()">Width in pixels</div>
<div [style.height.%]="heightPercent()">Height in percent</div>
<div [style.opacity]="opacity()">Opacity 0–1</div>
```

### Multiple styles: `[style]="styleObject"`

```html
<!-- Object form — each key is a CSS property (camelCase or kebab-case) -->
<div [style]="{ color: textColor(), fontSize: fontSize() + 'px', fontWeight: 'bold' }">
  Multi-styled text
</div>

<!-- String form — valid CSS string -->
<div [style]="'color: red; font-size: 16px;'">String form</div>
```

### Style binding in practice

```typescript
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="progress-track">
      <div
        class="progress-fill"
        [style.width.%]="percentage()"
        [style.background-color]="barColor()"
        [style.transition]="'width 0.3s ease'"
      ></div>
    </div>
    <p>{{ percentage() }}% complete</p>
    <button (click)="advance(10)">+10%</button>
  `,
  styles: [`
    .progress-track {
      height: 12px;
      background: #e0e0e0;
      border-radius: 6px;
      overflow: hidden;
    }
    .progress-fill { height: 100%; border-radius: 6px; }
  `]
})
export class ProgressBarComponent {
  percentage = signal(30);

  barColor = computed(() => {
    const pct = this.percentage();
    if (pct >= 80) return '#4caf50';
    if (pct >= 50) return '#ff9800';
    return '#f44336';
  });

  advance(amount: number): void {
    this.percentage.update(p => Math.min(100, p + amount));
  }
}
```

### Class binding vs Style binding — when to use each

| Scenario | Use |
|---|---|
| Toggle visual states (active, disabled, error) | Class binding — define the states in CSS |
| Dynamically computed numeric values (width, height, opacity) | Style binding |
| Theming / color that comes from data | Style binding or CSS custom properties |
| Conditional layouts | Class binding with utility classes |

> Prefer **class binding** over style binding for most UI states — it keeps styling in CSS where it belongs.

---

## 8. Attribute Binding

Some HTML attributes don't have a corresponding DOM property. For these, use **attribute binding** with the `attr.` prefix.

### Syntax: `[attr.attributeName]="expression"`

```html
<!-- ARIA attributes — no DOM property equivalent -->
<button [attr.aria-label]="deleteButtonLabel()">Delete</button>
<div [attr.aria-expanded]="isExpanded()" [attr.aria-controls]="panelId()">
  Toggle
</div>

<!-- colspan on <td> — DOM property is colSpan, attribute is colspan -->
<td [attr.colspan]="columnSpan()">Merged cell</td>

<!-- data-* attributes (custom data attributes) -->
<li [attr.data-id]="item.id" [attr.data-category]="item.category">
  {{ item.name }}
</li>

<!-- SVG attributes (no DOM property — must use attr.) -->
<svg>
  <circle [attr.cx]="cx()" [attr.cy]="cy()" [attr.r]="radius()" />
</svg>
```

### Property binding vs Attribute binding — the key difference

| | Property binding | Attribute binding |
|---|---|---|
| Syntax | `[src]="url"` | `[attr.colspan]="n"` |
| Targets | DOM JS property | HTML attribute |
| When to use | Most DOM interactions | ARIA, data-*, SVG, no-property attrs |
| Type | Any JS value | String (coerced) |

```html
<!-- These are NOT the same: -->
<input [value]="text()" />          <!-- sets DOM property 'value' -->
<input [attr.value]="text()" />     <!-- sets HTML attribute 'value' (initial value only) -->
```

### Removing an attribute with `null`

Setting an attribute to `null` removes it entirely from the DOM:

```html
<!-- If canEdit() is false, aria-controls attribute is removed (not set to 'null') -->
<button [attr.aria-controls]="canEdit() ? panelId() : null">
  Edit
</button>
```

### ARIA binding in practice

```typescript
@Component({
  selector: 'app-accordion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion">
      <!-- Button controls the panel — linked via aria-controls / id -->
      <button
        class="accordion__toggle"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="panelId"
        (click)="toggle()"
      >
        {{ title() }}
      </button>

      <!-- Panel is labelled by the button via aria-labelledby -->
      <div
        [id]="panelId"
        [attr.aria-hidden]="!isOpen()"
        class="accordion__panel"
        [class.accordion__panel--open]="isOpen()"
      >
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .accordion__panel { display: none; padding: 1rem; }
    .accordion__panel--open { display: block; }
    .accordion__toggle { width: 100%; text-align: left; padding: 0.75rem; cursor: pointer; }
  `]
})
export class AccordionComponent {
  title  = signal('Accordion Section');
  isOpen = signal(false);

  // A unique ID for aria-controls / id linkage
  readonly panelId = `accordion-panel-${Math.random().toString(36).slice(2)}`;

  toggle(): void {
    this.isOpen.update(v => !v);
  }
}
```

---

## ✅ Section 4 Recap

You now know every binding mechanism in Angular's template language:

- **Interpolation `{{ }}`** — renders class expressions as text; read-only; supports pipes.
- **Property binding `[prop]="expr"`** — sets DOM element properties and component `@Input`s; targets JavaScript DOM properties (not HTML attributes).
- **Event binding `(event)="fn()"`** — listens for DOM events; `$event` provides the native event object; key filters like `(keydown.enter)` are available.
- **Two-way binding `[(ngModel)]`** — sugar for `[ngModel]` + `(ngModelChange)`; requires `FormsModule`; Signal Forms is preferred for real forms.
- **Template reference variables `#ref`** — name a template element or component instance; access it elsewhere in the template or via `viewChild()` in the class.
- **Class binding `[class.x]="cond"`** — conditionally apply CSS classes; accepts string, object, or array with `[class]`.
- **Style binding `[style.prop]="val"`** — set individual inline styles; unit suffix shorthand `[style.width.px]`; object form for multiple styles.
- **Attribute binding `[attr.x]="val"`** — set HTML attributes with no DOM property equivalent (ARIA, data-*, SVG, colspan); set to `null` to remove.

### Knowledge Check

1. What is the difference between `<img src="{{ url() }}" />` and `<img [src]="url()" />`?
2. What does `$event` contain in an event binding, and how would you get the typed value from an `<input>` element?
3. What is `[(ngModel)]` shorthand for, and what module must be imported to use it?
4. When should you use `[attr.x]` instead of `[x]`?
5. Write a class binding that adds `'is-open'` when `isOpen()` is `true` and `'is-closed'` when it's `false`.

<details>
<summary>Show answers</summary>

1. `src="{{ url() }}"` sets the HTML **attribute** via string interpolation — the browser may attempt to load `[object Object]` or a broken URL for a moment before Angular runs. `[src]="url()"` sets the DOM **property** directly and is always the correct approach for dynamic values.

2. `$event` contains the native DOM Event object (e.g., `MouseEvent`, `KeyboardEvent`, `InputEvent`). To get the typed string value from an `<input>`: `(event.target as HTMLInputElement).value`.

3. `[(ngModel)]="prop"` is shorthand for `[ngModel]="prop" (ngModelChange)="prop = $event"`. You must import `FormsModule` from `@angular/forms` in the component's `imports` array.

4. Use `[attr.x]="val"` when the attribute has **no corresponding DOM JavaScript property** — primarily for ARIA attributes (`aria-label`, `aria-expanded`), `data-*` attributes, `colspan` (vs `colSpan`), and SVG attributes. Use plain `[x]` for any attribute that has a DOM property.

5. `[class.is-open]="isOpen()" [class.is-closed]="!isOpen()"` — or using the object form: `[class]="{ 'is-open': isOpen(), 'is-closed': !isOpen() }"`.

</details>

---

**Next up — [Section 5: Control Flow in Angular](../Section%2005%20-%20Control%20Flow%20in%20Angular/README.md)**
We'll master Angular's built-in control flow: `@if`, `@else`, `@for`, `track`, `@empty`, and `@switch` — the modern replacement for `*ngIf` and `*ngFor`.
