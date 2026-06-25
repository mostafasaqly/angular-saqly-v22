// product-list.component.ts
// Product list with httpResource, search, filter, and delete

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="product-list">
      <!-- Toolbar -->
      <div class="product-list__toolbar">
        <h2 class="product-list__heading">Products</h2>

        <div class="product-list__controls">
          <!-- Search -->
          <input
            class="product-list__search"
            type="search"
            placeholder="Search products…"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearch($event)"
          />

          <!-- Category filter -->
          <select class="product-list__filter" [(ngModel)]="selectedCategory">
            <option value="">All categories</option>
            @for (cat of categories(); track cat) {
              <option [value]="cat">{{ cat }}</option>
            }
          </select>

          <!-- Add button -->
          <a class="btn btn--primary" routerLink="/products/new">+ Add Product</a>
        </div>
      </div>

      <!-- Loading -->
      @if (productsResource.isLoading()) {
        <div class="product-list__state">Loading products…</div>
      }

      <!-- Error -->
      @if (productsResource.error()) {
        <div class="product-list__state product-list__state--error">
          Failed to load products. <button (click)="productsResource.reload()">Retry</button>
        </div>
      }

      <!-- Table -->
      @if (!productsResource.isLoading() && !productsResource.error()) {
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (product of filteredProducts(); track product.id) {
                <tr>
                  <td>#{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td><span class="badge">{{ product.category }}</span></td>
                  <td>{{ product.price | currency }}</td>
                  <td [class.low-stock]="product.stock < 10">{{ product.stock }}</td>
                  <td class="actions">
                    <a [routerLink]="['/products', product.id, 'edit']" class="btn btn--sm">Edit</a>
                    <button class="btn btn--sm btn--danger" (click)="deleteProduct(product.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="6" class="empty">No products found.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <p class="product-list__count">
          Showing {{ filteredProducts().length }} of {{ productsResource.value()?.length ?? 0 }} products
        </p>
      }
    </section>
  `,
  styles: [`
    .product-list { display: flex; flex-direction: column; gap: 16px; }

    .product-list__toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    .product-list__heading { margin: 0; font-size: 1.4rem; color: #1e293b; }

    .product-list__controls { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }

    .product-list__search,
    .product-list__filter {
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.875rem;
      outline: none;
    }

    .product-list__search:focus,
    .product-list__filter:focus { border-color: #6366f1; }

    .product-list__state {
      padding: 40px;
      text-align: center;
      color: #64748b;
      background: white;
      border-radius: 12px;
    }

    .product-list__state--error { color: #dc2626; background: #fef2f2; }

    .table-wrapper {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    }

    .table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }

    .table th {
      padding: 12px 16px;
      text-align: left;
      background: #f8fafc;
      color: #64748b;
      font-weight: 600;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid #e2e8f0;
    }

    .table td {
      padding: 12px 16px;
      border-bottom: 1px solid #f1f5f9;
      color: #374151;
    }

    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: #f8fafc; }

    .badge {
      display: inline-block;
      background: #ede9fe;
      color: #7c3aed;
      padding: 2px 8px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .low-stock { color: #dc2626; font-weight: 600; }

    .actions { display: flex; gap: 8px; }

    .btn {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      border: none;
      transition: opacity 0.15s;
    }

    .btn:hover { opacity: 0.85; }

    .btn--primary { background: #6366f1; color: white; }
    .btn--sm { padding: 4px 10px; font-size: 0.8rem; background: #f1f5f9; color: #374151; }
    .btn--danger { background: #fee2e2; color: #dc2626; }

    .empty { text-align: center; padding: 32px; color: #94a3b8; }

    .product-list__count { font-size: 0.8rem; color: #64748b; margin: 0; }
  `]
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  // Local state signals
  searchTerm = '';
  selectedCategory = '';

  // Debounced search signal fed into httpResource
  private readonly searchSignal = signal('');

  // httpResource — re-fetches whenever searchSignal changes
  readonly productsResource = httpResource<Product[]>(
    () => `https://jsonplaceholder.typicode.com/posts?q=${this.searchSignal()}`
  );

  // Derive categories from loaded data
  readonly categories = computed(() => {
    const products = this.productsResource.value() ?? [];
    return [...new Set(products.map(p => p.category))].filter(Boolean);
  });

  // Client-side filter (search + category)
  readonly filteredProducts = computed(() => {
    const products = this.productsResource.value() ?? [];
    const term = this.searchTerm.toLowerCase();
    const cat  = this.selectedCategory;

    return products.filter(p => {
      const matchesSearch   = !term || p.name?.toLowerCase().includes(term);
      const matchesCategory = !cat  || p.category === cat;
      return matchesSearch && matchesCategory;
    });
  });

  onSearch(term: string): void {
    this.searchSignal.set(term);
  }

  deleteProduct(id: number): void {
    if (!confirm('Delete this product?')) return;

    this.productService.delete(id).subscribe({
      next: () => this.productsResource.reload(),
      error: err => console.error('Delete failed', err)
    });
  }
}
