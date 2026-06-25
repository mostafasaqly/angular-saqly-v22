/**
 * Section 15 — Example 02: Service-Based State
 *
 * When two or more components need the same data, move state into a
 * providedIn: 'root' service. All injectors share the same instance,
 * so every consumer sees the same signals.
 *
 * Pattern:
 *  1. Private writable signals  → only the service mutates them
 *  2. Public read-only signals  → exposed via asReadonly()
 *  3. Computed signals          → derived totals, filters, counts
 *  4. Named mutator methods     → explicit, self-documenting operations
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// ─── Models ──────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

// ─── Cart Service ─────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CartService {
  // Private — only this service writes
  private _items = signal<CartItem[]>([]);
  private _isOpen = signal(false);

  // Public read-only — any component can read
  readonly items     = this._items.asReadonly();
  readonly isOpen    = this._isOpen.asReadonly();

  // Computed derived state
  readonly itemCount = computed(() =>
    this._items().reduce((sum, i) => sum + i.qty, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.qty, 0)
  );

  readonly tax = computed(() => this.subtotal() * 0.08);

  readonly total = computed(() => this.subtotal() + this.tax());

  readonly isEmpty = computed(() => this._items().length === 0);

  // ── Mutators ───────────────────────────────────────────────────────────────

  addProduct(product: Product): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...items, { product, qty: 1 }];
    });
  }

  removeProduct(productId: number): void {
    this._items.update(items =>
      items.filter(i => i.product.id !== productId)
    );
  }

  setQty(productId: number, qty: number): void {
    if (qty <= 0) {
      this.removeProduct(productId);
      return;
    }
    this._items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, qty } : i)
    );
  }

  clear(): void {
    this._items.set([]);
  }

  toggleCart(): void {
    this._isOpen.update(v => !v);
  }

  openCart(): void  { this._isOpen.set(true); }
  closeCart(): void { this._isOpen.set(false); }
}

// ─── Product Service ──────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private _products = signal<Product[]>([]);
  private _loading  = signal(false);

  readonly products = this._products.asReadonly();
  readonly loading  = this._loading.asReadonly();

  loadAll(): void {
    this._loading.set(true);
    this.http.get<Product[]>('/api/products').subscribe({
      next: data => {
        this._products.set(data);
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }
}

// ─── Product Card Component (Consumer A) ─────────────────────────────────────

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div class="card">
      <img [src]="product.imageUrl" [alt]="product.name" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <button (click)="addToCart()">Add to Cart</button>
    </div>
  `,
})
export class ProductCardComponent {
  product!: Product; // set via @Input() or signal input
  private cart = inject(CartService);

  addToCart(): void {
    this.cart.addProduct(this.product);
  }
}

// ─── Cart Icon Component (Consumer B) ────────────────────────────────────────

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="cart.toggleCart()">
      🛒
      @if (cart.itemCount() > 0) {
        <span class="badge">{{ cart.itemCount() }}</span>
      }
    </button>
  `,
})
export class CartIconComponent {
  cart = inject(CartService);
}

// ─── Cart Summary Component (Consumer C) ──────────────────────────────────────

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    @if (cart.isOpen()) {
      <div class="cart-panel">
        <button (click)="cart.closeCart()">Close</button>

        @if (cart.isEmpty()) {
          <p>Your cart is empty.</p>
        } @else {
          <ul>
            @for (item of cart.items(); track item.product.id) {
              <li>
                {{ item.product.name }} × {{ item.qty }}
                — {{ item.product.price * item.qty | currency }}
                <button (click)="cart.removeProduct(item.product.id)">Remove</button>
              </li>
            }
          </ul>
          <hr />
          <p>Subtotal: {{ cart.subtotal() | currency }}</p>
          <p>Tax (8%): {{ cart.tax() | currency }}</p>
          <p><strong>Total: {{ cart.total() | currency }}</strong></p>
          <button (click)="cart.clear()">Clear Cart</button>
        }
      </div>
    }
  `,
})
export class CartSummaryComponent {
  cart = inject(CartService);
}

/*
  TAKEAWAYS
  ─────────────────────────────────────────────────────────────────────────────
  1. All three components (ProductCard, CartIcon, CartSummary) inject the same
     CartService singleton. When ProductCard calls addProduct(), CartIcon and
     CartSummary automatically reflect the change — no EventEmitter needed.

  2. `asReadonly()` ensures that CartIcon can read itemCount() but cannot call
     `_items.set()` — mutations flow only through named service methods.

  3. `computed()` values (subtotal, tax, total, isEmpty) are recalculated only
     when `_items` signal changes, not on every change detection tick.

  4. All components use OnPush. Angular's signal integration means only
     components that read a changed signal are re-rendered.
*/
