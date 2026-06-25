/**
 * Section 6, Example 7 — Selectorless Components (Angular v22)
 *
 * A selectorless component has no `selector` property. It cannot be
 * placed in HTML templates as a tag. Instead it's rendered by:
 *   - The Angular Router (component: MyComponent in routes)
 *   - ViewContainerRef.createComponent()
 *   - NgComponentOutlet
 *
 * Key concepts:
 *  - Omitting selector from @Component
 *  - Using as a routed page component
 *  - Dynamic rendering with NgComponentOutlet
 *  - Combine with signal inputs for type-safe dynamic rendering
 */

import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewContainerRef,
  inject,
  Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

// ------------------------------------------------------------------
// Selectorless component #1 — a routed page
// Used in routes: { path: 'home', component: HomePageComponent }
// ------------------------------------------------------------------

@Component({
  // No selector! Cannot be used as <app-home-page> in templates.
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page home-page">
      <h1>Welcome Home</h1>
      <p>This component is rendered by the Router — not by a template tag.</p>
      <p>It has no selector because it will never appear in HTML directly.</p>
    </section>
  `,
})
export class HomePageComponent {}

// ------------------------------------------------------------------
// Selectorless component #2 — a product detail page
// The Router injects route params; we use inject(ActivatedRoute)
// ------------------------------------------------------------------

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <section class="page product-detail-page">
      <h1>{{ product().name }}</h1>
      <p>{{ product().price | currency }}</p>
      <p>{{ product().description }}</p>

      <button (click)="addToCart.emit(product())">Add to Cart</button>
    </section>
  `,
})
export class ProductDetailPageComponent {
  // Signal inputs work fine on selectorless components when used with
  // NgComponentOutlet or direct programmatic instantiation
  product    = input.required<Product>();
  addToCart  = output<Product>();
}

// ------------------------------------------------------------------
// Selectorless components used as dynamic panels
// Rendered via NgComponentOutlet — no selector needed
// ------------------------------------------------------------------

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel settings-panel">
      <h2>Settings</h2>
      <p>Configure your preferences here.</p>
    </div>
  `,
})
export class SettingsPanelComponent {}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel analytics-panel">
      <h2>Analytics</h2>
      <p>View your usage statistics here.</p>
    </div>
  `,
})
export class AnalyticsPanelComponent {}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel notifications-panel">
      <h2>Notifications</h2>
      <p>Your recent notifications appear here.</p>
    </div>
  `,
})
export class NotificationsPanelComponent {}

// ------------------------------------------------------------------
// Host component (HAS a selector) that dynamically renders selectorless
// components using NgComponentOutlet
// ------------------------------------------------------------------

type PanelType = 'settings' | 'analytics' | 'notifications';

@Component({
  selector: 'app-selectorless-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet],
  template: `
    <h1>Selectorless Components Demo</h1>

    <p>
      The panels below are rendered using NgComponentOutlet.
      None of them have a selector — they can never appear as tags in HTML.
    </p>

    <nav>
      @for (panel of panels; track panel.type) {
        <button
          [class.active]="activePanel() === panel.type"
          (click)="activePanel.set(panel.type)"
        >
          {{ panel.label }}
        </button>
      }
    </nav>

    <!-- NgComponentOutlet renders a component by class reference, no selector needed -->
    <div class="panel-host">
      <ng-container *ngComponentOutlet="currentPanelComponent()" />
    </div>

    <hr />

    <!-- Product detail selectorless component via NgComponentOutlet with inputs -->
    <h2>Product Detail (selectorless, with inputs)</h2>
    <ng-container
      *ngComponentOutlet="
        ProductDetailPageComponent;
        inputs: { product: sampleProduct }
      "
    />
  `,
})
export class SelectorlessDemoComponent {
  // Expose class reference so template can access it
  readonly ProductDetailPageComponent = ProductDetailPageComponent;

  panels: Array<{ type: PanelType; label: string }> = [
    { type: 'settings',      label: 'Settings' },
    { type: 'analytics',     label: 'Analytics' },
    { type: 'notifications', label: 'Notifications' },
  ];

  activePanel = signal<PanelType>('settings');

  currentPanelComponent = computed((): Type<unknown> => {
    switch (this.activePanel()) {
      case 'settings':      return SettingsPanelComponent;
      case 'analytics':     return AnalyticsPanelComponent;
      case 'notifications': return NotificationsPanelComponent;
    }
  });

  sampleProduct: Product = {
    id: 42,
    name: 'Pro Mechanical Keyboard',
    price: 149.99,
    description: 'A premium mechanical keyboard with RGB backlighting.',
  };
}

// ------------------------------------------------------------------
// How this maps to Angular Router
// ------------------------------------------------------------------

/**
 * In your app.routes.ts:
 *
 * import { Routes } from '@angular/router';
 * import { HomePageComponent }          from './home-page.component';
 * import { ProductDetailPageComponent } from './product-detail-page.component';
 *
 * export const routes: Routes = [
 *   { path: '',        component: HomePageComponent },
 *   { path: 'product', component: ProductDetailPageComponent },
 *
 *   // Lazy-loaded selectorless component
 *   {
 *     path: 'settings',
 *     loadComponent: () =>
 *       import('./settings-panel.component').then(m => m.SettingsPanelComponent)
 *   },
 * ];
 *
 * The Router renders these by class reference — the selector is irrelevant.
 * Omitting the selector documents that intent clearly.
 */

// ------------------------------------------------------------------
// ViewContainerRef approach (programmatic)
// ------------------------------------------------------------------

@Component({
  selector: 'app-dynamic-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #anchor></div>`,
})
export class DynamicHostComponent {
  private vcr = inject(ViewContainerRef);

  loadSettings() {
    this.vcr.clear();
    // Creates a SettingsPanelComponent at runtime — no selector required
    this.vcr.createComponent(SettingsPanelComponent);
  }
}
