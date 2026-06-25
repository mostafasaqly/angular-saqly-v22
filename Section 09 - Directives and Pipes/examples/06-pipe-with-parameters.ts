/**
 * Section 9 — Example 06: Pipes with Parameters
 *
 * Demonstrates:
 *  - Passing multiple parameters to transform()
 *  - Optional parameters with defaults
 *  - Pipes that return different types based on parameters
 *  - Chaining multiple parameterised pipes
 *  - Using signal-driven inputs as pipe arguments
 *
 * Angular v22 · standalone: true · OnPush
 */

import {
  Component,
  ChangeDetectionStrategy,
  Pipe,
  PipeTransform,
  signal,
  computed,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// ─── 1. FilterPipe — filter an array by a field value ────────────────────────

/**
 * Filters an array of objects by a field value.
 *
 * Usage:
 *   {{ items | filter:'category':'Hardware' }}
 *   {{ users  | filter:'role':'admin' }}
 *
 * NOTE: This pipe is intentionally impure for demo purposes.
 * In production, prefer filtering in the component class with computed().
 */
@Pipe({
  name: 'filter',
  standalone: true,
  pure: true,
})
export class FilterPipe implements PipeTransform {
  transform<T extends Record<string, unknown>>(
    items: T[] | null | undefined,
    field: keyof T,
    value: unknown
  ): T[] {
    if (!items) return [];
    if (value === '' || value === null || value === undefined) return items;
    return items.filter(item => item[field] === value);
  }
}

// ─── 2. SortPipe — sort an array by a field ──────────────────────────────────

/**
 * Sorts an array of objects by a given field and direction.
 *
 * Usage:
 *   {{ products | sort:'price' }}           → ascending by price
 *   {{ products | sort:'price':'desc' }}    → descending by price
 *   {{ products | sort:'name':'asc' }}      → ascending by name
 */
@Pipe({
  name: 'sort',
  standalone: true,
  pure: true,
})
export class SortPipe implements PipeTransform {
  transform<T>(
    items: T[] | null | undefined,
    field: keyof T,
    direction: 'asc' | 'desc' = 'asc'
  ): T[] {
    if (!items || items.length === 0) return [];
    const sorted = [...items].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }
}

// ─── 3. PadPipe — string padding with custom char ────────────────────────────

/**
 * Pads a string to a given length with a fill character.
 *
 * Usage:
 *   {{ '42' | pad:6 }}           → '000042'
 *   {{ '42' | pad:6:'*' }}       → '****42'
 *   {{ '42' | pad:6:'0':'end' }} → '420000'
 */
@Pipe({
  name: 'pad',
  standalone: true,
  pure: true,
})
export class PadPipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    targetLength: number,
    fillChar = '0',
    position: 'start' | 'end' = 'start'
  ): string {
    const str = String(value ?? '');
    if (position === 'start') return str.padStart(targetLength, fillChar);
    return str.padEnd(targetLength, fillChar);
  }
}

// ─── 4. HighlightPipe — highlight a search term in text ──────────────────────

/**
 * Wraps occurrences of a search term in a <mark> tag.
 * Returns an HTML string — use with [innerHTML] binding.
 *
 * Usage:
 *   <span [innerHTML]="text | highlight:query"></span>
 *   <span [innerHTML]="text | highlight:query:'bg-yellow'"></span>
 */
@Pipe({
  name: 'highlight',
  standalone: true,
  pure: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, term: string, cssClass = 'highlight'): string {
    if (!value) return '';
    if (!term?.trim()) return value;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex   = new RegExp(`(${escaped})`, 'gi');
    return value.replace(regex, `<mark class="${cssClass}">$1</mark>`);
  }
}

// ─── 5. MapPipe — pluck a field from each object in an array ─────────────────

/**
 * Maps an array of objects to an array of a single field's values.
 *
 * Usage:
 *   {{ products | map:'name' | json }}       → ["Product A", "Product B", ...]
 *   {{ products | map:'price' | json }}      → [199, 149.99, ...]
 */
@Pipe({
  name: 'pluck',
  standalone: true,
  pure: true,
})
export class PluckPipe implements PipeTransform {
  transform<T, K extends keyof T>(items: T[] | null | undefined, field: K): T[K][] {
    if (!items) return [];
    return items.map(item => item[field]);
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id:       number;
  name:     string;
  price:    number;
  category: 'Software' | 'Hardware' | 'Books';
  stock:    number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Pro Licence', price: 199,   category: 'Software', stock: 50  },
  { id: 2, name: 'Mechanical Keyboard',  price: 149.99, category: 'Hardware', stock: 12 },
  { id: 3, name: 'USB-C Hub 10 Port',    price: 59.5,  category: 'Hardware', stock: 200 },
  { id: 4, name: 'Monitor Stand',        price: 89.95, category: 'Hardware', stock: 0  },
  { id: 5, name: 'TypeScript Deep Dive', price: 39.99, category: 'Books',    stock: 999 },
  { id: 6, name: 'RxJS Cookbook',        price: 44.99, category: 'Books',    stock: 42  },
];

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-pipe-params-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FilterPipe, SortPipe, PadPipe, HighlightPipe, PluckPipe, CurrencyPipe],

  template: `
    <h2>Pipes with Parameters</h2>

    <!-- ── FilterPipe + SortPipe ──────────────────────────── -->
    <section>
      <h3>FilterPipe + SortPipe (chained)</h3>

      <div class="controls">
        <label>
          Category:
          <select (change)="category.set($any($event.target).value)">
            <option value="">All</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Books">Books</option>
          </select>
        </label>

        <label>
          Sort by:
          <select (change)="sortField.set($any($event.target).value)">
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </label>

        <label>
          Direction:
          <select (change)="sortDir.set($any($event.target).value)">
            <option value="asc">Ascending ↑</option>
            <option value="desc">Descending ↓</option>
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th></tr>
        </thead>
        <tbody>
          @for (
            p of products
              | filter:'category':category()
              | sort:sortField():sortDir();
            track p.id
          ) {
            <tr>
              <!-- PadPipe: zero-pad the ID to 4 digits -->
              <td><code>#{{ p.id | pad:4 }}</code></td>
              <!-- HighlightPipe: highlight search query in name -->
              <td [innerHTML]="p.name | highlight:searchQuery()"></td>
              <td>{{ p.category }}</td>
              <td>{{ p.price | currency }}</td>
              <td>{{ p.stock | pad:4:' ':'start' }}</td>
            </tr>
          }
        </tbody>
      </table>

      <label>
        Search (highlight):
        <input
          type="text"
          [value]="searchQuery()"
          (input)="searchQuery.set($any($event.target).value)"
          placeholder="Type to highlight…"
        />
      </label>
    </section>

    <!-- ── PadPipe demos ─────────────────────────────────── -->
    <section>
      <h3>PadPipe — string padding</h3>
      <table>
        <tr><th>Expression</th><th>Result</th></tr>
        <tr><td><code>{{ "'42' | pad:6" }}</code></td>       <td><code>{{ '42' | pad:6 }}</code></td></tr>
        <tr><td><code>{{ "'42' | pad:6:'*'" }}</code></td>   <td><code>{{ '42' | pad:6:'*' }}</code></td></tr>
        <tr><td><code>{{ "'42' | pad:6:'0':'end'" }}</code></td><td><code>{{ '42' | pad:6:'0':'end' }}</code></td></tr>
        <tr><td><code>{{ "'7' | pad:3" }}</code></td>        <td><code>{{ '7' | pad:3 }}</code></td></tr>
      </table>
    </section>

    <!-- ── PluckPipe ─────────────────────────────────────── -->
    <section>
      <h3>PluckPipe — extract a field from every item</h3>
      <p>Names: <code>{{ products | pluck:'name' | json }}</code></p>
      <p>Prices: <code>{{ products | pluck:'price' | json }}</code></p>
    </section>

    <!-- ── Signal-driven pipe arguments ─────────────────── -->
    <section>
      <h3>Signal-driven pipe arguments</h3>
      <p>
        The sort field (<strong>{{ sortField() }}</strong>)
        and direction (<strong>{{ sortDir() }}</strong>)
        are signals — when they change the pipe re-evaluates automatically.
      </p>
      <p>
        Total items after filter:
        <strong>{{ filteredCount() }}</strong>
      </p>
    </section>
  `,
  styles: [`
    section { margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; }
    .controls { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
    label { font-size: 14px; }
    select, input[type=text] { margin-left: 6px; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 8px; }
    th, td { padding: 6px 12px; border: 1px solid #e5e7eb; font-size: 14px; }
    th { background: #f9fafb; }
    code { font-family: monospace; background: #f1f5f9; padding: 2px 4px; border-radius: 3px; }
    mark.highlight { background: #fef08a; border-radius: 2px; }
  `],
})
export class PipeParamsDemoComponent {
  products = PRODUCTS;

  // Signal-driven pipe arguments
  category  = signal<string>('');
  sortField = signal<keyof Product>('name');
  sortDir   = signal<'asc' | 'desc'>('asc');
  searchQuery = signal('');

  // Computed value derived from the same logic as the pipe chain
  filteredCount = computed(() => {
    const cat = this.category();
    return cat
      ? this.products.filter(p => p.category === cat).length
      : this.products.length;
  });
}
