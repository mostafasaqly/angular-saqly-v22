# Section 23 — Project: E-Commerce Mini App

**Type:** Capstone Project · **Duration:** ~3 hours · **Difficulty:** Intermediate–Advanced
**Angular Version:** 22 · **Standalone:** Yes · **Key APIs:** Signals, httpResource, Signal Forms, Router

---

## What You're Building

A fully functional **E-Commerce Mini App** — a multi-page storefront where users can browse products, view product details, manage a persistent shopping cart, and complete a checkout form. The app demonstrates real-world patterns: reactive state management with Signals, declarative data fetching with `httpResource`, Signal Forms for checkout, and lazy-loaded routes.

### Features

- **Products Page** — grid of products fetched with `httpResource()`, with category filter and search
- **Product Details Page** — individual product view with image, description, price, and "Add to Cart"
- **Cart** — signal-based cart service persisted to `localStorage`, accessible from any page
- **Add / Update / Remove** — cart operations with quantity controls
- **Checkout Form** — Signal-based form with validation (name, email, address, card)
- **Order Summary** — final review before placing order
- **Persisting Cart Data** — cart survives page refresh via `localStorage`
- **Lazy-loaded routes** — each page loaded on demand
- **OnPush throughout** — every component uses `ChangeDetectionStrategy.OnPush`

---

## What You'll Learn

- Building a multi-page app with lazy-loaded routes and a persistent layout
- Signal-based cart state shared across multiple pages via a service
- `httpResource()` for reactive product fetching with loading/error states
- Signal Forms for checkout without Reactive Forms overhead
- `localStorage` persistence wired to Angular Signals via `effect()`
- Component composition: product card → product grid → products page
- `computed()` for derived state (filtered products, totals, categories)

---

## Project Setup

```bash
ng new ecommerce-mini --standalone --routing --style=scss
cd ecommerce-mini
```

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch())
  ]
};
```

---

## Route Structure

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () => import('./products/products-page.component').then(m => m.ProductsPageComponent),
        title: 'Shop'
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent),
        title: 'Product'
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart-page.component').then(m => m.CartPageComponent),
        title: 'Cart'
      },
      {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'Checkout'
      },
      {
        path: 'order-success',
        loadComponent: () => import('./order-success/order-success.component').then(m => m.OrderSuccessComponent),
        title: 'Order Placed!'
      },
    ]
  },
  { path: '**', redirectTo: 'products' }
];
```

---

## Data Models

```typescript
// src/app/models/product.model.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

// src/app/models/cart.model.ts
export interface CartItem {
  product: Product;
  quantity: number;
}
```

---

## Step 1: Layout Component

The layout contains the persistent navbar and a `<router-outlet>`:

```typescript
// src/app/layout/layout.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="navbar">
      <a routerLink="/products" class="logo">ShopApp</a>
      <nav>
        <a routerLink="/products" routerLinkActive="active">Shop</a>
        <a routerLink="/cart" routerLinkActive="active" class="cart-link">
          Cart
          @if (cart.count() > 0) {
            <span class="badge">{{ cart.count() }}</span>
          }
        </a>
      </nav>
    </header>
    <main class="container">
      <router-outlet />
    </main>
  `
})
export class LayoutComponent {
  cart = inject(CartService);
}
```

---

## Step 2: Cart Service

```typescript
// src/app/cart/cart.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

const STORAGE_KEY = 'shopapp_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>(this.loadFromStorage());

  items = this._items.asReadonly();
  count = computed(() => this._items().reduce((sum, i) => sum + i.quantity, 0));
  subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );
  isEmpty = computed(() => this._items().length === 0);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  addToCart(product: Product) {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) { this.removeItem(productId); return; }
    this._items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  removeItem(productId: number) {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  clear() { this._items.set([]); }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
}
```

---

## Step 3: Products Page

```typescript
// src/app/products/products-page.component.ts
import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-header">
      <h1>All Products</h1>
      <input placeholder="Search..." (input)="search($event)" class="search" />
    </div>

    <div class="categories">
      @for (cat of categories(); track cat) {
        <button [class.active]="activeCategory() === cat" (click)="activeCategory.set(cat)">
          {{ cat }}
        </button>
      }
    </div>

    @if (resource.isLoading()) {
      <p>Loading products...</p>
    } @else if (resource.error()) {
      <p>Error loading products. <button (click)="resource.reload()">Retry</button></p>
    } @else {
      <div class="product-grid">
        @for (p of filtered(); track p.id) {
          <div class="product-card">
            <a [routerLink]="['/products', p.id]">
              <img [src]="p.image" [alt]="p.title" loading="lazy" />
              <h3>{{ p.title }}</h3>
            </a>
            <div class="card-footer">
              <span>{{ p.price | currency }}</span>
              <button (click)="addToCart(p)">Add to Cart</button>
            </div>
          </div>
        } @empty {
          <p>No products match your search.</p>
        }
      </div>
    }
  `
})
export class ProductsPageComponent {
  private cart = inject(CartService);

  resource = httpResource<Product[]>(() => 'https://fakestoreapi.com/products');

  searchQuery = signal('');
  activeCategory = signal('All');

  categories = computed(() => {
    const all = this.resource.value() ?? [];
    return ['All', ...new Set(all.map(p => p.category))];
  });

  filtered = computed(() => {
    const all = this.resource.value() ?? [];
    const q = this.searchQuery().toLowerCase();
    const cat = this.activeCategory();
    return all
      .filter(p => cat === 'All' || p.category === cat)
      .filter(p => !q || p.title.toLowerCase().includes(q));
  });

  search(e: Event) { this.searchQuery.set((e.target as HTMLInputElement).value); }
  addToCart(p: Product) { this.cart.addToCart(p); }
}
```

---

## Step 4: Product Detail Page

```typescript
// src/app/product-detail/product-detail.component.ts
import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Product } from '../models/product.model';

@Component({
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/products">← Back</a>

    @if (resource.isLoading()) {
      <p>Loading...</p>
    } @else if (resource.value(); as p) {
      <div class="detail-layout">
        <img [src]="p.image" [alt]="p.title" class="product-image" />
        <div class="product-info">
          <span class="category">{{ p.category }}</span>
          <h1>{{ p.title }}</h1>
          <p class="rating">★ {{ p.rating.rate }} ({{ p.rating.count }} reviews)</p>
          <p class="price">{{ p.price | currency }}</p>
          <p class="description">{{ p.description }}</p>
          <button class="btn-primary btn-lg" (click)="addToCart(p)">Add to Cart</button>
        </div>
      </div>
    }
  `
})
export class ProductDetailComponent {
  private cart = inject(CartService);
  id = input.required<string>();

  resource = httpResource<Product>(
    () => `https://fakestoreapi.com/products/${this.id()}`
  );

  addToCart(p: Product) { this.cart.addToCart(p); }
}
```

---

## Step 5: Cart Page

```typescript
// src/app/cart/cart-page.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Your Cart</h1>

    @if (cart.isEmpty()) {
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a routerLink="/products" class="btn-primary">Start Shopping</a>
      </div>
    } @else {
      <div class="cart-layout">
        <div class="cart-items">
          @for (item of cart.items(); track item.product.id) {
            <div class="cart-item">
              <img [src]="item.product.image" [alt]="item.product.title" />
              <div class="item-info">
                <h3>{{ item.product.title }}</h3>
                <p>{{ item.product.price | currency }}</p>
              </div>
              <div class="qty-control">
                <button (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">−</button>
                <span>{{ item.quantity }}</span>
                <button (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
              </div>
              <span class="item-total">{{ item.product.price * item.quantity | currency }}</span>
              <button class="remove-btn" (click)="cart.removeItem(item.product.id)">✕</button>
            </div>
          }
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-row">
            <span>Items ({{ cart.count() }})</span>
            <span>{{ cart.subtotal() | currency }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div class="summary-total">
            <strong>Total</strong>
            <strong>{{ cart.subtotal() | currency }}</strong>
          </div>
          <a routerLink="/checkout" class="btn-primary checkout-btn">Proceed to Checkout</a>
          <button (click)="cart.clear()" class="btn-secondary">Clear Cart</button>
        </div>
      </div>
    }
  `
})
export class CartPageComponent {
  cart = inject(CartService);
}
```

---

## Step 6: Checkout Form

```typescript
// src/app/checkout/checkout.component.ts
import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/cart.service';

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  card: string;
}

@Component({
  standalone: true,
  imports: [FormsModule, CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Checkout</h1>

    <div class="checkout-layout">
      <form class="checkout-form" (ngSubmit)="placeOrder()">
        <fieldset>
          <legend>Contact</legend>
          <input [(ngModel)]="form.name" name="name" placeholder="Full Name" required />
          <input [(ngModel)]="form.email" name="email" type="email" placeholder="Email" required />
        </fieldset>

        <fieldset>
          <legend>Shipping Address</legend>
          <input [(ngModel)]="form.address" name="address" placeholder="Address" required />
          <input [(ngModel)]="form.city" name="city" placeholder="City" required />
          <input [(ngModel)]="form.zip" name="zip" placeholder="ZIP Code" required />
        </fieldset>

        <fieldset>
          <legend>Payment</legend>
          <input [(ngModel)]="form.card" name="card" placeholder="Card Number (demo)" required maxlength="19" />
        </fieldset>

        @if (error()) {
          <p class="error">{{ error() }}</p>
        }

        <button type="submit" class="btn-primary" [disabled]="placing()">
          {{ placing() ? 'Placing Order...' : 'Place Order — ' + (cart.subtotal() | currency) }}
        </button>
        <a routerLink="/cart" class="btn-secondary">Back to Cart</a>
      </form>

      <aside class="order-preview">
        <h2>Order ({{ cart.count() }} items)</h2>
        @for (item of cart.items(); track item.product.id) {
          <div class="preview-item">
            <span>{{ item.product.title }} x{{ item.quantity }}</span>
            <span>{{ item.product.price * item.quantity | currency }}</span>
          </div>
        }
        <div class="preview-total">
          <strong>Total: {{ cart.subtotal() | currency }}</strong>
        </div>
      </aside>
    </div>
  `
})
export class CheckoutComponent {
  cart = inject(CartService);
  private router = inject(Router);

  form: CheckoutForm = { name: '', email: '', address: '', city: '', zip: '', card: '' };
  placing = signal(false);
  error = signal<string | null>(null);

  async placeOrder() {
    const f = this.form;
    if (!f.name || !f.email || !f.address || !f.city || !f.zip || !f.card) {
      this.error.set('Please fill in all fields.');
      return;
    }

    this.placing.set(true);
    this.error.set(null);

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));

    this.cart.clear();
    this.placing.set(false);
    this.router.navigate(['/order-success']);
  }
}
```

---

## Step 7: Order Success Page

```typescript
// src/app/order-success/order-success.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="success-page">
      <div class="success-icon">✓</div>
      <h1>Order Placed!</h1>
      <p>Thank you for your purchase. Your order is being processed.</p>
      <a routerLink="/products" class="btn-primary">Continue Shopping</a>
    </div>
  `
})
export class OrderSuccessComponent {}
```

---

## Final Project Review

### Skills demonstrated in this project

| Feature | Pattern Used |
|---|---|
| Product list | `httpResource()` + reactive filtering |
| Category filter | `computed()` + `signal()` |
| Cart state | Service with Signals + `localStorage` persistence |
| Cart badge | Shared service injected in layout |
| Product detail | Route param via `input()` + `httpResource()` |
| Checkout | Template-driven form with `ngModel` |
| Lazy loading | `loadComponent` for every route |
| Change detection | `OnPush` on every component |

### Possible extensions

- Add user authentication (Section 16 patterns)
- Replace fake API with a real backend
- Add product reviews and ratings
- Implement a wishlist alongside the cart
- Add SSR for SEO on the product pages (Section 19 patterns)
- Write unit tests for `CartService` and `ProductsPageComponent` (Section 20 patterns)

---

**Next:** [Section 24 — Deployment](../Section%2024%20-%20Deployment/README.md)
