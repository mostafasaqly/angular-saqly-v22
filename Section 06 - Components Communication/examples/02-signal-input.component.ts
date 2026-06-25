/**
 * Section 6, Example 2 — Signal Inputs (Angular v22 Way)
 *
 * The modern alternative to @Input(). input() returns a Signal,
 * making inputs reactive and compatible with computed() and effect().
 *
 * Key concepts:
 *  - input<T>(defaultValue)          — optional signal input
 *  - input.required<T>()             — required signal input (no default)
 *  - input<T>(default, { alias })    — aliased signal input
 *  - input<T>(default, { transform }) — transform on input arrival
 *  - Read with name() in templates and TypeScript
 *  - Compose with computed() for derived reactive values
 */

import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// ------------------------------------------------------------------
// Shared types
// ------------------------------------------------------------------

export type Theme = 'light' | 'dark';

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
}

// ------------------------------------------------------------------
// Simple example: ProductBadge using signal inputs
// ------------------------------------------------------------------

@Component({
  selector: 'app-product-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div [class]="cardClass()">
      <h3>{{ name() }}</h3>
      <p class="price">{{ price() | currency }}</p>

      @if (discountPercent() > 0) {
        <span class="discount">-{{ discountPercent() }}%</span>
        <p class="sale-price">{{ salePrice() | currency }}</p>
      }

      @if (inStock()) {
        <span class="in-stock">In Stock</span>
      } @else {
        <span class="out-of-stock">Out of Stock</span>
      }
    </div>
  `,
})
export class ProductBadgeComponent {
  // Optional signal inputs — read as name(), price(), etc.
  name  = input<string>('Unknown Product');
  price = input<number>(0);
  theme = input<Theme>('light');

  // Required signal input — compiler errors if parent doesn't provide it
  inStock = input.required<boolean>();

  // Transform: lets parent pass discountPercent="20" as a string attribute
  discountPercent = input<number>(0, { transform: numberAttribute });

  // Aliased input: parent writes [is-featured]="true"
  isFeatured = input<boolean>(false, { alias: 'is-featured', transform: booleanAttribute });

  // Computed from signal inputs — fully reactive
  salePrice = computed(() => {
    const discount = this.discountPercent();
    return this.price() * (1 - discount / 100);
  });

  cardClass = computed(() => {
    const base = 'product-badge';
    const theme = `theme-${this.theme()}`;
    const featured = this.isFeatured() ? 'featured' : '';
    return [base, theme, featured].filter(Boolean).join(' ');
  });
}

// ------------------------------------------------------------------
// Advanced example: PricingCard showing computed + multiple inputs
// ------------------------------------------------------------------

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div class="pricing-card" [class.recommended]="isRecommended()">
      <h2>{{ tier().name }}</h2>
      <p class="price">{{ tier().price | currency }}/mo</p>

      @if (billingCycle() === 'annual') {
        <p class="annual-note">
          Billed annually: {{ annualTotal() | currency }}
        </p>
      }

      <ul>
        @for (feature of tier().features; track feature) {
          <li>{{ feature }}</li>
        }
      </ul>

      <button [class.cta]="isRecommended()">
        {{ ctaLabel() }}
      </button>
    </div>
  `,
})
export class PricingCardComponent {
  // Required — must be passed
  tier = input.required<PricingTier>();

  // Optional with defaults
  billingCycle  = input<'monthly' | 'annual'>('monthly');
  isRecommended = input<boolean>(false, { transform: booleanAttribute });
  ctaText       = input<string>('');

  // Computed label: use ctaText if provided, otherwise derive from tier
  ctaLabel = computed(() => {
    const custom = this.ctaText();
    if (custom) return custom;
    const tierName = this.tier().name;
    return tierName === 'Free' ? 'Get Started Free' : `Start ${tierName}`;
  });

  // Computed from two signal inputs
  annualTotal = computed(() => this.tier().price * 12 * 0.9); // 10% annual discount
}

// ------------------------------------------------------------------
// Parent component wiring both children
// ------------------------------------------------------------------

@Component({
  selector: 'app-signal-input-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductBadgeComponent, PricingCardComponent],
  template: `
    <h1>Signal Inputs Demo (Angular v22)</h1>

    <section>
      <h2>Product Badges</h2>

      <app-product-badge
        name="Wireless Headphones"
        [price]="149.99"
        [inStock]="true"
        discountPercent="20"
        theme="dark"
        is-featured="true"
      />

      <app-product-badge
        name="USB-C Hub"
        [price]="49.99"
        [inStock]="false"
      />
    </section>

    <section>
      <h2>Pricing Tiers</h2>

      <app-pricing-card
        [tier]="freeTier"
        billing-cycle="monthly"
      />

      <app-pricing-card
        [tier]="proTier"
        [billingCycle]="'annual'"
        is-recommended
        ctaText="Start Free Trial"
      />
    </section>
  `,
})
export class SignalInputDemoComponent {
  freeTier: PricingTier = {
    name: 'Free',
    price: 0,
    features: ['1 project', '1 GB storage', 'Community support'],
  };

  proTier: PricingTier = {
    name: 'Pro',
    price: 29,
    features: ['Unlimited projects', '100 GB storage', 'Priority support', 'Analytics'],
  };
}

// ------------------------------------------------------------------
// Key differences: @Input vs input()
// ------------------------------------------------------------------

/**
 * @Input() name = ''           | input<string>('')
 * ────────────────────────────────────────────────
 * Read: this.name              | this.name()
 * Read in template: {{ name }} | {{ name() }}
 * Reactive with computed: NO   | YES
 * Reactive with effect: NO     | YES
 * Required: @Input({required}) | input.required<T>()
 * Transform: @Input({transform})| input(val, {transform})
 * Alias: @Input({alias})       | input(val, {alias})
 * Decorator needed: YES        | NO
 */
