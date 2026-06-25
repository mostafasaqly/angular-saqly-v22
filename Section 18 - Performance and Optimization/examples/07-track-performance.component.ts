/**
 * Section 18 — Example 07: track in @for — Identity vs Property
 *
 * Angular v22 requires a track expression on every @for loop.
 * The track value tells Angular how to identify each item across
 * renders, so it can efficiently add, remove, and reorder DOM nodes.
 *
 * Three patterns:
 *   track item           — by object reference (identity)
 *   track item.id        — by a stable unique property (RECOMMENDED)
 *   track $index         — by position (avoid for dynamic lists)
 */

import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed, DestroyRef } from '@angular/core/rxjs-interop';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// ---------------------------------------------------------------------------
// Pattern 1: track by object reference (track item)
// Use when: the same object references persist across re-renders
//           (e.g., items added to a local signal array)
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-local-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Local List (track by reference)</h3>
    @for (item of localItems(); track item) {
      <!--
        track item → Angular compares by === object reference.
        Works correctly here because addItem() appends a NEW object
        and never recreates existing ones.
        Angular sees: [ref1, ref2] → [ref1, ref2, ref3]
        Action: only creates the DOM node for ref3.
      -->
      <p>{{ item.name }}</p>
    }
    <button (click)="addItem()">Add Item</button>
  `,
})
export class LocalListComponent {
  localItems = signal<Product[]>([
    { id: 1, name: 'Widget A', price: 10, category: 'tools' },
    { id: 2, name: 'Widget B', price: 20, category: 'tools' },
  ]);

  addItem(): void {
    const id = this.localItems().length + 1;
    // update() preserves existing object references and appends a new one.
    this.localItems.update(list => [
      ...list,
      { id, name: `Widget ${String.fromCharCode(64 + id)}`, price: id * 10, category: 'tools' },
    ]);
  }
}

// ---------------------------------------------------------------------------
// Pattern 2: track by stable unique property (RECOMMENDED for API data)
// Use when: items come from an HTTP API (objects are recreated on each fetch)
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-api-product-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>API Products (track by id — recommended)</h3>

    <button (click)="refresh()">Refresh (re-fetches data)</button>

    @for (product of products(); track product.id) {
      <!--
        track product.id → Angular matches items by their .id property.
        When refresh() is called, the entire array is replaced with NEW
        objects from the API, but Angular correlates them by id:

        Before refresh: [{id:1, name:'Laptop'}, {id:2, name:'Mouse'}]
        After refresh:  [{id:1, name:'Laptop'}, {id:2, name:'Mouse'}, {id:3, name:'Monitor'}]

        Angular sees: id:1 exists → update props | id:2 exists → update props | id:3 new → create DOM

        WITHOUT track product.id (or with track $index):
          Angular would destroy ALL DOM nodes and recreate them → 6 DOM ops for 3 items
        WITH track product.id:
          Angular only creates 1 new DOM node → 1 DOM op
      -->
      <div class="product-row">
        <span>{{ product.id }}</span>
        <span>{{ product.name }}</span>
        <span>{{ product.price | currency }}</span>
      </div>
    }

    @if (products().length === 0) {
      <p>Loading...</p>
    }
  `,
})
export class ApiProductListComponent {
  products = signal<Product[]>([]);
  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);

  constructor() {
    this.refresh();
  }

  refresh(): void {
    // Simulated API call — in production: this.http.get<Product[]>('/api/products')
    // Each call returns NEW object instances (even if the data is the same).
    // Without track product.id, Angular couldn't correlate old and new objects.
    const mockProducts: Product[] = [
      { id: 1, name: 'Laptop',  price: 999,  category: 'electronics' },
      { id: 2, name: 'Mouse',   price: 29,   category: 'accessories' },
      { id: 3, name: 'Monitor', price: 399,  category: 'electronics' },
    ];
    // Simulate slight delay
    setTimeout(() => this.products.set(mockProducts), 100);
  }
}

// ---------------------------------------------------------------------------
// Pattern 3: track by $index (LAST RESORT)
// Use only when: items have no unique identifier AND the list never reorders
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-static-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Static list (track by $index)</h3>
    @for (label of staticLabels; track $index) {
      <!--
        track $index is acceptable here ONLY because:
          1. staticLabels is a plain string array (no unique id property)
          2. The array is never sorted or reordered
          3. Items are only added at the END

        If we sorted or spliced from the middle, $index tracking would
        cause Angular to incorrectly reuse DOM nodes (bugs + performance hit).
      -->
      <li>{{ label }}</li>
    }
  `,
})
export class StaticListComponent {
  // Static, never-reordered array of strings — acceptable for $index tracking
  readonly staticLabels = ['Alpha', 'Beta', 'Gamma', 'Delta'];
}

// ---------------------------------------------------------------------------
// Comparison component — shows the DOM operation count difference
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-track-comparison',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Track Performance Comparison</h2>

    <div class="grid">
      <div>
        <h3>With track product.id (GOOD)</h3>
        @for (p of apiProducts(); track p.id) {
          <div class="row">{{ p.name }}</div>
        }
        <button (click)="addOneProduct()">Add 1 product</button>
        <small>On add: 1 DOM create operation</small>
      </div>

      <div>
        <h3>With track $index (BAD for dynamic lists)</h3>
        @for (p of apiProducts(); track $index) {
          <div class="row">{{ p.name }}</div>
        }
        <button (click)="addOneProduct()">Add 1 product</button>
        <small>On add: technically correct here, but sorting breaks it</small>
      </div>
    </div>

    <button (click)="sortByName()">Sort by name (breaks $index tracking)</button>
    <small>After sort: track product.id → 0 DOM recreations | track $index → N DOM recreations</small>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .row { padding: 0.25rem; border-bottom: 1px solid #eee; }
  `],
})
export class TrackComparisonComponent {
  apiProducts = signal<Product[]>([
    { id: 1, name: 'Zebra Pen',   price: 5,  category: 'office' },
    { id: 2, name: 'Apple Juice', price: 3,  category: 'food' },
    { id: 3, name: 'Monitor',     price: 399, category: 'electronics' },
  ]);

  addOneProduct(): void {
    const id = Date.now(); // unique id
    this.apiProducts.update(list => [
      ...list,
      { id, name: `New Product ${list.length + 1}`, price: 99, category: 'misc' },
    ]);
  }

  sortByName(): void {
    // Reorders existing items — track $index would now be WRONG because
    // the index no longer matches the item that was there before.
    // track product.id handles this correctly.
    this.apiProducts.update(list =>
      [...list].sort((a, b) => a.name.localeCompare(b.name))
    );
  }
}

// Add missing import
import { CurrencyPipe } from '@angular/common';
