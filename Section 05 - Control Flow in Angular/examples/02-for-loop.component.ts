import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-for-loop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Products ({{ products().length }})</h2>

    <ul>
      @for (product of products(); track product.id; let i = $index, last = $last) {
        <li [class.last]="last">
          {{ i + 1 }}. {{ product.name }} — ${{ product.price }}
        </li>
      } @empty {
        <li>No products available.</li>
      }
    </ul>

    <button (click)="addProduct()">Add Product</button>
    <button (click)="clearProducts()">Clear</button>
  `
})
export class ForLoopComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 },
  ]);

  private nextId = 4;

  addProduct() {
    this.products.update(list => [
      ...list,
      { id: this.nextId++, name: `Product ${this.nextId - 1}`, price: 49 }
    ]);
  }

  clearProducts() {
    this.products.set([]);
  }
}
