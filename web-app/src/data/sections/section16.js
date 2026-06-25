// Section 16 — Authentication and Guards
export default {
  id: 16,
  title: 'المصادقة والحماية',
  titleEn: 'Authentication and Guards',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'المصادقة هي عملية التحقق من هوية المستخدم. هذا القسم يغطي تنفيذ JWT Authentication في Angular v22: تسجيل الدخول، حفظ التوكن، حراس المسار، التحكم في الوصول بناءً على الأدوار، وتسجيل الخروج.',
  introEn: 'Authentication is the process of verifying who a user is. This section covers implementing JWT Authentication in Angular v22: login, token storage, route guards, role-based access control, and logout.',

  lessons: [
    'مفهوم JWT Authentication',
    'خدمة المصادقة (AuthService)',
    'نموذج تسجيل الدخول',
    'حفظ التوكن بأمان',
    'حارس المصادقة (authGuard)',
    'التحكم في الوصول بناءً على الأدوار',
    'تسجيل الخروج',
    'تجديد التوكن تلقائياً',
  ],
  lessonsEn: [
    'JWT Authentication Concept',
    'AuthService',
    'Login Form',
    'Secure Token Storage',
    'authGuard',
    'Role-Based Access Control',
    'Logout',
    'Automatic Token Refresh',
  ],

  content: [
    { type: 'heading', text: 'مفهوم JWT Authentication' },
    { type: 'paragraph', text: 'JWT (JSON Web Token) هو معيار لإرسال المعلومات بشكل آمن بين طرفين. في Angular:' },
    {
      type: 'list',
      items: [
        '1. المستخدم يُرسل email + password للـ API',
        '2. الـ API يُرجع JWT token (سلسلة مشفّرة)',
        '3. Angular يحفظ التوكن (localStorage أو sessionStorage)',
        '4. كل طلب HTTP يُرسل التوكن في Authorization header',
        '5. عند انتهاء صلاحية التوكن، Angular يُعيد التوجيه لصفحة الدخول',
      ],
    },

    { type: 'heading', text: 'خدمة المصادقة (AuthService)' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed, inject } from '@angular/core';
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
}`,
    },

    { type: 'heading', text: 'حارس المصادقة (authGuard)' },
    {
      type: 'code',
      code: `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// حارس المصادقة — يمنع الوصول لغير المسجّلين
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

// حارس الأدوار — يمنع الوصول بناءً على الدور
export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/forbidden']);
};

// تطبيقهما في المسارات:
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
];`,
    },

    { type: 'heading', text: 'التحكم في الوصول بناءً على الأدوار' },
    {
      type: 'code',
      code: `// في القالب: إخفاء/إظهار بناءً على الدور
@Component({
  template: \`
    @if (auth.isLoggedIn()) {
      <span>مرحباً، {{ auth.user()?.name }}</span>

      @if (auth.isAdmin()) {
        <a routerLink="/admin">لوحة الإدارة</a>
      }

      <button (click)="auth.logout()">تسجيل الخروج</button>
    } @else {
      <a routerLink="/login">تسجيل الدخول</a>
    }
  \`
})
export class NavbarComponent {
  auth = inject(AuthService);
}

// التحقق من الأدوار بمرونة
hasRole(role: string): boolean {
  return this.auth.currentRole() === role;
}

hasAnyRole(roles: string[]): boolean {
  return roles.includes(this.auth.currentRole() ?? '');
}`,
    },
    {
      type: 'qa',
      question: 'لماذا يُعاد التوجيه لرابط /login مع returnUrl كمعامل استعلام؟',
      answer: 'بعد تسجيل الدخول الناجح، يمكن لـ Angular قراءة returnUrl وإعادة توجيه المستخدم للصفحة التي حاول الوصول إليها أصلاً — تجربة مستخدم أفضل بكثير من إعادة التوجيه الدائم للرئيسية.',
    },
    {
      type: 'qa',
      question: 'ما الفرق بين حارس CanActivateFn وCanMatchFn؟',
      answer: 'CanActivateFn يُشغَّل عند التنقل لمسار — يمكنه إعادة التوجيه. CanMatchFn يُشغَّل قبل أن يُحمَّل المسار — يُقرر هل يُطابَق هذا المسار أصلاً (يُستخدم لمسارات متعددة بنفس الـ path لكن قواعد مختلفة).',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'JWT Authentication Concept' },
    { type: 'paragraph', text: 'JWT (JSON Web Token) is a standard for securely sending information between two parties. In Angular:' },
    {
      type: 'list',
      items: [
        '1. User sends email + password to the API',
        '2. API returns a JWT token (encoded string)',
        '3. Angular saves the token (localStorage or sessionStorage)',
        '4. Every HTTP request sends the token in the Authorization header',
        '5. When the token expires, Angular redirects to the login page',
      ],
    },

    { type: 'heading', text: 'AuthService' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed, inject } from '@angular/core';
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
}`,
    },

    { type: 'heading', text: 'authGuard' },
    {
      type: 'code',
      code: `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Auth guard — prevents access for unauthenticated users
export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// Role guard — prevents access based on role
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
];`,
    },

    { type: 'heading', text: 'Role-Based Access Control' },
    {
      type: 'code',
      code: `// In templates: show/hide based on role
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
}`,
    },
    {
      type: 'qa',
      question: 'Why redirect to /login with a returnUrl query parameter?',
      answer: 'After a successful login, Angular can read returnUrl and redirect the user back to the page they were trying to access originally — a much better UX than always redirecting to the home page.',
    },
    {
      type: 'qa',
      question: 'What is the difference between CanActivateFn and CanMatchFn?',
      answer: 'CanActivateFn runs during navigation to a route — it can redirect. CanMatchFn runs before a route is even matched — it decides whether the route matches at all (used for multiple routes at the same path but with different matching rules, e.g., for different roles).',
    },
  ],
};
