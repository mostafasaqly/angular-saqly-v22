// app.routes.ts
// Full route configuration with lazy loading and auth guard

import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
    title: 'Login — Admin Dashboard'
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent),
    title: 'Unauthorized'
  },
  {
    // Protected shell — DashboardLayoutComponent wraps all admin pages
    path: '',
    loadComponent: () =>
      import('./dashboard-layout/dashboard-layout.component').then(
        m => m.DashboardLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard-home/dashboard-home.component').then(
            m => m.DashboardHomeComponent
          ),
        title: 'Dashboard'
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./product-list/product-list.component').then(
            m => m.ProductListComponent
          ),
        title: 'Products'
      },
      {
        path: 'products/new',
        loadComponent: () =>
          import('./product-form/product-form.component').then(
            m => m.ProductFormComponent
          ),
        title: 'Add Product',
        canActivate: [adminGuard]
      },
      {
        path: 'products/:id/edit',
        loadComponent: () =>
          import('./product-form/product-form.component').then(
            m => m.ProductFormComponent
          ),
        title: 'Edit Product',
        canActivate: [adminGuard]
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then(m => m.SettingsComponent),
        title: 'Settings'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 — Not Found'
  }
];
