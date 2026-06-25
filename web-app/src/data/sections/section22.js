// Section 22 — Project: Admin Dashboard
export default {
  id: 22,
  title: 'مشروع — Admin Dashboard',
  titleEn: 'Project: Admin Dashboard',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'بناء لوحة تحكم إدارية كاملة خطوة بخطوة في Angular v22. ستبني: هيكل المشروع، Authentication، Routing المحمي، جدول بيانات مع فلترة وترتيب، نماذج CRUD، وإدارة حالة مركزية بـ Signals.',
  introEn: 'Build a complete admin dashboard step by step in Angular v22. You will build: project structure, authentication, protected routing, a data table with filtering and sorting, CRUD forms, and centralized state management with Signals.',

  lessons: [
    'Step 1 — Create Project and File Structure',
    'Step 2 — AuthService and Guard Setup',
    'Step 3 — Routing Configuration',
    'Step 4 — Build Layout (Sidebar + Topbar)',
    'Step 5 — Create UsersStore',
    'Step 6 — Data Table with Filtering and Sorting',
    'Step 7 — Add / Edit User Form',
    'Step 8 — Wire Everything Together',
  ],
  lessonsEn: [
    'Step 1 — Create Project and File Structure',
    'Step 2 — AuthService and Guard Setup',
    'Step 3 — Routing Configuration',
    'Step 4 — Build Layout (Sidebar + Topbar)',
    'Step 5 — Create UsersStore',
    'Step 6 — Data Table with Filtering and Sorting',
    'Step 7 — Add / Edit User Form',
    'Step 8 — Wire Everything Together',
  ],

  content: [
    // ── STEP 1 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 1 — إنشاء المشروع وهيكل الملفات' },
    { type: 'paragraph', text: 'ابدأ بإنشاء المشروع وترتيب الملفات بشكل صحيح قبل كتابة أي كود.' },
    {
      type: 'code',
      code: `# إنشاء المشروع
ng new admin-dashboard --standalone --routing --style=css
cd admin-dashboard`,
    },
    {
      type: 'paragraph',
      text: 'أنشئ هذا الهيكل يدوياً داخل src/app/:',
    },
    {
      type: 'code',
      code: `src/app/
├── core/
│   ├── auth/
│   │   ├── auth.service.ts      ← خدمة Authentication
│   │   └── auth.guard.ts        ← حارس المسار
│   ├── interceptors/
│   │   └── auth.interceptor.ts  ← يُضيف JWT لكل طلب
│   └── layout/
│       ├── layout.component.ts  ← الغلاف الرئيسي
│       ├── sidebar.component.ts ← القائمة الجانبية
│       └── topbar.component.ts  ← الشريط العلوي
│
├── features/
│   ├── dashboard/
│   │   └── dashboard.component.ts
│   └── users/
│       ├── users.component.ts
│       ├── user-table.component.ts
│       ├── user-form.component.ts
│       └── users.store.ts       ← حالة المستخدمين
│
└── app.routes.ts`,
    },
    { type: 'tip', text: 'هيكل core/features/shared هو النمط الأكثر استخداماً في مشاريع Angular الاحترافية. core للخدمات العامة، features لكل ميزة مستقلة.' },

    // ── STEP 2 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 2 — إعداد AuthService والـ Guard' },
    { type: 'paragraph', text: 'أنشئ خدمة Authentication أولاً لأن كل شيء آخر يعتمد عليها.' },
    {
      type: 'code',
      code: `// core/auth/auth.service.ts
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
}`,
    },
    {
      type: 'code',
      code: `// core/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};`,
    },

    // ── STEP 3 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 3 — إعداد الـ Routing' },
    { type: 'paragraph', text: 'عرّف Routes: صفحة الدخول بدون حماية، وكل صفحات اللوحة محمية بـ authGuard.' },
    {
      type: 'code',
      code: `// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  // صفحة تسجيل الدخول — بدون حماية
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login.component')
      .then(m => m.LoginComponent)
  },

  // اللوحة الرئيسية — محمية بـ authGuard
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

  // أي مسار غير معروف → الرئيسية
  { path: '**', redirectTo: '' }
];`,
    },
    {
      type: 'code',
      code: `// app.config.ts
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
};`,
    },

    // ── STEP 4 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 4 — بناء Layout (Sidebar + Topbar)' },
    { type: 'paragraph', text: 'الـ Layout هو الغلاف الذي يحتوي على القائمة الجانبية والشريط العلوي، ويُعرض <router-outlet> في المنتصف.' },
    {
      type: 'code',
      code: `// core/layout/layout.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: \`
    <div class="admin-layout">

      <!-- القائمة الجانبية -->
      <aside class="sidebar">
        <div class="sidebar-logo">Admin Panel</div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">📊 الرئيسية</a>
          <a routerLink="/users"     routerLinkActive="active">👥 المستخدمون</a>
          @if (auth.isAdmin()) {
            <a routerLink="/settings" routerLinkActive="active">⚙️ الإعدادات</a>
          }
        </nav>
      </aside>

      <!-- المحتوى الرئيسي -->
      <div class="admin-main">

        <!-- الشريط العلوي -->
        <header class="topbar">
          <span>مرحباً، {{ auth.user()?.name }}</span>
          <button (click)="auth.logout()">تسجيل الخروج</button>
        </header>

        <!-- صفحة المسار الحالي -->
        <main class="page-content">
          <router-outlet />
        </main>

      </div>
    </div>
  \`
})
export class LayoutComponent {
  auth = inject(AuthService);
}`,
    },

    // ── STEP 5 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 5 — إنشاء UsersStore' },
    { type: 'paragraph', text: 'الـ Store هو المصدر الوحيد للحقيقة (Single Source of Truth) لبيانات المستخدمين. كل Components تقرأ منه وتكتب عبره فقط.' },
    {
      type: 'code',
      code: `// features/users/users.store.ts
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

  // ── الحالة الداخلية (خاصة) ──
  private _users   = signal<User[]>([]);
  private _loading = signal(false);
  private _error   = signal<string | null>(null);

  // ── ما يُكشف للمكوّنات (للقراءة فقط) ──
  readonly users   = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error   = this._error.asReadonly();
  readonly count   = computed(() => this._users().length);
  readonly activeCount = computed(() =>
    this._users().filter(u => u.status === 'active').length
  );

  // ── الأفعال (Actions) ──

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
}`,
    },

    // ── STEP 6 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 6 — جدول البيانات مع الفلترة والترتيب' },
    { type: 'paragraph', text: 'جدول البيانات يقرأ من UsersStore ويُطبّق الفلترة والترتيب محلياً بـ computed().' },
    {
      type: 'code',
      code: `// features/users/user-table.component.ts
import { Component, inject, signal, computed, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersStore, User } from './users.store';

@Component({
  selector: 'app-user-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: \`
    <!-- شريط الفلترة -->
    <div class="toolbar">
      <input [(ngModel)]="search" placeholder="🔍 بحث بالاسم أو البريد..." />
      <select [(ngModel)]="statusFilter">
        <option value="">كل الحالات</option>
        <option value="active">نشط</option>
        <option value="inactive">غير نشط</option>
      </select>
      <button (click)="editRequest.emit(null)">+ إضافة مستخدم</button>
    </div>

    <!-- الجدول -->
    @if (store.loading()) {
      <p>جارٍ التحميل...</p>
    } @else {
      <table class="data-table">
        <thead>
          <tr>
            <th (click)="sort('name')"  class="sortable">
              الاسم {{ sortIcon('name') }}
            </th>
            <th (click)="sort('email')" class="sortable">
              البريد {{ sortIcon('email') }}
            </th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          @for (user of rows(); track user.id) {
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span [class]="'badge ' + user.status">
                  {{ user.status === 'active' ? 'نشط' : 'غير نشط' }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editRequest.emit(user)">✏️ تعديل</button>
                <button (click)="confirmDelete(user)" class="danger">🗑️ حذف</button>
              </td>
            </tr>
          } @empty {
            <tr><td colspan="4" class="empty">لا توجد نتائج</td></tr>
          }
        </tbody>
      </table>
      <p class="count">الإجمالي: {{ rows().length }} مستخدم</p>
    }
  \`
})
export class UserTableComponent {
  store = inject(UsersStore);

  // حالة الفلترة والترتيب
  search       = '';
  statusFilter = '';
  sortCol      = signal<keyof User>('name');
  sortDir      = signal<'asc' | 'desc'>('asc');

  // إخراج للمكوّن الأب
  editRequest = output<User | null>();

  // الصفوف المحسوبة بعد الفلترة والترتيب
  rows = computed(() => {
    let list = this.store.users();

    // فلترة بالبحث
    const q = this.search.toLowerCase().trim();
    if (q) list = list.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );

    // فلترة بالحالة
    if (this.statusFilter) list = list.filter(u => u.status === this.statusFilter);

    // الترتيب
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
    if (this.sortCol() !== col) return '↕';
    return this.sortDir() === 'asc' ? '↑' : '↓';
  }

  confirmDelete(user: User) {
    if (confirm(\`حذف \${user.name}؟\`)) {
      this.store.remove(user.id);
    }
  }
}`,
    },

    // ── STEP 7 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 7 — نموذج إضافة / تعديل المستخدم' },
    { type: 'paragraph', text: 'نموذج واحد يعمل في وضعين: إضافة (user = null) أو تعديل (user = كائن موجود).' },
    {
      type: 'code',
      code: `// features/users/user-form.component.ts
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

        <h2>{{ user() ? 'تعديل مستخدم' : 'إضافة مستخدم جديد' }}</h2>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            الاسم
            <input formControlName="name" placeholder="الاسم الكامل" />
          </label>

          <label>
            البريد الإلكتروني
            <input formControlName="email" type="email" placeholder="example@mail.com" />
          </label>

          <label>
            الدور
            <select formControlName="role">
              <option value="editor">محرر</option>
              <option value="admin">مدير</option>
            </select>
          </label>

          <label>
            الحالة
            <select formControlName="status">
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </label>

          <div class="form-actions">
            <button type="submit" [disabled]="form.invalid">
              {{ user() ? 'حفظ التعديلات' : 'إضافة' }}
            </button>
            <button type="button" (click)="closed.emit()">إلغاء</button>
          </div>
        </form>

      </div>
    </div>
  \`
})
export class UserFormComponent implements OnInit {
  user   = input<User | null>(null);   // null = وضع الإضافة
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
    // إذا كان تعديلاً، املأ النموذج بالبيانات الحالية
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
}`,
    },

    // ── STEP 8 ──────────────────────────────────────────────
    { type: 'heading', text: 'الخطوة 8 — ربط كل شيء في UsersComponent' },
    { type: 'paragraph', text: 'المكوّن الرئيسي يجمع الجدول والنموذج ويُدير حالة فتح/إغلاق الـ Dialog.' },
    {
      type: 'code',
      code: `// features/users/users.component.ts
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
      <h1>إدارة المستخدمين</h1>
      <span class="stat">
        {{ store.activeCount() }} نشط من أصل {{ store.count() }}
      </span>
    </div>

    <!-- جدول المستخدمين -->
    <app-user-table (editRequest)="openForm($event)" />

    <!-- نموذج الإضافة/التعديل — يظهر فقط عند الحاجة -->
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
    this.store.loadAll(); // تحميل البيانات عند بدء الصفحة
  }

  openForm(user: User | null) {
    this.selectedUser.set(user);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.selectedUser.set(null);
  }
}`,
    },
    { type: 'tip', text: 'المشروع جاهز الآن للتوسع — أضف صفحة Products باتباع نفس النمط: Store → Table → Form → Container. كل ميزة جديدة تتبع نفس الهيكل.' },
    {
      type: 'qa',
      question: 'لماذا ننشئ Store منفصل لكل Feature بدلاً من Store واحد عام؟',
      answer: 'كل Store مسؤول عن بيانات ميزة واحدة فقط — يُسهّل Testing والصيانة. إذا احتجت مشاركة بيانات بين features، أنشئ store مشترك في core/ بدلاً من دمج كل شيء في مكان واحد.',
    },
    {
      type: 'qa',
      question: 'ما الفرق بين وضع الإضافة والتعديل في UserFormComponent؟',
      answer: 'النموذج يفحص input user(). إذا كان null → وضع إضافة → store.add(). إذا كان User → وضع تعديل → form.patchValue(u) ثم store.update(). نموذج واحد يخدم الحالتين مع تغيير بسيط في العنوان وزر الإرسال.',
    },
  ],

  contentEn: [
    // ── STEP 1 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 1 — Create Project and File Structure' },
    { type: 'paragraph', text: 'Start by creating the project and organizing files correctly before writing any code.' },
    {
      type: 'code',
      code: `# Create the project
ng new admin-dashboard --standalone --routing --style=css
cd admin-dashboard`,
    },
    { type: 'paragraph', text: 'Create this structure manually inside src/app/:' },
    {
      type: 'code',
      code: `src/app/
├── core/
│   ├── auth/
│   │   ├── auth.service.ts      ← authentication service
│   │   └── auth.guard.ts        ← route guard
│   ├── interceptors/
│   │   └── auth.interceptor.ts  ← adds JWT to every request
│   └── layout/
│       ├── layout.component.ts  ← main shell
│       ├── sidebar.component.ts ← side navigation
│       └── topbar.component.ts  ← top bar
│
├── features/
│   ├── dashboard/
│   │   └── dashboard.component.ts
│   └── users/
│       ├── users.component.ts
│       ├── user-table.component.ts
│       ├── user-form.component.ts
│       └── users.store.ts       ← users state
│
└── app.routes.ts`,
    },
    { type: 'tip', text: 'The core/features/shared structure is the most widely used pattern in professional Angular projects. core for global services, features for each independent feature.' },

    // ── STEP 2 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 2 — AuthService and Guard Setup' },
    { type: 'paragraph', text: 'Create the authentication service first because everything else depends on it.' },
    {
      type: 'code',
      code: `// core/auth/auth.service.ts
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
}`,
    },
    {
      type: 'code',
      code: `// core/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};`,
    },

    // ── STEP 3 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 3 — Routing Configuration' },
    { type: 'paragraph', text: 'Define the routes: the login page is unprotected, all dashboard pages are protected by authGuard.' },
    {
      type: 'code',
      code: `// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  // Login page — no guard
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login.component')
      .then(m => m.LoginComponent)
  },

  // Dashboard shell — protected by authGuard
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
];`,
    },

    // ── STEP 4 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 4 — Build Layout (Sidebar + Topbar)' },
    { type: 'paragraph', text: 'The Layout wraps the sidebar and topbar and renders <router-outlet> in the center.' },
    {
      type: 'code',
      code: `// core/layout/layout.component.ts
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
          <a routerLink="/dashboard" routerLinkActive="active">📊 Dashboard</a>
          <a routerLink="/users"     routerLinkActive="active">👥 Users</a>
          @if (auth.isAdmin()) {
            <a routerLink="/settings" routerLinkActive="active">⚙️ Settings</a>
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
}`,
    },

    // ── STEP 5 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 5 — Create UsersStore' },
    { type: 'paragraph', text: 'The Store is the Single Source of Truth for user data. All components read from it and write through it only.' },
    {
      type: 'code',
      code: `// features/users/users.store.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number; name: string; email: string;
  role: string; status: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private http = inject(HttpClient);

  // ── Private state ──
  private _users   = signal<User[]>([]);
  private _loading = signal(false);
  private _error   = signal<string | null>(null);

  // ── Public read-only exposure ──
  readonly users       = this._users.asReadonly();
  readonly loading     = this._loading.asReadonly();
  readonly error       = this._error.asReadonly();
  readonly count       = computed(() => this._users().length);
  readonly activeCount = computed(() =>
    this._users().filter(u => u.status === 'active').length
  );

  // ── Actions ──
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
}`,
    },

    // ── STEP 6 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 6 — Data Table with Filtering and Sorting' },
    { type: 'paragraph', text: 'The table reads from UsersStore and applies filtering and sorting locally with computed().' },
    {
      type: 'code',
      code: `// features/users/user-table.component.ts
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
      <input [(ngModel)]="search" placeholder="🔍 Search by name or email..." />
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
                <button (click)="editRequest.emit(user)">✏️ Edit</button>
                <button (click)="confirmDelete(user)" class="danger">🗑️ Delete</button>
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
    if (this.sortCol() !== col) return '↕';
    return this.sortDir() === 'asc' ? '↑' : '↓';
  }

  confirmDelete(user: User) {
    if (confirm(\`Delete \${user.name}?\`)) this.store.remove(user.id);
  }
}`,
    },

    // ── STEP 7 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 7 — Add / Edit User Form' },
    { type: 'paragraph', text: 'One form that works in two modes: add (user = null) or edit (user = existing object).' },
    {
      type: 'code',
      code: `// features/users/user-form.component.ts
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
}`,
    },

    // ── STEP 8 ──────────────────────────────────────────────
    { type: 'heading', text: 'Step 8 — Wire Everything Together in UsersComponent' },
    { type: 'paragraph', text: 'The container component combines the table and form and manages the open/close state of the dialog.' },
    {
      type: 'code',
      code: `// features/users/users.component.ts
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

    <!-- Add/Edit dialog — shown only when needed -->
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
}`,
    },
    { type: 'tip', text: 'The project is now ready to scale — add a Products page by following the same pattern: Store → Table → Form → Container. Every new feature follows the same structure.' },
    {
      type: 'qa',
      question: 'Why create a separate Store per feature instead of one global Store?',
      answer: 'Each Store is responsible for one feature\'s data only — easier to test and maintain. If you need to share data between features, create a shared store in core/ instead of merging everything in one place.',
    },
    {
      type: 'qa',
      question: 'What is the difference between add and edit mode in UserFormComponent?',
      answer: 'The form checks the user() input. If null → add mode → store.add(). If a User object → edit mode → form.patchValue(u) then store.update(). One form serves both cases with just a small change to the title and submit button label.',
    },
  ],
};
