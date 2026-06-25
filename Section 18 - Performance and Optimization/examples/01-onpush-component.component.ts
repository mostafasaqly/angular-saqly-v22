/**
 * Section 18 — Example 01: OnPush Component with Signal Inputs
 *
 * Demonstrates the v22 default: ChangeDetectionStrategy.OnPush.
 * Angular only re-checks this component when:
 *   1. An input() signal changes by reference
 *   2. A signal read in the template emits a new value
 *   3. An event originates inside this component
 *
 * Run:  ng serve  →  use in a parent template as <app-product-card [product]="p" />
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  // OnPush is generated automatically by the Angular v22 CLI.
  // It is listed here explicitly so the lesson is clear.
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h3>{{ product().name }}</h3>
      <p>Price: {{ product().price | currency }}</p>
      <p>Stock: {{ product().stock }}</p>

      <!-- Local state — managed with a signal inside this component -->
      <p>Qty in cart: {{ cartQty() }}</p>

      <button (click)="addToCart()" [disabled]="cartQty() >= product().stock">
        Add to Cart
      </button>

      <!-- computed() re-evaluates only when cartQty() or product() changes -->
      @if (isMaxReached()) {
        <p class="warning">Maximum stock reached!</p>
      }
    </div>
  `,
  styles: [`
    .card { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
    .warning { color: red; font-weight: bold; }
  `],
})
export class ProductCardComponent {
  // Signal input — Angular tracks reference changes automatically.
  // When the parent passes a new product object, CD runs for this component only.
  product = input.required<Product>();

  // Local signal — only this component template reads it,
  // so only this component is re-checked when it changes.
  cartQty = signal(0);

  // computed() — derived signal; recomputes only when dependencies change.
  isMaxReached = computed(() => this.cartQty() >= this.product().stock);

  addToCart(): void {
    if (!this.isMaxReached()) {
      this.cartQty.update(qty => qty + 1);
      // Angular marks this component dirty → schedules a re-render.
      // No other component in the tree is touched.
    }
  }
}

// ---------------------------------------------------------------------------
// PARENT component to demonstrate usage
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-product-list-demo',
  standalone: true,
  imports: [ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Products</h2>

    @for (p of products(); track p.id) {
      <!-- Each card re-renders independently — only the one whose
           product signal changes is re-checked. -->
      <app-product-card [product]="p" />
    }

    <button (click)="addProduct()">Add Demo Product</button>
  `,
})
export class ProductListDemoComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999.99, stock: 5 },
    { id: 2, name: 'Mouse', price: 29.99, stock: 50 },
    { id: 3, name: 'Monitor', price: 399.99, stock: 10 },
  ]);

  addProduct(): void {
    const newId = this.products().length + 1;
    // signal.update() replaces the array reference → triggers OnPush CD
    // on this component only (parent).
    this.products.update(list => [
      ...list,
      { id: newId, name: `Product ${newId}`, price: 49.99, stock: 20 },
    ]);
  }
}
