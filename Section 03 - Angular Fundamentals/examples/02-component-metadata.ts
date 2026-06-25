/**
 * Example 02 — Component Metadata
 * -------------------------------------------------------
 * Demonstrates all the most important @Component decorator
 * fields you'll use in real Angular v22 applications.
 *
 * Key concepts:
 *  - selector (element selector)
 *  - standalone: true
 *  - templateUrl vs inline template
 *  - styleUrl vs inline styles
 *  - imports (other components/directives/pipes)
 *  - changeDetection
 *  - encapsulation
 *
 * This file uses inline template/styles for self-containment.
 * In a real project you'd split into .html and .css files.
 */

import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

// ─── Supporting Interface ───────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
}

// ─── Child component (imported by ProductCardComponent below) ───────────────

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge">NEW</span>`,
  styles: [`.badge { background: #ff4081; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; }`],
})
export class BadgeComponent {}

// ─── Main component demonstrating metadata fields ───────────────────────────

@Component({
  // IDENTITY
  selector: 'app-product-card',   // <app-product-card /> in parent templates

  // STANDALONE — no NgModule; manage own dependencies
  standalone: true,

  // IMPORTS — every component/directive/pipe used in THIS template
  imports: [
    BadgeComponent,  // our own child component
    DatePipe,        // Angular built-in pipe: {{ date | date:'mediumDate' }}
    CurrencyPipe,    // Angular built-in pipe: {{ price | currency }}
  ],

  // CHANGE DETECTION — OnPush is the v22 default
  changeDetection: ChangeDetectionStrategy.OnPush,

  // VIEW ENCAPSULATION — Emulated is the default (scoped styles via attributes)
  encapsulation: ViewEncapsulation.Emulated,

  // INLINE TEMPLATE (in real projects, prefer templateUrl: './product-card.html')
  template: `
    <div class="card">
      <div class="card-header">
        <h2>{{ product().name }}</h2>
        @if (isNew()) {
          <app-badge />
        }
      </div>
      <p class="price">{{ product().price | currency }}</p>
      <p class="date">Added: {{ product().createdAt | date:'mediumDate' }}</p>
      <p class="summary">{{ summary() }}</p>
    </div>
  `,

  // INLINE STYLES (in real projects, prefer styleUrl: './product-card.css')
  styles: [`
    :host { display: block; }

    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1rem;
      max-width: 320px;
      font-family: 'Segoe UI', sans-serif;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    h2 { margin: 0; color: #212121; }
    .price { font-size: 1.25rem; color: #3f51b5; font-weight: bold; }
    .date { color: #757575; font-size: 0.85rem; }
    .summary { color: #424242; }
  `],
})
export class ProductCardComponent {
  product = signal<Product>({
    id: 1,
    name: 'Angular v22 In Action',
    price: 49.99,
    createdAt: new Date(),
  });

  // computed() derives a value from other signals — recalculates only when
  // the dependencies (product signal) change.
  summary = computed(() =>
    `${this.product().name} costs $${this.product().price.toFixed(2)}.`
  );

  // A product added within the last 7 days is considered "new"
  isNew = computed(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return this.product().createdAt.getTime() > sevenDaysAgo;
  });
}

/*
 * REAL-WORLD PATTERN:
 * ─────────────────────────────────────────────────────────────
 * In a real project, split the component across files:
 *
 * @Component({
 *   selector: 'app-product-card',
 *   standalone: true,
 *   imports: [BadgeComponent, DatePipe, CurrencyPipe],
 *   changeDetection: ChangeDetectionStrategy.OnPush,
 *   templateUrl: './product-card.html',   // <-- external HTML
 *   styleUrl: './product-card.css',       // <-- external CSS
 * })
 * export class ProductCardComponent { ... }
 *
 * The @Component metadata is the same — only where the
 * template and styles live changes.
 */
