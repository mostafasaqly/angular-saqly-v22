# Section 14: HTTP and APIs

> **Angular v22 Course** — Section 14 of 25
> Estimated time: ~90 minutes · Level: Intermediate

Most real-world Angular applications communicate with a backend API. Angular's `HttpClient` is the built-in HTTP layer — it integrates with Angular's dependency injection, supports interceptors, and in v22 uses the browser's `fetch` API by default. This section covers all HTTP methods, the modern `httpResource()` declarative pattern, error handling, interceptors, and how to structure a clean API service layer.

---

## Table of Contents

1. [HTTP Client Overview](#1-http-client-overview)
2. [Providing HTTP Client](#2-providing-http-client)
3. [GET Requests](#3-get-requests)
4. [POST Requests](#4-post-requests)
5. [PUT and PATCH Requests](#5-put-and-patch-requests)
6. [DELETE Requests](#6-delete-requests)
7. [Fetching Data with httpResource](#7-fetching-data-with-httpresource)
8. [Handling Loading States](#8-handling-loading-states)
9. [Handling Errors](#9-handling-errors)
10. [Interceptors](#10-interceptors)
11. [API Service Layer](#11-api-service-layer)

---

## 1. HTTP Client Overview

Angular's `HttpClient` is a service that wraps the browser's HTTP capabilities. In Angular v22:

- **Default transport:** `fetch` (not `XMLHttpRequest`) — matches modern browser standards
- **Returns Observables** — every request returns an `Observable<T>` that you can subscribe to or convert to a Promise
- **Typed responses** — pass a generic `<T>` to get typed data back
- **Interceptors** — transform requests/responses globally (auth headers, error logging, caching)
- **`httpResource()`** — new declarative API for GET requests that exposes loading/error/value as Signals

> **Before Section 14:** Make sure you've covered [Section 13 — RxJS Essentials](../Section%2013%20-%20RxJS%20Essentials/README.md), since HTTP responses are Observables.

---

## 2. Providing HTTP Client

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),          // use fetch API (default in v22)
      withInterceptors([authInterceptor])  // register interceptors
    )
  ]
};
```

`withFetch()` is the default in new v22 projects. You may omit it explicitly — it's included for clarity.

---

## 3. GET Requests

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com';

  // GET all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  // GET with query params
  getProductsByCategory(category: string, page = 1): Observable<Product[]> {
    const params = new HttpParams()
      .set('category', category)
      .set('page', page.toString())
      .set('limit', '20');

    return this.http.get<Product[]>(`${this.baseUrl}/products`, { params });
  }

  // GET single item
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
```

### Using GET in a component

```typescript
import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (p of products(); track p.id) {
      <div>{{ p.title }} — ${{ p.price }}</div>
    }
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = signal<Product[]>([]);

  constructor() {
    this.productService.getProducts()
      .pipe(takeUntilDestroyed())
      .subscribe(data => this.products.set(data));
  }
}
```

---

## 4. POST Requests

```typescript
export interface CreateProductDto {
  title: string;
  price: number;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  createProduct(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>('/api/products', dto);
  }
}
```

### Handling POST in a component

```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="title" placeholder="Product name" />
      <button type="submit" [disabled]="saving()">
        {{ saving() ? 'Saving...' : 'Create Product' }}
      </button>
      @if (error()) { <p class="error">{{ error() }}</p> }
    </form>
  `
})
export class CreateProductComponent {
  private service = inject(ProductService);

  title = '';
  saving = signal(false);
  error = signal<string | null>(null);

  submit() {
    this.saving.set(true);
    this.error.set(null);

    this.service.createProduct({ title: this.title, price: 0, category: 'general' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (product) => {
          this.saving.set(false);
          console.log('Created:', product);
        },
        error: (err) => {
          this.saving.set(false);
          this.error.set('Failed to create product.');
        }
      });
  }
}
```

---

## 5. PUT and PATCH Requests

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  // PUT — replaces the entire resource
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`/api/products/${id}`, product);
  }

  // PATCH — updates only specific fields
  patchProduct(id: number, changes: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`/api/products/${id}`, changes);
  }
}
```

### When to use PUT vs PATCH

| Method | Sends | Use when |
|---|---|---|
| `PUT` | Full object | Replacing an entire resource |
| `PATCH` | Partial object | Updating one or a few fields |

```typescript
// Update only the price field
this.service.patchProduct(42, { price: 19.99 }).subscribe();

// Replace the entire product
this.service.updateProduct(42, fullProductObject).subscribe();
```

---

## 6. DELETE Requests

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }
}
```

```typescript
// Component usage
deleteProduct(id: number) {
  if (!confirm('Delete this product?')) return;

  this.service.deleteProduct(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        // Remove from local signal state
        this.products.update(list => list.filter(p => p.id !== id));
      },
      error: () => this.error.set('Failed to delete product.')
    });
}
```

---

## 7. Fetching Data with httpResource

`httpResource()` is the recommended pattern in Angular v22 for **GET-only, reactive data fetching**. It combines `HttpClient` with the Resource API to give you loading/error/value signals with zero boilerplate.

```typescript
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input (input)="search($event)" placeholder="Search category..." />

    @if (productsResource.isLoading()) {
      <p>Loading...</p>
    } @else if (productsResource.error()) {
      <p class="error">Failed to load products</p>
    } @else {
      @for (p of productsResource.value(); track p.id) {
        <div>{{ p.title }} — ${{ p.price }}</div>
      } @empty {
        <p>No products found.</p>
      }
    }
  `
})
export class ProductsComponent {
  category = signal('');

  // URL signal — resource reloads when category changes
  productsResource = httpResource<Product[]>(
    () => `/api/products?category=${this.category()}`
  );

  search(event: Event) {
    this.category.set((event.target as HTMLInputElement).value);
  }
}
```

### httpResource options

```typescript
// With request options (headers, params)
productsResource = httpResource<Product[]>({
  url: () => '/api/products',
  method: 'GET',
  params: () => ({ category: this.category(), limit: '20' }),
  headers: { 'X-Custom-Header': 'value' }
});
```

---

## 8. Handling Loading States

### With httpResource (declarative)

```html
@if (dataResource.isLoading()) {
  <app-skeleton-list [count]="5" />
} @else if (dataResource.error()) {
  <app-error-banner message="Failed to load data" (retry)="dataResource.reload()" />
} @else {
  <app-data-list [items]="dataResource.value()!" />
}
```

### With manual Observable subscription

```typescript
loading = signal(false);
data = signal<Item[]>([]);

loadData() {
  this.loading.set(true);
  this.service.getItems()
    .pipe(
      finalize(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(items => this.data.set(items));
}
```

---

## 9. Handling Errors

### catchError operator

```typescript
import { catchError, of } from 'rxjs';

getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>('/api/products').pipe(
    catchError(err => {
      console.error('HTTP error:', err);
      return of([]);  // return empty array on error
    })
  );
}
```

### HttpErrorResponse

```typescript
import { HttpErrorResponse } from '@angular/common/http';

handleError(err: HttpErrorResponse): string {
  if (err.status === 0) return 'Network error — check your connection.';
  if (err.status === 401) return 'Unauthorized — please log in.';
  if (err.status === 403) return 'Access denied.';
  if (err.status === 404) return 'Resource not found.';
  if (err.status === 500) return 'Server error — try again later.';
  return `Unexpected error: ${err.status}`;
}
```

---

## 10. Interceptors

Interceptors run on every HTTP request/response. Use them for authentication, logging, error handling, and caching.

### Auth interceptor (adds Bearer token)

```typescript
// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};
```

### Error interceptor (global error handling)

```typescript
// src/app/interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
```

### Register interceptors

```typescript
// app.config.ts
provideHttpClient(
  withFetch(),
  withInterceptors([authInterceptor, errorInterceptor])
)
```

---

## 11. API Service Layer

Keep HTTP logic out of components. Create typed service classes.

```typescript
// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected http = inject(HttpClient);
  protected baseUrl = environment.apiUrl;

  protected get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`);
  }

  protected post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  protected put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  protected patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}

// src/app/services/product.service.ts
@Injectable({ providedIn: 'root' })
export class ProductService extends ApiService {
  getAll() { return this.get<Product[]>('/products'); }
  getById(id: number) { return this.get<Product>(`/products/${id}`); }
  create(dto: CreateProductDto) { return this.post<Product>('/products', dto); }
  update(id: number, dto: Partial<Product>) { return this.patch<Product>(`/products/${id}`, dto); }
  remove(id: number) { return this.delete<void>(`/products/${id}`); }
}
```

---

## Knowledge Check

**Q1:** What is the difference between `httpResource()` and `HttpClient.get()`?

**A:** `HttpClient.get()` returns a cold Observable — you subscribe manually, manage the subscription, handle loading state yourself. `httpResource()` is declarative — it returns an object with `.value()`, `.isLoading()`, and `.error()` as Signals, and automatically re-fetches when the URL signal changes.

---

**Q2:** When should you use an interceptor vs. handling errors in each service?

**A:** Use an interceptor for concerns that apply to **all** requests: auth headers, global error redirection (401 → login), logging. Handle errors in services or components for **request-specific** logic (e.g., "if this product fetch fails, return an empty array").

---

**Q3:** What does `withFetch()` do?

**A:** It tells Angular's HttpClient to use the browser's native `fetch()` API as its transport, instead of `XMLHttpRequest`. This is the default in new Angular v22 projects and enables features like request streaming and better alignment with modern browser APIs.

---

**Next:** [Section 15 — State Management](../Section%2015%20-%20State%20Management/README.md)
