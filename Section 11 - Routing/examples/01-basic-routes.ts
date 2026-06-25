// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect empty path to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Eager-loaded routes (small pages — loaded upfront)
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },

  // Route with a dynamic segment
  {
    path: 'products/:id',
    loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    title: 'Product Details'
  },

  // Lazy-loaded feature group (downloads only when user visits /admin)
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)
  },

  // Not found — must be last
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 Not Found'
  },
];
