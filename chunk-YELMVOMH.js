import"./chunk-JS3ZFT6L.js";var e={id:16,title:"Authentication and Guards",titleEn:"Authentication and Guards",level:"\u0645\u062A\u0648\u0633\u0637 \u2013 \u0645\u062A\u0642\u062F\u0645",levelEn:"Intermediate\u2013Advanced",intro:"Authentication \u0647\u064A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u062A\u0646\u0641\u064A\u0630 JWT Authentication \u0641\u064A Angular v22: \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644\u060C \u062D\u0641\u0638 \u0627\u0644\u062A\u0648\u0643\u0646\u060C Route Guards\u060C \u0627\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u0627\u0644\u0648\u0635\u0648\u0644 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u062F\u0648\u0627\u0631\u060C \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C.",introEn:"Authentication is the process of verifying who a user is. This section covers implementing JWT Authentication in Angular v22: login, token storage, route guards, role-based access control, and logout.",lessons:["JWT Authentication Concept","AuthService","Login Form","Secure Token Storage","authGuard","Role-Based Access Control","Logout","Automatic Token Refresh"],lessonsEn:["JWT Authentication Concept","AuthService","Login Form","Secure Token Storage","authGuard","Role-Based Access Control","Logout","Automatic Token Refresh"],content:[{type:"heading",text:"\u0645\u0641\u0647\u0648\u0645 JWT Authentication"},{type:"paragraph",text:"JWT (JSON Web Token) \u0647\u0648 \u0645\u0639\u064A\u0627\u0631 \u0644\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0628\u0634\u0643\u0644 \u0622\u0645\u0646 \u0628\u064A\u0646 \u0637\u0631\u0641\u064A\u0646. \u0641\u064A Angular:"},{type:"list",items:["1. \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u064A\u064F\u0631\u0633\u0644 email + password \u0644\u0644\u0640 API","2. \u0627\u0644\u0640 API \u064A\u064F\u0631\u062C\u0639 JWT token (\u0633\u0644\u0633\u0644\u0629 \u0645\u0634\u0641\u0651\u0631\u0629)","3. Angular \u064A\u062D\u0641\u0638 \u0627\u0644\u062A\u0648\u0643\u0646 (localStorage \u0623\u0648 sessionStorage)","4. \u0643\u0644 \u0637\u0644\u0628 HTTP \u064A\u064F\u0631\u0633\u0644 \u0627\u0644\u062A\u0648\u0643\u0646 \u0641\u064A Authorization header","5. \u0639\u0646\u062F \u0627\u0646\u062A\u0647\u0627\u0621 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062A\u0648\u0643\u0646\u060C Angular \u064A\u064F\u0639\u064A\u062F Routing \u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062F\u062E\u0648\u0644"]},{type:"heading",text:"\u062E\u062F\u0645\u0629 Authentication (AuthService)"},{type:"code",code:`import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY  = 'auth_user';

  private _user  = signal<User | null>(this.loadUser());
  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  readonly user        = this._user.asReadonly();
  readonly isLoggedIn  = computed(() => this._token() !== null);
  readonly isAdmin     = computed(() => this._user()?.role === 'admin');
  readonly currentRole = computed(() => this._user()?.role ?? null);

  login(email: string, password: string) {
    return this.http.post<LoginResponse>('/api/auth/login', { email, password }).pipe(
      tap(({ token, user }) => {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this._token.set(token);
        this._user.set(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private loadUser(): User | null {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}`},{type:"heading",text:"\u062D\u0627\u0631\u0633 Authentication (authGuard)"},{type:"code",code:`import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// \u062D\u0627\u0631\u0633 Authentication \u2014 \u064A\u0645\u0646\u0639 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u063A\u064A\u0631 \u0627\u0644\u0645\u0633\u062C\u0651\u0644\u064A\u0646
export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// \u062D\u0627\u0631\u0633 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u2014 \u064A\u0645\u0646\u0639 \u0627\u0644\u0648\u0635\u0648\u0644 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0631
export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/forbidden']);
};

// \u062A\u0637\u0628\u064A\u0642\u0647\u0645\u0627 \u0641\u064A Routes:
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
      .then(m => m.adminRoutes),
    canActivate: [authGuard, adminGuard],
  },
];`},{type:"heading",text:"\u0627\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u0627\u0644\u0648\u0635\u0648\u0644 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u062F\u0648\u0627\u0631"},{type:"code",code:`// \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628: \u0625\u062E\u0641\u0627\u0621/\u0625\u0638\u0647\u0627\u0631 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u062F\u0648\u0631
@Component({
  template: \`
    @if (auth.isLoggedIn()) {
      <span>\u0645\u0631\u062D\u0628\u0627\u064B\u060C {{ auth.user()?.name }}</span>

      @if (auth.isAdmin()) {
        <a routerLink="/admin">\u0644\u0648\u062D\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</a>
      }

      <button (click)="auth.logout()">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C</button>
    } @else {
      <a routerLink="/login">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644</a>
    }
  \`
})
export class NavbarComponent {
  auth = inject(AuthService);
}

// \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0628\u0645\u0631\u0648\u0646\u0629
hasRole(role: string): boolean {
  return this.auth.currentRole() === role;
}

hasAnyRole(roles: string[]): boolean {
  return roles.includes(this.auth.currentRole() ?? '');
}`},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u064A\u064F\u0639\u0627\u062F Routing \u0644\u0631\u0627\u0628\u0637 /login \u0645\u0639 returnUrl \u0643\u0645\u0639\u0627\u0645\u0644 \u0627\u0633\u062A\u0639\u0644\u0627\u0645\u061F",answer:"\u0628\u0639\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u0646\u0627\u062C\u062D\u060C \u064A\u0645\u0643\u0646 \u0644\u0640 Angular \u0642\u0631\u0627\u0621\u0629 returnUrl \u0648\u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0644\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u064A \u062D\u0627\u0648\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u064A\u0647\u0627 \u0623\u0635\u0644\u0627\u064B \u2014 \u062A\u062C\u0631\u0628\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0641\u0636\u0644 \u0628\u0643\u062B\u064A\u0631 \u0645\u0646 \u0625\u0639\u0627\u062F\u0629 Routing \u0627\u0644\u062F\u0627\u0626\u0645 \u0644\u0644\u0631\u0626\u064A\u0633\u064A\u0629."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 \u062D\u0627\u0631\u0633 CanActivateFn \u0648CanMatchFn\u061F",answer:"CanActivateFn \u064A\u064F\u0634\u063A\u064E\u0651\u0644 \u0639\u0646\u062F \u0627\u0644\u062A\u0646\u0642\u0644 \u0644\u0645\u0633\u0627\u0631 \u2014 \u064A\u0645\u0643\u0646\u0647 \u0625\u0639\u0627\u062F\u0629 Routing. CanMatchFn \u064A\u064F\u0634\u063A\u064E\u0651\u0644 \u0642\u0628\u0644 \u0623\u0646 \u064A\u064F\u062D\u0645\u064E\u0651\u0644 \u0627\u0644\u0645\u0633\u0627\u0631 \u2014 \u064A\u064F\u0642\u0631\u0631 \u0647\u0644 \u064A\u064F\u0637\u0627\u0628\u064E\u0642 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u0627\u0631 \u0623\u0635\u0644\u0627\u064B (\u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0645\u0633\u0627\u0631\u0627\u062A \u0645\u062A\u0639\u062F\u062F\u0629 \u0628\u0646\u0641\u0633 \u0627\u0644\u0640 path \u0644\u0643\u0646 \u0642\u0648\u0627\u0639\u062F \u0645\u062E\u062A\u0644\u0641\u0629)."}],contentEn:[{type:"heading",text:"JWT Authentication Concept"},{type:"paragraph",text:"JWT (JSON Web Token) is a standard for securely sending information between two parties. In Angular:"},{type:"list",items:["1. User sends email + password to the API","2. API returns a JWT token (encoded string)","3. Angular saves the token (localStorage or sessionStorage)","4. Every HTTP request sends the token in the Authorization header","5. When the token expires, Angular redirects to the login page"]},{type:"heading",text:"AuthService"},{type:"code",code:`import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface User {
  id: number; name: string; email: string;
  role: 'admin' | 'editor' | 'viewer';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY  = 'auth_user';

  private _user  = signal<User | null>(this.loadUser());
  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  readonly user        = this._user.asReadonly();
  readonly isLoggedIn  = computed(() => this._token() !== null);
  readonly isAdmin     = computed(() => this._user()?.role === 'admin');
  readonly currentRole = computed(() => this._user()?.role ?? null);

  login(email: string, password: string) {
    return this.http.post<{token: string; user: User}>('/api/auth/login', { email, password }).pipe(
      tap(({ token, user }) => {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this._token.set(token);
        this._user.set(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return this._token(); }

  private loadUser(): User | null {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  }
}`},{type:"heading",text:"authGuard"},{type:"code",code:`import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Auth guard \u2014 prevents access for unauthenticated users
export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// Role guard \u2014 prevents access based on role
export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) return true;
  return router.createUrlTree(['/forbidden']);
};

// Applied to routes:
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [authGuard, adminGuard],
  },
];`},{type:"heading",text:"Role-Based Access Control"},{type:"code",code:`// In templates: show/hide based on role
@Component({
  template: \`
    @if (auth.isLoggedIn()) {
      <span>Welcome, {{ auth.user()?.name }}</span>

      @if (auth.isAdmin()) {
        <a routerLink="/admin">Admin Panel</a>
      }

      <button (click)="auth.logout()">Log Out</button>
    } @else {
      <a routerLink="/login">Log In</a>
    }
  \`
})
export class NavbarComponent {
  auth = inject(AuthService);
}`},{type:"qa",question:"Why redirect to /login with a returnUrl query parameter?",answer:"After a successful login, Angular can read returnUrl and redirect the user back to the page they were trying to access originally \u2014 a much better UX than always redirecting to the home page."},{type:"qa",question:"What is the difference between CanActivateFn and CanMatchFn?",answer:"CanActivateFn runs during navigation to a route \u2014 it can redirect. CanMatchFn runs before a route is even matched \u2014 it decides whether the route matches at all (used for multiple routes at the same path but with different matching rules, e.g., for different roles)."}]};export{e as default};
