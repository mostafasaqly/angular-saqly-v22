# Section 22 — Project: Admin Dashboard

**Type:** Capstone Project · **Duration:** ~3 hours · **Difficulty:** Intermediate–Advanced  
**Angular Version:** 22 · **Standalone:** Yes · **Key APIs:** httpResource, Signal Forms, Functional Guards

---

## What You're Building

A fully functional **Admin Dashboard** — a single-page application where an authenticated administrator can view statistics, browse a paginated product list, search and filter products, create new products via a form, edit existing ones, and delete them. The sidebar collapses, the header shows the logged-in user, and all routes are protected by a functional `CanActivateFn` guard.

### Features

- **Authentication** — login/logout with a signal-based `AuthService` and token persisted in `localStorage`
- **Route Protection** — `authGuard` (logged-in) and `adminGuard` (role check) as `CanActivateFn`
- **Dashboard Home** — stat cards showing key metrics (products, revenue, orders, users)
- **Collapsible Sidebar** — persistent navigation with active-route highlighting
- **Product List** — fetched with `httpResource()`, client-side search + category filter
- **Add / Edit Form** — Signal-based form with real-time validation (no Reactive Forms)
- **Delete** — with confirmation and automatic list refresh
- **Loading & Error States** — skeleton-style feedback using `httpResource` status signals
- **Lazy-loaded routes** — all feature components loaded on demand
- **OnPush change detection** — throughout every component

---

## What You'll Learn

- How to compose a multi-page shell (layout component + `router-outlet`) with a sticky sidebar
- Functional route guards using `inject()` instead of class-based guards
- `httpResource()` for declarative, signal-driven HTTP fetching with built-in loading/error
- Building a reusable signal form helper (`createField`) without the Reactive Forms overhead
- Input signals (`input()`, `input.required()`) and output signals (`output()`) for component API design
- OnPush + signals for zero-extra-CD-cycle performance

---

## Project Setup

```bash
ng new admin-dashboard --standalone --routing --style=scss
cd admin-dashboard
# Install Angular CDK (optional, for overlay/focus management)
npm install @angular/cdk
```

Configure `provideHttpClient()` in `app.config.ts`:

```ts
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
```

---

## Lesson-by-Lesson Build Guide

### Lesson 1 — Project Overview

Understand the complete architecture before writing a line of code.

**File tree to create:**

```
src/app/
├── app.config.ts
├── app.routes.ts
├── models/
│   └── product.model.ts
├── auth.guard.ts          ← also contains AuthService
├── dashboard-layout/
│   └── dashboard-layout.component.ts
├── sidebar/
│   └── sidebar.component.ts
├── header/
│   └── header.component.ts
├── dashboard-home/
│   └── dashboard-home.component.ts
├── product-list/
│   └── product-list.component.ts
├── product-form/
│   └── product-form.component.ts
└── product.service.ts
```

**Key architecture decisions:**
- `DashboardLayoutComponent` is itself a route component that renders `<router-outlet>` for child pages
- `AuthService` lives inside `auth.guard.ts` for simplicity; in larger apps extract it
- `httpResource` is preferred over `HttpClient.get()` directly in components because it auto-exposes `.isLoading()`, `.error()`, and `.value()` signals

---

### Lesson 2 — Creating the Dashboard Layout

The layout is a CSS grid: sidebar on the left, `[header + content]` on the right.

```ts
// dashboard-layout.component.ts (see examples/ for full file)
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  template: `
    <div class="layout" [class.sidebar-collapsed]="sidebarCollapsed()">
      <app-sidebar [collapsed]="sidebarCollapsed()" (toggleCollapse)="toggleSidebar()" />
      <div class="layout__main">
        <app-header (menuClick)="toggleSidebar()" />
        <main class="layout__content">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {
  readonly sidebarCollapsed = signal(false);
  toggleSidebar() { this.sidebarCollapsed.update(v => !v); }
}
```

```css
/* Key CSS grid */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  transition: grid-template-columns 0.25s ease;
}
.layout.sidebar-collapsed {
  grid-template-columns: 64px 1fr;
}
```

> **Why use a layout component instead of `app.component.html`?**  
> The login page should NOT show the sidebar/header. By placing the layout in a child route, the login page gets a clean slate while authenticated pages share the shell.

---

### Lesson 3 — Sidebar and Header

**Sidebar** receives `collapsed` as an `input()` signal and emits `toggleCollapse` via `output()`. It uses `routerLinkActive` for automatic active-link styling.

```ts
// sidebar.component.ts — key parts
export class SidebarComponent {
  readonly collapsed      = input<boolean>(false);
  readonly toggleCollapse = output<void>();

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Products',  icon: '📦', route: '/products', badge: 3 },
    { label: 'Settings',  icon: '⚙️',  route: '/settings' }
  ];
}
```

**Header** uses `inject(AuthService)` to display the current user's name and initial.

```ts
// header.component.ts — key parts
export class HeaderComponent {
  readonly menuClick = output<void>();
  private readonly authService = inject(AuthService);

  userName()    { return this.authService.user()?.name ?? 'Guest'; }
  userInitial() { return (this.authService.user()?.name ?? 'G')[0].toUpperCase(); }
  logout()      { this.authService.logout(); this.router.navigate(['/login']); }
}
```

---

### Lesson 4 — Building Reusable Cards

The `StatCardComponent` is a generic card that accepts label, value, icon, optional prefix/suffix, and an optional trend percentage.

```ts
// stat-card.component.ts — key inputs
readonly label  = input.required<string>();
readonly value  = input.required<number>();
readonly icon   = input.required<string>();
readonly prefix = input<string>('');
readonly suffix = input<string>('');
readonly change = input<number | undefined>(undefined);
readonly trend  = input<CardTrend>('neutral');  // 'up' | 'down' | 'neutral'
```

Usage in `dashboard-home.component.html`:

```html
<div class="stats-grid">
  <app-stat-card label="Total Products" [value]="stats().totalProducts"
    icon="📦" [change]="12" trend="up" accentColor="#6366f1" />
  <app-stat-card label="Total Revenue"  [value]="stats().totalRevenue"
    icon="💰" prefix="$" [change]="8" trend="up" accentColor="#10b981" />
  <app-stat-card label="Total Orders"   [value]="stats().totalOrders"
    icon="🛒" [change]="3" trend="down" accentColor="#f59e0b" />
  <app-stat-card label="Active Users"   [value]="stats().activeUsers"
    icon="👥" trend="neutral" accentColor="#3b82f6" />
</div>
```

---

### Lesson 5 — Displaying API Data with httpResource

```ts
// product-list.component.ts
readonly productsResource = httpResource<Product[]>(
  () => `https://api.example.com/products?q=${this.searchSignal()}`
);
```

The `() =>` arrow function makes the URL **reactive** — whenever `searchSignal` changes, `httpResource` automatically re-fetches.

Template bindings:

```html
@if (productsResource.isLoading()) { <p>Loading…</p> }
@if (productsResource.error())     { <p>Error! <button (click)="productsResource.reload()">Retry</button></p> }
@if (!productsResource.isLoading() && !productsResource.error()) {
  <!-- render table using productsResource.value() -->
}
```

---

### Lesson 6 — Search and Filter

Two strategies combined:

1. **Server-side search** — `searchSignal` drives the URL inside `httpResource`, triggering a new HTTP request
2. **Client-side category filter** — `filteredProducts` computed signal slices the in-memory array

```ts
// Reactive URL for server search
private readonly searchSignal = signal('');
readonly productsResource = httpResource<Product[]>(
  () => `https://api.example.com/products?q=${this.searchSignal()}`
);

// Client-side filter derived signal
readonly filteredProducts = computed(() => {
  const products = this.productsResource.value() ?? [];
  const cat = this.selectedCategory;
  return products.filter(p => !cat || p.category === cat);
});

onSearch(term: string): void { this.searchSignal.set(term); }
```

---

### Lesson 7 & 8 — Add / Edit Product Form (Signal Forms)

Instead of `FormBuilder`, we create a tiny `createField()` helper that returns a `value` signal, a `touched` signal, and a `dirty` signal:

```ts
function createField<T>(initial: T) {
  const value   = signal<T>(initial);
  const touched = signal(false);
  return {
    value, touched,
    set(v: T)  { value.set(v); },
    blur()     { touched.set(true); }
  };
}

readonly fields = {
  name:     createField(''),
  category: createField(''),
  price:    createField(0),
  stock:    createField(0)
};

// Validation computed signals
readonly nameError = computed(
  () => this.fields.name.touched() && !this.fields.name.value().trim()
);
```

The **edit flow** is the same form component — it detects `:id` in the route params via `ActivatedRoute` and pre-fills the fields from an API call.

```ts
ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.isEditMode.set(true);
    this.loadProduct(+id);
  }
}
```

---

### Lesson 9 — Delete Item

Delete requires: confirmation dialog → HTTP DELETE → reload list.

```ts
deleteProduct(id: number): void {
  if (!confirm('Delete this product?')) return;
  this.productService.delete(id).subscribe({
    next: () => this.productsResource.reload(),  // re-fetch after delete
    error: err => console.error('Delete failed', err)
  });
}
```

---

### Lesson 10 — Loading and Error States

Three-state pattern using `httpResource` signals:

| Signal | Meaning |
|--------|---------|
| `resource.isLoading()` | HTTP in flight |
| `resource.error()` | last request failed |
| `resource.value()` | successful data |

For a skeleton loader, show placeholder divs while `isLoading()` is `true`.

---

### Lesson 11 — Route Protection

Two guards live in `auth.guard.ts`:

```ts
// Anyone logged in
export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// Logged in AND has 'admin' role
export const adminGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn() && auth.hasRole('admin')) return true;
  router.navigate(['/unauthorized']);
  return false;
};
```

Wire them in `app.routes.ts`:

```ts
{
  path: '',
  loadComponent: () => import('./dashboard-layout/dashboard-layout.component')
    .then(m => m.DashboardLayoutComponent),
  canActivate: [authGuard],     // ← protects entire shell
  children: [
    { path: 'products/new', canActivate: [adminGuard], ... }
  ]
}
```

---

### Lesson 12 — Final Refactoring

Checklist before calling the project done:

- [ ] All components use `ChangeDetectionStrategy.OnPush`
- [ ] No `any` types in TypeScript (use model interfaces)
- [ ] Services are `providedIn: 'root'` — no module needed
- [ ] Routes are all lazy-loaded with `loadComponent`
- [ ] Error and loading states shown for every `httpResource`
- [ ] Auth token stored with a consistent key; `AuthService.logout()` clears it
- [ ] Mobile: sidebar hidden on small screens (use CSS media query on the layout grid)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `examples/app.routes.ts` | Full route config with lazy loading + guards |
| `examples/dashboard-layout.component.ts` | Grid shell with sidebar collapse |
| `examples/sidebar.component.ts` | Navigation sidebar |
| `examples/header.component.ts` | Top header + logout |
| `examples/stat-card.component.ts` | Reusable metric card |
| `examples/product-list.component.ts` | List with httpResource + search/filter |
| `examples/product-form.component.ts` | Signal Form add/edit |
| `examples/product.service.ts` | HttpClient CRUD service |
| `examples/auth.guard.ts` | authGuard + adminGuard + AuthService |
| `examples/models/product.model.ts` | TypeScript interfaces |

---

## ✅ Section 22 Recap

By completing this project you have practised:

- **Functional guards** with `inject()` — modern replacement for class-based guards
- **`httpResource()`** — reactive data fetching with signals; no manual subscriptions
- **Signal forms** — real-time validation without `FormBuilder` or `FormControl`
- **Lazy-loaded shell + children** — the route parent/child pattern for protected shells
- **`input()` / `output()`** — the modern Angular component API
- **`ChangeDetectionStrategy.OnPush`** — applied consistently across a multi-component app
- **Derived computed signals** — `filteredProducts`, `nameError`, `formattedValue`, etc.

---

## Knowledge Check

<details>
<summary>1. Why is <code>httpResource</code> preferred over calling <code>HttpClient.get()</code> directly in a component?</summary>

`httpResource` returns an object with `.value()`, `.isLoading()`, and `.error()` signals that you can bind directly in templates — no manual subscription, no `async` pipe, no `catchError`. It also accepts a reactive URL factory so re-fetching on input change is automatic.
</details>

<details>
<summary>2. What is the advantage of the parent-route / child-route pattern for the dashboard layout?</summary>

Pages that should NOT have the dashboard shell (login, 404) live outside the parent route. Pages inside the shell route inherit the `canActivate` guard automatically — you do not need to add the guard to every child separately.
</details>

<details>
<summary>3. How does the edit product form know whether to call <code>create()</code> or <code>update()</code>?</summary>

It reads `ActivatedRoute.snapshot.paramMap.get('id')` in `ngOnInit`. If an `id` exists, `isEditMode` signal is set to `true` and `update()` is called in `submit()`; otherwise `create()` is used.
</details>

<details>
<summary>4. Why do we need both <code>authGuard</code> and <code>adminGuard</code>?</summary>

`authGuard` only checks that a token exists (any logged-in user can pass). `adminGuard` additionally checks the user's role. This lets editor/viewer accounts access read-only routes while only admins can reach create/edit routes.
</details>

<details>
<summary>5. What does <code>productsResource.reload()</code> do after a delete?</summary>

It triggers a fresh HTTP GET request using the current URL factory value, updating `.value()` with the new list — so the deleted item disappears from the table without a page refresh.
</details>

---

## Next Up

➡️ **[Section 23 — Project: E-Commerce Mini App](../Section%2023%20-%20Project%20E-Commerce%20Mini%20App/README.md)**

Apply everything you've built here in a consumer-facing context — product browsing, a cart powered entirely by signals, localStorage persistence, and a checkout form with full validation.
