# Section 16 — Authentication and Guards

> Angular v22 Course — Section 16 of 25 | Estimated time: 3.5 hours | Level: Intermediate–Advanced

Authentication is the process of verifying that a user is who they claim to be, while **route guards** protect pages that should only be accessible to authenticated (or authorised) users. Angular v22 makes both clean with functional guards (`CanActivateFn`), Signals-based `AuthService`, and JWT bearer tokens via an HTTP interceptor.

---

## Table of Contents

1. [Authentication Flow Overview](#1-authentication-flow-overview)
2. [Login Page](#2-login-page)
3. [Register Page](#3-register-page)
4. [Token Storage](#4-token-storage)
5. [Auth Service](#5-auth-service)
6. [Route Guards](#6-route-guards)
7. [Protected Routes](#7-protected-routes)
8. [Role-Based Access](#8-role-based-access)
9. [Logout](#9-logout)
10. [Auth Best Practices](#10-auth-best-practices)
- [Section 16 Recap](#-section-16-recap)
- [Knowledge Check](#knowledge-check)

---

## 1. Authentication Flow Overview

A typical JWT-based Angular authentication flow:

```
Browser                      Angular App                    API Server
  │                               │                              │
  │  1. User submits login form   │                              │
  │──────────────────────────────►│                              │
  │                               │  2. POST /auth/login         │
  │                               │─────────────────────────────►│
  │                               │  3. { access_token, user }   │
  │                               │◄─────────────────────────────│
  │                               │  4. Store token in memory    │
  │                               │     or localStorage          │
  │  5. Redirect to /dashboard    │                              │
  │◄──────────────────────────────│                              │
  │                               │                              │
  │  6. User visits /admin        │                              │
  │──────────────────────────────►│                              │
  │                               │  7. canActivate guard runs   │
  │                               │     checks token + role      │
  │                               │  8. Token valid → allow      │
  │                               │     Token invalid → /login   │
  │  9. HTTP request to /api/**   │                              │
  │  10. Interceptor adds Bearer  │                              │
  │──────────────────────────────►├──────────────────────────────►
  │                               │  Authorization: Bearer <jwt> │
```

**Key pieces:**
- `AuthService` — owns the token and current user state
- `LoginComponent` / `RegisterComponent` — UI forms
- `TokenStorage` — abstraction over storage mechanism
- `authGuard` — functional `CanActivateFn` that checks auth
- `roleGuard` — functional guard that checks roles
- `AuthInterceptor` — attaches JWT to every outgoing HTTP request

---

## 2. Login Page

In Angular v22 use Signal Forms or reactive forms. Here we use `FormBuilder` with validators:

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <h2>Sign In</h2>

      <label>Email
        <input formControlName="email" type="email" />
        @if (form.get('email')?.invalid && form.get('email')?.touched) {
          <span class="error">Valid email required</span>
        }
      </label>

      <label>Password
        <input formControlName="password" type="password" />
        @if (form.get('password')?.invalid && form.get('password')?.touched) {
          <span class="error">Min 8 characters</span>
        }
      </label>

      @if (auth.error()) {
        <p class="server-error">{{ auth.error() }}</p>
      }

      <button type="submit" [disabled]="form.invalid || auth.loading()">
        {{ auth.loading() ? 'Signing in…' : 'Sign In' }}
      </button>
    </form>
  `,
})
export class LoginComponent {
  private fb     = inject(FormBuilder);
  private router = inject(Router);
  auth           = inject(AuthService);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async submit(): Promise<void> {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    const ok = await this.auth.login(email!, password!);
    if (ok) this.router.navigate(['/dashboard']);
  }
}
```

---

## 3. Register Page

```typescript
import { Component, inject } from '@angular/core';
import {
  FormBuilder, Validators, AbstractControl,
  ValidationErrors, ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Custom validator: ensures password and confirmPassword match */
function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const pw  = group.get('password')?.value;
  const cpw = group.get('confirmPassword')?.value;
  return pw === cpw ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <h2>Create Account</h2>

      <input formControlName="name"  placeholder="Full name" />
      <input formControlName="email" type="email" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Password" />
      <input formControlName="confirmPassword" type="password" placeholder="Confirm password" />

      @if (form.errors?.['passwordMismatch'] && form.touched) {
        <p class="error">Passwords do not match.</p>
      }

      @if (auth.error()) {
        <p class="server-error">{{ auth.error() }}</p>
      }

      <button [disabled]="form.invalid || auth.loading()">
        {{ auth.loading() ? 'Creating account…' : 'Register' }}
      </button>
    </form>
  `,
})
export class RegisterComponent {
  private fb     = inject(FormBuilder);
  private router = inject(Router);
  auth           = inject(AuthService);

  form = this.fb.group({
    name:            ['', [Validators.required, Validators.minLength(2)]],
    email:           ['', [Validators.required, Validators.email]],
    password:        ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatch });

  async submit(): Promise<void> {
    if (this.form.invalid) return;
    const { name, email, password } = this.form.value;
    const ok = await this.auth.register(name!, email!, password!);
    if (ok) this.router.navigate(['/dashboard']);
  }
}
```

---

## 4. Token Storage

Tokens can live in one of three places:

| Storage | XSS Risk | CSRF Risk | Notes |
|---------|----------|-----------|-------|
| `localStorage` | High (JS readable) | None | Convenient but risky |
| `sessionStorage` | High | None | Cleared on tab close |
| `httpOnly Cookie` | None | Moderate | Safest; needs backend support |
| In-memory | None | None | Lost on refresh |

For a course environment we use `localStorage`. For production, prefer `httpOnly` cookies or in-memory with a silent-refresh flow.

```typescript
export class TokenStorage {
  private readonly KEY = 'auth_token';

  save(token: string): void {
    localStorage.setItem(this.KEY, token);
  }

  get(): string | null {
    return localStorage.getItem(this.KEY);
  }

  clear(): void {
    localStorage.removeItem(this.KEY);
  }

  isPresent(): boolean {
    return this.get() !== null;
  }
}
```

---

## 5. Auth Service

The `AuthService` is the single source of truth for authentication state:

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http    = inject(HttpClient);
  private storage = inject(TokenStorage);

  private _user    = signal<User | null>(null);
  private _loading = signal(false);
  private _error   = signal<string | null>(null);

  readonly user    = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error   = this._error.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly role       = computed(() => this._user()?.role ?? null);

  constructor() {
    // Rehydrate from token on app start
    const token = this.storage.get();
    if (token) this.loadProfile(token);
  }

  async login(email: string, password: string): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);
    try {
      const res = await firstValueFrom(
        this.http.post<LoginResponse>('/api/auth/login', { email, password })
      );
      this.storage.save(res.access_token);
      this._user.set(res.user);
      return true;
    } catch (err: any) {
      this._error.set(err.error?.message ?? 'Login failed');
      return false;
    } finally {
      this._loading.set(false);
    }
  }

  logout(): void {
    this.storage.clear();
    this._user.set(null);
  }
}
```

---

## 6. Route Guards

Angular v22 uses **functional guards** — plain functions that return `boolean | UrlTree`. No class, no `implements CanActivate`.

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  // Redirect to login with return URL
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: router.url },
  });
};
```

Apply a guard in route config:

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard],
}
```

---

## 7. Protected Routes

Group protected routes under a parent with the guard to avoid repeating it:

```typescript
export const routes: Routes = [
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Everything under /app is protected
  {
    path: 'app',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile',   component: ProfileComponent },
      {
        path: 'admin',
        canActivate: [roleGuard('admin')],
        component: AdminComponent,
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
```

---

## 8. Role-Based Access

Create a factory guard that accepts a required role:

```typescript
export const roleGuard = (requiredRole: string): CanActivateFn => {
  return () => {
    const auth   = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
      return router.createUrlTree(['/login']);
    }

    if (auth.role() === requiredRole) return true;

    return router.createUrlTree(['/forbidden']);
  };
};
```

In templates, hide UI elements based on role:

```typescript
@if (auth.role() === 'admin') {
  <button routerLink="/admin">Admin Panel</button>
}
```

---

## 9. Logout

```typescript
@Component({
  selector: 'app-nav',
  standalone: true,
  template: `
    @if (auth.isLoggedIn()) {
      <span>{{ auth.user()?.name }}</span>
      <button (click)="logout()">Sign Out</button>
    } @else {
      <a routerLink="/login">Sign In</a>
    }
  `,
})
export class NavComponent {
  auth   = inject(AuthService);
  router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
```

---

## 10. Auth Best Practices

1. **Never store sensitive data in the token payload.** JWTs are base64-encoded, not encrypted. Anyone can decode the payload.

2. **Use short-lived access tokens.** 15 minutes is common. Use a refresh token flow for silent renewal.

3. **Prefer `httpOnly` cookies over `localStorage` in production.** JavaScript cannot read `httpOnly` cookies, eliminating XSS-based token theft.

4. **Revoke tokens on logout server-side.** Add tokens to a denylist or use short expiry + refresh rotation.

5. **Validate roles on the server.** Frontend role guards are UX conveniences. Always enforce permissions in API middleware.

6. **Use HTTPS everywhere.** Tokens in transit must be encrypted.

7. **Handle token expiry gracefully.** Use the HTTP interceptor to detect 401 responses and either refresh silently or redirect to login.

8. **Don't hardcode secrets.** API keys and client secrets belong in environment variables, not in the Angular source.

---

## ✅ Section 16 Recap

| Piece | What it does |
|-------|-------------|
| `AuthService` | Owns token + current user signals |
| `TokenStorage` | Abstracts localStorage/cookie access |
| `AuthInterceptor` | Attaches `Authorization: Bearer` header |
| `authGuard` | Blocks unauthenticated navigation |
| `roleGuard(role)` | Blocks users with wrong role |
| Route config | Groups protected routes under one `canActivate` |

---

## Knowledge Check

<details>
<summary>Q1: Why are Angular v22 route guards functions and not classes?</summary>

**A:** Angular introduced functional guards (`CanActivateFn`) to simplify the API and reduce boilerplate. Functions are tree-shakeable and easier to compose. They use `inject()` for DI inside the function body, which works because Angular calls the guard inside an injection context. Class-based guards that `implements CanActivate` still work but are deprecated.
</details>

<details>
<summary>Q2: What is a UrlTree and why does a guard return one instead of false?</summary>

**A:** A `UrlTree` (created by `router.createUrlTree(['/login'])`) is an object that represents a navigation destination. When a guard returns a `UrlTree`, Angular automatically redirects to that route instead of just blocking navigation. Returning `false` blocks but doesn't redirect — the user sees a blank page. Returning a `UrlTree` gives a better UX and preserves the return URL.
</details>

<details>
<summary>Q3: What is the difference between localStorage and an httpOnly cookie for token storage?</summary>

**A:** `localStorage` is accessible to any JavaScript on the page, making tokens vulnerable to XSS attacks. An `httpOnly` cookie is set by the server, cannot be read by JavaScript, and is sent automatically with every same-origin request — eliminating XSS theft at the cost of CSRF risk (mitigated with `SameSite=Strict` or CSRF tokens). For production apps, `httpOnly` cookies are strongly preferred.
</details>

<details>
<summary>Q4: How does the Auth Interceptor attach the token without breaking unauthenticated requests?</summary>

**A:** The interceptor reads the token from `TokenStorage`. If a token exists, it clones the request and adds the `Authorization` header. If no token exists, it passes the request through unchanged. This means public endpoints (login, register, static assets) work normally while authenticated endpoints receive the header automatically.
</details>

<details>
<summary>Q5: Why should you enforce role checks on the server, not just the frontend?</summary>

**A:** Frontend guards are UX conveniences — they prevent the user from navigating to a page they shouldn't see. But a determined user can bypass Angular's router (e.g., via curl or DevTools). The API must independently validate the JWT and check roles on every protected endpoint. Frontend and backend enforcement are both necessary and complementary.
</details>

---

**Next up —** [Section 17 — UI, Styling, and Accessibility](../Section%2017%20-%20UI%2C%20Styling%2C%20and%20Accessibility/README.md)
