import"./chunk-JS3ZFT6L.js";var t={id:23,title:"\u0645\u0634\u0631\u0648\u0639: \u062A\u0637\u0628\u064A\u0642 \u062A\u062C\u0627\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",titleEn:"Project: E-Commerce Mini App",level:"\u0645\u062A\u0648\u0633\u0637 \u2013 \u0645\u062A\u0642\u062F\u0645",levelEn:"Intermediate\u2013Advanced",intro:"\u0628\u0646\u0627\u0621 \u062A\u0637\u0628\u064A\u0642 \u062A\u062C\u0627\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0643\u0627\u0645\u0644 \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629 \u0641\u064A Angular v22. \u0633\u062A\u0628\u0646\u064A: \u0639\u0631\u0636 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0645\u0639 \u0627\u0644\u0641\u0644\u062A\u0631\u0629\u060C \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u060C \u0633\u0644\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A \u062A\u0639\u0645\u0644 \u0628\u0640 Signals \u0648\u062A\u064F\u062D\u0641\u0638 \u0641\u064A localStorage\u060C \u0635\u0641\u062D\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0646\u062A\u062C\u060C \u0648\u0635\u0641\u062D\u0629 \u0627\u0644\u062F\u0641\u0639.",introEn:"Build a complete e-commerce app step by step in Angular v22. You will build: product listing with filtering, product card component, a shopping cart powered by Signals with localStorage persistence, a product detail page, and a checkout page.",lessons:["\u0627\u0644\u062E\u0637\u0648\u0629 1 \u2014 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u0644\u0640 Routing","\u0627\u0644\u062E\u0637\u0648\u0629 2 \u2014 \u062A\u0639\u0631\u064A\u0641 \u0627\u0644\u0646\u0648\u0639 Product \u0648\u0627\u0644\u0640 CartItem","\u0627\u0644\u062E\u0637\u0648\u0629 3 \u2014 \u0628\u0646\u0627\u0621 CartService","\u0627\u0644\u062E\u0637\u0648\u0629 4 \u2014 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0646\u062A\u062C (ProductCardComponent)","\u0627\u0644\u062E\u0637\u0648\u0629 5 \u2014 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0645\u0639 \u0627\u0644\u0641\u0644\u062A\u0631\u0629","\u0627\u0644\u062E\u0637\u0648\u0629 6 \u2014 \u0635\u0641\u062D\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0646\u062A\u062C","\u0627\u0644\u062E\u0637\u0648\u0629 7 \u2014 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0633\u0644\u0629 \u0641\u064A \u0627\u0644\u0640 Navbar","\u0627\u0644\u062E\u0637\u0648\u0629 8 \u2014 \u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0644\u0629 \u0648\u0627\u0644\u062F\u0641\u0639"],lessonsEn:["Step 1 \u2014 Create Project and Routing","Step 2 \u2014 Define Product and CartItem Types","Step 3 \u2014 Build CartService","Step 4 \u2014 Product Card Component","Step 5 \u2014 Products Page with Filtering","Step 6 \u2014 Product Detail Page","Step 7 \u2014 Cart Icon in Navbar","Step 8 \u2014 Cart Page and Checkout"],content:[{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 1 \u2014 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0627\u0644\u0640 Routing"},{type:"paragraph",text:"\u0623\u0646\u0634\u0626 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0639\u0631\u0651\u0641 \u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0623\u0631\u0628\u0639\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u0645\u062A\u062C\u0631."},{type:"code",code:`# \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639
ng new ecommerce-app --standalone --routing --style=css
cd ecommerce-app`},{type:"code",code:`// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u2192 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A
  {
    path: '',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  // \u062A\u0641\u0627\u0635\u064A\u0644 \u0645\u0646\u062A\u062C \u0645\u0639\u064A\u0646
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  // \u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0644\u0629
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component')
      .then(m => m.CartComponent)
  },
  // \u0635\u0641\u062D\u0629 \u0627\u0644\u062F\u0641\u0639
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutComponent)
  },
  { path: '**', redirectTo: '' }
];`},{type:"code",code:`// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // withComponentInputBinding \u064A\u064F\u062A\u064A\u062D \u0631\u0628\u0637 route params \u0628\u0640 input() \u0645\u0628\u0627\u0634\u0631\u0629\u064B
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
  ]
};`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 2 \u2014 \u062A\u0639\u0631\u064A\u0641 \u0627\u0644\u0646\u0648\u0639 Product \u0648\u0627\u0644\u0640 CartItem"},{type:"paragraph",text:"\u0639\u0631\u0651\u0641 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0623\u0648\u0644\u0627\u064B \u062D\u062A\u0649 \u064A\u0633\u062A\u0641\u064A\u062F \u0643\u0644 \u0627\u0644\u0643\u0648\u062F \u0645\u0646 TypeScript."},{type:"code",code:`// shared/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 3 \u2014 \u0628\u0646\u0627\u0621 CartService"},{type:"paragraph",text:"CartService \u0647\u0648 \u0642\u0644\u0628 \u0627\u0644\u0645\u062A\u062C\u0631 \u2014 \u064A\u064F\u062E\u0632\u0651\u0646 \u0627\u0644\u0633\u0644\u0629 \u0641\u064A Signals \u0648\u064A\u062D\u0641\u0638\u0647\u0627 \u0641\u064A localStorage \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0640 effect()."},{type:"code",code:`// features/cart/cart.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, CartItem } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart_items';

  // \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 localStorage \u0639\u0646\u062F \u0627\u0644\u0628\u062F\u0627\u064A\u0629
  private _items = signal<CartItem[]>(this.loadFromStorage());

  // \u2500\u2500 \u0645\u0627 \u064A\u064F\u0643\u0634\u0641 \u0644\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A \u2500\u2500
  readonly items      = this._items.asReadonly();
  readonly isEmpty    = computed(() => this._items().length === 0);
  readonly itemCount  = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  constructor() {
    // \u062D\u0641\u0638 \u062A\u0644\u0642\u0627\u0626\u064A \u0641\u064A localStorage \u0639\u0646\u062F \u0643\u0644 \u062A\u063A\u064A\u064A\u0631
    effect(() => {
      localStorage.setItem(this.KEY, JSON.stringify(this._items()));
    });
  }

  // \u2500\u2500 \u0627\u0644\u0623\u0641\u0639\u0627\u0644 \u2500\u2500

  add(product: Product): void {
    this._items.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        // \u0627\u0644\u0645\u0646\u062A\u062C \u0645\u0648\u062C\u0648\u062F \u2192 \u0632\u0650\u062F \u0627\u0644\u0643\u0645\u064A\u0629
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      // \u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F \u2192 \u0623\u0636\u0641\u0647 \u0644\u0644\u0633\u0644\u0629
      return [...items, { product, quantity: 1 }];
    });
  }

  remove(productId: number): void {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) { this.remove(productId); return; }
    this._items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clear(): void {
    this._items.set([]);
  }

  isInCart(productId: number): boolean {
    return this._items().some(i => i.product.id === productId);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }
}`},{type:"tip",text:"effect() \u064A\u064F\u0634\u063A\u064E\u0651\u0644 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0623\u064A \u062A\u063A\u064A\u064A\u0631 \u0641\u064A _items \u2014 \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621 localStorage.setItem \u0641\u064A \u0643\u0644 action \u064A\u062F\u0648\u064A\u0627\u064B."},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 4 \u2014 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0646\u062A\u062C (ProductCardComponent)"},{type:"paragraph",text:"\u0645\u0643\u0648\u0651\u0646 \u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0623\u064A \u0645\u0643\u0627\u0646 \u2014 \u064A\u0633\u062A\u0642\u0628\u0644 Product \u0648\u064A\u064F\u0631\u0633\u0644 \u062D\u062F\u062B addToCart."},{type:"code",code:`// features/products/product-card.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <div class="product-card">

      <!-- \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0646\u062A\u062C \u062A\u064F\u0648\u062C\u0651\u0647 \u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 -->
      <a [routerLink]="['/products', product().id]">
        <img [src]="product().imageUrl" [alt]="product().name" loading="lazy" />
      </a>

      <div class="card-body">
        <span class="category">{{ product().category }}</span>
        <h3>
          <a [routerLink]="['/products', product().id]">{{ product().name }}</a>
        </h3>

        <!-- \u0627\u0644\u062A\u0642\u064A\u064A\u0645 -->
        <div class="rating">
          \u2B50 {{ product().rating }} / 5
        </div>

        <div class="card-footer">
          <span class="price">{{ product().price | currency:'USD' }}</span>

          <!-- \u0632\u0631 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629 -->
          <button
            (click)="addToCart()"
            [class.in-cart]="inCart()"
            [disabled]="product().stock === 0"
          >
            {{ inCart() ? '\u2713 \u0641\u064A \u0627\u0644\u0633\u0644\u0629' : '+ \u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629' }}
          </button>
        </div>

        @if (product().stock === 0) {
          <p class="out-of-stock">\u0646\u0641\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646</p>
        }
      </div>
    </div>
  \`
})
export class ProductCardComponent {
  product = input.required<Product>();

  private cart = inject(CartService);

  // \u0645\u062D\u0633\u0648\u0628\u0629 \u2014 \u062A\u062A\u062D\u062F\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0633\u0644\u0629
  inCart = computed(() => this.cart.isInCart(this.product().id));

  addToCart() {
    this.cart.add(this.product());
  }
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 5 \u2014 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0645\u0639 \u0627\u0644\u0641\u0644\u062A\u0631\u0629"},{type:"paragraph",text:"\u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u062A\u062C\u0644\u0628 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0640 httpResource() \u0648\u062A\u064F\u0637\u0628\u0651\u0642 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0628\u0640 computed()."},{type:"code",code:`// features/products/products.component.ts
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { httpResource } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ProductCardComponent, CurrencyPipe],
  template: \`
    <div class="page">
      <h1>\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A</h1>

      <!-- \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0641\u0644\u062A\u0631\u0629 -->
      <div class="filters">
        <input
          [(ngModel)]="search"
          placeholder="\u{1F50D} \u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u062A\u062C..."
        />

        <select [(ngModel)]="selectedCategory">
          <option value="">\u0643\u0644 \u0627\u0644\u0641\u0626\u0627\u062A</option>
          @for (cat of categories(); track cat) {
            <option [value]="cat">{{ cat }}</option>
          }
        </select>

        <div class="price-filter">
          <label>\u0627\u0644\u0633\u0639\u0631 \u062D\u062A\u0649: {{ maxPrice() | currency:'USD':'symbol':'1.0-0' }}</label>
          <input
            type="range"
            [ngModel]="maxPrice()"
            (ngModelChange)="maxPrice.set($event)"
            min="0" max="1000"
          />
        </div>
      </div>

      <!-- \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 -->
      @if (allProducts.isLoading()) {
        <div class="products-grid">
          @for (_ of [1,2,3,4,5,6]; track $index) {
            <div class="skeleton-card"></div>
          }
        </div>
      }

      <!-- \u062D\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0623 -->
      @else if (allProducts.error()) {
        <p class="error">\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A. \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.</p>
      }

      <!-- \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A -->
      @else {
        <p class="results-count">{{ filteredProducts().length }} \u0645\u0646\u062A\u062C</p>
        <div class="products-grid">
          @for (p of filteredProducts(); track p.id) {
            <app-product-card [product]="p" />
          } @empty {
            <p class="empty">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A \u062A\u0637\u0627\u0628\u0642 \u0628\u062D\u062B\u0643</p>
          }
        </div>
      }
    </div>
  \`
})
export class ProductsComponent {
  // \u062C\u0644\u0628 \u0643\u0644 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u2014 \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0644\u0648 \u062A\u063A\u064A\u0651\u0631 \u0627\u0644\u0640 URL
  allProducts = httpResource<Product[]>('/api/products');

  // \u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0644\u062A\u0631\u0629
  search           = '';
  selectedCategory = '';
  maxPrice         = signal(1000);

  // \u0627\u0644\u0641\u0626\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u0631\u062C\u0629 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
  categories = computed(() => {
    const cats = this.allProducts.value()?.map(p => p.category) ?? [];
    return [...new Set(cats)].sort();
  });

  // \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0628\u0639\u062F \u062A\u0637\u0628\u064A\u0642 \u0643\u0644 \u0627\u0644\u0641\u0644\u0627\u062A\u0631
  filteredProducts = computed(() => {
    const products = this.allProducts.value() ?? [];
    const q        = this.search.toLowerCase().trim();
    return products.filter(p =>
      (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      p.price <= this.maxPrice()
    );
  });
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 6 \u2014 \u0635\u0641\u062D\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0646\u062A\u062C"},{type:"paragraph",text:"\u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0633\u062A\u0642\u0628\u0644 id \u0645\u0646 \u0627\u0644\u0640 URL \u0645\u0628\u0627\u0634\u0631\u0629\u064B \u0639\u0628\u0631 input() \u0648\u062A\u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u062C \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B."},{type:"code",code:`// features/products/product-detail.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a routerLink="/">\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A</a>
      @if (product.value()) {
        <span> / {{ product.value()!.name }}</span>
      }
    </nav>

    <!-- \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 -->
    @if (product.isLoading()) {
      <div class="skeleton-detail"></div>
    }

    <!-- \u062D\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0623 -->
    @else if (product.error()) {
      <p class="error">\u0627\u0644\u0645\u0646\u062A\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F. <a routerLink="/">\u0639\u0648\u062F\u0629 \u0644\u0644\u0645\u0646\u062A\u062C\u0627\u062A</a></p>
    }

    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0646\u062A\u062C -->
    @else if (product.value(); as p) {
      <div class="detail-layout">

        <div class="detail-image">
          <img [src]="p.imageUrl" [alt]="p.name" />
        </div>

        <div class="detail-info">
          <span class="category">{{ p.category }}</span>
          <h1>{{ p.name }}</h1>
          <div class="rating">\u2B50 {{ p.rating }} / 5</div>
          <p class="description">{{ p.description }}</p>

          <div class="price-row">
            <span class="price">{{ p.price | currency:'USD' }}</span>
            @if (p.stock > 0) {
              <span class="stock">{{ p.stock }} \u0645\u062A\u0648\u0641\u0631</span>
            } @else {
              <span class="out-of-stock">\u0646\u0641\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646</span>
            }
          </div>

          <button
            (click)="addToCart(p)"
            [class.in-cart]="inCart()"
            [disabled]="p.stock === 0"
            class="add-btn"
          >
            @if (inCart()) { \u2713 \u062A\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629 }
            @else          { + \u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629 }
          </button>

          <a routerLink="/cart" class="view-cart-link">
            \u0639\u0631\u0636 \u0627\u0644\u0633\u0644\u0629 ({{ cart.itemCount() }})
          </a>
        </div>

      </div>
    }
  \`
})
export class ProductDetailComponent {
  // id \u064A\u0623\u062A\u064A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 route parameter \u0628\u0641\u0636\u0644 withComponentInputBinding()
  id   = input.required<string>();
  cart = inject(CartService);

  // \u064A\u064F\u0639\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 id()
  product = httpResource<Product>(
    () => \`/api/products/\${this.id()}\`
  );

  inCart = computed(() =>
    this.cart.isInCart(Number(this.id()))
  );

  addToCart(p: Product) {
    this.cart.add(p);
  }
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 7 \u2014 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0633\u0644\u0629 \u0641\u064A \u0627\u0644\u0640 Navbar"},{type:"paragraph",text:"\u0623\u0636\u0641 Navbar \u0628\u0633\u064A\u0637\u0627\u064B \u0641\u064A AppComponent \u064A\u0639\u0631\u0636 \u0639\u062F\u062F \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0641\u064A \u0627\u0644\u0633\u0644\u0629."},{type:"code",code:`// app.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CartService } from './features/cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: \`
    <!-- Navbar \u062B\u0627\u0628\u062A \u0641\u064A \u0627\u0644\u0623\u0639\u0644\u0649 -->
    <header class="navbar">
      <a routerLink="/" class="logo">\u{1F6CD}\uFE0F \u0645\u062A\u062C\u0631\u064A</a>

      <nav class="nav-links">
        <a routerLink="/">\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A</a>
      </nav>

      <!-- \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0633\u0644\u0629 \u0645\u0639 \u0639\u062F\u0627\u062F -->
      <a routerLink="/cart" class="cart-icon">
        \u{1F6D2}
        @if (cart.itemCount() > 0) {
          <span class="cart-badge">{{ cart.itemCount() }}</span>
        }
        <!-- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0639\u0631 -->
        @if (!cart.isEmpty()) {
          <span class="cart-total">{{ cart.totalPrice() | number:'1.2-2' }} $</span>
        }
      </a>
    </header>

    <!-- \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 -->
    <main class="app-main">
      <router-outlet />
    </main>
  \`
})
export class AppComponent {
  cart = inject(CartService);
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 8 \u2014 \u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0644\u0629 \u0648\u0627\u0644\u062F\u0641\u0639"},{type:"paragraph",text:"\u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0644\u0629 \u062A\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0648\u062A\u064F\u062A\u064A\u062D \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u062D\u0630\u0641\u060C \u0648\u0635\u0641\u062D\u0629 \u0627\u0644\u062F\u0641\u0639 \u062A\u064F\u0643\u0645\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0629."},{type:"code",code:`// features/cart/cart.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <h1>\u0633\u0644\u0629 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A</h1>

    @if (cart.isEmpty()) {
      <!-- \u0633\u0644\u0629 \u0641\u0627\u0631\u063A\u0629 -->
      <div class="empty-cart">
        <p>\u{1F6D2} \u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063A\u0629</p>
        <a routerLink="/" class="btn-primary">\u062A\u0633\u0648\u0651\u0642 \u0627\u0644\u0622\u0646</a>
      </div>

    } @else {
      <!-- \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0633\u0644\u0629 -->
      <div class="cart-items">
        @for (item of cart.items(); track item.product.id) {
          <div class="cart-item">
            <img [src]="item.product.imageUrl" [alt]="item.product.name" />

            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <span class="item-price">{{ item.product.price | currency:'USD' }}</span>
            </div>

            <!-- \u0627\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u0627\u0644\u0643\u0645\u064A\u0629 -->
            <div class="quantity-ctrl">
              <button (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">\u2212</button>
              <span>{{ item.quantity }}</span>
              <button (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
            </div>

            <!-- \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0644\u0644\u0639\u0646\u0635\u0631 -->
            <span class="item-total">
              {{ item.product.price * item.quantity | currency:'USD' }}
            </span>

            <!-- \u062D\u0630\u0641 -->
            <button (click)="cart.remove(item.product.id)" class="remove-btn">\u2715</button>
          </div>
        }
      </div>

      <!-- \u0645\u0644\u062E\u0635 \u0627\u0644\u0637\u0644\u0628 -->
      <div class="cart-summary">
        <div class="summary-row">
          <span>\u0639\u062F\u062F \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A</span>
          <span>{{ cart.itemCount() }}</span>
        </div>
        <div class="summary-row total">
          <span>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</span>
          <strong>{{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>

        <a routerLink="/checkout" class="btn-checkout">
          \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621 \u2190
        </a>
        <button (click)="cart.clear()" class="btn-clear">
          \u0625\u0641\u0631\u0627\u063A \u0627\u0644\u0633\u0644\u0629
        </button>
      </div>
    }
  \`
})
export class CartComponent {
  cart = inject(CartService);
}`},{type:"code",code:`// features/checkout/checkout.component.ts
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: \`
    <h1>\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621</h1>

    @if (orderPlaced()) {
      <!-- \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0646\u062C\u0627\u062D \u0628\u0639\u062F \u0627\u0644\u0637\u0644\u0628 -->
      <div class="success-msg">
        <h2>\u2705 \u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0637\u0644\u0628\u0643!</h2>
        <p>\u0633\u064A\u0635\u0644\u0643 \u062E\u0644\u0627\u0644 3-5 \u0623\u064A\u0627\u0645 \u0639\u0645\u0644.</p>
        <button (click)="goHome()">\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u062A\u0633\u0648\u0642</button>
      </div>

    } @else {
      <!-- \u0645\u0644\u062E\u0635 \u0633\u0631\u064A\u0639 \u0644\u0644\u0633\u0644\u0629 -->
      <div class="order-summary">
        <h3>\u0645\u0644\u062E\u0635 \u0627\u0644\u0637\u0644\u0628</h3>
        @for (item of cart.items(); track item.product.id) {
          <div class="summary-item">
            <span>{{ item.product.name }} \xD7 {{ item.quantity }}</span>
            <span>{{ item.product.price * item.quantity | currency:'USD' }}</span>
          </div>
        }
        <div class="summary-total">
          <strong>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: {{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>
      </div>

      <!-- \u0646\u0645\u0648\u0630\u062C \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062D\u0646 -->
      <form [formGroup]="form" (ngSubmit)="placeOrder()">
        <h3>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u062D\u0646</h3>

        <label>\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644
          <input formControlName="name" placeholder="\u0623\u062D\u0645\u062F \u0645\u062D\u0645\u062F" />
        </label>

        <label>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A
          <input formControlName="email" type="email" placeholder="example@mail.com" />
        </label>

        <label>\u0627\u0644\u0639\u0646\u0648\u0627\u0646
          <textarea formControlName="address" placeholder="\u0627\u0644\u0645\u062F\u064A\u0646\u0629\u060C \u0627\u0644\u0634\u0627\u0631\u0639\u060C \u0631\u0642\u0645 \u0627\u0644\u0645\u0628\u0646\u0649"></textarea>
        </label>

        <label>\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641
          <input formControlName="phone" placeholder="+20 1xx xxx xxxx" />
        </label>

        <button type="submit" [disabled]="form.invalid || isLoading()">
          {{ isLoading() ? '\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0623\u0643\u064A\u062F...' : '\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628' }}
        </button>
      </form>
    }
  \`
})
export class CheckoutComponent {
  cart      = inject(CartService);
  fb        = inject(FormBuilder);
  router    = inject(Router);

  orderPlaced = signal(false);
  isLoading   = signal(false);

  form = this.fb.nonNullable.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone:   ['', Validators.required],
  });

  placeOrder() {
    if (this.form.invalid) return;
    this.isLoading.set(true);

    // \u0645\u062D\u0627\u0643\u0627\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0640 API
    setTimeout(() => {
      this.cart.clear();         // \u0625\u0641\u0631\u0627\u063A \u0627\u0644\u0633\u0644\u0629 \u0628\u0639\u062F \u0627\u0644\u0637\u0644\u0628
      this.isLoading.set(false);
      this.orderPlaced.set(true);
    }, 1500);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}`},{type:"tip",text:'\u0641\u064A \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062D\u0642\u064A\u0642\u064A\u060C \u0627\u0633\u062A\u0628\u062F\u0644 setTimeout \u0628\u0640 this.http.post("/api/orders", orderData) \u062B\u0645 \u0627\u0634\u062A\u0631\u0643 \u0641\u064A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0644\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628 \u0642\u0628\u0644 \u0625\u0641\u0631\u0627\u063A \u0627\u0644\u0633\u0644\u0629.'},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u0646\u0633\u062A\u062E\u062F\u0645 httpResource() \u0628\u062F\u0644\u0627\u064B \u0645\u0646 ngOnInit + subscribe \u0641\u064A \u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644\u061F",answer:"httpResource() \u064A\u064F\u0639\u064A\u062F \u0627\u0644\u0637\u0644\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 id(). \u0644\u0648 \u062A\u0646\u0642\u0651\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0645\u0646\u062A\u062C \u0644\u0622\u062E\u0631 \u0628\u062F\u0648\u0646 \u0645\u063A\u0627\u062F\u0631\u0629 \u0627\u0644\u0635\u0641\u062D\u0629\u060C \u064A\u064F\u062D\u0645\u0651\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0641\u0648\u0631\u0627\u064B. \u0645\u0639 ngOnInit \u062A\u062D\u062A\u0627\u062C subscribe \u064A\u062F\u0648\u064A \u0644\u0640 ActivatedRoute.params \u0644\u062A\u062D\u0642\u064A\u0642 \u0646\u0641\u0633 \u0627\u0644\u0633\u0644\u0648\u0643."},{type:"qa",question:"\u0643\u064A\u0641 \u062A\u0645\u0646\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0646 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062F\u0641\u0639 \u0648\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063A\u0629\u061F",answer:'\u0623\u0646\u0634\u0626 guard \u0628\u0633\u064A\u0637: export const cartNotEmptyGuard: CanActivateFn = () => { const cart = inject(CartService); const router = inject(Router); return cart.isEmpty() ? router.createUrlTree(["/cart"]) : true; }. \u062B\u0645 \u0623\u0636\u0641\u0647 \u0644\u0645\u0633\u0627\u0631 checkout: canActivate: [cartNotEmptyGuard].'}],contentEn:[{type:"heading",text:"Step 1 \u2014 Create Project and Routing"},{type:"paragraph",text:"Create the project and define the four core routes of the store."},{type:"code",code:`# Create the project
ng new ecommerce-app --standalone --routing --style=css
cd ecommerce-app`},{type:"code",code:`// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home \u2192 product listing
  {
    path: '',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  // Product detail
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  // Cart page
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component')
      .then(m => m.CartComponent)
  },
  // Checkout page
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutComponent)
  },
  { path: '**', redirectTo: '' }
];`},{type:"code",code:`// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // withComponentInputBinding lets route params bind to input() directly
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
  ]
};`},{type:"heading",text:"Step 2 \u2014 Define Product and CartItem Types"},{type:"paragraph",text:"Define the types first so all code benefits from TypeScript."},{type:"code",code:`// shared/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}`},{type:"heading",text:"Step 3 \u2014 Build CartService"},{type:"paragraph",text:"CartService is the heart of the store \u2014 it keeps the cart in Signals and auto-saves to localStorage with effect()."},{type:"code",code:`// features/cart/cart.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, CartItem } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart_items';

  private _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items      = this._items.asReadonly();
  readonly isEmpty    = computed(() => this._items().length === 0);
  readonly itemCount  = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  constructor() {
    // Auto-save to localStorage on every change
    effect(() => {
      localStorage.setItem(this.KEY, JSON.stringify(this._items()));
    });
  }

  add(product: Product): void {
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

  remove(productId: number): void {
    this._items.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) { this.remove(productId); return; }
    this._items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clear(): void { this._items.set([]); }

  isInCart(productId: number): boolean {
    return this._items().some(i => i.product.id === productId);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }
}`},{type:"tip",text:"effect() runs automatically on any change to _items \u2014 no need to manually call localStorage.setItem in every action."},{type:"heading",text:"Step 4 \u2014 Product Card Component"},{type:"paragraph",text:"A reusable component that works anywhere \u2014 receives a Product and shows an add-to-cart button."},{type:"code",code:`// features/products/product-card.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <div class="product-card">
      <a [routerLink]="['/products', product().id]">
        <img [src]="product().imageUrl" [alt]="product().name" loading="lazy" />
      </a>
      <div class="card-body">
        <span class="category">{{ product().category }}</span>
        <h3><a [routerLink]="['/products', product().id]">{{ product().name }}</a></h3>
        <div class="rating">\u2B50 {{ product().rating }} / 5</div>
        <div class="card-footer">
          <span class="price">{{ product().price | currency:'USD' }}</span>
          <button
            (click)="addToCart()"
            [class.in-cart]="inCart()"
            [disabled]="product().stock === 0"
          >
            {{ inCart() ? '\u2713 In Cart' : '+ Add to Cart' }}
          </button>
        </div>
        @if (product().stock === 0) {
          <p class="out-of-stock">Out of stock</p>
        }
      </div>
    </div>
  \`
})
export class ProductCardComponent {
  product = input.required<Product>();
  private cart = inject(CartService);
  inCart  = computed(() => this.cart.isInCart(this.product().id));
  addToCart() { this.cart.add(this.product()); }
}`},{type:"heading",text:"Step 5 \u2014 Products Page with Filtering"},{type:"paragraph",text:"The products page fetches data with httpResource() and applies filtering with computed()."},{type:"code",code:`// features/products/products.component.ts
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { httpResource } from '@angular/common/http';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ProductCardComponent],
  template: \`
    <h1>Products</h1>

    <div class="filters">
      <input [(ngModel)]="search" placeholder="\u{1F50D} Search products..." />
      <select [(ngModel)]="selectedCategory">
        <option value="">All categories</option>
        @for (cat of categories(); track cat) {
          <option [value]="cat">{{ cat }}</option>
        }
      </select>
      <div class="price-filter">
        <label>Max price: \${{ maxPrice() }}</label>
        <input type="range" [ngModel]="maxPrice()" (ngModelChange)="maxPrice.set($event)" min="0" max="1000" />
      </div>
    </div>

    @if (allProducts.isLoading()) {
      <p>Loading...</p>
    } @else if (allProducts.error()) {
      <p class="error">Failed to load products.</p>
    } @else {
      <p class="results-count">{{ filteredProducts().length }} products</p>
      <div class="products-grid">
        @for (p of filteredProducts(); track p.id) {
          <app-product-card [product]="p" />
        } @empty {
          <p class="empty">No products match your search</p>
        }
      </div>
    }
  \`
})
export class ProductsComponent {
  allProducts      = httpResource<Product[]>('/api/products');
  search           = '';
  selectedCategory = '';
  maxPrice         = signal(1000);

  categories = computed(() => {
    const cats = this.allProducts.value()?.map(p => p.category) ?? [];
    return [...new Set(cats)].sort();
  });

  filteredProducts = computed(() => {
    const products = this.allProducts.value() ?? [];
    const q        = this.search.toLowerCase().trim();
    return products.filter(p =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      p.price <= this.maxPrice()
    );
  });
}`},{type:"heading",text:"Step 6 \u2014 Product Detail Page"},{type:"paragraph",text:"The detail page receives id from the URL via input() and auto-fetches product data."},{type:"code",code:`// features/products/product-detail.component.ts
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <nav class="breadcrumb">
      <a routerLink="/">Products</a>
      @if (product.value()) { <span> / {{ product.value()!.name }}</span> }
    </nav>

    @if (product.isLoading()) { <div class="skeleton-detail"></div> }
    @else if (product.error()) {
      <p class="error">Product not found. <a routerLink="/">Go back</a></p>
    }
    @else if (product.value(); as p) {
      <div class="detail-layout">
        <img [src]="p.imageUrl" [alt]="p.name" />
        <div class="detail-info">
          <span class="category">{{ p.category }}</span>
          <h1>{{ p.name }}</h1>
          <div class="rating">\u2B50 {{ p.rating }} / 5</div>
          <p>{{ p.description }}</p>
          <div class="price-row">
            <span class="price">{{ p.price | currency:'USD' }}</span>
            @if (p.stock > 0) { <span class="stock">{{ p.stock }} in stock</span> }
            @else              { <span class="out-of-stock">Out of stock</span> }
          </div>
          <button (click)="addToCart(p)" [class.in-cart]="inCart()" [disabled]="p.stock === 0">
            @if (inCart()) { \u2713 Added to Cart }
            @else          { + Add to Cart }
          </button>
          <a routerLink="/cart">View Cart ({{ cart.itemCount() }})</a>
        </div>
      </div>
    }
  \`
})
export class ProductDetailComponent {
  id   = input.required<string>(); // auto-bound from :id route param
  cart = inject(CartService);

  product = httpResource<Product>(() => \`/api/products/\${this.id()}\`);
  inCart  = computed(() => this.cart.isInCart(Number(this.id())));
  addToCart(p: Product) { this.cart.add(p); }
}`},{type:"heading",text:"Step 7 \u2014 Cart Icon in Navbar"},{type:"paragraph",text:"Add a simple Navbar in AppComponent that shows the cart item count."},{type:"code",code:`// app.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from './features/cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DecimalPipe],
  template: \`
    <header class="navbar">
      <a routerLink="/" class="logo">\u{1F6CD}\uFE0F My Store</a>

      <nav class="nav-links">
        <a routerLink="/">Products</a>
      </nav>

      <a routerLink="/cart" class="cart-icon">
        \u{1F6D2}
        @if (cart.itemCount() > 0) {
          <span class="cart-badge">{{ cart.itemCount() }}</span>
        }
        @if (!cart.isEmpty()) {
          <span class="cart-total">\${{ cart.totalPrice() | number:'1.2-2' }}</span>
        }
      </a>
    </header>

    <main class="app-main">
      <router-outlet />
    </main>
  \`
})
export class AppComponent {
  cart = inject(CartService);
}`},{type:"heading",text:"Step 8 \u2014 Cart Page and Checkout"},{type:"paragraph",text:"The cart page shows all items with quantity controls, and the checkout page completes the order."},{type:"code",code:`// features/cart/cart.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  template: \`
    <h1>Shopping Cart</h1>

    @if (cart.isEmpty()) {
      <div class="empty-cart">
        <p>\u{1F6D2} Your cart is empty</p>
        <a routerLink="/" class="btn-primary">Shop Now</a>
      </div>
    } @else {
      <div class="cart-items">
        @for (item of cart.items(); track item.product.id) {
          <div class="cart-item">
            <img [src]="item.product.imageUrl" [alt]="item.product.name" />
            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <span>{{ item.product.price | currency:'USD' }}</span>
            </div>
            <div class="quantity-ctrl">
              <button (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">\u2212</button>
              <span>{{ item.quantity }}</span>
              <button (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
            </div>
            <span class="item-total">{{ item.product.price * item.quantity | currency:'USD' }}</span>
            <button (click)="cart.remove(item.product.id)" class="remove-btn">\u2715</button>
          </div>
        }
      </div>

      <div class="cart-summary">
        <div class="summary-row total">
          <span>Total</span>
          <strong>{{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>
        <a routerLink="/checkout" class="btn-checkout">Proceed to Checkout \u2192</a>
        <button (click)="cart.clear()" class="btn-clear">Clear Cart</button>
      </div>
    }
  \`
})
export class CartComponent {
  cart = inject(CartService);
}`},{type:"code",code:`// features/checkout/checkout.component.ts
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: \`
    <h1>Checkout</h1>

    @if (orderPlaced()) {
      <div class="success-msg">
        <h2>\u2705 Order Confirmed!</h2>
        <p>Your order will arrive in 3\u20135 business days.</p>
        <button (click)="goHome()">Continue Shopping</button>
      </div>
    } @else {
      <div class="order-summary">
        <h3>Order Summary</h3>
        @for (item of cart.items(); track item.product.id) {
          <div class="summary-item">
            <span>{{ item.product.name }} \xD7 {{ item.quantity }}</span>
            <span>{{ item.product.price * item.quantity | currency:'USD' }}</span>
          </div>
        }
        <div class="summary-total">
          <strong>Total: {{ cart.totalPrice() | currency:'USD' }}</strong>
        </div>
      </div>

      <form [formGroup]="form" (ngSubmit)="placeOrder()">
        <h3>Shipping Details</h3>
        <label>Full Name    <input formControlName="name" /></label>
        <label>Email        <input formControlName="email" type="email" /></label>
        <label>Address      <textarea formControlName="address"></textarea></label>
        <label>Phone        <input formControlName="phone" /></label>
        <button type="submit" [disabled]="form.invalid || isLoading()">
          {{ isLoading() ? 'Placing order...' : 'Place Order' }}
        </button>
      </form>
    }
  \`
})
export class CheckoutComponent {
  cart     = inject(CartService);
  fb       = inject(FormBuilder);
  router   = inject(Router);

  orderPlaced = signal(false);
  isLoading   = signal(false);

  form = this.fb.nonNullable.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone:   ['', Validators.required],
  });

  placeOrder() {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    // Replace setTimeout with this.http.post('/api/orders', ...) in production
    setTimeout(() => {
      this.cart.clear();
      this.isLoading.set(false);
      this.orderPlaced.set(true);
    }, 1500);
  }

  goHome() { this.router.navigate(['/']); }
}`},{type:"tip",text:'In production, replace setTimeout with this.http.post("/api/orders", orderData) and only call cart.clear() after a successful API response.'},{type:"qa",question:"Why use httpResource() instead of ngOnInit + subscribe on the detail page?",answer:"httpResource() automatically re-fetches when id() changes. If the user navigates from one product to another without leaving the page, it loads new data instantly. With ngOnInit you would need to manually subscribe to ActivatedRoute.params to achieve the same behavior."},{type:"qa",question:"How do you prevent access to the checkout page when the cart is empty?",answer:'Create a simple guard: export const cartNotEmptyGuard: CanActivateFn = () => { const cart = inject(CartService); const router = inject(Router); return cart.isEmpty() ? router.createUrlTree(["/cart"]) : true; }. Then add it to the checkout route: canActivate: [cartNotEmptyGuard].'}]};export{t as default};
