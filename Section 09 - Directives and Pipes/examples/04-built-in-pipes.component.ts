/**
 * Section 9 — Example 04: Built-in Pipes
 *
 * Demonstrates:
 *  - DatePipe        — date formatting with format strings
 *  - CurrencyPipe    — localised money formatting
 *  - UpperCasePipe / LowerCasePipe / TitleCasePipe
 *  - DecimalPipe     — number formatting
 *  - PercentPipe
 *  - JsonPipe        — debug object display
 *  - SlicePipe       — array / string slicing
 *  - KeyValuePipe    — iterate object entries
 *  - AsyncPipe       — Observable / Promise unwrapping
 *
 * Angular v22 · standalone: true · OnPush
 */

import {
  Component,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import {
  DatePipe,
  CurrencyPipe,
  UpperCasePipe,
  LowerCasePipe,
  TitleCasePipe,
  DecimalPipe,
  PercentPipe,
  JsonPipe,
  SlicePipe,
  KeyValuePipe,
  AsyncPipe,
} from '@angular/common';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

// ─── Sample data ──────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  discount: number;  // 0–1
  createdAt: Date;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'angular pro licence', price: 199,  category: 'Software', stock: 50,  discount: 0.1,  createdAt: new Date('2025-03-15') },
  { id: 2, name: 'mechanical keyboard', price: 149.99, category: 'Hardware', stock: 12, discount: 0.25, createdAt: new Date('2026-01-07') },
  { id: 3, name: 'usb-c hub 10 port',  price: 59.5, category: 'Hardware', stock: 200, discount: 0,    createdAt: new Date('2026-05-20') },
  { id: 4, name: 'monitor stand',      price: 89.95, category: 'Hardware', stock: 0,   discount: 0.15, createdAt: new Date('2025-12-01') },
];

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-built-in-pipes-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    CurrencyPipe,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DecimalPipe,
    PercentPipe,
    JsonPipe,
    SlicePipe,
    KeyValuePipe,
    AsyncPipe,
  ],
  template: `
    <h2>Built-in Pipes</h2>

    <!-- ── Text transformation pipes ────────────────────── -->
    <section>
      <h3>Text pipes</h3>
      <table>
        <tr><th>Pipe</th><th>Input</th><th>Output</th></tr>
        <tr><td>uppercase</td>  <td>"{{ sample }}"</td>  <td>{{ sample | uppercase }}</td></tr>
        <tr><td>lowercase</td>  <td>"{{ sample }}"</td>  <td>{{ sample | lowercase }}</td></tr>
        <tr><td>titlecase</td>  <td>"{{ sample }}"</td>  <td>{{ sample | titlecase }}</td></tr>
      </table>
    </section>

    <!-- ── Date pipe ─────────────────────────────────────── -->
    <section>
      <h3>Date pipe</h3>
      <table>
        <tr><th>Format string</th><th>Result</th></tr>
        <tr><td>(default)</td>        <td>{{ now | date }}</td></tr>
        <tr><td>'short'</td>          <td>{{ now | date:'short' }}</td></tr>
        <tr><td>'shortDate'</td>      <td>{{ now | date:'shortDate' }}</td></tr>
        <tr><td>'mediumDate'</td>     <td>{{ now | date:'mediumDate' }}</td></tr>
        <tr><td>'longDate'</td>       <td>{{ now | date:'longDate' }}</td></tr>
        <tr><td>'fullDate'</td>       <td>{{ now | date:'fullDate' }}</td></tr>
        <tr><td>'HH:mm:ss'</td>       <td>{{ now | date:'HH:mm:ss' }}</td></tr>
        <tr><td>'dd MMM yyyy'</td>    <td>{{ now | date:'dd MMM yyyy' }}</td></tr>
        <tr><td>'EEEE, d MMMM y'</td> <td>{{ now | date:'EEEE, d MMMM y' }}</td></tr>
      </table>
    </section>

    <!-- ── Number / currency / percent pipes ─────────────── -->
    <section>
      <h3>Number pipes</h3>
      <table>
        <tr><th>Pipe</th><th>Input</th><th>Output</th></tr>
        <tr><td>number (default)</td>         <td>{{ bigNum }}</td>    <td>{{ bigNum | number }}</td></tr>
        <tr><td>number:'1.2-2'</td>           <td>{{ bigNum }}</td>    <td>{{ bigNum | number:'1.2-2' }}</td></tr>
        <tr><td>currency (USD)</td>           <td>{{ price }}</td>     <td>{{ price | currency }}</td></tr>
        <tr><td>currency:'EUR':'symbol'</td>  <td>{{ price }}</td>     <td>{{ price | currency:'EUR':'symbol' }}</td></tr>
        <tr><td>currency:'GBP':'code':'1.0-0'</td><td>{{ price }}</td><td>{{ price | currency:'GBP':'code':'1.0-0' }}</td></tr>
        <tr><td>percent</td>                  <td>{{ ratio }}</td>     <td>{{ ratio | percent }}</td></tr>
        <tr><td>percent:'1.1-1'</td>          <td>{{ ratio }}</td>     <td>{{ ratio | percent:'1.1-1' }}</td></tr>
      </table>
    </section>

    <!-- ── Product table using multiple pipes ────────────── -->
    <section>
      <h3>Products — combining pipes in a real table</h3>
      <table class="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Final price</th>
            <th>Stock</th>
            <th>Listed</th>
          </tr>
        </thead>
        <tbody>
          @for (p of products; track p.id) {
            <tr>
              <td>{{ p.id }}</td>
              <td>{{ p.name | titlecase }}</td>
              <td>{{ p.category | uppercase }}</td>
              <td>{{ p.price | currency:'USD':'symbol':'1.2-2' }}</td>
              <td>{{ p.discount | percent }}</td>
              <td>{{ p.price * (1 - p.discount) | currency }}</td>
              <td [style.color]="p.stock === 0 ? 'red' : 'inherit'">
                {{ p.stock | number }}{{ p.stock === 0 ? ' — out of stock' : '' }}
              </td>
              <td>{{ p.createdAt | date:'mediumDate' }}</td>
            </tr>
          }
        </tbody>
      </table>
    </section>

    <!-- ── Slice pipe ─────────────────────────────────────── -->
    <section>
      <h3>Slice pipe</h3>
      <p>Show first {{ visibleCount() }} products:</p>
      <ul>
        @for (p of products | slice:0:visibleCount(); track p.id) {
          <li>{{ p.name | titlecase }}</li>
        }
      </ul>
      <button (click)="visibleCount.update(n => Math.min(n + 1, products.length))">
        Show more
      </button>
    </section>

    <!-- ── KeyValue pipe ──────────────────────────────────── -->
    <section>
      <h3>KeyValue pipe — iterate an object</h3>
      <dl>
        @for (entry of metadata | keyvalue; track entry.key) {
          <dt>{{ entry.key }}</dt>
          <dd>{{ entry.value }}</dd>
        }
      </dl>
    </section>

    <!-- ── JSON pipe ──────────────────────────────────────── -->
    <section>
      <h3>JSON pipe — debug display</h3>
      <pre>{{ selectedProduct() | json }}</pre>
      <button (click)="pickRandom()">Pick random product</button>
    </section>

    <!-- ── Async pipe ─────────────────────────────────────── -->
    <section>
      <h3>Async pipe — Observable countdown</h3>
      <p>Seconds elapsed: <strong>{{ ticker$ | async }}</strong></p>
      <p>(Subscribed via async pipe — auto-unsubscribes on destroy)</p>
    </section>
  `,
  styles: [`
    section { margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { padding: 6px 12px; border: 1px solid #e5e7eb; text-align: left; font-size: 14px; }
    th { background: #f9fafb; }
    .product-table th { background: #1e293b; color: #fff; }
    pre { background: #1e293b; color: #e2e8f0; padding: 12px; border-radius: 6px; overflow: auto; font-size: 12px; }
    button { margin: 4px 4px 0 0; padding: 6px 12px; cursor: pointer; }
    dl { display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; }
    dt { font-weight: 700; }
  `],
})
export class BuiltInPipesDemoComponent {
  // Raw data
  sample   = 'hello angular world';
  now      = new Date();
  bigNum   = 1_234_567.891;
  price    = 1234.56;
  ratio    = 0.7542;
  products = PRODUCTS;

  metadata: Record<string, string> = {
    framework:  'Angular',
    version:    '22.0.0',
    releaseDate: '2026-06-03',
    renderer:   'Ivy',
    changeDetection: 'Signals + Zoneless',
  };

  // Signals
  visibleCount   = signal(2);
  selectedProduct = signal<Product | null>(null);

  // Async pipe source
  ticker$ = interval(1000).pipe(map(n => n + 1));

  // Expose Math so template can use Math.min
  readonly Math = Math;

  pickRandom(): void {
    const idx = Math.floor(Math.random() * this.products.length);
    this.selectedProduct.set(this.products[idx]);
  }
}
