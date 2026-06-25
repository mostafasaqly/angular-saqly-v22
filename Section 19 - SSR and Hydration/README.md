# Section 19: SSR and Hydration

> **Angular v22 Course** — Section 19 of 25
> Estimated time: ~75 minutes · Level: Intermediate–Advanced

Client-side rendering (CSR) works great for authenticated apps, but for public-facing content that needs to be discovered by search engines or load fast on slow connections, **Server-Side Rendering (SSR)** is the right choice. Angular v22 ships first-class SSR support with `@angular/ssr`, full hydration, incremental hydration, and a path to static site generation. This section covers all of it.

---

## Table of Contents

1. [What is Server-Side Rendering?](#1-what-is-server-side-rendering)
2. [Angular SSR Overview](#2-angular-ssr-overview)
3. [Creating an SSR Angular App](#3-creating-an-ssr-angular-app)
4. [Hydration](#4-hydration)
5. [Incremental Hydration](#5-incremental-hydration)
6. [SEO Benefits](#6-seo-benefits)
7. [Static Site Generation](#7-static-site-generation)
8. [Common SSR Issues](#8-common-ssr-issues)

---

## 1. What is Server-Side Rendering?

In **CSR (Client-Side Rendering)**, the browser receives an empty HTML shell and JavaScript builds the page:

```
Browser request → Server sends empty HTML + JS bundle → JS runs → Page renders
```

In **SSR (Server-Side Rendering)**, the server renders the full HTML page:

```
Browser request → Server renders full HTML → Browser shows content instantly → JS hydrates
```

### When to use SSR

| Use SSR when... | Stick with CSR when... |
|---|---|
| SEO is important (blog, marketing, e-commerce) | Authenticated dashboards (no public indexing needed) |
| First paint speed matters (slow connections) | Highly interactive apps (chat, real-time, games) |
| Social media link previews are needed | Complex drag-and-drop or canvas apps |
| Content needs to be indexed by Google | Internal tools with no SEO requirements |

---

## 2. Angular SSR Overview

Angular SSR works by running your Angular app on a **Node.js server** using the `@angular/ssr` package:

1. A request arrives at the Node.js server
2. Angular's server-side renderer renders the route to HTML
3. The full HTML page is sent to the browser
4. Angular's JavaScript loads and **hydrates** the page (attaches event listeners to existing DOM)
5. The app behaves as a normal SPA from that point

### Architecture

```
[Browser] ←→ [Node.js / Express server]
               └─ @angular/ssr renders routes
               └─ serves static assets
               └─ handles API proxying (optional)
```

---

## 3. Creating an SSR Angular App

### New project with SSR

```bash
ng new my-app --ssr
```

### Add SSR to an existing project

```bash
ng add @angular/ssr
```

This generates:
- `src/app/app.config.server.ts` — server-specific providers
- `src/server.ts` — Express server entry point
- Updated `angular.json` with server build targets

### Project structure after SSR setup

```
src/
├── app/
│   ├── app.config.ts           # Client config (provideClientHydration here)
│   ├── app.config.server.ts    # Server config
│   └── ...
├── server.ts                   # Express server
└── main.server.ts              # Server bootstrap
```

### app.config.ts — enable hydration

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(
      withEventReplay()  // captures user events during hydration
    )
  ]
};
```

### Building and running

```bash
# Development SSR server
ng serve --ssr   # or: npm run dev:ssr

# Production build
ng build          # builds client
ng run my-app:server  # builds server

# Run production server
node dist/my-app/server/server.mjs
```

---

## 4. Hydration

**Hydration** is the process of Angular's JavaScript attaching to the server-rendered HTML without destroying and recreating the DOM.

Without hydration (old behavior):
1. Server renders HTML
2. Browser shows HTML
3. Angular JS loads → **destroys** all HTML, **re-creates** it from scratch

With hydration (Angular v16+):
1. Server renders HTML
2. Browser shows HTML immediately
3. Angular JS loads → **attaches** event listeners to existing DOM nodes (much faster)

### How Angular handles hydration

Angular v22 uses **full hydration** by default when SSR is enabled. The server embeds a serialized state snapshot in the HTML:

```html
<!-- Angular embeds transfer state in the HTML -->
<script id="ng-state" type="application/json">{"key":"value"}</script>
```

This lets the client pick up exactly where the server left off, avoiding duplicate HTTP requests.

### Transfer State (avoiding duplicate API calls)

```typescript
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';

const PRODUCTS_KEY = makeStateKey<Product[]>('products');

@Injectable({ providedIn: 'root' })
export class ProductService {
  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    // On the client, check if server already fetched this
    if (this.transferState.hasKey(PRODUCTS_KEY)) {
      const cached = this.transferState.get(PRODUCTS_KEY, []);
      this.transferState.remove(PRODUCTS_KEY);
      return of(cached);
    }

    return this.http.get<Product[]>('/api/products').pipe(
      tap(products => {
        // On the server, store results for transfer to client
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(PRODUCTS_KEY, products);
        }
      })
    );
  }
}
```

> **v22 simplification:** With `httpResource()` and `provideClientHydration()`, transfer state is handled automatically. You rarely need to implement it manually.

---

## 5. Incremental Hydration

**Incremental hydration** (stable in v22) lets you defer hydration of specific DOM regions until the browser needs them — similar to `@defer` but for hydration.

```html
<!-- Only hydrate the comments section when it enters the viewport -->
@defer (hydrate on viewport) {
  <app-comments [postId]="postId()" />
}

<!-- Hydrate the sidebar on user interaction -->
@defer (hydrate on interaction) {
  <app-sidebar />
}

<!-- Hydrate immediately (eager) -->
@defer (hydrate on idle) {
  <app-analytics-widget />
}
```

### Incremental hydration triggers

| Trigger | When it hydrates |
|---|---|
| `on viewport` | When the block enters the viewport |
| `on interaction` | When the user clicks or focuses inside the block |
| `on idle` | When the browser is idle |
| `on timer(3s)` | After a delay |
| `when condition()` | When a signal expression becomes truthy |
| `never` | Never (server HTML only, no JS) |

### Benefits

- Critical content hydrates immediately
- Below-the-fold, secondary, and non-interactive content hydrates lazily
- Dramatically reduces Time to Interactive (TTI) on complex pages

---

## 6. SEO Benefits

### Setting page title and meta tags

```typescript
import { Title, Meta } from '@angular/platform-browser';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article>...</article>`
})
export class BlogPostComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  post = input.required<BlogPost>();

  constructor() {
    effect(() => {
      const p = this.post();
      this.title.setTitle(`${p.title} | My Blog`);
      this.meta.updateTag({ name: 'description', content: p.excerpt });
      this.meta.updateTag({ property: 'og:title', content: p.title });
      this.meta.updateTag({ property: 'og:image', content: p.coverImage });
    });
  }
}
```

### Route-level titles (no component code)

```typescript
// app.routes.ts
{
  path: 'blog/:slug',
  component: BlogPostComponent,
  title: (route) => `${route.params['slug'].replace(/-/g, ' ')} | My Blog`
}
```

### Structured data (JSON-LD)

```typescript
@Component({
  template: `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{{ post().title }}",
        "author": "{{ post().author }}"
      }
    </script>
  `
})
export class BlogPostComponent {}
```

---

## 7. Static Site Generation

**SSG (Static Site Generation)** pre-renders routes at **build time** instead of request time. The result is a folder of `.html` files that can be served from any CDN.

### Enable prerendering

```typescript
// angular.json — server target
"prerender": {
  "builder": "@angular/build:prerender",
  "options": {
    "routesFile": "routes.txt"    // optional: list of routes to prerender
  }
}
```

```
# routes.txt
/
/about
/blog/post-1
/blog/post-2
/products/1
/products/2
```

### Build SSG output

```bash
ng build --prerender
# Output: dist/my-app/browser/ (static HTML files, serveable from CDN)
```

### SSG vs SSR vs CSR

| | CSR | SSR | SSG |
|---|---|---|---|
| Render time | Client (runtime) | Server (per request) | Build time |
| Hosting | Any static host | Node.js server needed | Any static host |
| Always fresh? | Yes | Yes | No (stale until rebuild) |
| Best for | Dashboards, SPAs | E-commerce, news | Blog, docs, marketing |

---

## 8. Common SSR Issues

### Issue 1: Browser-only APIs

Code that runs on the server has no `window`, `document`, `localStorage`, or `navigator`. Guard access:

```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private platformId = inject(PLATFORM_ID);

  get(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(key, value);
  }
}
```

### Issue 2: Hydration mismatches

If the server-rendered HTML doesn't match what Angular renders on the client, you get a hydration mismatch error. Common causes:

- Accessing `Date.now()` or random values that differ server/client
- Rendering based on browser size/media queries before hydration
- Manipulating the DOM directly (avoid `document.querySelector` in SSR apps)

Fix: use `afterNextRender()` for DOM manipulation (only runs in the browser):

```typescript
import { afterNextRender } from '@angular/core';

export class ChartComponent {
  constructor() {
    afterNextRender(() => {
      // Safe to access DOM here — runs only in the browser, after hydration
      this.initChart();
    });
  }
}
```

### Issue 3: External resources not available on server

API calls that require auth cookies or session tokens may fail during server rendering. Handle this by catching errors gracefully and allowing the client to retry:

```typescript
getUser(): Observable<User | null> {
  return this.http.get<User>('/api/me').pipe(
    catchError(() => of(null))
  );
}
```

---

## Knowledge Check

**Q1:** What is the difference between SSR and SSG?

**A:** SSR renders pages on the server **at request time** — each request triggers a fresh render. SSG pre-renders pages **at build time** — the output is static HTML files. SSR is for frequently changing content; SSG is for content that doesn't change often and can be rebuilt on deploy.

---

**Q2:** What does `provideClientHydration()` do?

**A:** It activates Angular's hydration feature — instead of destroying server-rendered HTML and recreating the DOM, Angular attaches event listeners to existing DOM nodes. This eliminates the flash of content and dramatically improves Time to Interactive.

---

**Q3:** Why does `window` or `localStorage` cause errors in SSR?

**A:** The server runs in Node.js, which has no browser globals like `window`, `document`, or `localStorage`. When your code references these without checking the platform, the Node.js process throws a `ReferenceError`. Use `isPlatformBrowser(platformId)` to guard browser-only code.

---

**Next:** [Section 20 — Testing Basics](../Section%2020%20-%20Testing%20Basics/README.md)
