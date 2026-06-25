/**
 * Example 05 — Selector Types
 * -------------------------------------------------------
 * Angular supports three types of component selectors:
 *
 *  1. Element selector  → <app-foo />
 *  2. Attribute selector → <div appFoo></div>
 *  3. Class selector    → <div class="foo"></div>
 *
 * Also shows:
 *  - The prefix convention (app- prefix)
 *  - Compound attribute selectors
 *  - Why element selectors are preferred for components
 *  - Why attribute selectors are preferred for directives
 */

import {
  Component,
  Directive,
  ChangeDetectionStrategy,
  signal,
  ElementRef,
  inject,
} from '@angular/core';

// ─── 1. Element Selector (most common for components) ───────────────────────
// Renders as a custom HTML element: <app-status-badge />

@Component({
  selector: 'app-status-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" [class]="'badge--' + status()">
      {{ label() }}
    </span>
  `,
  styles: [`
    :host { display: inline-block; }
    .badge { padding: 2px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }
    .badge--active  { background: #e8f5e9; color: #2e7d32; }
    .badge--pending { background: #fff8e1; color: #f57f17; }
    .badge--error   { background: #fce4ec; color: #c62828; }
  `],
})
export class StatusBadgeComponent {
  status = signal<'active' | 'pending' | 'error'>('active');
  label = computed_label();

  // Note: computed() can also be written inline as a class field
}

// Helper — in a real app this would be a computed() signal
function computed_label() {
  // TypeScript note: we simulate this for demonstration.
  // In your component class, write: label = computed(() => ...)
  return signal('Active');
}

// ─── 2. Attribute Selector (preferred for directives) ───────────────────────
// Renders as an attribute on any element: <button appLoadingState>...</button>
// The directive "enhances" the host element rather than replacing it.

@Directive({
  selector: '[appLoadingState]',   // square brackets = attribute selector
  standalone: true,
})
export class LoadingStateDirective {
  private el = inject(ElementRef<HTMLElement>);

  setLoading(isLoading: boolean): void {
    this.el.nativeElement.setAttribute('aria-busy', String(isLoading));
    this.el.nativeElement.style.opacity = isLoading ? '0.6' : '1';
    this.el.nativeElement.style.pointerEvents = isLoading ? 'none' : '';
  }
}

// ─── 3. Class Selector (rarely used — shown for completeness) ───────────────
// Matches elements that have a specific CSS class: <div class="app-panel">
// AVOID this in practice — it conflates styling and Angular component identity.

@Component({
  selector: '.app-panel',   // dot prefix = class selector
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel-inner">
      <ng-content />
    </div>
  `,
  styles: [`
    .panel-inner { border: 1px solid #ccc; padding: 1rem; border-radius: 4px; }
  `],
})
export class PanelComponent {}

// ─── 4. Compound / multi-attribute selector ──────────────────────────────────
// Matches elements that have BOTH attributes simultaneously.
// Useful for directives that apply only in specific combinations.

@Directive({
  selector: 'input[type="text"][appAutoTrim]',
  standalone: true,
})
export class AutoTrimDirective {
  private el = inject(ElementRef<HTMLInputElement>);

  onBlur(): void {
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
  }
}

// ─── 5. Demo parent component ────────────────────────────────────────────────
// Shows how each selector type is used in a parent template.

@Component({
  selector: 'app-selector-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StatusBadgeComponent,   // element selector
    LoadingStateDirective,  // attribute selector
    PanelComponent,         // class selector
    AutoTrimDirective,      // compound attribute selector
  ],
  template: `
    <h2>Selector Type Examples</h2>

    <!-- 1. Element selector — explicit, easy to find in HTML -->
    <app-status-badge />

    <!-- 2. Attribute selector — enhances an existing element -->
    <button appLoadingState (click)="toggleLoading()">
      {{ loading() ? 'Loading...' : 'Click to Load' }}
    </button>

    <!-- 3. Class selector — the component is triggered by the CSS class -->
    <div class="app-panel">
      Content projected into the panel component.
    </div>

    <!-- 4. Compound selector — only input[type="text"] elements get the directive -->
    <input type="text" appAutoTrim placeholder="Type then blur to trim" />
    <input type="email" placeholder="Email — auto-trim NOT applied here" />
  `,
  styles: [`
    h2 { color: #3f51b5; font-family: 'Segoe UI', sans-serif; }
    button { margin: 1rem 0; padding: 0.5rem 1.25rem; cursor: pointer; }
    input { display: block; margin: 0.5rem 0; padding: 0.4rem; }
  `],
})
export class SelectorDemoComponent {
  loading = signal(false);

  toggleLoading(): void {
    this.loading.update(v => !v);
  }
}

/*
 * SELECTOR BEST PRACTICES:
 * ─────────────────────────────────────────────────────────────
 *
 * Components   → use element selectors:  selector: 'app-foo'
 * Directives   → use attribute selectors: selector: '[appFoo]'
 * Never        → use class selectors in new code (legacy Angular used them)
 *
 * Prefix rules:
 *   - Your app components: 'app-' prefix  (set in angular.json)
 *   - Shared library:      'lib-' or your org's prefix
 *   - NEVER use 'ng-' — reserved by Angular itself
 *   - NEVER use single-word selectors that clash with HTML: 'button', 'header'
 *
 * Attribute selector naming:
 *   - camelCase with your prefix: [appAutoTrim], [appLoadingState]
 *   - NOT kebab-case: [app-auto-trim] — this is valid HTML but less idiomatic
 */
