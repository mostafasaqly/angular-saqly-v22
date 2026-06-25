// product-form.component.ts
// Signal-based form for both Add and Edit product flows

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductCreateDto } from '../models/product.model';

// ---------------------------------------------------------------------------
// Tiny signal-forms helper (illustrative — real app uses SignalForms library)
// ---------------------------------------------------------------------------
function createField<T>(initial: T) {
  const value   = signal<T>(initial);
  const touched = signal(false);
  const dirty   = signal(false);

  return {
    value,
    touched,
    dirty,
    set(v: T) { value.set(v); dirty.set(true); },
    blur()    { touched.set(true); }
  };
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="product-form">
      <div class="product-form__header">
        <a routerLink="/products" class="back-link">← Back to Products</a>
        <h2>{{ isEditMode() ? 'Edit Product' : 'Add New Product' }}</h2>
      </div>

      @if (loadingProduct()) {
        <div class="product-form__loading">Loading product…</div>
      } @else {
        <form class="form" (ngSubmit)="submit()">
          <!-- Name -->
          <div class="form__group" [class.form__group--error]="nameError()">
            <label class="form__label" for="name">Product Name *</label>
            <input
              id="name"
              class="form__input"
              type="text"
              [value]="fields.name.value()"
              (input)="fields.name.set($any($event.target).value)"
              (blur)="fields.name.blur()"
              placeholder="e.g. Wireless Headphones"
            />
            @if (nameError()) {
              <span class="form__error">Name is required</span>
            }
          </div>

          <!-- Category -->
          <div class="form__group" [class.form__group--error]="categoryError()">
            <label class="form__label" for="category">Category *</label>
            <select
              id="category"
              class="form__input"
              [value]="fields.category.value()"
              (change)="fields.category.set($any($event.target).value)"
              (blur)="fields.category.blur()"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
            </select>
            @if (categoryError()) {
              <span class="form__error">Category is required</span>
            }
          </div>

          <!-- Price + Stock row -->
          <div class="form__row">
            <div class="form__group" [class.form__group--error]="priceError()">
              <label class="form__label" for="price">Price ($) *</label>
              <input
                id="price"
                class="form__input"
                type="number"
                min="0"
                step="0.01"
                [value]="fields.price.value()"
                (input)="fields.price.set(+$any($event.target).value)"
                (blur)="fields.price.blur()"
              />
              @if (priceError()) {
                <span class="form__error">Price must be greater than 0</span>
              }
            </div>

            <div class="form__group">
              <label class="form__label" for="stock">Stock *</label>
              <input
                id="stock"
                class="form__input"
                type="number"
                min="0"
                [value]="fields.stock.value()"
                (input)="fields.stock.set(+$any($event.target).value)"
                (blur)="fields.stock.blur()"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="form__group">
            <label class="form__label" for="description">Description</label>
            <textarea
              id="description"
              class="form__input form__textarea"
              rows="4"
              [value]="fields.description.value()"
              (input)="fields.description.set($any($event.target).value)"
            ></textarea>
          </div>

          <!-- Submit error -->
          @if (submitError()) {
            <div class="form__submit-error">{{ submitError() }}</div>
          }

          <!-- Actions -->
          <div class="form__actions">
            <a routerLink="/products" class="btn btn--secondary">Cancel</a>
            <button
              type="submit"
              class="btn btn--primary"
              [disabled]="submitting() || !isFormValid()"
            >
              {{ submitting() ? 'Saving…' : (isEditMode() ? 'Update Product' : 'Create Product') }}
            </button>
          </div>
        </form>
      }
    </section>
  `,
  styles: [`
    .product-form { max-width: 720px; margin: 0 auto; }

    .product-form__header { margin-bottom: 24px; }

    .back-link {
      display: inline-block;
      color: #6366f1;
      text-decoration: none;
      font-size: 0.875rem;
      margin-bottom: 8px;
    }

    .product-form__header h2 { margin: 0; font-size: 1.4rem; color: #1e293b; }

    .product-form__loading { padding: 40px; text-align: center; color: #64748b; }

    .form {
      background: white;
      border-radius: 12px;
      padding: 28px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.07);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form__group { display: flex; flex-direction: column; gap: 6px; }

    .form__group--error .form__input { border-color: #dc2626; }

    .form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .form__label { font-size: 0.875rem; font-weight: 500; color: #374151; }

    .form__input {
      padding: 10px 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.15s;
    }

    .form__input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px #e0e7ff; }

    .form__textarea { resize: vertical; min-height: 100px; }

    .form__error { color: #dc2626; font-size: 0.75rem; }

    .form__submit-error {
      background: #fef2f2;
      color: #dc2626;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.875rem;
    }

    .form__actions { display: flex; justify-content: flex-end; gap: 10px; }

    .btn {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      text-decoration: none;
      display: inline-block;
      transition: opacity 0.15s;
    }

    .btn:hover { opacity: 0.85; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn--primary   { background: #6366f1; color: white; }
    .btn--secondary { background: #f1f5f9; color: #374151; }
  `]
})
export class ProductFormComponent implements OnInit {
  private readonly route   = inject(ActivatedRoute);
  private readonly router  = inject(Router);
  private readonly service = inject(ProductService);

  readonly isEditMode    = signal(false);
  readonly loadingProduct = signal(false);
  readonly submitting    = signal(false);
  readonly submitError   = signal('');

  // Signal-based form fields
  readonly fields = {
    name:        createField(''),
    category:    createField(''),
    price:       createField(0),
    stock:       createField(0),
    description: createField('')
  };

  // Computed validations
  readonly nameError     = computed(() => this.fields.name.touched() && !this.fields.name.value().trim());
  readonly categoryError = computed(() => this.fields.category.touched() && !this.fields.category.value());
  readonly priceError    = computed(() => this.fields.price.touched() && this.fields.price.value() <= 0);

  readonly isFormValid = computed(() =>
    !!this.fields.name.value().trim() &&
    !!this.fields.category.value() &&
    this.fields.price.value() > 0
  );

  private editId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId = +id;
      this.loadProduct(+id);
    }
  }

  private loadProduct(id: number): void {
    this.loadingProduct.set(true);
    this.service.getById(id).subscribe({
      next: product => {
        this.fields.name.set(product.name);
        this.fields.category.set(product.category);
        this.fields.price.set(product.price);
        this.fields.stock.set(product.stock);
        this.fields.description.set(product.description);
        this.loadingProduct.set(false);
      },
      error: () => {
        this.submitError.set('Failed to load product.');
        this.loadingProduct.set(false);
      }
    });
  }

  submit(): void {
    // Touch all fields to trigger validation display
    Object.values(this.fields).forEach(f => f.blur());

    if (!this.isFormValid()) return;

    const dto: ProductCreateDto = {
      name:        this.fields.name.value(),
      category:    this.fields.category.value(),
      price:       this.fields.price.value(),
      stock:       this.fields.stock.value(),
      description: this.fields.description.value()
    };

    this.submitting.set(true);
    this.submitError.set('');

    const request$ = this.isEditMode() && this.editId
      ? this.service.update(this.editId, { ...dto, id: this.editId })
      : this.service.create(dto);

    request$.subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => {
        this.submitError.set('Save failed. Please try again.');
        this.submitting.set(false);
      }
    });
  }
}
