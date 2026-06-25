# Section 24: Deployment

> **Angular v22 Course** — Section 24 of 25
> Estimated time: ~75 minutes · Level: Intermediate

You've built two complete Angular applications. Now it's time to get them live on the internet. This section covers the full deployment pipeline: preparing the app for production, understanding environment files, running the production build, and deploying to four popular platforms — Netlify, Vercel, Firebase Hosting, and GitHub Pages. We'll also tackle the most common deployment issues and how to fix them.

---

## Table of Contents

1. [Preparing Angular App for Production](#1-preparing-angular-app-for-production)
2. [Environment Files](#2-environment-files)
3. [Building the App](#3-building-the-app)
4. [Deploying to Netlify](#4-deploying-to-netlify)
5. [Deploying to Vercel](#5-deploying-to-vercel)
6. [Deploying to Firebase Hosting](#6-deploying-to-firebase-hosting)
7. [GitHub Pages Deployment](#7-github-pages-deployment)
8. [Common Deployment Issues](#8-common-deployment-issues)

---

## 1. Preparing Angular App for Production

Before you run the build command, a few things should be checked off. A production Angular app should be lean, fast, and correctly configured.

### Production checklist

```
[ ] Remove all console.log() calls (or use a logging service)
[ ] API base URL reads from environment file (not hardcoded)
[ ] Error handling is in place for all HTTP calls
[ ] Lazy-loaded routes configured (not all routes eagerly loaded)
[ ] OnPush change detection on all components (v22 default — verify)
[ ] No unused imports (ng build will warn)
[ ] Bundle size checked (see below)
[ ] Title and meta tags set per route
[ ] 404 / error page route configured
[ ] Auth guard protects any private routes
```

### Checking bundle size before deploying

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/my-app/stats.json
```

The bundle analyzer opens a visual treemap showing which packages are largest. Common culprits in Angular apps:

| Package | Typical size | Fix if too large |
|---|---|---|
| `@angular/core` | ~80 KB gzipped | (framework core — irreducible) |
| RxJS | ~20 KB gzipped | Import operators individually |
| Lodash | ~70 KB gzipped | Replace with native JS methods |
| Moment.js | ~72 KB gzipped | Switch to `date-fns` or `Temporal` |

### Enabling production optimisations

Angular v22's production build enables these automatically via `ng build`:

| Optimisation | What it does |
|---|---|
| Tree shaking | Removes unused code |
| Minification (esbuild) | Shrinks JS and CSS |
| Dead code elimination | Removes branches that can never execute |
| Lazy route splitting | Each route becomes a separate chunk |
| Source map (external) | Maps minified code back to TypeScript for debugging |
| Budget enforcement | Fails build if bundle exceeds configured size limit |

### Configuring size budgets

In `angular.json`:

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kb",
    "maximumError": "1mb"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "4kb",
    "maximumError": "8kb"
  }
]
```

If your app exceeds `maximumError`, `ng build` fails with a clear message. Set the budget conservatively — it forces you to keep dependencies lean.

---

## 2. Environment Files

Angular uses environment files to store configuration values that differ between development and production (API URLs, feature flags, analytics keys, etc.).

### The environment file pattern (v22)

```
src/
└── environments/
    ├── environment.ts        ← development config (default)
    └── environment.prod.ts   ← production config
```

See `examples/01-environment-files.ts` for a complete example.

### `environment.ts` (development)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  analyticsId: '',
  featureFlags: {
    newDashboard: true,
    betaCheckout: true
  }
};
```

### `environment.prod.ts` (production)

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com/api',
  analyticsId: 'G-XXXXXXXXXX',
  featureFlags: {
    newDashboard: true,
    betaCheckout: false
  }
};
```

### Wiring file replacements in `angular.json`

The CLI automatically replaces `environment.ts` with `environment.prod.ts` during a production build — but only if configured:

```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ]
  }
}
```

See `examples/02-build-config.json` for the full production configuration snippet.

### Using the environment in a service

```typescript
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  // Use this.baseUrl for all HTTP calls
  getUsersUrl() {
    return `${this.baseUrl}/users`;
  }
}
```

The `import` path always points to `environment.ts` (the dev version). The CLI swaps it for `environment.prod.ts` at build time when `--configuration production` is specified.

### Important: do NOT commit secrets to environment files

Environment files are committed to your repo. Never store:
- Database passwords
- Private API keys
- JWT secrets
- OAuth client secrets

For secrets, use your deployment platform's environment variable system (Netlify env vars, Vercel env vars, Firebase runtime config, GitHub Actions secrets).

---

## 3. Building the App

The production build command:

```bash
ng build
# or explicitly:
ng build --configuration production
```

Angular CLI v22 defaults to production configuration when you run `ng build` without flags, so both commands above produce the same result.

### Build output

```
dist/
└── my-angular-app/
    └── browser/
        ├── index.html              ← Entry point
        ├── main-HASH.js            ← Main bundle (hashed for cache busting)
        ├── polyfills-HASH.js       ← Browser compatibility
        ├── styles-HASH.css         ← Global styles
        ├── chunk-HASH.js           ← Lazy-loaded route chunks
        └── assets/                 ← Copied from src/assets/
```

Everything in `dist/my-angular-app/browser/` is what you upload to your hosting provider.

### Build flags

| Flag | Purpose |
|---|---|
| `ng build` | Production build (default in v22) |
| `ng build --watch` | Rebuild on file change (for integration testing) |
| `ng build --stats-json` | Output webpack stats for bundle analysis |
| `ng build --source-map` | Include source maps in output |
| `ng build --named-chunks` | Use route names instead of hashes for chunk names |

### Build time benchmarks (esbuild, v22)

| App size | Build time |
|---|---|
| Small (< 10 components) | 3–5 seconds |
| Medium (50–100 components) | 8–15 seconds |
| Large (200+ components) | 20–40 seconds |

Angular v22 uses **esbuild** under the hood (the same tool Vite uses). This is 5–10x faster than the old Webpack-based builder.

---

## 4. Deploying to Netlify

Netlify is the fastest way to deploy an Angular app. It takes about 5 minutes the first time.

### Option A: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
ng build

# Deploy (one-time manual deploy — good for testing)
netlify deploy --dir dist/my-angular-app/browser

# Deploy to production
netlify deploy --dir dist/my-angular-app/browser --prod
```

### Option B: Deploy via Netlify UI (drag and drop)

1. Run `ng build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop the `dist/my-angular-app/browser/` folder onto the Netlify deploy area
4. Done — Netlify gives you a URL like `https://random-name-123.netlify.app`

### Option C: Deploy via Git (recommended for ongoing projects)

1. Push your repo to GitHub / GitLab / Bitbucket
2. Log into Netlify → "Add new site" → "Import an existing project"
3. Connect to your repo
4. Configure build settings:
   - **Build command:** `ng build`
   - **Publish directory:** `dist/my-angular-app/browser`
5. Click "Deploy site"

Every push to `main` triggers a new deploy automatically.

### The critical Netlify config for Angular SPAs

Angular is a Single Page Application — all routing is client-side. When a user navigates directly to `https://myapp.netlify.app/products/42`, Netlify tries to serve a file at `/products/42` — which doesn't exist. This returns a 404.

Fix: create `netlify.toml` in the project root (see `examples/03-netlify-config.toml`):

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This tells Netlify: *for any URL, serve `index.html` with a 200 status — let Angular's router handle the path.*

### Environment variables on Netlify

In the Netlify UI: Site settings → Environment variables → Add a variable.

Or via CLI:

```bash
netlify env:set API_URL https://api.myapp.com
netlify env:set ANALYTICS_ID G-XXXXXXXXXX
```

> Do NOT use these for Angular's `environment.ts` system — those are baked in at build time. Netlify env vars are only available during the build process, not at runtime in the browser.

To use Netlify env vars during build, reference them in `angular.json` or a custom build script:

```bash
# In netlify.toml build command
[build]
  command = "ng build --replace-env API_URL"
```

---

## 5. Deploying to Vercel

Vercel is another excellent choice — it has automatic Angular detection and zero-config deploys.

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root (Vercel auto-detects Angular)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? my-angular-app
# - Directory? ./
```

Vercel automatically detects Angular, sets `ng build` as the build command, and
`dist/my-angular-app/browser` as the output directory.

### Option B: Deploy via Vercel dashboard

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Vercel detects Angular and pre-fills:
   - Build command: `ng build`
   - Output directory: `dist/my-angular-app/browser`
5. Click "Deploy"

### Vercel configuration file

For Angular SPA routing, create `vercel.json` in the project root (see `examples/04-vercel-config.json`):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Without this, direct navigation to non-root routes returns 404.

### Environment variables on Vercel

Vercel UI: Project → Settings → Environment Variables.

Or via CLI:

```bash
vercel env add API_URL production
```

### Vercel vs Netlify — quick comparison

| Feature | Vercel | Netlify |
|---|---|---|
| Angular auto-detect | Yes | Yes |
| Deploy from CLI | Yes (`vercel`) | Yes (`netlify deploy`) |
| Preview deploys (PRs) | Yes | Yes |
| Edge network | Larger (Vercel Edge) | Good |
| Forms handling | No | Yes (Netlify Forms) |
| Price (hobby) | Free | Free |

Both are excellent. Choose Netlify if you want built-in form handling; choose Vercel if you're using Next.js elsewhere and want a unified platform.

---

## 6. Deploying to Firebase Hosting

Firebase Hosting is Google's CDN — a natural home for Angular apps given they're both Google products. It also integrates with Firebase Auth, Firestore, and Cloud Functions if you need a backend.

### Install Firebase CLI

```bash
npm install -g firebase-tools

# Log in
firebase login
```

### Initialise Firebase in your project

```bash
firebase init hosting
```

Answer the prompts:

```
? What do you want to use as your public directory? dist/my-angular-app/browser
? Configure as a single-page app (rewrite all URLs to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No  (do this later)
? File dist/my-angular-app/browser/index.html already exists. Overwrite? No
```

This creates two files: `firebase.json` and `.firebaserc` (see `examples/05-firebase-config.json`).

### Build and deploy

```bash
# Build
ng build

# Deploy
firebase deploy --only hosting
```

Deployment takes ~10 seconds. Firebase outputs:

```
Hosting URL: https://my-angular-app.web.app
```

### The firebase.json SPA rewrite

The init wizard adds this automatically when you answer "Yes" to single-page app:

```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

Without this, direct URL navigation breaks (same issue as Netlify/Vercel).

### Setting up CI/CD with Firebase and GitHub Actions

```bash
firebase init hosting:github
```

This creates a GitHub Actions workflow that:
1. Builds on every push to `main`
2. Deploys a preview on every pull request
3. Deploys to production when the PR merges

### Firebase CLI custom domain

```bash
firebase hosting:channel:deploy staging  # deploy to a preview channel
firebase hosting:channel:open staging    # open the preview URL
```

### Cache control headers

Firebase Hosting lets you configure cache headers in `firebase.json`:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [{ "key": "Cache-Control", "value": "public,max-age=31536000,immutable" }]
      },
      {
        "source": "index.html",
        "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
      }
    ]
  }
}
```

- Hashed JS/CSS files are immutably cached for 1 year (their hash changes when content changes)
- `index.html` is never cached so users always get the latest version on navigate

---

## 7. GitHub Pages Deployment

GitHub Pages is free hosting for public repos (and private repos on paid plans). It's ideal for portfolio projects and course demos.

### Install `angular-cli-ghpages`

```bash
ng add angular-cli-ghpages
```

This adds the `@angular-builders/github-pages` package and configures your `angular.json`.

### Deploy to GitHub Pages

```bash
# One command — builds and pushes to gh-pages branch
ng deploy --base-href /my-repo-name/
```

Replace `my-repo-name` with your actual GitHub repository name.

### What the `--base-href` flag does

Angular's router assumes the app is served from the domain root (`/`). GitHub Pages serves your app at `https://username.github.io/my-repo-name/` — a subdirectory. The `--base-href` flag tells Angular the correct base URL.

Without it, all asset paths and router links will be broken.

### Automate with GitHub Actions

The workflow in `examples/06-github-pages-workflow.yml` automates the deploy on every push to `main`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npx ng build --base-href /my-repo-name/
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/my-angular-app/browser
```

### Custom domain on GitHub Pages

1. Create a `CNAME` file in `src/` with your domain: `myapp.com`
2. Add `CNAME` to the `assets` array in `angular.json` so it gets copied to `dist/`
3. Configure your domain's DNS to point to GitHub's IP addresses
4. Enable "Enforce HTTPS" in the repo Settings → Pages

---

## 8. Common Deployment Issues

### Issue 1: 404 on page refresh / direct URL navigation

**Symptom:** The app works when you navigate using `<a>` links but returns 404 when you refresh or type a URL directly.

**Cause:** Angular uses the browser History API for routing. The server has no file at `/products/42` — only `index.html` exists.

**Fix:** Configure your server to serve `index.html` for all 404s:

| Platform | Fix |
|---|---|
| Netlify | `[[redirects]] from="/*" to="/index.html" status=200` in `netlify.toml` |
| Vercel | `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]` in `vercel.json` |
| Firebase | `"rewrites": [{ "source": "**", "destination": "/index.html" }]` in `firebase.json` |
| Apache | `FallbackResource /index.html` in `.htaccess` |
| Nginx | `try_files $uri $uri/ /index.html;` in the location block |

### Issue 2: Blank page after deploy

**Symptom:** The app builds successfully but shows a blank page at the deployed URL.

**Common causes and fixes:**

1. **Wrong `--base-href`** (GitHub Pages specifically)
   ```bash
   # Check the <base href> in dist/index.html
   # Should match your deploy URL path
   ng build --base-href /my-repo-name/
   ```

2. **Wrong publish directory**
   ```
   Wrong:  dist/my-angular-app/          ← the outer folder
   Right:  dist/my-angular-app/browser/  ← where index.html lives
   ```

3. **`index.html` serving the wrong file**
   Check browser DevTools → Network tab. If `main.js` returns 404, the JS path is wrong → base-href issue.

### Issue 3: API calls fail in production

**Symptom:** The app loads but all data fails to load (network errors in console).

**Common causes:**

1. **Hardcoded localhost URL**
   ```typescript
   // WRONG — localhost won't exist in production
   private apiUrl = 'http://localhost:3000/api';

   // RIGHT — reads from environment file
   private apiUrl = environment.apiUrl;
   ```

2. **CORS not configured on the API server**
   Your Angular app is now at `https://myapp.netlify.app` but the API server only allows `http://localhost:4200`.
   Fix: configure CORS on your API server to allow the production domain.

3. **HTTPS vs HTTP mismatch**
   Your app is served over HTTPS but the API is on HTTP. Browsers block "mixed content." Fix: ensure your API also uses HTTPS.

### Issue 4: Build succeeds locally but fails in CI

**Common causes:**

1. **Node version mismatch**
   Local: Node 22. CI runner: Node 18. Fix: specify Node 22 in your CI config (see workflow examples).

2. **`npm install` vs `npm ci`**
   Use `npm ci` in CI — it installs exactly from `package-lock.json`, not the looser `package.json` ranges.

3. **Case-sensitive filenames**
   Windows (local) is case-insensitive. Linux (CI runner) is case-sensitive. `import { Component } from './MyComponent'` fails if the file is `mycomponent.ts`.
   Fix: always match import paths exactly with filenames, including capitalisation.

4. **Missing environment file**
   If `environment.prod.ts` is in `.gitignore`, it won't exist in CI.
   Fix: either commit the file (with no secrets) or generate it in the CI pipeline.

### Issue 5: Cache shows old version after deploy

**Symptom:** You deployed a new version but some users still see the old version.

**Cause:** The browser cached `index.html` from the previous deploy.

**Fix:** Configure `Cache-Control: no-cache` for `index.html` on your hosting provider (see Firebase example above). Hashed JS/CSS files can be cached forever because their filename changes with each build.

### Issue 6: Environment variables not available at runtime

**Symptom:** `environment.apiUrl` is `undefined` in production.

**Cause:** Angular's `environment.ts` file replacements happen **at build time**, not at runtime. If the `fileReplacements` config in `angular.json` is missing or points to the wrong file, the dev environment values are baked in (including `http://localhost`).

**Fix:** Verify `angular.json` has the correct `fileReplacements` under the `production` configuration. Run `ng build` and open `dist/.../main.js` in a text editor — search for your production API URL. If you see `localhost` instead, the file replacement isn't working.

---

## ✅ Section 24 Recap

You can now:
- **Prepare an Angular app for production** — checklist, bundle size analysis, size budgets.
- **Use environment files correctly** — dev vs prod config, file replacements, never commit secrets.
- **Run the production build** with `ng build` and understand the output in `dist/`.
- **Deploy to Netlify** in under 5 minutes, with SPA routing fixed via `netlify.toml`.
- **Deploy to Vercel** with zero-config auto-detection and `vercel.json` routing.
- **Deploy to Firebase Hosting** with `firebase deploy` and proper cache headers.
- **Deploy to GitHub Pages** with `ng deploy --base-href` and automate via GitHub Actions.
- **Diagnose and fix** the most common deployment issues: 404 on refresh, blank page, API failures, CI build failures, and cache issues.

### Knowledge Check

1. Why does direct URL navigation (e.g., `/products/42`) return a 404 on a deployed Angular app, and how do you fix it on Netlify?
2. What is the difference between Angular's `environment.ts` system and platform environment variables (Netlify/Vercel env vars)?
3. You deployed to GitHub Pages but the app shows a blank white page. What are the two most likely causes?
4. In `firebase.json`, why should `index.html` have `Cache-Control: no-cache` while JS/CSS files can be cached for a year?

<details>
<summary>Show answers</summary>

1. Angular uses the browser History API for client-side routing. When a user navigates directly to `/products/42`, the server looks for a file at that path — which doesn't exist. Only `index.html` exists. Fix on Netlify: add a `netlify.toml` with `[[redirects]] from="/*" to="/index.html" status=200`, which tells Netlify to serve `index.html` (with status 200, not 301) for every path and let Angular's router handle the URL.
2. Angular's `environment.ts` system bakes values **into the compiled JavaScript bundle at build time** — they become literals in the JS code. Platform env vars (Netlify/Vercel) are available **during the build process** as environment variables in the shell, or at runtime on the server — but Angular apps have no server at runtime (they're static files). This means platform env vars are not directly accessible in Angular's runtime code; they must be injected during the build step via file replacements or a script that writes `environment.prod.ts` before `ng build` runs.
3. (1) **Wrong `--base-href` flag** — GitHub Pages serves from a subdirectory (`/my-repo-name/`) but Angular's base href defaults to `/`, so all asset paths are wrong. Fix: `ng build --base-href /my-repo-name/`. (2) **Wrong publish directory** — the CI/deploy tool is pointing at `dist/my-angular-app/` instead of `dist/my-angular-app/browser/` where `index.html` actually lives.
4. Angular's production build **hashes the filenames** of all JS and CSS bundles (e.g., `main-abc123.js`). The hash changes every time the file's content changes, so a file with a given hash name is **immutable** — it will never change. It's safe to cache these forever. `index.html`, however, always has the same filename and is what loads the latest hashed bundle filenames. If `index.html` is cached, users will load old bundle filenames even after a new deploy. Setting `no-cache` on `index.html` means the browser always fetches the latest version, which then loads the correctly-hashed JS/CSS.

</details>

---

**Next up — [Section 25: Final Review and Next Steps](../Section%2025%20-%20Final%20Review%20and%20Next%20Steps/README.md)**
We wrap up the course with an Angular v22 recap, common interview questions, a comparison with Next.js, and a career and learning path for what comes after.
