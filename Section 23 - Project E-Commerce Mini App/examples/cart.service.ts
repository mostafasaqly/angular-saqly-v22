// cart.service.ts
// Complete cart service using Signals + localStorage persistence

import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem, CartSummary, Product } from './models/product.model';

const CART_STORAGE_KEY = 'ng_shop_cart';
const TAX_RATE        = 0.08;   // 8%
const SHIPPING_RATE   = 5.99;   // flat rate; free above $50

@Injectable({ providedIn: 'root' })
export class CartService {
  // ── Core state signal ────────────────────────────────────────────────────
  private readonly _items = signal<CartItem[]>(this.loadFromStorage());

  // ── Public read-only signal ──────────────────────────────────────────────
  readonly items = this._items.asReadonly();

  // ── Derived signals ──────────────────────────────────────────────────────

  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  readonly tax = computed(() => this.subtotal() * TAX_RATE);

  readonly shipping = computed(() =>
    this.subtotal() === 0 ? 0 : this.subtotal() >= 50 ? 0 : SHIPPING_RATE
  );

  readonly total = computed(
    () => this.subtotal() + this.tax() + this.shipping()
  );

  readonly summary = computed<CartSummary>(() => ({
    items:     this._items(),
    itemCount: this.itemCount(),
    subtotal:  this.subtotal(),
    tax:       this.tax(),
    shipping:  this.shipping(),
    total:     this.total()
  }));

  readonly isEmpty = computed(() => this._items().length === 0);

  // ── Persistence effect ───────────────────────────────────────────────────
  constructor() {
    // Any time _items changes, write to localStorage
    effect(() => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  // ── Mutations ────────────────────────────────────────────────────────────

  /**
   * Add a product. If it already exists, increment quantity.
   */
  addToCart(product: Product, quantity = 1): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        );
      }
      return [...items, { product, quantity: Math.min(quantity, product.stock) }];
    });
  }

  /**
   * Set exact quantity. Removes the item if quantity reaches 0.
   */
  setQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this._items.update(items =>
      items.map(i =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(quantity, i.product.stock) }
          : i
      )
    );
  }

  /**
   * Increment quantity by 1.
   */
  increment(productId: number): void {
    this._items.update(items =>
      items.map(i =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(i.quantity + 1, i.product.stock) }
          : i
      )
    );
  }

  /**
   * Decrement quantity by 1. Removes if quantity would drop to 0.
   */
  decrement(productId: number): void {
    this._items.update(items => {
      const item = items.find(i => i.product.id === productId);
      if (!item) return items;
      if (item.quantity <= 1) return items.filter(i => i.product.id !== productId);
      return items.map(i =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }

  /**
   * Remove a specific item from the cart.
   */
  removeFromCart(productId: number): void {
    this._items.update(items =>
      items.filter(i => i.product.id !== productId)
    );
  }

  /**
   * Empty the entire cart.
   */
  clearCart(): void {
    this._items.set([]);
  }

  /**
   * Check whether a product is already in the cart.
   */
  isInCart(productId: number): boolean {
    return this._items().some(i => i.product.id === productId);
  }

  /**
   * Get the current quantity of a specific product (0 if not in cart).
   */
  quantityOf(productId: number): number {
    return this._items().find(i => i.product.id === productId)?.quantity ?? 0;
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
