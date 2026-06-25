import { Component, input, computed, ChangeDetectionStrategy, booleanAttribute, numberAttribute } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [class.featured]="featured()">
      <h3>{{ name() }}</h3>
      <p class="price">{{ formattedPrice() }}</p>
      @if (discount() > 0) {
        <span class="badge">{{ discount() }}% OFF</span>
      }
      <button [disabled]="outOfStock()">
        {{ outOfStock() ? 'Out of Stock' : 'Add to Cart' }}
      </button>
    </div>
  `
})
export class ProductCardComponent {
  // Required inputs
  name = input.required<string>();
  price = input.required<number>();

  // Optional inputs with defaults
  currency = input<string>('USD');
  discount = input(0, { transform: numberAttribute });
  featured = input(false, { transform: booleanAttribute });
  outOfStock = input(false, { transform: booleanAttribute });

  // Derived signal — recomputes when price or currency changes
  formattedPrice = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency()
    }).format(this.price())
  );
}
