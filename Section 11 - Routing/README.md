# Section 11: Routing

> **Angular v22 Course** — Section 11 of 25
> Estimated time: ~90 minutes · Level: Intermediate

Routing is how Angular turns a single-page application into a multi-page experience without full page reloads. The Angular Router maps URL paths to components, manages navigation history, passes data between views, and supports code-splitting via lazy loading. This section covers everything from basic route setup to advanced patterns like lazy loading, child routes, guards, and the new Navigation API support added in v22.

---

## Table of Contents

1. [Angular Routing Overview](#1-angular-routing-overview)
2. [Creating Routes](#2-creating-routes)
3. [Router Outlet](#3-router-outlet)
4. [Router Links](#4-router-links)
5. [Active Links](#5-active-links)
6. [Route Parameters](#6-route-parameters)
7. [Query Parameters](#7-query-parameters)
8. [Child Routes](#8-child-routes)
9. [Lazy Loading Routes](#9-lazy-loading-routes)
10. [Navigation API Support](#10-navigation-api-support)
11. [Not Found Page](#11-not-found-page)

---

## 1. Angular Routing Overview

Angular's router is provided by `@angular/router`. In a standalone Angular v22 project, it is configured in `app.config.ts` with `provideRouter()`.

### Setup

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
};
```

> `withComponentInputBinding()` automatically binds route parameters to `input()` signals — covered in [Section 6](#6-route-parameters).

### How the router works

1. User navigates to `/products/42`
2. Router matches the URL against the route table
3. Router loads the matched component into `<router-outlet>`
4. Browser URL updates (no page reload)

---

## 2. Creating Routes

Routes are defined as an array of `Route` objects in `app.routes.ts`.

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
```

### Route properties

| Property | Type | Description |
|---|---|---|
| `path` | `string` | URL segment (no leading `/`) |
| `component` | `Type<any>` | Component to render |
| `redirectTo` | `string` | Redirect to another path |
| `pathMatch` | `'full' \| 'prefix'` | Matching strategy for redirects |
| `children` | `Routes` | Nested child routes |
| `loadChildren` | `() => Promise<Routes>` | Lazy-loaded route module |
| `canActivate` | `CanActivateFn[]` | Guard functions |
| `data` | `object` | Static data passed to route |
| `title` | `string \| ResolveFn` | Page title |

### Redirect route

```typescript
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
```

---

## 3. Router Outlet

`<router-outlet>` is a placeholder in a template where the matched component is rendered.

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {}
```

When the user navigates to `/about`, the `AboutComponent` is injected into `<router-outlet>` and the `NavbarComponent` stays in place.

---

## 4. Router Links

Use the `routerLink` directive to create navigation links without full page reloads.

```typescript
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- String path -->
    <a routerLink="/home">Home</a>
    <a routerLink="/about">About</a>

    <!-- Array syntax for dynamic segments -->
    <a [routerLink]="['/products', productId()]">View Product</a>

    <!-- Relative path (relative to current route) -->
    <a routerLink="./details">Details</a>

    <!-- Navigate up one level -->
    <a routerLink="../">Back</a>
  `
})
export class NavComponent {}
```

### Programmatic navigation

```typescript
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export class LoginComponent {
  private router = inject(Router);

  onLoginSuccess() {
    this.router.navigate(['/dashboard']);
  }

  onViewProduct(id: number) {
    this.router.navigate(['/products', id]);
  }
}
```

---

## 5. Active Links

`routerLinkActive` adds a CSS class when the link's route is currently active.

```typescript
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/products" routerLinkActive="active">Products</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
    </nav>
  `,
  styles: [`
    a.active { font-weight: bold; border-bottom: 2px solid currentColor; }
  `]
})
export class NavbarComponent {}
```

### Exact matching

By default, `/products/42` will also activate a link to `/products`. To require an exact match:

```html
<a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
  Home
</a>
```

---

## 6. Route Parameters

Route parameters are dynamic URL segments defined with `:paramName`.

```typescript
// app.routes.ts
{ path: 'products/:id', component: ProductDetailComponent },
```

### Reading params with input() (v22 — recommended)

With `withComponentInputBinding()` enabled in `provideRouter()`, route params are automatically bound to component inputs:

```typescript
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (productResource.isLoading()) { <p>Loading...</p> }
    @else if (productResource.value(); as product) {
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
    }
  `
})
export class ProductDetailComponent {
  // Automatically bound from :id route param
  id = input.required<string>();

  productResource = httpResource(() => `/api/products/${this.id()}`);
}
```

### Reading params with ActivatedRoute (classic)

```typescript
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

export class ProductDetailComponent {
  private route = inject(ActivatedRoute);

  // Convert Observable to Signal
  productId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );
}
```

---

## 7. Query Parameters

Query parameters appear after `?` in the URL (`/search?q=angular&page=2`).

### Passing query params

```html
<a [routerLink]="['/search']" [queryParams]="{ q: searchTerm(), page: 1 }">
  Search
</a>
```

```typescript
// Programmatic navigation
this.router.navigate(['/search'], {
  queryParams: { q: 'angular', page: 1 }
});
```

### Reading query params

```typescript
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

export class SearchComponent {
  private route = inject(ActivatedRoute);

  searchQuery = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('q') ?? ''))
  );

  page = toSignal(
    this.route.queryParamMap.pipe(map(params => Number(params.get('page') ?? 1)))
  );
}
```

### Preserving query params during navigation

```typescript
this.router.navigate(['/products'], {
  queryParamsHandling: 'merge'  // keep existing, add new
});
```

---

## 8. Child Routes

Child routes render inside a `<router-outlet>` that lives inside the parent component.

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DashboardOverviewComponent },
      { path: 'products', component: DashboardProductsComponent },
      { path: 'settings', component: DashboardSettingsComponent },
    ]
  }
];
```

```typescript
// dashboard.component.ts — must include its own <router-outlet>
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <aside>
      <a routerLink="overview" routerLinkActive="active">Overview</a>
      <a routerLink="products" routerLinkActive="active">Products</a>
      <a routerLink="settings" routerLinkActive="active">Settings</a>
    </aside>
    <section>
      <router-outlet />   <!-- child routes render here -->
    </section>
  `
})
export class DashboardComponent {}
```

---

## 9. Lazy Loading Routes

Lazy loading splits the app into chunks. The chunk for a route is only downloaded when the user navigates to it — improving initial load time.

### loadComponent (single component lazy loading)

```typescript
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent)
  }
];
```

### loadChildren (lazy-loaded route group)

```typescript
export const routes: Routes = [
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.routes').then(m => m.shopRoutes)
  }
];
```

```typescript
// src/app/shop/shop.routes.ts
import { Routes } from '@angular/router';

export const shopRoutes: Routes = [
  { path: '', loadComponent: () => import('./shop-home.component').then(m => m.ShopHomeComponent) },
  { path: 'cart', loadComponent: () => import('./cart.component').then(m => m.CartComponent) },
  { path: 'product/:id', loadComponent: () => import('./product.component').then(m => m.ProductComponent) },
];
```

> **Tip:** Prefer `loadComponent` for individual pages and `loadChildren` for feature areas with their own navigation.

---

## 10. Navigation API Support

Angular v22 adds support for the **Web Navigation API** (`navigation.navigate()`), which enables smoother browser-native transitions alongside Angular's Router.

```typescript
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export class AppComponent {
  private router = inject(Router);

  // Angular Router automatically integrates with the Navigation API
  // Use router.navigate() — it hooks into the browser navigation stack correctly
  goToProfile(id: number) {
    this.router.navigate(['/profile', id]);
  }
}
```

Angular's Router listens to the Navigation API events so that browser back/forward buttons work correctly even with client-side navigation. No extra configuration needed in v22 — it's enabled by default.

### View Transitions (bonus)

Enable animated page transitions using the View Transitions API:

```typescript
// app.config.ts
provideRouter(routes, withViewTransitions())
```

```css
/* styles.css — animate route transitions */
::view-transition-old(root) {
  animation: slide-out 200ms ease-in;
}
::view-transition-new(root) {
  animation: slide-in 200ms ease-out;
}
```

---

## 11. Not Found Page

Add a wildcard route (`**`) as the **last route** in the array to catch unmatched URLs.

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  // Must be last
  { path: '**', component: NotFoundComponent }
];
```

```typescript
@Component({
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="not-found">
      <h1>404 — Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/">Go Home</a>
    </div>
  `
})
export class NotFoundComponent {}
```

---

## Knowledge Check

**Q1:** What does `withComponentInputBinding()` do?

**A:** It tells the Angular Router to automatically bind route parameters (`:id`), query parameters, and route data to component `input()` signals. Without it, you must inject `ActivatedRoute` manually.

---

**Q2:** What is the difference between `loadComponent` and `loadChildren`?

**A:** `loadComponent` lazily loads a **single component** and is ideal for individual pages. `loadChildren` lazily loads an **entire route group** (a `Routes` array) — better for feature modules with multiple sub-routes that you want bundled together.

---

**Q3:** Why must the wildcard route `**` be placed last?

**A:** Angular evaluates routes **in order** and stops at the first match. If `**` were placed first, it would match every URL and the other routes would never be reached.

---

**Next:** [Section 12 — Forms in Angular](../Section%2012%20-%20Forms%20in%20Angular/README.md)
