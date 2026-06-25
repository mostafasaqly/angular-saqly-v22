# Angular AI Skills Reference

> Angular v22 — AI Skills installed via `ng ai skills add --all`
> Skills live in `.angular/skills/` and are loaded automatically by the Angular MCP server.

---

## What are Angular AI Skills?

AI Skills are Markdown files that encode Angular v22 best practices as agent-readable instructions.
When a coding agent (Claude, Copilot, Continue, etc.) writes Angular code with the MCP server running,
it reads the relevant skill files first — ensuring generated code is idiomatic and up to date.

Install all skills:
```bash
ng ai skills add --all
```

Install a single skill:
```bash
ng ai skills add component
```

List installed skills:
```bash
ng ai skills list
```

---

## Available Skills

### `component` — Standalone Component Generation

**File:** `.angular/skills/component.md`

**Teaches the agent to:**
- Always use `standalone: true`
- Always use `ChangeDetectionStrategy.OnPush`
- Use `input()` signal function instead of `@Input()` decorator
- Use `output()` signal function instead of `@Output() EventEmitter`
- Use `inject()` for dependency injection (no constructor params for services)
- Separate template into `.html` file unless component is < 5 lines of HTML
- Import `CommonModule` / `AsyncPipe` only when actually needed
- Register the component in `imports[]` of the parent (not in a module)

**Example output:**
```typescript
import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  user = input.required<User>();
  deleted = output<string>(); // emits user id
  private userService = inject(UserService);
}
```

---

### `service` — Injectable Service Generation

**File:** `.angular/skills/service.md`

**Teaches the agent to:**
- Use `@Injectable({ providedIn: 'root' })` for singletons
- Use `inject()` inside the class body, not constructor params
- Store state as `signal()` values, not plain class fields
- Expose read-only state via `asReadonly()` or computed signals
- Never expose writable signals directly from the service public API

**Example output:**
```typescript
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private _items = signal<CartItem[]>([]);

  // Public read-only API
  readonly items = this._items.asReadonly();
  readonly total = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  addItem(item: CartItem) {
    this._items.update(current => [...current, item]);
  }
}
```

---

### `forms` — Signal Forms

**File:** `.angular/skills/forms.md`

**Teaches the agent to:**
- Use `signalForm()` from `@angular/forms` (v22 default)
- Never use `FormBuilder` or `new FormControl()` (Reactive Forms — old)
- Never use `ngModel` + `FormsModule` (Template-driven — old)
- Use typed form groups with interfaces
- Use `Validators` from `@angular/forms`
- Read form value as a Signal: `form.value()`
- Check validity: `form.valid()`

**Example output:**
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { signalForm, Validators } from '@angular/forms';
import { SignalFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [SignalFormsModule],
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  form = signalForm({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit() {
    if (this.form.valid()) {
      console.log(this.form.value()); // { email: '...', password: '...' }
    }
  }
}
```

---

### `routing` — Router Configuration

**File:** `.angular/skills/routing.md`

**Teaches the agent to:**
- Use `loadComponent` for lazy-loaded components (not `loadChildren` + NgModule)
- Use `withComponentInputBinding()` in `provideRouter()` to bind route params to inputs
- Use functional route guards (`canActivateFn`) instead of class-based guards
- Use `inject()` inside guard functions
- Always add `title` to routes for accessibility

**Example output:**
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.HomeComponent),
    title: 'Home'
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin').then(m => m.AdminComponent),
    canActivate: [authGuard],
    title: 'Admin'
  }
];
```

---

### `http` — HTTP and Resource API

**File:** `.angular/skills/http.md`

**Teaches the agent to:**
- Prefer `httpResource()` for declarative data fetching (v22 stable)
- Use `HttpClient` only for mutations (POST, PUT, DELETE)
- Register `provideHttpClient(withFetch())` in `app.config.ts`
- Handle loading, error, and success states via Resource API signals
- Use `withInterceptors()` for auth tokens, not class-based interceptors

**Example output:**
```typescript
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  products = httpResource<Product[]>('/api/products');
  // products.value()      → Product[] | undefined
  // products.isLoading()  → boolean
  // products.error()      → unknown
}
```

---

### `state` — Signal-Based State Management

**File:** `.angular/skills/state.md`

**Teaches the agent to:**
- Use service-based signal stores (no NgRx needed for most apps)
- Use `computed()` for derived state (replaces selectors)
- Use `effect()` for side effects (logging, localStorage sync)
- Never use `BehaviorSubject` or `Observable` for local state
- Prefer `linkedSignal()` for signals derived from but writable over another

**Example output:**
```typescript
import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<'light' | 'dark'>('light');

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    // Persist to localStorage whenever theme changes
    effect(() => {
      localStorage.setItem('theme', this._theme());
    });
  }

  toggle() {
    this._theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}
```

---

### `testing` — Unit and Component Testing

**File:** `.angular/skills/testing.md`

**Teaches the agent to:**
- Use `TestBed.configureTestingModule()` with `imports: [ComponentUnderTest]`
- Use `fixture.componentInstance` to access the component
- Use `signal()` to create test-controlled inputs
- Use `fixture.detectChanges()` after changing signal values
- Mock services with `jasmine.createSpyObj` or provide a test double in `providers`

**Example output:**
```typescript
import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CounterComponent]
    });
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment count', () => {
    component.increment();
    fixture.detectChanges();
    expect(component.count()).toBe(1);
  });
});
```

---

### `performance` — Performance Patterns

**File:** `.angular/skills/performance.md`

**Teaches the agent to:**
- Always use `OnPush` (already taught in `component` skill, reinforced here)
- Use `@defer` blocks for below-the-fold content
- Use `trackBy` (or `track` in `@for` loops) for list rendering
- Use `ng-container` instead of wrapper divs to avoid DOM bloat
- Avoid calling functions in templates — use computed signals instead

**Example output:**
```html
<!-- GOOD: track by item identity in @for loop -->
@for (product of products(); track product.id) {
  <app-product-card [product]="product" />
}

<!-- GOOD: defer heavy content -->
@defer (on viewport) {
  <app-data-chart [data]="chartData()" />
} @placeholder {
  <div class="chart-placeholder">Loading chart...</div>
}
```

---

## Writing Custom Project Skills

Create a skill for your project's conventions:

```bash
ng ai skills create --name "api-patterns" --description "API naming and error handling for this project"
```

Then edit `.angular/skills/api-patterns.md` with your patterns. Example content:

```markdown
# API Patterns for This Project

- Base URL is always read from `environment.apiUrl`
- All API calls use the `ApiService` wrapper, not `HttpClient` directly
- Error responses follow `{ code: string, message: string }` shape
- Loading states must show the `<app-spinner>` component
- Pagination uses `?page=N&limit=20` query params
```

The agent will apply these rules when generating any code that touches the API.
