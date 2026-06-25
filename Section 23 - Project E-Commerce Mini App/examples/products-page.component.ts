// products-page.component.ts
// Product grid page — fetches from DummyJSON API using httpResource

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ProductsApiResponse, Product } from '../models/product.model';
import { CartService } from '../cart.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="products-page">
      <!-- Page header -->
      <div class="products-page__header">
        <h1 class="products-page__title">Shop</h1>
        <a class="cart-btn" routerLink="/cart">
          🛒 Cart
          @if (cartService.itemCount() > 0) {
            <span class="cart-btn__badge">{{ cartService.itemCount() }}</span>
          }
        </a>
      </div>

      <!-- Controls -->
      <div class="products-page__controls">
        <input
          class="search-input"
          type="search"
          placeholder="Search products…"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearch($event)"
        />

        <select class="filter-select" [(ngModel)]="selectedCategory">
          <option value="">All categories</option>
          @for (cat of categories(); track cat) {
            <option [value]="cat">{{ cat }}</option>
          }
        </select>

        <span class="products-page__count">
          {{ filteredProducts().length }} products
        </span>
      </div>

      <!-- Loading -->
      @if (productsResource.isLoading()) {
        <div class="products-page__grid">
          @for (n of skeletons; track n) {
            <div class="skeleton-card"></div>
          }
        </div>
      }

      <!-- Error -->
      @if (productsResource.error()) {
        <div class="error-state">
          <p>Failed to load products.</p>
          <button class="btn btn--primary" (click)="productsResource.reload()">
            Try Again
          </button>
        </div>
      }

      <!-- Grid -->
      @if (!productsResource.isLoading() && !productsResource.error()) {
        <div class="products-page__grid">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card
              [product]="product"
              [inCart]="cartService.isInCart(product.id)"
              (addToCart)="addToCart(product)"
            />
          } @empty {
            <p class="no-results">No products match your search.</p>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .products-page { max-width: 1200px; margin: 0 auto; padding: 24px; }

    .products-page__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .products-page__title { margin: 0; font-size: 2rem; color: #1e293b; }

    .cart-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 18px;
      background: #6366f1;
      color: white;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .cart-btn__badge {
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 99px;
    }

    .products-page__controls {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .search-input,
    .filter-select {
      padding: 10px 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.875rem;
      outline: none;
    }

    .search-input { flex: 1; min-width: 200px; }
    .search-input:focus, .filter-select:focus { border-color: #6366f1; }

    .products-page__count { color: #64748b; font-size: 0.875rem; margin-left: auto; }

    .products-page__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
    }

    .skeleton-card {
      height: 320px;
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 200%;
      border-radius: 12px;
      animation: shimmer 1.4s infinite;
    }

    @keyframes shimmer {
      from { background-position: 200% 0; }
      to   { background-position: -200% 0; }
    }

    .error-state {
      padding: 60px;
      text-align: center;
      color: #dc2626;
    }

    .no-results { grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px; }

    .btn { padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-weight: 500; }
    .btn--primary { background: #6366f1; color: white; }
  `]
})
export class ProductsPageComponent {
  readonly cartService = inject(CartService);

  searchTerm       = '';
  selectedCategory = '';
  readonly skeletons = Array.from({ length: 8 }, (_, i) => i);

  // Reactive search signal feeds into httpResource URL
  private readonly searchSignal = signal('');

  readonly productsResource = httpResource<ProductsApiResponse>(
    () => `https://dummyjson.com/products/search?q=${this.searchSignal()}&limit=30`
  );

  readonly categories = computed(() => {
    const products = this.productsResource.value()?.products ?? [];
    return [...new Set(products.map(p => p.category))].sort();
  });

  readonly filteredProducts = computed<Product[]>(() => {
    const products = this.productsResource.value()?.products ?? [];
    const cat = this.selectedCategory;
    return cat ? products.filter(p => p.category === cat) : products;
  });

  onSearch(term: string): void {
    this.searchSignal.set(term.trim());
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }
}
