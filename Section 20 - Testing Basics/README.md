# Section 20: Testing Basics

> **Angular v22 Course** — Section 20 of 25
> Estimated time: ~90 minutes · Level: Intermediate

Tests give you confidence that your Angular app works as expected after every change. Angular ships with a complete testing setup out of the box: Jasmine as the assertion library, Karma as the test runner for browser tests, and `TestBed` for component testing. This section covers the core testing patterns for components, services, pipes, Signal forms, and HTTP, plus an overview of end-to-end testing with Playwright.

---

## Table of Contents

1. [Testing Overview](#1-testing-overview)
2. [Unit Testing Components](#2-unit-testing-components)
3. [Testing Services](#3-testing-services)
4. [Testing Pipes](#4-testing-pipes)
5. [Testing Signals and Signal Forms](#5-testing-signals-and-signal-forms)
6. [Testing HTTP Requests](#6-testing-http-requests)
7. [Component Testing Best Practices](#7-component-testing-best-practices)
8. [End-to-End Testing Overview](#8-end-to-end-testing-overview)

---

## 1. Testing Overview

### Angular testing stack

| Tool | Role |
|---|---|
| **Jasmine** | Assertion library (`describe`, `it`, `expect`) |
| **Karma** | Browser-based test runner |
| **TestBed** | Angular's testing module — bootstraps components/services in isolation |
| **HttpClientTestingModule** | Mocks `HttpClient` for unit tests |
| **Playwright / Cypress** | End-to-end testing (browser automation) |

### Running tests

```bash
# Run all unit tests (watches for changes)
ng test

# Single run (CI)
ng test --watch=false --browsers=ChromeHeadless

# Coverage report
ng test --code-coverage
```

### Test file naming convention

- `hero.component.ts` → `hero.component.spec.ts`
- `user.service.ts` → `user.service.spec.ts`
- `truncate.pipe.ts` → `truncate.pipe.spec.ts`

---

## 2. Unit Testing Components

`TestBed` creates a lightweight Angular module just for your test.

### Basic component test

```typescript
// counter.component.ts
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Count: {{ count() }}</p>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
  `
})
export class CounterComponent {
  count = signal(0);
  increment() { this.count.update(v => v + 1); }
  decrement() { this.count.update(v => v - 1); }
}
```

```typescript
// counter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]  // standalone components go in imports
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // triggers initial rendering
  });

  it('should start at 0', () => {
    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent).toContain('Count: 0');
  });

  it('should increment on + click', () => {
    const btn = fixture.debugElement.queryAll(By.css('button'))[0];
    btn.nativeElement.click();
    fixture.detectChanges();

    expect(component.count()).toBe(1);
    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent).toContain('Count: 1');
  });

  it('should decrement on - click', () => {
    component.count.set(5);
    fixture.detectChanges();

    const btn = fixture.debugElement.queryAll(By.css('button'))[1];
    btn.nativeElement.click();
    fixture.detectChanges();

    expect(component.count()).toBe(4);
  });
});
```

### Testing input signals

```typescript
// product-card.component.spec.ts
describe('ProductCardComponent', () => {
  it('should display product name', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductCardComponent);
    // Set required inputs via componentRef
    fixture.componentRef.setInput('name', 'Laptop');
    fixture.componentRef.setInput('price', 999);
    fixture.detectChanges();

    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toContain('Laptop');
  });
});
```

---

## 3. Testing Services

Services without HTTP can be tested directly without `TestBed`:

```typescript
// cart.service.ts
@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);
  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  total = computed(() => this.items().reduce((sum, i) => sum + i.price * i.quantity, 0));

  addItem(item: CartItem) {
    this.items.update(list => [...list, item]);
  }

  clear() { this.items.set([]); }
}
```

```typescript
// cart.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should start with 0 items', () => {
    expect(service.count()).toBe(0);
  });

  it('should add items and update count', () => {
    service.addItem({ id: 1, name: 'Laptop', price: 999, quantity: 1 });
    expect(service.count()).toBe(1);
    expect(service.total()).toBe(999);
  });

  it('should clear items', () => {
    service.addItem({ id: 1, name: 'Laptop', price: 999, quantity: 2 });
    service.clear();
    expect(service.count()).toBe(0);
    expect(service.total()).toBe(0);
  });
});
```

### Testing services with dependencies

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());  // ensure no unexpected requests

  it('should load users', () => {
    const mockUsers = [{ id: 1, name: 'Alice' }];
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
```

---

## 4. Testing Pipes

Pipes are pure functions — they can be tested without `TestBed`:

```typescript
// truncate.pipe.ts
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50): string {
    if (value.length <= limit) return value;
    return value.slice(0, limit) + '...';
  }
}
```

```typescript
// truncate.pipe.spec.ts
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => { pipe = new TruncatePipe(); });

  it('should return the string unchanged if within limit', () => {
    expect(pipe.transform('Hello', 10)).toBe('Hello');
  });

  it('should truncate and append ellipsis', () => {
    expect(pipe.transform('Hello, Angular!', 5)).toBe('Hello...');
  });

  it('should use 50 as default limit', () => {
    const longStr = 'a'.repeat(60);
    expect(pipe.transform(longStr)).toBe('a'.repeat(50) + '...');
  });
});
```

---

## 5. Testing Signals and Signal Forms

### Testing signal state

```typescript
it('should update count signal', () => {
  const count = signal(0);
  count.set(5);
  expect(count()).toBe(5);

  count.update(v => v * 2);
  expect(count()).toBe(10);
});

it('computed signal should recompute', () => {
  const price = signal(100);
  const tax = computed(() => price() * 0.1);
  expect(tax()).toBe(10);

  price.set(200);
  expect(tax()).toBe(20);
});
```

### Testing Signal Forms in components

```typescript
// login-form.component.spec.ts
describe('LoginFormComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let component: LoginFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable submit when fields are empty', () => {
    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.disabled).toBeTrue();
  });

  it('should enable submit when form is valid', () => {
    const emailInput = fixture.nativeElement.querySelector('#email');
    const passwordInput = fixture.nativeElement.querySelector('#password');

    emailInput.value = 'user@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'Password123!';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.disabled).toBeFalse();
  });
});
```

---

## 6. Testing HTTP Requests

`HttpClientTestingModule` provides `HttpTestingController` to verify, flush, and mock HTTP calls.

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should GET all products', () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Laptop', price: 999, category: 'electronics', image: '' }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].title).toBe('Laptop');
    });

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle HTTP errors', () => {
    service.getProducts().subscribe({
      next: () => fail('expected error'),
      error: (err) => expect(err.status).toBe(500)
    });

    const req = httpMock.expectOne('/api/products');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should POST to create a product', () => {
    const dto = { title: 'Mouse', price: 29, category: 'accessories' };
    const created = { id: 99, ...dto, image: '' };

    service.createProduct(dto).subscribe(product => {
      expect(product.id).toBe(99);
    });

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dto);
    req.flush(created);
  });
});
```

---

## 7. Component Testing Best Practices

### Test behavior, not implementation

```typescript
// BAD: testing internal implementation detail
expect(component.isSubmitting).toBe(true);

// GOOD: testing observable behavior from the user's perspective
const btn = fixture.nativeElement.querySelector('button[type="submit"]');
expect(btn.textContent.trim()).toBe('Saving...');
expect(btn.disabled).toBeTrue();
```

### Use `By.css()` for queries

```typescript
import { By } from '@angular/platform-browser';

const submitBtn = fixture.debugElement.query(By.css('[data-testid="submit-btn"]'));
const errorMsg = fixture.debugElement.query(By.css('.error-message'));
```

### Add data-testid attributes to important elements

```html
<button data-testid="submit-btn" type="submit">Submit</button>
<p data-testid="error-msg" class="error">{{ error() }}</p>
```

This decouples tests from CSS class names that might change.

### Always call `fixture.detectChanges()` after signal mutations

```typescript
component.count.set(10);
fixture.detectChanges();  // trigger change detection
expect(fixture.nativeElement.querySelector('p').textContent).toContain('10');
```

### Test edge cases

```typescript
it('should show empty state when list is empty', () => {
  component.items.set([]);
  fixture.detectChanges();
  const empty = fixture.nativeElement.querySelector('.empty-state');
  expect(empty).toBeTruthy();
});

it('should show error state on API failure', () => {
  component.error.set('Network error');
  fixture.detectChanges();
  const err = fixture.nativeElement.querySelector('[data-testid="error-msg"]');
  expect(err.textContent).toContain('Network error');
});
```

---

## 8. End-to-End Testing Overview

E2E tests run a real browser and interact with your app the way a user would.

### Playwright (recommended for Angular v22)

```bash
npm init playwright@latest
```

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('[data-testid="email-input"]', 'user@example.com');
  await page.fill('[data-testid="password-input"]', 'Password123!');
  await page.click('[data-testid="submit-btn"]');

  await expect(page).toHaveURL('http://localhost:4200/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});

test('shows error on invalid credentials', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('[data-testid="email-input"]', 'bad@example.com');
  await page.fill('[data-testid="password-input"]', 'wrongpassword');
  await page.click('[data-testid="submit-btn"]');

  await expect(page.locator('[data-testid="error-msg"]')).toBeVisible();
});
```

### Running E2E tests

```bash
npx playwright test
npx playwright test --ui   # visual runner
```

### Unit vs E2E

| Concern | Unit Test | E2E Test |
|---|---|---|
| Speed | Fast (milliseconds) | Slow (seconds) |
| Isolation | Isolated (mocked deps) | Real browser, real app |
| Scope | Single component/service | Full user flow |
| Flakiness | Low | Higher (network, timing) |
| Use for | Logic correctness | Critical user journeys |

---

## Knowledge Check

**Q1:** What is `fixture.detectChanges()` and when do you need to call it?

**A:** It triggers Angular's change detection cycle in the test environment. You must call it after: initial component creation, setting input values, changing signal values, or any action that should update the DOM. Without it, the template won't re-render.

---

**Q2:** What does `httpMock.verify()` do in `afterEach()`?

**A:** It asserts that there are no pending, unhandled HTTP requests left over from the test. If a test makes an HTTP request but doesn't flush it, `verify()` fails the test. This prevents requests from one test leaking into the next.

---

**Q3:** What is the advantage of using `data-testid` attributes vs CSS class selectors?

**A:** CSS classes are presentation concerns that designers and developers change freely. Using `data-testid` attributes creates a stable contract between the template and tests — you can restyle the component without breaking tests.

---

**Next:** [Section 21 — AI Tooling and Developer Experience](../Section%2021%20-%20AI%20Tooling%20and%20Developer%20Experience/README.md)
