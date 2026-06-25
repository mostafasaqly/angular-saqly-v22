// Requires withComponentInputBinding() in provideRouter() — Angular v22 default
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/products">← Back to Products</a>

    @if (productResource.isLoading()) {
      <div class="skeleton">Loading product...</div>
    } @else if (productResource.error()) {
      <p class="error">Product not found. <a routerLink="/products">Browse products</a></p>
    } @else if (productResource.value(); as p) {
      <article class="product">
        <img [src]="p.image" [alt]="p.title" />
        <div class="info">
          <h1>{{ p.title }}</h1>
          <p class="price">{{ p.price | currency }}</p>
          <p>{{ p.description }}</p>
          <button class="btn-primary">Add to Cart</button>
        </div>
      </article>
    }
  `
})
export class ProductDetailComponent {
  // Route param :id is automatically bound here
  id = input.required<string>();

  // Reloads automatically when id() changes
  productResource = httpResource<Product>(
    () => `https://fakestoreapi.com/products/${this.id()}`
  );
}
