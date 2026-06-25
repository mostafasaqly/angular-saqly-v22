# Section 17: UI, Styling, and Accessibility

> **Angular v22 Course** — Section 17 of 25
> Estimated time: ~90 minutes · Level: Intermediate

A great Angular app doesn't just work — it looks good and works for everyone. This section covers Angular's styling system from global styles to component-scoped styles, CSS variables for theming, responsive layouts, and the new **Angular Aria** library (stable in v22) for accessible component authoring. We also survey the three most popular UI libraries (Angular Material, Tailwind, PrimeNG) and how to build reusable UI components.

---

## Table of Contents

1. [Global Styles](#1-global-styles)
2. [Component Styles](#2-component-styles)
3. [CSS Variables and Theming](#3-css-variables-and-theming)
4. [Responsive Layout](#4-responsive-layout)
5. [Angular Aria — Accessible Components](#5-angular-aria)
6. [Accessibility Best Practices](#6-accessibility-best-practices)
7. [Angular Material Overview](#7-angular-material-overview)
8. [Tailwind CSS with Angular](#8-tailwind-css-with-angular)
9. [PrimeNG with Angular](#9-primeng-with-angular)
10. [Building Reusable UI Components](#10-building-reusable-ui-components)

---

## 1. Global Styles

Global styles apply to the entire application. They live in `src/styles.css` (or `.scss`).

```css
/* src/styles.css */

/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Design tokens */
:root {
  --color-primary: #4f46e5;
  --color-primary-dark: #3730a3;
  --color-surface: #ffffff;
  --color-on-surface: #1a1a1a;
  --color-error: #dc2626;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --font-sans: 'Inter', system-ui, sans-serif;
  --transition-fast: 150ms ease;
}

body {
  font-family: var(--font-sans);
  color: var(--color-on-surface);
  background: var(--color-surface);
  line-height: 1.6;
}

/* Utility classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
```

### Additional style files

Register extra global stylesheets in `angular.json`:

```json
"styles": [
  "src/styles.css",
  "node_modules/@fontsource/inter/400.css",
  "node_modules/@fontsource/inter/700.css"
]
```

---

## 2. Component Styles

Angular components have **encapsulated styles** by default. Styles defined inside a component only affect that component's template — not children or ancestors.

### Inline styles

```typescript
@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge">{{ label() }}</span>`,
  styles: [`
    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      background: var(--color-primary);
      color: white;
    }
  `]
})
export class BadgeComponent {
  label = input.required<string>();
}
```

### External style file

```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'  // or .scss
})
export class CardComponent {}
```

### View encapsulation modes

```typescript
import { ViewEncapsulation } from '@angular/core';

// Default — adds unique attribute to scope CSS to this component
encapsulation: ViewEncapsulation.Emulated  // default

// No encapsulation — styles leak globally (avoid unless needed)
encapsulation: ViewEncapsulation.None

// Shadow DOM — true native CSS isolation
encapsulation: ViewEncapsulation.ShadowDom
```

### :host selector

Target the component's host element from within its own styles:

```css
:host {
  display: block;
  margin-bottom: 16px;
}

:host(.featured) {
  border: 2px solid var(--color-primary);
}
```

---

## 3. CSS Variables and Theming

CSS custom properties (variables) are the recommended way to implement theming in Angular v22 — no Angular-specific API required.

### Light/Dark theme toggle

```css
/* styles.css */
:root {
  color-scheme: light;
  --bg: #ffffff;
  --fg: #111827;
  --border: #e5e7eb;
  --primary: #4f46e5;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --bg: #111827;
  --fg: #f9fafb;
  --border: #374151;
  --primary: #818cf8;
}
```

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<'light' | 'dark'>('light');

  theme = this._theme.asReadonly();
  isDark = computed(() => this._theme() === 'dark');

  toggle() {
    const next = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  init() {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved ?? preferred;
    this._theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
```

---

## 4. Responsive Layout

### CSS Grid layout

```css
/* Responsive grid that adapts from 1 to 3 columns */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
}
```

### Flexbox navigation

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  border-bottom: 1px solid var(--border);
}

.navbar__links {
  display: flex;
  gap: 24px;
}

@media (max-width: 768px) {
  .navbar__links { display: none; }
}
```

### Container query (modern CSS)

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
```

---

## 5. Angular Aria

**Angular Aria** is a new library (stable in Angular v22) that provides accessible component primitives — focus management, ARIA live regions, keyboard navigation helpers.

### Installation

```bash
npm install @angular/cdk
```

The Aria utilities are part of `@angular/cdk/a11y`.

### FocusTrap — trap keyboard focus inside a dialog

```typescript
import { Component, inject, ElementRef, afterNextRender } from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dialog',
  standalone: true,
  template: `
    <div class="dialog" role="dialog" aria-modal="true" [attr.aria-labelledby]="titleId">
      <h2 [id]="titleId">Confirm Action</h2>
      <p>Are you sure you want to proceed?</p>
      <button (click)="confirm()">Confirm</button>
      <button (click)="cancel()">Cancel</button>
    </div>
  `
})
export class DialogComponent {
  private el = inject(ElementRef);
  private focusTrapFactory = inject(FocusTrapFactory);
  titleId = 'dialog-title';

  constructor() {
    afterNextRender(() => {
      const trap = this.focusTrapFactory.create(this.el.nativeElement);
      trap.focusInitialElementWhenReady();
    });
  }
}
```

### LiveAnnouncer — announce dynamic content to screen readers

```typescript
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({ standalone: true, template: `<button (click)="save()">Save</button>` })
export class SaveButtonComponent {
  private announcer = inject(LiveAnnouncer);

  async save() {
    await this.announcer.announce('Your changes have been saved.', 'polite');
  }
}
```

### AriaDescriber — dynamically manage aria-describedby

```typescript
import { AriaDescriber } from '@angular/cdk/a11y';

export class TooltipDirective implements OnInit, OnDestroy {
  private ariaDescriber = inject(AriaDescriber);
  private host = inject(ElementRef<HTMLElement>);

  ngOnInit() {
    this.ariaDescriber.describe(this.host.nativeElement, 'Helpful tooltip text');
  }

  ngOnDestroy() {
    this.ariaDescriber.removeDescription(this.host.nativeElement, 'Helpful tooltip text');
  }
}
```

---

## 6. Accessibility Best Practices

### Semantic HTML first

```html
<!-- BAD: div soup -->
<div class="button" (click)="submit()">Submit</div>

<!-- GOOD: native semantics -->
<button type="submit" (click)="submit()">Submit</button>
```

### ARIA attributes

```html
<!-- Loading state -->
<button [attr.aria-busy]="loading()" [disabled]="loading()">
  {{ loading() ? 'Saving...' : 'Save' }}
</button>

<!-- Error feedback -->
<input [attr.aria-invalid]="hasError()" [attr.aria-describedby]="hasError() ? 'email-error' : null" />
<p id="email-error" role="alert" @if (hasError())>Invalid email address</p>

<!-- Expandable section -->
<button [attr.aria-expanded]="isOpen()" (click)="toggle()">
  {{ isOpen() ? 'Collapse' : 'Expand' }}
</button>
```

### Keyboard navigation

```typescript
@HostListener('keydown', ['$event'])
onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    this.activate();
  }
}
```

### Color contrast

Ensure text meets WCAG AA contrast ratios:
- Normal text: 4.5:1
- Large text (18px+): 3:1

Use browser DevTools → Accessibility panel or the Lighthouse audit to check contrast.

### Skip links

```html
<!-- index.html — first focusable element on the page -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<app-root>
  <main id="main-content" tabindex="-1">...</main>
</app-root>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
  top: 0;
  z-index: 9999;
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
}
```

---

## 7. Angular Material Overview

Angular Material is Google's official Material Design component library for Angular.

```bash
ng add @angular/material
```

### Basic usage

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Email</mat-label>
          <input matInput type="email" />
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">Sign In</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class LoginComponent {}
```

---

## 8. Tailwind CSS with Angular

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: { extend: {} },
  plugins: [],
};
```

```css
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```typescript
@Component({
  standalone: true,
  template: `
    <div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900">{{ title() }}</h2>
        <p class="mt-2 text-gray-600">{{ description() }}</p>
        <button class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Learn More
        </button>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  title = input.required<string>();
  description = input.required<string>();
}
```

---

## 9. PrimeNG with Angular

```bash
npm install primeng @primeng/themes
```

```typescript
// app.config.ts
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

providers: [
  providePrimeNG({ theme: { preset: Aura } })
]
```

```typescript
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  imports: [ButtonModule, TableModule],
  template: `
    <p-table [value]="products()" [paginator]="true" [rows]="10">
      <ng-template pTemplate="header">
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-product>
        <tr>
          <td>{{ product.name }}</td>
          <td>{{ product.price | currency }}</td>
        </tr>
      </ng-template>
    </p-table>
  `
})
export class ProductTableComponent {
  products = input<Product[]>([]);
}
```

---

## 10. Building Reusable UI Components

### Card component with content projection

```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [class]="variant()">
      @if (title()) {
        <div class="card__header">
          <h3 class="card__title">{{ title() }}</h3>
        </div>
      }
      <div class="card__body">
        <ng-content />
      </div>
      @if (hasFooter) {
        <div class="card__footer">
          <ng-content select="[card-footer]" />
        </div>
      }
    </div>
  `,
  styleUrl: './card.component.css'
})
export class CardComponent {
  title = input<string>('');
  variant = input<'default' | 'outlined' | 'elevated'>('default');

  // Check if footer content was projected
  private contentChildren = contentChildren('[card-footer]');
  hasFooter = computed(() => this.contentChildren().length > 0);
}
```

```html
<!-- Usage -->
<app-card title="Order Summary" variant="elevated">
  <p>3 items · $127.00</p>
  <button card-footer>Checkout</button>
</app-card>
```

---

## Knowledge Check

**Q1:** What is the default view encapsulation mode in Angular components?

**A:** `ViewEncapsulation.Emulated` — Angular adds unique attribute selectors to component styles and their DOM elements so that CSS rules only match that component's own elements. No Shadow DOM is used; it's implemented via attribute selectors.

---

**Q2:** What is the LiveAnnouncer from Angular CDK used for?

**A:** It announces dynamic messages to screen readers via an ARIA live region. When content changes programmatically (e.g., a form is saved, a notification appears), the `announce()` method tells the screen reader to read the message aloud even though the user's keyboard focus didn't move.

---

**Q3:** When would you choose Tailwind CSS over Angular Material?

**A:** Tailwind when you want utility-first custom designs with full control over every CSS detail and no pre-built component opinions. Angular Material when you want ready-made, accessible, Material Design components that match Google's design system out of the box.

---

**Next:** [Section 18 — Performance and Optimization](../Section%2018%20-%20Performance%20and%20Optimization/README.md)
