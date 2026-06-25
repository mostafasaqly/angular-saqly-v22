// Section 11 — Routing
export default {
  id: 11,
  title: 'التوجيه (Routing)',
  titleEn: 'Routing',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'التوجيه هو نظام Angular للتنقل بين الصفحات على جانب العميل. هذا القسم يغطي إعداد المسارات، router-outlet، routerLink، معاملات المسار مع input()، المسارات الفرعية، التحميل الكسول (Lazy Loading)، حراس المسار، وNavigation API الجديد.',
  introEn: 'Routing is Angular\'s system for client-side navigation between pages. This section covers route setup, router-outlet, routerLink, route params with input(), child routes, lazy loading (loadComponent vs loadChildren), route guards, and the new Navigation API.',

  lessons: [
    'إعداد المسارات الأساسية',
    'router-outlet وrouterLink',
    'معاملات المسار مع input()',
    'معاملات الاستعلام (Query Params)',
    'المسارات الفرعية',
    'التحميل الكسول (Lazy Loading)',
    'حراس المسار (Route Guards)',
    'Navigation API وتأثيرات الانتقال',
  ],
  lessonsEn: [
    'Basic Route Setup',
    'router-outlet and routerLink',
    'Route Parameters with input()',
    'Query Parameters',
    'Child Routes',
    'Lazy Loading',
    'Route Guards',
    'Navigation API and View Transitions',
  ],

  content: [
    { type: 'heading', text: 'إعداد المسارات الأساسية' },
    {
      type: 'code',
      code: `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',       redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    title: 'الرئيسية',
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component')
      .then(m => m.ProductsComponent),
    title: 'المنتجات',
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
};`,
    },
    { type: 'tip', text: 'withComponentInputBinding() يُمكّن ربط معاملات المسار (params) تلقائياً بـ input() في المكوّنات — لا تحتاج لـ ActivatedRoute يدوياً.' },

    { type: 'heading', text: 'router-outlet وrouterLink' },
    {
      type: 'code',
      code: `// app.html
<nav>
  <a routerLink="/home" routerLinkActive="active">الرئيسية</a>
  <a routerLink="/products" routerLinkActive="active">المنتجات</a>
</nav>

<router-outlet />    <!-- صفحة المسار الحالي تُصيَّر هنا -->

// إنشاء روابط ديناميكية
<a [routerLink]="['/products', product.id]">{{ product.name }}</a>

// التنقل البرمجي
import { Router } from '@angular/router';

export class MyComponent {
  router = inject(Router);

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToSearch(term: string) {
    this.router.navigate(['/search'], { queryParams: { q: term } });
  }
}`,
    },

    { type: 'heading', text: 'معاملات المسار مع input()' },
    { type: 'paragraph', text: 'مع withComponentInputBinding()، معاملات المسار تُربط تلقائياً بـ input() في المكوّن. لا تحتاج لـ ActivatedRoute.' },
    {
      type: 'code',
      code: `import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @if (product.isLoading()) {
      <p>جارٍ التحميل...</p>
    } @else if (product.value(); as p) {
      <h1>{{ p.title }}</h1>
      <p>{{ p.description }}</p>
      <strong>السعر: {{ p.price | currency:'SAR' }}</strong>
    }
  \`
})
export class ProductDetailComponent {
  // :id من المسار يُربط تلقائياً هنا
  id = input.required<string>();

  product = httpResource<Product>(
    () => \`https://dummyjson.com/products/\${this.id()}\`
  );
}`,
    },

    { type: 'heading', text: 'التحميل الكسول (Lazy Loading)' },
    { type: 'paragraph', text: 'التحميل الكسول يقسم حزمة التطبيق إلى أجزاء. الأجزاء تُحمَّل فقط عندما يتنقل المستخدم للمسار المعني — تقليل حجم الحزمة الأولية.' },
    {
      type: 'code',
      code: `// loadComponent: لتحميل مكوّن واحد كسولاً
{
  path: 'settings',
  loadComponent: () => import('./settings/settings.component')
    .then(m => m.SettingsComponent),
}

// loadChildren: لتحميل مجموعة مسارات كاملة كسولاً
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
];`,
    },

    { type: 'heading', text: 'حراس المسار (Route Guards)' },
    {
      type: 'code',
      code: `// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // إعادة توجيه مع حفظ URL المقصود
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// تطبيق الحارس في المسارات
{
  path: 'profile',
  loadComponent: () => import('./profile/profile.component')
    .then(m => m.ProfileComponent),
  canActivate: [authGuard],
}`,
    },
    {
      type: 'qa',
      question: 'ما الفائدة من withComponentInputBinding() في provideRouter؟',
      answer: 'يُمكّن ربط معاملات المسار (:id، :slug)، معاملات الاستعلام (?page=2)، وبيانات المسار (data: {...}) تلقائياً مع input() في المكوّن المُوجَّه إليه — بدون الحاجة لـ inject(ActivatedRoute) يدوياً.',
    },
    {
      type: 'qa',
      question: 'ما الفرق بين loadComponent وloadChildren في التوجيه الكسول؟',
      answer: 'loadComponent يُحمّل مكوّناً واحداً كسولاً — مناسب لصفحة مستقلة. loadChildren يُحمّل ملف مسارات كامل كسولاً — مناسب لقسم كامل من التطبيق (مثل /admin) بمسارات فرعية متعددة.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Basic Route Setup' },
    {
      type: 'code',
      code: `// app.routes.ts
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
};`,
    },
    { type: 'tip', text: 'withComponentInputBinding() automatically binds route params to input() signals in components — no need to manually inject ActivatedRoute.' },

    { type: 'heading', text: 'router-outlet and routerLink' },
    {
      type: 'code',
      code: `// app.html
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
}`,
    },

    { type: 'heading', text: 'Route Parameters with input()' },
    { type: 'paragraph', text: 'With withComponentInputBinding(), route params are automatically bound to input() in the component. No need for ActivatedRoute.' },
    {
      type: 'code',
      code: `import { Component, input, ChangeDetectionStrategy } from '@angular/core';
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
}`,
    },

    { type: 'heading', text: 'Lazy Loading' },
    { type: 'paragraph', text: 'Lazy loading splits the application bundle into chunks. Chunks are only downloaded when the user navigates to that route — reducing the initial bundle size.' },
    {
      type: 'code',
      code: `// loadComponent: lazy-load a single component
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
];`,
    },

    { type: 'heading', text: 'Route Guards' },
    {
      type: 'code',
      code: `// auth.guard.ts
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
}`,
    },
    {
      type: 'qa',
      question: 'What is the benefit of withComponentInputBinding() in provideRouter?',
      answer: 'It automatically binds route params (:id, :slug), query params (?page=2), and route data (data: {...}) to input() signals in the routed component — without manually injecting ActivatedRoute.',
    },
    {
      type: 'qa',
      question: 'What is the difference between loadComponent and loadChildren for lazy loading?',
      answer: 'loadComponent lazy-loads a single component — suitable for a standalone page. loadChildren lazy-loads an entire routes file — suitable for a full section of the app (like /admin) with multiple child routes.',
    },
  ],
};
