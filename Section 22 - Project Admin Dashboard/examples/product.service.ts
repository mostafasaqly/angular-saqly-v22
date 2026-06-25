// product.service.ts
// HTTP service for full CRUD operations on products

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCreateDto, ProductUpdateDto } from './models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  // Use JSONPlaceholder as a mock; swap for your real API base URL
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  /**
   * GET /products — optionally filter by search term and category
   */
  getAll(search = '', category = ''): Observable<Product[]> {
    let params = new HttpParams();
    if (search)   params = params.set('q', search);
    if (category) params = params.set('category', category);
    return this.http.get<Product[]>(this.baseUrl, { params });
  }

  /**
   * GET /products/:id
   */
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  /**
   * POST /products
   */
  create(dto: ProductCreateDto): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, dto);
  }

  /**
   * PUT /products/:id
   */
  update(id: number, dto: ProductUpdateDto): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, dto);
  }

  /**
   * DELETE /products/:id
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
