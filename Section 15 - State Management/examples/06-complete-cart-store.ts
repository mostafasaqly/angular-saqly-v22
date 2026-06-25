/**
 * Section 15 — Example 06: Complete Cart Store with Signals
 *
 * A production-ready shopping cart store built entirely with Angular Signals.
 * No NgRx. No RxJS BehaviorSubject. Pure Angular v22.
 *
 * Features:
 *  - Add / remove / update quantity
 *  - Computed total, subtotal, tax, item count
 *  - Coupon code system
 *  - Persistence to localStorage via effect()
 *  - Hydration from localStorage on init
 *  - Full TypeScript types
 */

import {
  Injectable,
  signal,
  computed,
  effect,
  inject,
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  maxQty: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Coupon {
  code: string;
  discount: number; // percentage 0-100
  type: 'percent' | 'fixed';
}

const KNOWN_COUPONS: Coupon[] = [
  { code: 'SAVE10', discount: 10, type: 'percent' },
  { code: 'FLAT5', discount: 5, type: 'fixed' },
];

const STORAGE_KEY = 'ng22-cart';
const TAX_RATE    = 0.08;

// ─── Cart Store ───────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CartStore {
  // ── Private writable signals ───────────────────────────────────────────────
  private _items      = signal<CartItem[]>(this._hydrate());
  private _coupon     = signal<Coupon | null>(null);
  private _isOpen     = signal(false);
  private _couponError = signal<string | null>(null);

  // ── Public read-only signals ───────────────────────────────────────────────
  readonly items       = this._items.asReadonly();
  readonly coupon      = this._coupon.asReadonly();
  readonly isOpen      = this._isOpen.asReadonly();
  readonly couponError = this._couponError.asReadonly();

  // ── Computed selectors ─────────────────────────────────────────────────────

  readonly isEmpty = computed(() => this._items().length === 0);

  readonly itemCount = computed(() =>
    this._items().reduce((sum, i) => sum + i.qty, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.qty, 0)
  );

  readonly discount = computed(() => {
    const c = this._coupon();
    if (!c) return 0;
    if (c.type === 'percent') return this.subtotal() * (c.discount / 100);
    return c.discount;
  });

  readonly afterDiscount = computed(() =>
    Math.max(0, this.subtotal() - this.discount())
  );

  readonly tax = computed(() => this.afterDiscount() * TAX_RATE);

  readonly total = computed(() => this.afterDiscount() + this.tax());

  readonly hasCoupon = computed(() => this._coupon() !== null);

  readonly lineItems = computed(() =>
    this._items().map(i => ({
      ...i,
      lineTotal: i.product.price * i.qty,
    }))
  );

  // ── Hydration from localStorage ────────────────────────────────────────────
  private _hydrate(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  // ── Persistence effect ─────────────────────────────────────────────────────
  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  // ── Cart open/close ────────────────────────────────────────────────────────
  open():   void { this._isOpen.set(true); }
  close():  void { this._isOpen.set(false); }
  toggle(): void { this._isOpen.update(v => !v); }

  // ── Item operations ────────────────────────────────────────────────────────

  addItem(product: Product, qty = 1): void {
    this._items.update(items => {
      const exists = items.find(i => i.product.id === product.id);

      if (exists) {
        return items.map(i => {
          if (i.product.id !== product.id) return i;
          const newQty = Math.min(i.qty + qty, product.maxQty);
          return { ...i, qty: newQty };
        });
      }

      return [...items, { product, qty: Math.min(qty, product.maxQty) }];
    });
  }

  removeItem(productId: string): void {
    this._items.update(items =>
      items.filter(i => i.product.id !== productId)
    );
  }

  setQty(productId: string, qty: number): void {
    if (qty <= 0) {
      this.removeItem(productId);
      return;
    }
    this._items.update(items =>
      items.map(i => {
        if (i.product.id !== productId) return i;
        const capped = Math.min(qty, i.product.maxQty);
        return { ...i, qty: capped };
      })
    );
  }

  incrementQty(productId: string): void {
    this._items.update(items =>
      items.map(i => {
        if (i.product.id !== productId) return i;
        return { ...i, qty: Math.min(i.qty + 1, i.product.maxQty) };
      })
    );
  }

  decrementQty(productId: string): void {
    const item = this._items().find(i => i.product.id === productId);
    if (!item) return;
    if (item.qty === 1) {
      this.removeItem(productId);
    } else {
      this._items.update(items =>
        items.map(i =>
          i.product.id === productId ? { ...i, qty: i.qty - 1 } : i
        )
      );
    }
  }

  clear(): void {
    this._items.set([]);
    this._coupon.set(null);
    this._couponError.set(null);
  }

  // ── Coupon operations ──────────────────────────────────────────────────────

  applyCoupon(code: string): void {
    const found = KNOWN_COUPONS.find(
      c => c.code === code.trim().toUpperCase()
    );

    if (found) {
      this._coupon.set(found);
      this._couponError.set(null);
    } else {
      this._couponError.set(`"${code}" is not a valid coupon.`);
    }
  }

  removeCoupon(): void {
    this._coupon.set(null);
    this._couponError.set(null);
  }
}

// ─── Cart Drawer Component ────────────────────────────────────────────────────

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    @if (cart.isOpen()) {
      <div class="cart-overlay" (click)="cart.close()"></div>

      <aside class="cart-drawer">
        <header>
          <h2>Your Cart ({{ cart.itemCount() }})</h2>
          <button (click)="cart.close()">✕</button>
        </header>

        @if (cart.isEmpty()) {
          <p class="empty">Your cart is empty.</p>
        } @else {
          <!-- Line items -->
          <ul class="cart-items">
            @for (line of cart.lineItems(); track line.product.id) {
              <li class="cart-item">
                <img [src]="line.product.imageUrl" [alt]="line.product.name" />
                <div class="info">
                  <strong>{{ line.product.name }}</strong>
                  <span>{{ line.product.price | currency }} each</span>
                </div>
                <div class="qty-controls">
                  <button (click)="cart.decrementQty(line.product.id)">−</button>
                  <span>{{ line.qty }}</span>
                  <button (click)="cart.incrementQty(line.product.id)">+</button>
                </div>
                <span class="line-total">{{ line.lineTotal | currency }}</span>
                <button class="remove" (click)="cart.removeItem(line.product.id)">🗑</button>
              </li>
            }
          </ul>

          <!-- Coupon -->
          <div class="coupon">
            @if (!cart.hasCoupon()) {
              <input #couponInput type="text" placeholder="Coupon code" />
              <button (click)="cart.applyCoupon(couponInput.value)">Apply</button>
              @if (cart.couponError()) {
                <p class="error">{{ cart.couponError() }}</p>
              }
            } @else {
              <p class="applied">
                Coupon <strong>{{ cart.coupon()!.code }}</strong> applied!
                <button (click)="cart.removeCoupon()">Remove</button>
              </p>
            }
          </div>

          <!-- Totals -->
          <div class="totals">
            <div class="row"><span>Subtotal</span><span>{{ cart.subtotal() | currency }}</span></div>
            @if (cart.hasCoupon()) {
              <div class="row discount">
                <span>Discount ({{ cart.coupon()!.code }})</span>
                <span>-{{ cart.discount() | currency }}</span>
              </div>
            }
            <div class="row"><span>Tax (8%)</span><span>{{ cart.tax() | currency }}</span></div>
            <div class="row total"><strong>Total</strong><strong>{{ cart.total() | currency }}</strong></div>
          </div>

          <!-- Actions -->
          <div class="actions">
            <button class="secondary" (click)="cart.clear()">Clear Cart</button>
            <button class="primary" (click)="checkout()">Checkout</button>
          </div>
        }
      </aside>
    }
  `,
})
export class CartDrawerComponent {
  cart = inject(CartStore);

  checkout(): void {
    // Navigate to checkout route
    console.log('Proceeding to checkout with total:', this.cart.total());
    this.cart.close();
  }
}

// ─── Add to Cart Button (reusable) ────────────────────────────────────────────

@Component({
  selector: 'app-add-to-cart-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="add-btn"
      [disabled]="isInCart()"
      (click)="add()"
    >
      {{ isInCart() ? 'In Cart ✓' : 'Add to Cart' }}
    </button>
  `,
})
export class AddToCartBtnComponent {
  product = input.required<Product>();
  added   = output<void>();

  private cart = inject(CartStore);

  isInCart = computed(() =>
    this.cart.items().some(i => i.product.id === this.product().id)
  );

  add(): void {
    this.cart.addItem(this.product());
    this.added.emit();
  }
}
