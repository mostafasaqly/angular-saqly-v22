// auth.guard.ts
// Functional route guard for protecting admin routes

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Store the attempted URL for redirecting after login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.hasRole('admin')) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};

// ---------------------------------------------------------------------------
// auth.service.ts (inline for completeness — move to its own file in production)
// ---------------------------------------------------------------------------
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'admin_auth_token';
  private readonly USER_KEY = 'admin_user';

  // Signal-based auth state
  private _token = signal<string | null>(localStorage.getItem(this.STORAGE_KEY));
  private _user = signal<{ name: string; role: string } | null>(
    JSON.parse(localStorage.getItem(this.USER_KEY) ?? 'null')
  );

  readonly token = this._token.asReadonly();
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  login(username: string, password: string): boolean {
    // Demo login — replace with real API call
    if (username === 'admin' && password === 'admin123') {
      const fakeToken = 'demo-jwt-token-' + Date.now();
      const fakeUser = { name: 'Admin User', role: 'admin' };
      localStorage.setItem(this.STORAGE_KEY, fakeToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(fakeUser));
      this._token.set(fakeToken);
      this._user.set(fakeUser);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._token.set(null);
    this._user.set(null);
  }

  isLoggedIn(): boolean {
    return !!this._token();
  }

  hasRole(role: string): boolean {
    return this._user()?.role === role;
  }
}
