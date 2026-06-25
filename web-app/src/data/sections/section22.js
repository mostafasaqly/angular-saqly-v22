// Section 22 — Project: Admin Dashboard
export default {
  id: 22,
  title: 'مشروع: لوحة تحكم إدارية',
  titleEn: 'Project: Admin Dashboard',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'تطبيق عملي لكل ما تعلّمته: بناء لوحة تحكم إدارية كاملة في Angular v22. المشروع يشمل: المصادقة، جدول البيانات مع الفلترة والترتيب والصفحات، نماذج CRUD، حالة مشتركة بين المكوّنات، وتحسينات الأداء.',
  introEn: 'A hands-on application of everything you have learned: building a complete admin dashboard in Angular v22. The project includes: authentication, data tables with filtering, sorting and pagination, CRUD forms, shared state across components, and performance optimizations.',

  lessons: [
    'هيكل المشروع والتخطيط',
    'إعداد Routing والـ Guards',
    'لوحة الجانب والتنقل',
    'جدول البيانات مع الفلترة',
    'نافذة CRUD (Create/Edit)',
    'إدارة الحالة مع Signals Store',
    'تحميل مؤجل للوحدات الكسول',
    'تحسين الأداء وإضافة SSR',
  ],
  lessonsEn: [
    'Project Structure and Planning',
    'Routing Setup with Guards',
    'Sidebar and Navigation',
    'Data Table with Filtering',
    'CRUD Dialog (Create/Edit)',
    'State Management with Signals Store',
    'Lazy Loading Feature Modules',
    'Performance and SSR',
  ],

  content: [
    { type: 'heading', text: 'هيكل المشروع' },
    {
      type: 'code',
      code: `src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── layout/
│   │       ├── sidebar/
│   │       └── topbar/
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   └── dashboard.routes.ts
│   │   ├── users/
│   │   │   ├── users.component.ts
│   │   │   ├── user-table/
│   │   │   ├── user-form/
│   │   │   └── users.routes.ts
│   │   └── products/
│   │       ├── products.component.ts
│   │       └── products.routes.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── data-table/
│   │   │   ├── confirm-dialog/
│   │   │   └── stat-card/
│   │   └── pipes/
│   │
│   ├── app.routes.ts
│   └── app.config.ts`,
    },

    { type: 'heading', text: 'إعداد Routing والـ Guards' },
    {
      type: 'code',
      code: `// app.routes.ts
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./core/auth/login.component').then(m => m.LoginComponent) },
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
        loadChildren: () => import('./features/users/users.routes')
          .then(m => m.usersRoutes)
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes')
          .then(m => m.productsRoutes),
        canActivate: [adminGuard] // فقط للإدارة
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];`,
    },

    { type: 'heading', text: 'جدول البيانات مع الفلترة' },
    {
      type: 'code',
      code: `@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: \`
    <div class="table-toolbar">
      <input
        [(ngModel)]="searchTerm"
        placeholder="بحث..."
        (input)="onSearch($event)"
      />
      <select [(ngModel)]="statusFilter">
        <option value="">الكل</option>
        <option value="active">نشط</option>
        <option value="inactive">غير نشط</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th (click)="sortBy('name')">الاسم</th>
          <th (click)="sortBy('email')">البريد</th>
          <th (click)="sortBy('status')">الحالة</th>
          <th>الإجراءات</th>
        </tr>
      </thead>
      <tbody>
        @for (user of filteredUsers(); track user.id) {
          <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td><span [class]="'badge badge-' + user.status">{{ user.status }}</span></td>
            <td>
              <button (click)="edit(user)">تعديل</button>
              <button (click)="delete(user.id)">حذف</button>
            </td>
          </tr>
        } @empty {
          <tr><td colspan="4">لا توجد نتائج</td></tr>
        }
      </tbody>
    </table>
  \`
})
export class UserTableComponent {
  private store = inject(UsersStore);

  searchTerm   = '';
  statusFilter = '';
  sortColumn   = signal<string>('name');
  sortDir      = signal<'asc' | 'desc'>('asc');

  filteredUsers = computed(() => {
    let users = this.store.users();
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      users = users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    if (this.statusFilter) {
      users = users.filter(u => u.status === this.statusFilter);
    }
    return [...users].sort((a, b) => {
      const col = this.sortColumn() as keyof User;
      const dir = this.sortDir() === 'asc' ? 1 : -1;
      return (a[col] as string).localeCompare(b[col] as string) * dir;
    });
  });

  sortBy(col: string) {
    if (this.sortColumn() === col) {
      this.sortDir.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col);
      this.sortDir.set('asc');
    }
  }
}`,
    },

    { type: 'heading', text: 'Signals Store للمستخدمين' },
    {
      type: 'code',
      code: `@Injectable({ providedIn: 'root' })
export class UsersStore {
  private http = inject(HttpClient);

  private _users   = signal<User[]>([]);
  private _loading = signal(false);
  private _error   = signal<string | null>(null);

  readonly users   = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error   = this._error.asReadonly();
  readonly count   = computed(() => this._users().length);

  loadUsers(): void {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<User[]>('/api/users').subscribe({
      next:  users => { this._users.set(users); this._loading.set(false); },
      error: err   => { this._error.set(err.message); this._loading.set(false); }
    });
  }

  addUser(user: Omit<User, 'id'>): void {
    this.http.post<User>('/api/users', user).subscribe(newUser => {
      this._users.update(users => [...users, newUser]);
    });
  }

  updateUser(id: number, changes: Partial<User>): void {
    this.http.patch<User>(\`/api/users/\${id}\`, changes).subscribe(updated => {
      this._users.update(users =>
        users.map(u => u.id === id ? updated : u)
      );
    });
  }

  deleteUser(id: number): void {
    this.http.delete(\`/api/users/\${id}\`).subscribe(() => {
      this._users.update(users => users.filter(u => u.id !== id));
    });
  }
}`,
    },
    {
      type: 'qa',
      question: 'لماذا نضع منطق HTTP في Store وليس في المكوّن مباشرةً؟',
      answer: 'الـ Store يفصل "ماذا تفعل" عن "كيف تعرض". المكوّن يعرض فقط ويستدعي actions — لا يعرف تفاصيل HTTP. هذا يُسهّل الاختبار (اختبر الـ Store بدون مكوّن)، وإعادة الاستخدام (مكوّنات متعددة تشارك نفس الـ Store)، وصيانة الكود.',
    },
    {
      type: 'qa',
      question: 'كيف تمنع "شلالات الطلبات" (waterfall requests) في لوحة التحكم؟',
      answer: 'استخدم httpResource() بشكل متوازٍ لتحميل بيانات متعددة في نفس الوقت. في dashboard.component.ts، عرّف جميع الـ httpResource() على مستوى المكوّن — Angular يُطلقها جميعاً بالتوازي ولا ينتظر انتهاء كل واحدة قبل بدء التالية.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Project Structure' },
    {
      type: 'code',
      code: `src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── layout/
│   │       ├── sidebar/
│   │       └── topbar/
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   └── dashboard.routes.ts
│   │   ├── users/
│   │   │   ├── users.component.ts
│   │   │   ├── user-table/
│   │   │   ├── user-form/
│   │   │   └── users.routes.ts
│   │   └── products/
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── data-table/
│   │       ├── confirm-dialog/
│   │       └── stat-card/
│   │
│   ├── app.routes.ts
│   └── app.config.ts`,
    },

    { type: 'heading', text: 'Routing Setup with Guards' },
    {
      type: 'code',
      code: `// app.routes.ts
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./core/auth/login.component').then(m => m.LoginComponent) },
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
        loadChildren: () => import('./features/users/users.routes')
          .then(m => m.usersRoutes)
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes')
          .then(m => m.productsRoutes),
        canActivate: [adminGuard]
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];`,
    },

    { type: 'heading', text: 'Data Table with Filtering' },
    {
      type: 'code',
      code: `@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <input [(ngModel)]="searchTerm" placeholder="Search..." />
    <table>
      <thead>
        <tr>
          <th (click)="sortBy('name')">Name</th>
          <th (click)="sortBy('email')">Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (user of filteredUsers(); track user.id) {
          <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td><span [class]="'badge badge-' + user.status">{{ user.status }}</span></td>
            <td>
              <button (click)="edit(user)">Edit</button>
              <button (click)="delete(user.id)">Delete</button>
            </td>
          </tr>
        } @empty {
          <tr><td colspan="4">No results found</td></tr>
        }
      </tbody>
    </table>
  \`
})
export class UserTableComponent {
  private store = inject(UsersStore);

  searchTerm   = '';
  sortColumn   = signal('name');
  sortDir      = signal<'asc' | 'desc'>('asc');

  filteredUsers = computed(() => {
    let users = this.store.users();
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      users = users.filter(u =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    return [...users].sort((a, b) => {
      const col = this.sortColumn() as keyof User;
      const dir = this.sortDir() === 'asc' ? 1 : -1;
      return (a[col] as string).localeCompare(b[col] as string) * dir;
    });
  });

  sortBy(col: string) {
    if (this.sortColumn() === col) {
      this.sortDir.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col);
      this.sortDir.set('asc');
    }
  }
}`,
    },

    { type: 'heading', text: 'Signals Store for Users' },
    {
      type: 'code',
      code: `@Injectable({ providedIn: 'root' })
export class UsersStore {
  private http = inject(HttpClient);

  private _users   = signal<User[]>([]);
  private _loading = signal(false);
  private _error   = signal<string | null>(null);

  readonly users   = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error   = this._error.asReadonly();
  readonly count   = computed(() => this._users().length);

  loadUsers(): void {
    this._loading.set(true);
    this.http.get<User[]>('/api/users').subscribe({
      next:  users => { this._users.set(users); this._loading.set(false); },
      error: err   => { this._error.set(err.message); this._loading.set(false); }
    });
  }

  addUser(user: Omit<User, 'id'>): void {
    this.http.post<User>('/api/users', user).subscribe(newUser => {
      this._users.update(users => [...users, newUser]);
    });
  }

  updateUser(id: number, changes: Partial<User>): void {
    this.http.patch<User>(\`/api/users/\${id}\`, changes).subscribe(updated => {
      this._users.update(users => users.map(u => u.id === id ? updated : u));
    });
  }

  deleteUser(id: number): void {
    this.http.delete(\`/api/users/\${id}\`).subscribe(() => {
      this._users.update(users => users.filter(u => u.id !== id));
    });
  }
}`,
    },
    {
      type: 'qa',
      question: 'Why put HTTP logic in a Store instead of directly in the component?',
      answer: 'The Store separates "what to do" from "how to display it." The component only renders and dispatches actions — it does not know HTTP details. This makes testing easier (test the Store without a component), enables reuse (multiple components share the same Store), and improves maintainability.',
    },
    {
      type: 'qa',
      question: 'How do you prevent request waterfalls in a dashboard?',
      answer: 'Use httpResource() in parallel for loading multiple data sets at the same time. In dashboard.component.ts, define all httpResource() at the component level — Angular launches them all in parallel and does not wait for each to finish before starting the next.',
    },
  ],
};
