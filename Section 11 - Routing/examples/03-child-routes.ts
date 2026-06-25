// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    // The shell layout component with its own <router-outlet>
    loadComponent: () => import('./admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard'
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
        title: 'Products'
      },
      {
        path: 'products/:id/edit',
        loadComponent: () => import('./products/product-edit.component').then(m => m.ProductEditComponent),
        title: 'Edit Product'
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent),
        title: 'Settings'
      },
    ]
  }
];

// src/app/admin/admin-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <nav class="sidebar">
        <a routerLink="dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="products" routerLinkActive="active">Products</a>
        <a routerLink="settings" routerLinkActive="active">Settings</a>
      </nav>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `
})
export class AdminLayoutComponent {}
