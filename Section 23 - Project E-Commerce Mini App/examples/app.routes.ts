// app.routes.ts
// E-Commerce route configuration with lazy loading

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products-page/products-page.component').then(
        m => m.ProductsPageComponent
      ),
    title: 'Shop — All Products'
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        m => m.ProductDetailComponent
      ),
    title: 'Product Details'
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart-page/cart-page.component').then(m => m.CartPageComponent),
    title: 'Your Cart'
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout-form/checkout-form.component').then(
        m => m.CheckoutFormComponent
      ),
    title: 'Checkout'
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./order-success/order-success.component').then(
        m => m.OrderSuccessComponent
      ),
    title: 'Order Placed!'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 — Not Found'
  }
];
