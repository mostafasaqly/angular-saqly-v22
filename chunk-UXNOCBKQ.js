import"./chunk-JS3ZFT6L.js";var t={id:11,title:"Routing",titleEn:"Routing",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"Routing \u0647\u0648 \u0646\u0638\u0627\u0645 Angular \u0644\u0644\u062A\u0646\u0642\u0644 \u0628\u064A\u0646 \u0627\u0644\u0635\u0641\u062D\u0627\u062A \u0639\u0644\u0649 \u062C\u0627\u0646\u0628 \u0627\u0644\u0639\u0645\u064A\u0644. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0625\u0639\u062F\u0627\u062F Routes\u060C router-outlet\u060C routerLink\u060C \u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0631 \u0645\u0639 input()\u060C Routes \u0627\u0644\u0641\u0631\u0639\u064A\u0629\u060C Lazy Loading (Lazy Loading)\u060C Route Guards\u060C \u0648Navigation API \u0627\u0644\u062C\u062F\u064A\u062F.",introEn:"Routing is Angular's system for client-side navigation between pages. This section covers route setup, router-outlet, routerLink, route params with input(), child routes, lazy loading (loadComponent vs loadChildren), route guards, and the new Navigation API.",lessons:["Basic Route Setup","router-outlet \u0648routerLink","Route Parameters with input()","Query Parameters","Child Routes","Lazy Loading","Route Guards","Navigation API and View Transitions"],lessonsEn:["Basic Route Setup","router-outlet and routerLink","Route Parameters with input()","Query Parameters","Child Routes","Lazy Loading","Route Guards","Navigation API and View Transitions"],content:[{type:"heading",text:"\u0625\u0639\u062F\u0627\u062F Routes \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629"},{type:"code",code:`// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',       redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    title: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component')
      .then(m => m.ProductsComponent),
    title: '\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A',
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
      .then(m => m.adminRoutes),
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component')
      .then(m => m.NotFoundComponent) },
];

// app.config.ts
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ]
};`},{type:"tip",text:"withComponentInputBinding() \u064A\u064F\u0645\u0643\u0651\u0646 \u0631\u0628\u0637 \u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0631 (params) \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0640 input() \u0641\u064A Components \u2014 \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0640 ActivatedRoute \u064A\u062F\u0648\u064A\u0627\u064B."},{type:"heading",text:"router-outlet \u0648routerLink"},{type:"code",code:`// app.html
<nav>
  <a routerLink="/home" routerLinkActive="active">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
  <a routerLink="/products" routerLinkActive="active">\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A</a>
</nav>

<router-outlet />    <!-- \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A \u062A\u064F\u0635\u064A\u064E\u0651\u0631 \u0647\u0646\u0627 -->

// \u0625\u0646\u0634\u0627\u0621 \u0631\u0648\u0627\u0628\u0637 \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629
<a [routerLink]="['/products', product.id]">{{ product.name }}</a>

// \u0627\u0644\u062A\u0646\u0642\u0644 \u0627\u0644\u0628\u0631\u0645\u062C\u064A
import { Router } from '@angular/router';

export class MyComponent {
  router = inject(Router);

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToSearch(term: string) {
    this.router.navigate(['/search'], { queryParams: { q: term } });
  }
}`},{type:"heading",text:"\u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0631 \u0645\u0639 input()"},{type:"paragraph",text:"\u0645\u0639 withComponentInputBinding()\u060C \u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0631 \u062A\u064F\u0631\u0628\u0637 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0640 input() \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646. \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0640 ActivatedRoute."},{type:"code",code:`import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @if (product.isLoading()) {
      <p>\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
    } @else if (product.value(); as p) {
      <h1>{{ p.title }}</h1>
      <p>{{ p.description }}</p>
      <strong>\u0627\u0644\u0633\u0639\u0631: {{ p.price | currency:'SAR' }}</strong>
    }
  \`
})
export class ProductDetailComponent {
  // :id \u0645\u0646 \u0627\u0644\u0645\u0633\u0627\u0631 \u064A\u064F\u0631\u0628\u0637 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0647\u0646\u0627
  id = input.required<string>();

  product = httpResource<Product>(
    () => \`https://dummyjson.com/products/\${this.id()}\`
  );
}`},{type:"heading",text:"Lazy Loading (Lazy Loading)"},{type:"paragraph",text:"Lazy Loading \u064A\u0642\u0633\u0645 \u062D\u0632\u0645\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0625\u0644\u0649 \u0623\u062C\u0632\u0627\u0621. \u0627\u0644\u0623\u062C\u0632\u0627\u0621 \u062A\u064F\u062D\u0645\u064E\u0651\u0644 \u0641\u0642\u0637 \u0639\u0646\u062F\u0645\u0627 \u064A\u062A\u0646\u0642\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0639\u0646\u064A \u2014 \u062A\u0642\u0644\u064A\u0644 \u062D\u062C\u0645 \u0627\u0644\u062D\u0632\u0645\u0629 \u0627\u0644\u0623\u0648\u0644\u064A\u0629."},{type:"code",code:`// loadComponent: \u0644\u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u0648\u0651\u0646 \u0648\u0627\u062D\u062F \u0643\u0633\u0648\u0644\u0627\u064B
{
  path: 'settings',
  loadComponent: () => import('./settings/settings.component')
    .then(m => m.SettingsComponent),
}

// loadChildren: \u0644\u062A\u062D\u0645\u064A\u0644 \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u0627\u0631\u0627\u062A \u0643\u0627\u0645\u0644\u0629 \u0643\u0633\u0648\u0644\u0627\u064B
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes')
    .then(m => m.adminRoutes),
}

// admin.routes.ts
export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users',     component: AdminUsersComponent },
    ]
  }
];`},{type:"heading",text:"Route Guards (Route Guards)"},{type:"code",code:`// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 \u0645\u0639 \u062D\u0641\u0638 URL \u0627\u0644\u0645\u0642\u0635\u0648\u062F
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062D\u0627\u0631\u0633 \u0641\u064A Routes
{
  path: 'profile',
  loadComponent: () => import('./profile/profile.component')
    .then(m => m.ProfileComponent),
  canActivate: [authGuard],
}`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0627\u0626\u062F\u0629 \u0645\u0646 withComponentInputBinding() \u0641\u064A provideRouter\u061F",answer:"\u064A\u064F\u0645\u0643\u0651\u0646 \u0631\u0628\u0637 \u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0631 (:id\u060C :slug)\u060C \u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 (?page=2)\u060C \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0631 (data: {...}) \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0639 input() \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0627\u0644\u0645\u064F\u0648\u062C\u064E\u0651\u0647 \u0625\u0644\u064A\u0647 \u2014 \u0628\u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0640 inject(ActivatedRoute) \u064A\u062F\u0648\u064A\u0627\u064B."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 loadComponent \u0648loadChildren \u0641\u064A Routing \u0627\u0644\u0643\u0633\u0648\u0644\u061F",answer:"loadComponent \u064A\u064F\u062D\u0645\u0651\u0644 \u0645\u0643\u0648\u0651\u0646\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0643\u0633\u0648\u0644\u0627\u064B \u2014 \u0645\u0646\u0627\u0633\u0628 \u0644\u0635\u0641\u062D\u0629 \u0645\u0633\u062A\u0642\u0644\u0629. loadChildren \u064A\u064F\u062D\u0645\u0651\u0644 \u0645\u0644\u0641 \u0645\u0633\u0627\u0631\u0627\u062A \u0643\u0627\u0645\u0644 \u0643\u0633\u0648\u0644\u0627\u064B \u2014 \u0645\u0646\u0627\u0633\u0628 \u0644\u0642\u0633\u0645 \u0643\u0627\u0645\u0644 \u0645\u0646 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 (\u0645\u062B\u0644 /admin) \u0628\u0645\u0633\u0627\u0631\u0627\u062A \u0641\u0631\u0639\u064A\u0629 \u0645\u062A\u0639\u062F\u062F\u0629."}],contentEn:[{type:"heading",text:"Basic Route Setup"},{type:"code",code:`// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component')
      .then(m => m.ProductsComponent),
    title: 'Products',
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
      .then(m => m.adminRoutes),
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component')
      .then(m => m.NotFoundComponent) },
];

// app.config.ts
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ]
};`},{type:"tip",text:"withComponentInputBinding() automatically binds route params to input() signals in components \u2014 no need to manually inject ActivatedRoute."},{type:"heading",text:"router-outlet and routerLink"},{type:"code",code:`// app.html
<nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/products" routerLinkActive="active">Products</a>
</nav>

<router-outlet />    <!-- current route page renders here -->

// Dynamic links
<a [routerLink]="['/products', product.id]">{{ product.name }}</a>

// Programmatic navigation
import { Router } from '@angular/router';

export class MyComponent {
  router = inject(Router);

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToSearch(term: string) {
    this.router.navigate(['/search'], { queryParams: { q: term } });
  }
}`},{type:"heading",text:"Route Parameters with input()"},{type:"paragraph",text:"With withComponentInputBinding(), route params are automatically bound to input() in the component. No need for ActivatedRoute."},{type:"code",code:`import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @if (product.isLoading()) {
      <p>Loading...</p>
    } @else if (product.value(); as p) {
      <h1>{{ p.title }}</h1>
      <p>{{ p.description }}</p>
      <strong>Price: {{ p.price | currency }}</strong>
    }
  \`
})
export class ProductDetailComponent {
  // :id from the route is automatically bound here
  id = input.required<string>();

  product = httpResource<Product>(
    () => \`https://dummyjson.com/products/\${this.id()}\`
  );
}`},{type:"heading",text:"Lazy Loading"},{type:"paragraph",text:"Lazy loading splits the application bundle into chunks. Chunks are only downloaded when the user navigates to that route \u2014 reducing the initial bundle size."},{type:"code",code:`// loadComponent: lazy-load a single component
{
  path: 'settings',
  loadComponent: () => import('./settings/settings.component')
    .then(m => m.SettingsComponent),
}

// loadChildren: lazy-load an entire routes file
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes')
    .then(m => m.adminRoutes),
}

// admin.routes.ts
export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users',     component: AdminUsersComponent },
    ]
  }
];`},{type:"heading",text:"Route Guards"},{type:"code",code:`// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Redirect with the intended URL preserved
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// Apply the guard to routes
{
  path: 'profile',
  loadComponent: () => import('./profile/profile.component')
    .then(m => m.ProfileComponent),
  canActivate: [authGuard],
}`},{type:"qa",question:"What is the benefit of withComponentInputBinding() in provideRouter?",answer:"It automatically binds route params (:id, :slug), query params (?page=2), and route data (data: {...}) to input() signals in the routed component \u2014 without manually injecting ActivatedRoute."},{type:"qa",question:"What is the difference between loadComponent and loadChildren for lazy loading?",answer:"loadComponent lazy-loads a single component \u2014 suitable for a standalone page. loadChildren lazy-loads an entire routes file \u2014 suitable for a full section of the app (like /admin) with multiple child routes."}]};export{t as default};
