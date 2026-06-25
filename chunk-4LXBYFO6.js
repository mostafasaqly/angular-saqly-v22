import"./chunk-JS3ZFT6L.js";var e={id:20,title:"\u0623\u0633\u0627\u0633\u064A\u0627\u062A Testing",titleEn:"Testing Basics",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"Testing \u064A\u0636\u0645\u0646 \u0623\u0646 \u0643\u0648\u062F\u0643 \u064A\u0639\u0645\u0644 \u0643\u0645\u0627 \u0647\u0648 \u0645\u062A\u0648\u0642\u0639 \u0648\u0644\u0627 \u064A\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644 \u0639\u0646\u062F \u0625\u062C\u0631\u0627\u0621 \u062A\u063A\u064A\u064A\u0631\u0627\u062A. Angular v22 \u064A\u064F\u0648\u0641\u0631 TestBed \u0644\u0627\u062E\u062A\u0628\u0627\u0631 Components\u060C \u0648both Jasmine \u0648Jest \u0645\u062F\u0639\u0648\u0645\u0627\u0646. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0623\u0646\u0648\u0627\u0639 Tests \u0648\u0643\u064A\u0641\u064A\u0629 \u0643\u062A\u0627\u0628\u0629 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0641\u0639\u0651\u0627\u0644\u0629 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0648Components.",introEn:"Testing ensures your code works as expected and does not break when you make changes. Angular v22 provides TestBed for component testing, and both Jasmine and Jest are supported. This section covers test types and how to write effective tests for services and components.",lessons:["\u0623\u0646\u0648\u0627\u0639 Tests","\u0627\u062E\u062A\u0628\u0627\u0631 Services \u0645\u0639 Signals","\u0627\u062E\u062A\u0628\u0627\u0631 Components \u0645\u0639 TestBed","\u0645\u062D\u0627\u0643\u0627\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A (Mocking)","\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0648\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645","\u0627\u062E\u062A\u0628\u0627\u0631 HTTP (HttpClientTestingModule)","Jest \u0645\u0642\u0627\u0628\u0644 Jasmine","\u0623\u0641\u0636\u0644 \u0645\u0645\u0627\u0631\u0633\u0627\u062A Testing"],lessonsEn:["Types of Tests","Testing Services with Signals","Testing Components with TestBed","Mocking Dependencies","Testing Templates and User Interaction","Testing HTTP (HttpClientTestingModule)","Jest vs Jasmine","Testing Best Practices"],content:[{type:"heading",text:"\u0623\u0646\u0648\u0627\u0639 Tests"},{type:"list",items:["Unit Tests (\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0648\u062D\u062F\u0629): \u062A\u062E\u062A\u0628\u0631 \u0648\u0638\u064A\u0641\u0629 \u0623\u0648 \u062E\u062F\u0645\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u064A \u0639\u0632\u0644\u0629 \u2014 \u0633\u0631\u064A\u0639\u0629 \u0648\u0643\u062B\u064A\u0631\u0629","Integration Tests (\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0643\u0627\u0645\u0644): \u062A\u062E\u062A\u0628\u0631 \u0639\u062F\u0629 \u0648\u062D\u062F\u0627\u062A \u0645\u0639\u0627\u064B \u2014 \u0628\u0639\u0636\u0647\u0627 \u064A\u0633\u062A\u062E\u062F\u0645 TestBed","E2E Tests (\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0644\u0644\u0646\u0647\u0627\u064A\u0629): \u0645\u062D\u0627\u0643\u0627\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0641\u0639\u0644\u064A \u0639\u0628\u0631 Playwright \u0623\u0648 Cypress","\u0627\u0644\u0642\u0627\u0639\u062F\u0629: 70% \u0648\u062D\u062F\u0629\u060C 20% \u062A\u0643\u0627\u0645\u0644\u060C 10% E2E"]},{type:"heading",text:"\u0627\u062E\u062A\u0628\u0627\u0631 Services \u0645\u0639 Signals"},{type:"code",code:`// counter.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private _count = signal(0);
  readonly count    = this._count.asReadonly();
  readonly isEven   = computed(() => this._count() % 2 === 0);

  increment() { this._count.update(v => v + 1); }
  decrement() { this._count.update(v => v - 1); }
  reset()     { this._count.set(0); }
}

// counter.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { CounterService } from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('\u064A\u0628\u062F\u0623 \u0628\u0642\u064A\u0645\u0629 \u0635\u0641\u0631', () => {
    expect(service.count()).toBe(0);
  });

  it('\u064A\u0632\u064A\u062F \u0627\u0644\u0642\u064A\u0645\u0629 \u0628\u0640 1', () => {
    service.increment();
    expect(service.count()).toBe(1);
  });

  it('\u064A\u062D\u0633\u0628 isEven \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D', () => {
    expect(service.isEven()).toBeTrue();
    service.increment();
    expect(service.isEven()).toBeFalse();
  });

  it('\u064A\u064F\u0639\u064A\u062F \u0627\u0644\u0642\u064A\u0645\u0629 \u0644\u0644\u0635\u0641\u0631', () => {
    service.increment();
    service.increment();
    service.reset();
    expect(service.count()).toBe(0);
  });
});`},{type:"heading",text:"\u0627\u062E\u062A\u0628\u0627\u0631 Components \u0645\u0639 TestBed"},{type:"code",code:`// greeting.component.ts
@Component({
  standalone: true,
  template: \`<h1>\u0645\u0631\u062D\u0628\u0627\u064B {{ name() }}!</h1>\`
})
export class GreetingComponent {
  name = input.required<string>();
}

// greeting.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GreetingComponent } from './greeting.component';

describe('GreetingComponent', () => {
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    fixture.componentRef.setInput('name', '\u0623\u062D\u0645\u062F');
    fixture.detectChanges();
  });

  it('\u064A\u0639\u0631\u0636 \u0627\u0644\u0627\u0633\u0645 \u0641\u064A \u0627\u0644\u0639\u0646\u0648\u0627\u0646', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('\u0623\u062D\u0645\u062F');
  });

  it('\u064A\u064F\u062D\u062F\u0651\u062B \u0627\u0644\u0639\u0631\u0636 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0627\u0633\u0645', () => {
    fixture.componentRef.setInput('name', '\u0641\u0627\u0637\u0645\u0629');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('\u0641\u0627\u0637\u0645\u0629');
  });
});`},{type:"heading",text:"\u0645\u062D\u0627\u0643\u0627\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A (Mocking)"},{type:"code",code:`// \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0643\u0648\u0651\u0646 \u064A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u062E\u062F\u0645\u0629
describe('UserProfileComponent', () => {
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // \u0625\u0646\u0634\u0627\u0621 \u0646\u0633\u062E\u0629 \u0645\u064F\u062D\u0627\u0643\u0627\u0629 (spy) \u0645\u0646 \u0627\u0644\u062E\u062F\u0645\u0629
    const authSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      user:       signal({ name: '\u0623\u062D\u0645\u062F', email: 'a@a.com' }),
      isLoggedIn: signal(true),
    });

    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(UserProfileComponent);
    fixture.detectChanges();
  });

  it('\u064A\u0639\u0631\u0636 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645', () => {
    const name = fixture.nativeElement.querySelector('[data-testid="user-name"]');
    expect(name.textContent).toContain('\u0623\u062D\u0645\u062F');
  });

  it('\u064A\u0633\u062A\u062F\u0639\u064A logout \u0639\u0646\u062F \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0632\u0631', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="logout-btn"]');
    btn.click();
    expect(authService.logout).toHaveBeenCalledOnce();
  });
});`},{type:"tip",text:'\u0623\u0636\u0641 data-testid \u0644\u0643\u0644 \u0639\u0646\u0635\u0631 \u062A\u0641\u0627\u0639\u0644\u064A \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 querySelector("[data-testid=\\"name\\"]") \u0628\u062F\u0644\u0627\u064B \u0645\u0646 CSS classes \u0627\u0644\u062A\u064A \u062A\u062A\u063A\u064A\u0631 \u0645\u0639 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0635\u0645\u064A\u0645.'},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 fixture.detectChanges() \u0648fixture.whenStable()\u061F",answer:"detectChanges() \u064A\u064F\u0634\u063A\u0651\u0644 \u062F\u0648\u0631\u0629 \u0643\u0634\u0641 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0648\u0627\u062D\u062F\u0629 \u0645\u062A\u0632\u0627\u0645\u0646\u0629. whenStable() \u064A\u064F\u0643\u0645\u0644 \u0628\u0639\u062F \u0627\u0646\u062A\u0647\u0627\u0621 \u0643\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u062A\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0645\u0639\u0644\u0651\u0642\u0629 (\u0643\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0624\u0642\u062A\u0627\u062A). \u0627\u0633\u062A\u062E\u062F\u0645 await fixture.whenStable() \u0628\u0639\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u062A\u0632\u0627\u0645\u0646\u0629."},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u0644\u0627 \u0646\u062E\u062A\u0628\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062F\u0627\u062E\u0644\u064A \u0628\u0644 \u0627\u0644\u0633\u0644\u0648\u0643 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u061F",answer:'\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062F\u0627\u062E\u0644\u064A \u064A\u062C\u0639\u0644 Tests \u0647\u0634\u0651\u0629 \u2014 \u062A\u0646\u0643\u0633\u0631 \u0639\u0646\u062F \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0646\u0638\u064A\u0645 \u062D\u062A\u0649 \u0644\u0648 \u0627\u0644\u0648\u0638\u064A\u0641\u0629 \u0644\u0645 \u062A\u062A\u063A\u064A\u0651\u0631. \u0627\u062E\u062A\u0628\u0631 \u0645\u0627 \u064A\u0631\u0627\u0647 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645: "\u0639\u0646\u062F \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0632\u0631\u060C \u062A\u0638\u0647\u0631 \u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062E\u0637\u0623" \u2014 \u0648\u0644\u064A\u0633 "\u0639\u0646\u062F \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0632\u0631\u060C \u064A\u062A\u0645 \u0627\u0633\u062A\u062F\u0639\u0627\u0621 setState \u0628\u0627\u0644\u0642\u064A\u0645\u0629 X".'}],contentEn:[{type:"heading",text:"Types of Tests"},{type:"list",items:["Unit Tests: test a single function or service in isolation \u2014 fast and numerous","Integration Tests: test multiple units together \u2014 some use TestBed","E2E Tests: simulate a real user via Playwright or Cypress","Rule of thumb: 70% unit, 20% integration, 10% E2E"]},{type:"heading",text:"Testing Services with Signals"},{type:"code",code:`// counter.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private _count = signal(0);
  readonly count  = this._count.asReadonly();
  readonly isEven = computed(() => this._count() % 2 === 0);

  increment() { this._count.update(v => v + 1); }
  decrement() { this._count.update(v => v - 1); }
  reset()     { this._count.set(0); }
}

// counter.service.spec.ts
describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('starts at zero', () => {
    expect(service.count()).toBe(0);
  });

  it('increments by 1', () => {
    service.increment();
    expect(service.count()).toBe(1);
  });

  it('computes isEven correctly', () => {
    expect(service.isEven()).toBeTrue();
    service.increment();
    expect(service.isEven()).toBeFalse();
  });

  it('resets to zero', () => {
    service.increment();
    service.increment();
    service.reset();
    expect(service.count()).toBe(0);
  });
});`},{type:"heading",text:"Testing Components with TestBed"},{type:"code",code:`// greeting.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GreetingComponent } from './greeting.component';

describe('GreetingComponent', () => {
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    fixture.componentRef.setInput('name', 'Ahmed');
    fixture.detectChanges();
  });

  it('displays the name in the heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Ahmed');
  });

  it('updates when the name input changes', () => {
    fixture.componentRef.setInput('name', 'Fatima');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Fatima');
  });
});`},{type:"heading",text:"Mocking Dependencies"},{type:"code",code:`describe('UserProfileComponent', () => {
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Create a spy (mock) of the service
    const authSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      user:       signal({ name: 'Ahmed', email: 'a@a.com' }),
      isLoggedIn: signal(true),
    });

    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(UserProfileComponent);
    fixture.detectChanges();
  });

  it('displays the user name', () => {
    const name = fixture.nativeElement.querySelector('[data-testid="user-name"]');
    expect(name.textContent).toContain('Ahmed');
  });

  it('calls logout when button is clicked', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="logout-btn"]');
    btn.click();
    expect(authService.logout).toHaveBeenCalledOnce();
  });
});`},{type:"tip",text:'Add data-testid to every interactive element \u2014 use querySelector("[data-testid=\\"name\\"]") instead of CSS classes that change during redesigns.'},{type:"qa",question:"What is the difference between fixture.detectChanges() and fixture.whenStable()?",answer:"detectChanges() runs a single synchronous change detection cycle. whenStable() resolves after all pending async operations complete (requests, timers, etc.). Use await fixture.whenStable() after async operations."},{type:"qa",question:"Why test external behavior instead of internal implementation?",answer:'Testing implementation details makes tests brittle \u2014 they break on refactoring even if functionality has not changed. Test what the user sees: "when the button is clicked, the error message appears" \u2014 not "when the button is clicked, setState is called with value X".'}]};export{e as default};
