/**
 * Example 04 — Component Styles and Encapsulation
 * -------------------------------------------------------
 * Demonstrates the three levels of styling in Angular v22:
 *  1. Global styles (referenced, not defined here — see styles.css)
 *  2. Component-scoped styles (Emulated encapsulation — default)
 *  3. ViewEncapsulation modes: Emulated, ShadowDom, None
 *
 * Also demonstrates:
 *  - :host selector (style the component's own element)
 *  - :host() with condition
 *  - CSS custom properties (variables) in components
 */

import {
  Component,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';

// ─── 1. Default encapsulation (Emulated) ─────────────────────────────────────
// Angular adds a unique _nghost / _ngcontent attribute pair so that
// styles defined here ONLY apply to this component's view, never leaking out.

@Component({
  selector: 'app-scoped-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation defaults to ViewEncapsulation.Emulated — no need to set it

  template: `
    <div class="card" [class.featured]="featured()">
      <h3 class="card-title">{{ title() }}</h3>
      <p class="card-body">{{ body() }}</p>
    </div>
  `,

  styles: [`
    /* :host — targets the <app-scoped-card> element itself */
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    /* :host() with a CSS condition */
    :host(.large) {
      font-size: 1.2rem;
    }

    /* These .card styles ONLY apply inside this component */
    .card {
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 1rem 1.25rem;
      background: #ffffff;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .card.featured {
      border-color: #3f51b5;
      box-shadow: 0 2px 12px rgba(63, 81, 181, 0.2);
    }

    .card-title {
      margin: 0 0 0.5rem;
      color: #212121;
      font-size: 1.1rem;
    }

    .card-body {
      margin: 0;
      color: #616161;
      line-height: 1.5;
    }
  `],
})
export class ScopedCardComponent {
  title = signal('Card Title');
  body = signal('This card has scoped styles — they will not affect other .card elements on the page.');
  featured = signal(false);

  setFeatured(value: boolean): void {
    this.featured.set(value);
  }
}

// ─── 2. ViewEncapsulation.None — styles escape to global scope ────────────────
// Use with caution. Any styles defined here apply globally.
// Useful for components that intentionally style child content they don't own.

@Component({
  selector: 'app-global-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,  // <-- styles are global!

  template: `
    <div class="global-alert" [class]="'global-alert--' + type()">
      <strong>{{ type() | titlecase }}:</strong> {{ message() }}
    </div>
  `,

  styles: [`
    /* WARNING: These styles leak to the entire application! */
    .global-alert {
      padding: 0.75rem 1rem;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      font-family: 'Segoe UI', sans-serif;
    }
    .global-alert--info    { background: #e3f2fd; color: #0d47a1; border-left: 4px solid #1e88e5; }
    .global-alert--warning { background: #fff8e1; color: #e65100; border-left: 4px solid #ffa000; }
    .global-alert--error   { background: #fce4ec; color: #b71c1c; border-left: 4px solid #e53935; }
    .global-alert--success { background: #e8f5e9; color: #1b5e20; border-left: 4px solid #43a047; }
  `],
})
export class GlobalAlertComponent {
  type = signal<'info' | 'warning' | 'error' | 'success'>('info');
  message = signal('This component uses ViewEncapsulation.None — its CSS is global.');
}

// ─── 3. CSS Custom Properties in components ───────────────────────────────────
// Components can define and consume their own CSS variables,
// making them themeable from the outside via :host { --var: value }.

@Component({
  selector: 'app-themed-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
    <button
      class="btn"
      [class.btn--loading]="loading()"
      (click)="handleClick()"
      [disabled]="loading()"
    >
      @if (loading()) {
        Loading...
      } @else {
        {{ label() }}
      }
    </button>
  `,

  styles: [`
    :host {
      /* Default values for custom properties — overridable by the parent */
      --btn-bg: #3f51b5;
      --btn-color: white;
      --btn-radius: 4px;
      display: inline-block;
    }

    .btn {
      background: var(--btn-bg);
      color: var(--btn-color);
      border: none;
      border-radius: var(--btn-radius);
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn--loading {
      opacity: 0.7;
    }
  `],
})
export class ThemedButtonComponent {
  label = signal('Click Me');
  loading = signal(false);

  handleClick(): void {
    this.loading.set(true);
    // Simulate async operation
    setTimeout(() => this.loading.set(false), 1500);
  }
}

/*
 * USAGE — theming via CSS custom properties from the parent:
 *
 * In parent's CSS:
 *   app-themed-button { --btn-bg: #e91e63; --btn-radius: 24px; }
 *
 * This overrides the default values defined in :host {} above.
 * No @Input() needed for visual theming — pure CSS.
 */
