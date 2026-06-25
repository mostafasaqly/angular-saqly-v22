import"./chunk-JS3ZFT6L.js";var e={id:22,title:"\u0645\u0634\u0631\u0648\u0639: \u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0625\u062F\u0627\u0631\u064A\u0629",titleEn:"Project: Admin Dashboard",level:"\u0645\u062A\u0648\u0633\u0637 \u2013 \u0645\u062A\u0642\u062F\u0645",levelEn:"Intermediate\u2013Advanced",intro:"\u0628\u0646\u0627\u0621 \u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0625\u062F\u0627\u0631\u064A\u0629 \u0643\u0627\u0645\u0644\u0629 \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629 \u0641\u064A Angular v22. \u0633\u062A\u0628\u0646\u064A: \u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u060C Authentication\u060C Routing \u0627\u0644\u0645\u062D\u0645\u064A\u060C \u062C\u062F\u0648\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639 \u0641\u0644\u062A\u0631\u0629 \u0648\u062A\u0631\u062A\u064A\u0628\u060C \u0646\u0645\u0627\u0630\u062C CRUD\u060C \u0648\u0625\u062F\u0627\u0631\u0629 \u062D\u0627\u0644\u0629 \u0645\u0631\u0643\u0632\u064A\u0629 \u0628\u0640 Signals.",introEn:"Build a complete admin dashboard step by step in Angular v22. You will build: project structure, authentication, protected routing, a data table with filtering and sorting, CRUD forms, and centralized state management with Signals.",lessons:["\u0627\u0644\u062E\u0637\u0648\u0629 1 \u2014 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0644\u0641\u0627\u062A","\u0627\u0644\u062E\u0637\u0648\u0629 2 \u2014 \u0625\u0639\u062F\u0627\u062F AuthService \u0648\u0627\u0644\u0640 Guard","\u0627\u0644\u062E\u0637\u0648\u0629 3 \u2014 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0640 Routing","\u0627\u0644\u062E\u0637\u0648\u0629 4 \u2014 \u0628\u0646\u0627\u0621 Layout (Sidebar + Topbar)","\u0627\u0644\u062E\u0637\u0648\u0629 5 \u2014 \u0625\u0646\u0634\u0627\u0621 UsersStore","\u0627\u0644\u062E\u0637\u0648\u0629 6 \u2014 \u0628\u0646\u0627\u0621 \u062C\u062F\u0648\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639 \u0627\u0644\u0641\u0644\u062A\u0631\u0629","\u0627\u0644\u062E\u0637\u0648\u0629 7 \u2014 \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629 / \u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645","\u0627\u0644\u062E\u0637\u0648\u0629 8 \u2014 \u0631\u0628\u0637 \u0643\u0644 \u0634\u064A\u0621 \u0645\u0639\u0627\u064B"],lessonsEn:["Step 1 \u2014 Create Project and File Structure","Step 2 \u2014 AuthService and Guard Setup","Step 3 \u2014 Routing Configuration","Step 4 \u2014 Build Layout (Sidebar + Topbar)","Step 5 \u2014 Create UsersStore","Step 6 \u2014 Data Table with Filtering and Sorting","Step 7 \u2014 Add / Edit User Form","Step 8 \u2014 Wire Everything Together"],content:[{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 1 \u2014 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0644\u0641\u0627\u062A"},{type:"paragraph",text:"\u0627\u0628\u062F\u0623 \u0628\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D \u0642\u0628\u0644 \u0643\u062A\u0627\u0628\u0629 \u0623\u064A \u0643\u0648\u062F."},{type:"code",code:`# \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0648\u0639
ng new admin-dashboard --standalone --routing --style=css
cd admin-dashboard`},{type:"paragraph",text:"\u0623\u0646\u0634\u0626 \u0647\u0630\u0627 \u0627\u0644\u0647\u064A\u0643\u0644 \u064A\u062F\u0648\u064A\u0627\u064B \u062F\u0627\u062E\u0644 src/app/:"},{type:"code",code:`src/app/
\u251C\u2500\u2500 core/
\u2502   \u251C\u2500\u2500 auth/
\u2502   \u2502   \u251C\u2500\u2500 auth.service.ts      \u2190 \u062E\u062F\u0645\u0629 Authentication
\u2502   \u2502   \u2514\u2500\u2500 auth.guard.ts        \u2190 \u062D\u0627\u0631\u0633 \u0627\u0644\u0645\u0633\u0627\u0631
\u2502   \u251C\u2500\u2500 interceptors/
\u2502   \u2502   \u2514\u2500\u2500 auth.interceptor.ts  \u2190 \u064A\u064F\u0636\u064A\u0641 JWT \u0644\u0643\u0644 \u0637\u0644\u0628
\u2502   \u2514\u2500\u2500 layout/
\u2502       \u251C\u2500\u2500 layout.component.ts  \u2190 \u0627\u0644\u063A\u0644\u0627\u0641 \u0627\u0644\u0631\u0626\u064A\u0633\u064A
\u2502       \u251C\u2500\u2500 sidebar.component.ts \u2190 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629
\u2502       \u2514\u2500\u2500 topbar.component.ts  \u2190 \u0627\u0644\u0634\u0631\u064A\u0637 \u0627\u0644\u0639\u0644\u0648\u064A
\u2502
\u251C\u2500\u2500 features/
\u2502   \u251C\u2500\u2500 dashboard/
\u2502   \u2502   \u2514\u2500\u2500 dashboard.component.ts
\u2502   \u2514\u2500\u2500 users/
\u2502       \u251C\u2500\u2500 users.component.ts
\u2502       \u251C\u2500\u2500 user-table.component.ts
\u2502       \u251C\u2500\u2500 user-form.component.ts
\u2502       \u2514\u2500\u2500 users.store.ts       \u2190 \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646
\u2502
\u2514\u2500\u2500 app.routes.ts`},{type:"tip",text:"\u0647\u064A\u0643\u0644 core/features/shared \u0647\u0648 \u0627\u0644\u0646\u0645\u0637 \u0627\u0644\u0623\u0643\u062B\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u064B \u0641\u064A \u0645\u0634\u0627\u0631\u064A\u0639 Angular \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629. core \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629\u060C features \u0644\u0643\u0644 \u0645\u064A\u0632\u0629 \u0645\u0633\u062A\u0642\u0644\u0629."},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 2 \u2014 \u0625\u0639\u062F\u0627\u062F AuthService \u0648\u0627\u0644\u0640 Guard"},{type:"paragraph",text:"\u0623\u0646\u0634\u0626 \u062E\u062F\u0645\u0629 Authentication \u0623\u0648\u0644\u0627\u064B \u0644\u0623\u0646 \u0643\u0644 \u0634\u064A\u0621 \u0622\u062E\u0631 \u064A\u0639\u062A\u0645\u062F \u0639\u0644\u064A\u0647\u0627."},{type:"code",code:`// core/auth/auth.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface User { id: number; name: string; email: string; role: 'admin' | 'editor'; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user  = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  readonly isLoggedIn = computed(() => !!this._token());
  readonly user       = this._user.asReadonly();
  readonly isAdmin    = computed(() => this._user()?.role === 'admin');

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: User }>('/api/auth/login', { email, password })
      .pipe(tap(({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this._token.set(token);
        this._user.set(user);
      }));
  }

  logout() {
    localStorage.clear();
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  getToken() { return this._token(); }
}`},{type:"code",code:`// core/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 3 \u2014 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0640 Routing"},{type:"paragraph",text:"\u0639\u0631\u0651\u0641 Routes: \u0635\u0641\u062D\u0629 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u062F\u0648\u0646 \u062D\u0645\u0627\u064A\u0629\u060C \u0648\u0643\u0644 \u0635\u0641\u062D\u0627\u062A \u0627\u0644\u0644\u0648\u062D\u0629 \u0645\u062D\u0645\u064A\u0629 \u0628\u0640 authGuard."},{type:"code",code:`// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  // \u0635\u0641\u062D\u0629 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u2014 \u0628\u062F\u0648\u0646 \u062D\u0645\u0627\u064A\u0629
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login.component')
      .then(m => m.LoginComponent)
  },

  // \u0627\u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u2014 \u0645\u062D\u0645\u064A\u0629 \u0628\u0640 authGuard
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users.component')
          .then(m => m.UsersComponent)
      },
    ]
  },

  // \u0623\u064A \u0645\u0633\u0627\u0631 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641 \u2192 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629
  { path: '**', redirectTo: '' }
];`},{type:"code",code:`// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 4 \u2014 \u0628\u0646\u0627\u0621 Layout (Sidebar + Topbar)"},{type:"paragraph",text:"\u0627\u0644\u0640 Layout \u0647\u0648 \u0627\u0644\u063A\u0644\u0627\u0641 \u0627\u0644\u0630\u064A \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u0648\u0627\u0644\u0634\u0631\u064A\u0637 \u0627\u0644\u0639\u0644\u0648\u064A\u060C \u0648\u064A\u064F\u0639\u0631\u0636 <router-outlet> \u0641\u064A \u0627\u0644\u0645\u0646\u062A\u0635\u0641."},{type:"code",code:`// core/layout/layout.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: \`
    <div class="admin-layout">

      <!-- \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 -->
      <aside class="sidebar">
        <div class="sidebar-logo">Admin Panel</div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">\u{1F4CA} \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
          <a routerLink="/users"     routerLinkActive="active">\u{1F465} \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646</a>
          @if (auth.isAdmin()) {
            <a routerLink="/settings" routerLinkActive="active">\u2699\uFE0F \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</a>
          }
        </nav>
      </aside>

      <!-- \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0631\u0626\u064A\u0633\u064A -->
      <div class="admin-main">

        <!-- \u0627\u0644\u0634\u0631\u064A\u0637 \u0627\u0644\u0639\u0644\u0648\u064A -->
        <header class="topbar">
          <span>\u0645\u0631\u062D\u0628\u0627\u064B\u060C {{ auth.user()?.name }}</span>
          <button (click)="auth.logout()">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C</button>
        </header>

        <!-- \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u062D\u0627\u0644\u064A -->
        <main class="page-content">
          <router-outlet />
        </main>

      </div>
    </div>
  \`
})
export class LayoutComponent {
  auth = inject(AuthService);
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 5 \u2014 \u0625\u0646\u0634\u0627\u0621 UsersStore"},{type:"paragraph",text:"\u0627\u0644\u0640 Store \u0647\u0648 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0648\u062D\u064A\u062F \u0644\u0644\u062D\u0642\u064A\u0642\u0629 (Single Source of Truth) \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646. \u0643\u0644 Components \u062A\u0642\u0631\u0623 \u0645\u0646\u0647 \u0648\u062A\u0643\u062A\u0628 \u0639\u0628\u0631\u0647 \u0641\u0642\u0637."},{type:"code",code:`// features/users/users.store.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private http = inject(HttpClient);

  // \u2500\u2500 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629 (\u062E\u0627\u0635\u0629) \u2500\u2500
  private _users   = signal<User[]>([]);
  private _loading = signal(false);
  private _error   = signal<string | null>(null);

  // \u2500\u2500 \u0645\u0627 \u064A\u064F\u0643\u0634\u0641 \u0644\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A (\u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637) \u2500\u2500
  readonly users   = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error   = this._error.asReadonly();
  readonly count   = computed(() => this._users().length);
  readonly activeCount = computed(() =>
    this._users().filter(u => u.status === 'active').length
  );

  // \u2500\u2500 \u0627\u0644\u0623\u0641\u0639\u0627\u0644 (Actions) \u2500\u2500

  loadAll(): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<User[]>('/api/users').subscribe({
      next:  users => { this._users.set(users);        this._loading.set(false); },
      error: err   => { this._error.set(err.message);  this._loading.set(false); }
    });
  }

  add(data: Omit<User, 'id'>): void {
    this.http.post<User>('/api/users', data).subscribe(created => {
      this._users.update(list => [...list, created]);
    });
  }

  update(id: number, changes: Partial<User>): void {
    this.http.patch<User>(\`/api/users/\${id}\`, changes).subscribe(updated => {
      this._users.update(list => list.map(u => u.id === id ? updated : u));
    });
  }

  remove(id: number): void {
    this.http.delete(\`/api/users/\${id}\`).subscribe(() => {
      this._users.update(list => list.filter(u => u.id !== id));
    });
  }
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 6 \u2014 \u062C\u062F\u0648\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0639 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u062A\u0631\u062A\u064A\u0628"},{type:"paragraph",text:"\u062C\u062F\u0648\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u064A\u0642\u0631\u0623 \u0645\u0646 UsersStore \u0648\u064A\u064F\u0637\u0628\u0651\u0642 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0645\u062D\u0644\u064A\u0627\u064B \u0628\u0640 computed()."},{type:"code",code:`// features/users/user-table.component.ts
import { Component, inject, signal, computed, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersStore, User } from './users.store';

@Component({
  selector: 'app-user-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: \`
    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 -->
    <div class="toolbar">
      <input [(ngModel)]="search" placeholder="\u{1F50D} \u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F..." />
      <select [(ngModel)]="statusFilter">
        <option value="">\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
        <option value="active">\u0646\u0634\u0637</option>
        <option value="inactive">\u063A\u064A\u0631 \u0646\u0634\u0637</option>
      </select>
      <button (click)="editRequest.emit(null)">+ \u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645</button>
    </div>

    <!-- \u0627\u0644\u062C\u062F\u0648\u0644 -->
    @if (store.loading()) {
      <p>\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
    } @else {
      <table class="data-table">
        <thead>
          <tr>
            <th (click)="sort('name')"  class="sortable">
              \u0627\u0644\u0627\u0633\u0645 {{ sortIcon('name') }}
            </th>
            <th (click)="sort('email')" class="sortable">
              \u0627\u0644\u0628\u0631\u064A\u062F {{ sortIcon('email') }}
            </th>
            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
          </tr>
        </thead>
        <tbody>
          @for (user of rows(); track user.id) {
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span [class]="'badge ' + user.status">
                  {{ user.status === 'active' ? '\u0646\u0634\u0637' : '\u063A\u064A\u0631 \u0646\u0634\u0637' }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editRequest.emit(user)">\u270F\uFE0F \u062A\u0639\u062F\u064A\u0644</button>
                <button (click)="confirmDelete(user)" class="danger">\u{1F5D1}\uFE0F \u062D\u0630\u0641</button>
              </td>
            </tr>
          } @empty {
            <tr><td colspan="4" class="empty">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C</td></tr>
          }
        </tbody>
      </table>
      <p class="count">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: {{ rows().length }} \u0645\u0633\u062A\u062E\u062F\u0645</p>
    }
  \`
})
export class UserTableComponent {
  store = inject(UsersStore);

  // \u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u062A\u0631\u062A\u064A\u0628
  search       = '';
  statusFilter = '';
  sortCol      = signal<keyof User>('name');
  sortDir      = signal<'asc' | 'desc'>('asc');

  // \u0625\u062E\u0631\u0627\u062C \u0644\u0644\u0645\u0643\u0648\u0651\u0646 \u0627\u0644\u0623\u0628
  editRequest = output<User | null>();

  // \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u062D\u0633\u0648\u0628\u0629 \u0628\u0639\u062F \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u062A\u0631\u062A\u064A\u0628
  rows = computed(() => {
    let list = this.store.users();

    // \u0641\u0644\u062A\u0631\u0629 \u0628\u0627\u0644\u0628\u062D\u062B
    const q = this.search.toLowerCase().trim();
    if (q) list = list.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );

    // \u0641\u0644\u062A\u0631\u0629 \u0628\u0627\u0644\u062D\u0627\u0644\u0629
    if (this.statusFilter) list = list.filter(u => u.status === this.statusFilter);

    // \u0627\u0644\u062A\u0631\u062A\u064A\u0628
    const col = this.sortCol();
    const dir = this.sortDir() === 'asc' ? 1 : -1;
    return [...list].sort((a, b) =>
      String(a[col]).localeCompare(String(b[col])) * dir
    );
  });

  sort(col: keyof User) {
    if (this.sortCol() === col) {
      this.sortDir.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortCol.set(col);
      this.sortDir.set('asc');
    }
  }

  sortIcon(col: string) {
    if (this.sortCol() !== col) return '\u2195';
    return this.sortDir() === 'asc' ? '\u2191' : '\u2193';
  }

  confirmDelete(user: User) {
    if (confirm(\`\u062D\u0630\u0641 \${user.name}\u061F\`)) {
      this.store.remove(user.id);
    }
  }
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 7 \u2014 \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629 / \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645"},{type:"paragraph",text:"\u0646\u0645\u0648\u0630\u062C \u0648\u0627\u062D\u062F \u064A\u0639\u0645\u0644 \u0641\u064A \u0648\u0636\u0639\u064A\u0646: \u0625\u0636\u0627\u0641\u0629 (user = null) \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 (user = \u0643\u0627\u0626\u0646 \u0645\u0648\u062C\u0648\u062F)."},{type:"code",code:`// features/users/user-form.component.ts
import { Component, input, output, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersStore, User } from './users.store';

@Component({
  selector: 'app-user-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: \`
    <div class="dialog-backdrop" (click)="closed.emit()">
      <div class="dialog" (click)="$event.stopPropagation()">

        <h2>{{ user() ? '\u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645' : '\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F' }}</h2>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            \u0627\u0644\u0627\u0633\u0645
            <input formControlName="name" placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" />
          </label>

          <label>
            \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A
            <input formControlName="email" type="email" placeholder="example@mail.com" />
          </label>

          <label>
            \u0627\u0644\u062F\u0648\u0631
            <select formControlName="role">
              <option value="editor">\u0645\u062D\u0631\u0631</option>
              <option value="admin">\u0645\u062F\u064A\u0631</option>
            </select>
          </label>

          <label>
            \u0627\u0644\u062D\u0627\u0644\u0629
            <select formControlName="status">
              <option value="active">\u0646\u0634\u0637</option>
              <option value="inactive">\u063A\u064A\u0631 \u0646\u0634\u0637</option>
            </select>
          </label>

          <div class="form-actions">
            <button type="submit" [disabled]="form.invalid">
              {{ user() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629' }}
            </button>
            <button type="button" (click)="closed.emit()">\u0625\u0644\u063A\u0627\u0621</button>
          </div>
        </form>

      </div>
    </div>
  \`
})
export class UserFormComponent implements OnInit {
  user   = input<User | null>(null);   // null = \u0648\u0636\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u0629
  closed = output<void>();

  private fb    = inject(FormBuilder);
  private store = inject(UsersStore);

  form = this.fb.nonNullable.group({
    name:   ['', Validators.required],
    email:  ['', [Validators.required, Validators.email]],
    role:   ['editor'],
    status: ['active'],
  });

  ngOnInit() {
    // \u0625\u0630\u0627 \u0643\u0627\u0646 \u062A\u0639\u062F\u064A\u0644\u0627\u064B\u060C \u0627\u0645\u0644\u0623 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629
    const u = this.user();
    if (u) this.form.patchValue(u);
  }

  submit() {
    if (this.form.invalid) return;
    const u = this.user();
    if (u) {
      this.store.update(u.id, this.form.getRawValue());
    } else {
      this.store.add(this.form.getRawValue() as any);
    }
    this.closed.emit();
  }
}`},{type:"heading",text:"\u0627\u0644\u062E\u0637\u0648\u0629 8 \u2014 \u0631\u0628\u0637 \u0643\u0644 \u0634\u064A\u0621 \u0641\u064A UsersComponent"},{type:"paragraph",text:"\u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u064A\u062C\u0645\u0639 \u0627\u0644\u062C\u062F\u0648\u0644 \u0648\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0648\u064A\u064F\u062F\u064A\u0631 \u062D\u0627\u0644\u0629 \u0641\u062A\u062D/\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0640 Dialog."},{type:"code",code:`// features/users/users.component.ts
import { Component, signal, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { UsersStore, User } from './users.store';
import { UserTableComponent } from './user-table.component';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserTableComponent, UserFormComponent],
  template: \`
    <div class="page-header">
      <h1>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</h1>
      <span class="stat">
        {{ store.activeCount() }} \u0646\u0634\u0637 \u0645\u0646 \u0623\u0635\u0644 {{ store.count() }}
      </span>
    </div>

    <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 -->
    <app-user-table (editRequest)="openForm($event)" />

    <!-- \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u0636\u0627\u0641\u0629/\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u2014 \u064A\u0638\u0647\u0631 \u0641\u0642\u0637 \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629 -->
    @if (showForm()) {
      <app-user-form
        [user]="selectedUser()"
        (closed)="closeForm()"
      />
    }
  \`
})
export class UsersComponent implements OnInit {
  store       = inject(UsersStore);
  showForm    = signal(false);
  selectedUser = signal<User | null>(null);

  ngOnInit() {
    this.store.loadAll(); // \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0639\u0646\u062F \u0628\u062F\u0621 \u0627\u0644\u0635\u0641\u062D\u0629
  }

  openForm(user: User | null) {
    this.selectedUser.set(user);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.selectedUser.set(null);
  }
}`},{type:"tip",text:"\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062C\u0627\u0647\u0632 \u0627\u0644\u0622\u0646 \u0644\u0644\u062A\u0648\u0633\u0639 \u2014 \u0623\u0636\u0641 \u0635\u0641\u062D\u0629 Products \u0628\u0627\u062A\u0628\u0627\u0639 \u0646\u0641\u0633 \u0627\u0644\u0646\u0645\u0637: Store \u2192 Table \u2192 Form \u2192 Container. \u0643\u0644 \u0645\u064A\u0632\u0629 \u062C\u062F\u064A\u062F\u0629 \u062A\u062A\u0628\u0639 \u0646\u0641\u0633 \u0627\u0644\u0647\u064A\u0643\u0644."},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u0646\u0646\u0634\u0626 Store \u0645\u0646\u0641\u0635\u0644 \u0644\u0643\u0644 Feature \u0628\u062F\u0644\u0627\u064B \u0645\u0646 Store \u0648\u0627\u062D\u062F \u0639\u0627\u0645\u061F",answer:"\u0643\u0644 Store \u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u064A\u0632\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0642\u0637 \u2014 \u064A\u064F\u0633\u0647\u0651\u0644 Testing \u0648\u0627\u0644\u0635\u064A\u0627\u0646\u0629. \u0625\u0630\u0627 \u0627\u062D\u062A\u062C\u062A \u0645\u0634\u0627\u0631\u0643\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0628\u064A\u0646 features\u060C \u0623\u0646\u0634\u0626 store \u0645\u0634\u062A\u0631\u0643 \u0641\u064A core/ \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u062F\u0645\u062C \u0643\u0644 \u0634\u064A\u0621 \u0641\u064A \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 \u0648\u0636\u0639 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0641\u064A UserFormComponent\u061F",answer:"\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u064A\u0641\u062D\u0635 input user(). \u0625\u0630\u0627 \u0643\u0627\u0646 null \u2192 \u0648\u0636\u0639 \u0625\u0636\u0627\u0641\u0629 \u2192 store.add(). \u0625\u0630\u0627 \u0643\u0627\u0646 User \u2192 \u0648\u0636\u0639 \u062A\u0639\u062F\u064A\u0644 \u2192 form.patchValue(u) \u062B\u0645 store.update(). \u0646\u0645\u0648\u0630\u062C \u0648\u0627\u062D\u062F \u064A\u062E\u062F\u0645 \u0627\u0644\u062D\u0627\u0644\u062A\u064A\u0646 \u0645\u0639 \u062A\u063A\u064A\u064A\u0631 \u0628\u0633\u064A\u0637 \u0641\u064A \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0648\u0632\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644."}],contentEn:[{type:"heading",text:"Step 1 \u2014 Create Project and File Structure"},{type:"paragraph",text:"Start by creating the project and organizing files correctly before writing any code."},{type:"code",code:`# Create the project
ng new admin-dashboard --standalone --routing --style=css
cd admin-dashboard`},{type:"paragraph",text:"Create this structure manually inside src/app/:"},{type:"code",code:`src/app/
\u251C\u2500\u2500 core/
\u2502   \u251C\u2500\u2500 auth/
\u2502   \u2502   \u251C\u2500\u2500 auth.service.ts      \u2190 authentication service
\u2502   \u2502   \u2514\u2500\u2500 auth.guard.ts        \u2190 route guard
\u2502   \u251C\u2500\u2500 interceptors/
\u2502   \u2502   \u2514\u2500\u2500 auth.interceptor.ts  \u2190 adds JWT to every request
\u2502   \u2514\u2500\u2500 layout/
\u2502       \u251C\u2500\u2500 layout.component.ts  \u2190 main shell
\u2502       \u251C\u2500\u2500 sidebar.component.ts \u2190 side navigation
\u2502       \u2514\u2500\u2500 topbar.component.ts  \u2190 top bar
\u2502
\u251C\u2500\u2500 features/
\u2502   \u251C\u2500\u2500 dashboard/
\u2502   \u2502   \u2514\u2500\u2500 dashboard.component.ts
\u2502   \u2514\u2500\u2500 users/
\u2502       \u251C\u2500\u2500 users.component.ts
\u2502       \u251C\u2500\u2500 user-table.component.ts
\u2502       \u251C\u2500\u2500 user-form.component.ts
\u2502       \u2514\u2500\u2500 users.store.ts       \u2190 users state
\u2502
\u2514\u2500\u2500 app.routes.ts`},{type:"tip",text:"The core/features/shared structure is the most widely used pattern in professional Angular projects. core for global services, features for each independent feature."},{type:"heading",text:"Step 2 \u2014 AuthService and Guard Setup"},{type:"paragraph",text:"Create the authentication service first because everything else depends on it."},{type:"code",code:`// core/auth/auth.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface User { id: number; name: string; email: string; role: 'admin' | 'editor'; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user  = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  readonly isLoggedIn = computed(() => !!this._token());
  readonly user       = this._user.asReadonly();
  readonly isAdmin    = computed(() => this._user()?.role === 'admin');

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: User }>('/api/auth/login', { email, password })
      .pipe(tap(({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this._token.set(token);
        this._user.set(user);
      }));
  }

  logout() {
    localStorage.clear();
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  getToken() { return this._token(); }
}`},{type:"code",code:`// core/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};`},{type:"heading",text:"Step 3 \u2014 Routing Configuration"},{type:"paragraph",text:"Define the routes: the login page is unprotected, all dashboard pages are protected by authGuard."},{type:"code",code:`// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  // Login page \u2014 no guard
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login.component')
      .then(m => m.LoginComponent)
  },

  // Dashboard shell \u2014 protected by authGuard
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users.component')
          .then(m => m.UsersComponent)
      },
    ]
  },

  { path: '**', redirectTo: '' }
];`},{type:"heading",text:"Step 4 \u2014 Build Layout (Sidebar + Topbar)"},{type:"paragraph",text:"The Layout wraps the sidebar and topbar and renders <router-outlet> in the center."},{type:"code",code:`// core/layout/layout.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: \`
    <div class="admin-layout">

      <aside class="sidebar">
        <div class="sidebar-logo">Admin Panel</div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">\u{1F4CA} Dashboard</a>
          <a routerLink="/users"     routerLinkActive="active">\u{1F465} Users</a>
          @if (auth.isAdmin()) {
            <a routerLink="/settings" routerLinkActive="active">\u2699\uFE0F Settings</a>
          }
        </nav>
      </aside>

      <div class="admin-main">
        <header class="topbar">
          <span>Welcome, {{ auth.user()?.name }}</span>
          <button (click)="auth.logout()">Log Out</button>
        </header>
        <main class="page-content">
          <router-outlet />
        </main>
      </div>

    </div>
  \`
})
export class LayoutComponent {
  auth = inject(AuthService);
}`},{type:"heading",text:"Step 5 \u2014 Create UsersStore"},{type:"paragraph",text:"The Store is the Single Source of Truth for user data. All components read from it and write through it only."},{type:"code",code:`// features/users/users.store.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number; name: string; email: string;
  role: string; status: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private http = inject(HttpClient);

  // \u2500\u2500 Private state \u2500\u2500
  private _users   = signal<User[]>([]);
  private _loading = signal(false);
  private _error   = signal<string | null>(null);

  // \u2500\u2500 Public read-only exposure \u2500\u2500
  readonly users       = this._users.asReadonly();
  readonly loading     = this._loading.asReadonly();
  readonly error       = this._error.asReadonly();
  readonly count       = computed(() => this._users().length);
  readonly activeCount = computed(() =>
    this._users().filter(u => u.status === 'active').length
  );

  // \u2500\u2500 Actions \u2500\u2500
  loadAll(): void {
    this._loading.set(true);
    this.http.get<User[]>('/api/users').subscribe({
      next:  users => { this._users.set(users);       this._loading.set(false); },
      error: err   => { this._error.set(err.message); this._loading.set(false); }
    });
  }

  add(data: Omit<User, 'id'>): void {
    this.http.post<User>('/api/users', data).subscribe(created => {
      this._users.update(list => [...list, created]);
    });
  }

  update(id: number, changes: Partial<User>): void {
    this.http.patch<User>(\`/api/users/\${id}\`, changes).subscribe(updated => {
      this._users.update(list => list.map(u => u.id === id ? updated : u));
    });
  }

  remove(id: number): void {
    this.http.delete(\`/api/users/\${id}\`).subscribe(() => {
      this._users.update(list => list.filter(u => u.id !== id));
    });
  }
}`},{type:"heading",text:"Step 6 \u2014 Data Table with Filtering and Sorting"},{type:"paragraph",text:"The table reads from UsersStore and applies filtering and sorting locally with computed()."},{type:"code",code:`// features/users/user-table.component.ts
import { Component, inject, signal, computed, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersStore, User } from './users.store';

@Component({
  selector: 'app-user-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: \`
    <div class="toolbar">
      <input [(ngModel)]="search" placeholder="\u{1F50D} Search by name or email..." />
      <select [(ngModel)]="statusFilter">
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button (click)="editRequest.emit(null)">+ Add User</button>
    </div>

    @if (store.loading()) {
      <p>Loading...</p>
    } @else {
      <table class="data-table">
        <thead>
          <tr>
            <th (click)="sort('name')"  class="sortable">Name  {{ sortIcon('name') }}</th>
            <th (click)="sort('email')" class="sortable">Email {{ sortIcon('email') }}</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (user of rows(); track user.id) {
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td><span [class]="'badge ' + user.status">{{ user.status }}</span></td>
              <td class="actions">
                <button (click)="editRequest.emit(user)">\u270F\uFE0F Edit</button>
                <button (click)="confirmDelete(user)" class="danger">\u{1F5D1}\uFE0F Delete</button>
              </td>
            </tr>
          } @empty {
            <tr><td colspan="4" class="empty">No results found</td></tr>
          }
        </tbody>
      </table>
      <p class="count">Total: {{ rows().length }} users</p>
    }
  \`
})
export class UserTableComponent {
  store = inject(UsersStore);

  search       = '';
  statusFilter = '';
  sortCol      = signal<keyof User>('name');
  sortDir      = signal<'asc' | 'desc'>('asc');

  editRequest  = output<User | null>();

  rows = computed(() => {
    let list = this.store.users();
    const q  = this.search.toLowerCase().trim();
    if (q) list = list.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
    if (this.statusFilter) list = list.filter(u => u.status === this.statusFilter);
    const col = this.sortCol();
    const dir = this.sortDir() === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => String(a[col]).localeCompare(String(b[col])) * dir);
  });

  sort(col: keyof User) {
    if (this.sortCol() === col) this.sortDir.update(d => d === 'asc' ? 'desc' : 'asc');
    else { this.sortCol.set(col); this.sortDir.set('asc'); }
  }

  sortIcon(col: string) {
    if (this.sortCol() !== col) return '\u2195';
    return this.sortDir() === 'asc' ? '\u2191' : '\u2193';
  }

  confirmDelete(user: User) {
    if (confirm(\`Delete \${user.name}?\`)) this.store.remove(user.id);
  }
}`},{type:"heading",text:"Step 7 \u2014 Add / Edit User Form"},{type:"paragraph",text:"One form that works in two modes: add (user = null) or edit (user = existing object)."},{type:"code",code:`// features/users/user-form.component.ts
import { Component, input, output, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersStore, User } from './users.store';

@Component({
  selector: 'app-user-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: \`
    <div class="dialog-backdrop" (click)="closed.emit()">
      <div class="dialog" (click)="$event.stopPropagation()">
        <h2>{{ user() ? 'Edit User' : 'Add New User' }}</h2>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>Name     <input formControlName="name"  /></label>
          <label>Email    <input formControlName="email" type="email" /></label>
          <label>Role
            <select formControlName="role">
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label>Status
            <select formControlName="status">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <div class="form-actions">
            <button type="submit" [disabled]="form.invalid">
              {{ user() ? 'Save Changes' : 'Add User' }}
            </button>
            <button type="button" (click)="closed.emit()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  \`
})
export class UserFormComponent implements OnInit {
  user   = input<User | null>(null);
  closed = output<void>();

  private fb    = inject(FormBuilder);
  private store = inject(UsersStore);

  form = this.fb.nonNullable.group({
    name:   ['', Validators.required],
    email:  ['', [Validators.required, Validators.email]],
    role:   ['editor'],
    status: ['active'],
  });

  ngOnInit() {
    const u = this.user();
    if (u) this.form.patchValue(u); // fill form for edit mode
  }

  submit() {
    if (this.form.invalid) return;
    const u = this.user();
    if (u) this.store.update(u.id, this.form.getRawValue());
    else   this.store.add(this.form.getRawValue() as any);
    this.closed.emit();
  }
}`},{type:"heading",text:"Step 8 \u2014 Wire Everything Together in UsersComponent"},{type:"paragraph",text:"The container component combines the table and form and manages the open/close state of the dialog."},{type:"code",code:`// features/users/users.component.ts
import { Component, signal, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { UsersStore, User } from './users.store';
import { UserTableComponent } from './user-table.component';
import { UserFormComponent  } from './user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserTableComponent, UserFormComponent],
  template: \`
    <div class="page-header">
      <h1>User Management</h1>
      <span class="stat">{{ store.activeCount() }} active of {{ store.count() }} total</span>
    </div>

    <!-- Data table -->
    <app-user-table (editRequest)="openForm($event)" />

    <!-- Add/Edit dialog \u2014 shown only when needed -->
    @if (showForm()) {
      <app-user-form [user]="selectedUser()" (closed)="closeForm()" />
    }
  \`
})
export class UsersComponent implements OnInit {
  store        = inject(UsersStore);
  showForm     = signal(false);
  selectedUser = signal<User | null>(null);

  ngOnInit() {
    this.store.loadAll(); // fetch data when page loads
  }

  openForm(user: User | null) {
    this.selectedUser.set(user);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.selectedUser.set(null);
  }
}`},{type:"tip",text:"The project is now ready to scale \u2014 add a Products page by following the same pattern: Store \u2192 Table \u2192 Form \u2192 Container. Every new feature follows the same structure."},{type:"qa",question:"Why create a separate Store per feature instead of one global Store?",answer:"Each Store is responsible for one feature's data only \u2014 easier to test and maintain. If you need to share data between features, create a shared store in core/ instead of merging everything in one place."},{type:"qa",question:"What is the difference between add and edit mode in UserFormComponent?",answer:"The form checks the user() input. If null \u2192 add mode \u2192 store.add(). If a User object \u2192 edit mode \u2192 form.patchValue(u) then store.update(). One form serves both cases with just a small change to the title and submit button label."}]};export{e as default};
