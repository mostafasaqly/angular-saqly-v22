// Section 20 — Testing Basics
export default {
  id: 20,
  title: 'أساسيات الاختبار',
  titleEn: 'Testing Basics',
  level: 'متوسط',
  levelEn: 'Intermediate',
  intro: 'الاختبار يضمن أن كودك يعمل كما هو متوقع ولا يتوقف عن العمل عند إجراء تغييرات. Angular v22 يُوفر TestBed لاختبار المكوّنات، وboth Jasmine وJest مدعومان. هذا القسم يغطي أنواع الاختبارات وكيفية كتابة اختبارات فعّالة للخدمات والمكوّنات.',
  introEn: 'Testing ensures your code works as expected and does not break when you make changes. Angular v22 provides TestBed for component testing, and both Jasmine and Jest are supported. This section covers test types and how to write effective tests for services and components.',

  lessons: [
    'أنواع الاختبارات',
    'اختبار الخدمات مع Signals',
    'اختبار المكوّنات مع TestBed',
    'محاكاة الاعتماديات (Mocking)',
    'اختبار القوالب والمستخدم',
    'اختبار HTTP (HttpClientTestingModule)',
    'Jest مقابل Jasmine',
    'أفضل ممارسات الاختبار',
  ],
  lessonsEn: [
    'Types of Tests',
    'Testing Services with Signals',
    'Testing Components with TestBed',
    'Mocking Dependencies',
    'Testing Templates and User Interaction',
    'Testing HTTP (HttpClientTestingModule)',
    'Jest vs Jasmine',
    'Testing Best Practices',
  ],

  content: [
    { type: 'heading', text: 'أنواع الاختبارات' },
    {
      type: 'list',
      items: [
        'Unit Tests (اختبارات الوحدة): تختبر وظيفة أو خدمة واحدة في عزلة — سريعة وكثيرة',
        'Integration Tests (اختبارات التكامل): تختبر عدة وحدات معاً — بعضها يستخدم TestBed',
        'E2E Tests (اختبارات من البداية للنهاية): محاكاة المستخدم الفعلي عبر Playwright أو Cypress',
        'القاعدة: 70% وحدة، 20% تكامل، 10% E2E',
      ],
    },

    { type: 'heading', text: 'اختبار الخدمات مع Signals' },
    {
      type: 'code',
      code: `// counter.service.ts
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

  it('يبدأ بقيمة صفر', () => {
    expect(service.count()).toBe(0);
  });

  it('يزيد القيمة بـ 1', () => {
    service.increment();
    expect(service.count()).toBe(1);
  });

  it('يحسب isEven بشكل صحيح', () => {
    expect(service.isEven()).toBeTrue();
    service.increment();
    expect(service.isEven()).toBeFalse();
  });

  it('يُعيد القيمة للصفر', () => {
    service.increment();
    service.increment();
    service.reset();
    expect(service.count()).toBe(0);
  });
});`,
    },

    { type: 'heading', text: 'اختبار المكوّنات مع TestBed' },
    {
      type: 'code',
      code: `// greeting.component.ts
@Component({
  standalone: true,
  template: \`<h1>مرحباً {{ name() }}!</h1>\`
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
    fixture.componentRef.setInput('name', 'أحمد');
    fixture.detectChanges();
  });

  it('يعرض الاسم في العنوان', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('أحمد');
  });

  it('يُحدّث العرض عند تغيير الاسم', () => {
    fixture.componentRef.setInput('name', 'فاطمة');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('فاطمة');
  });
});`,
    },

    { type: 'heading', text: 'محاكاة الاعتماديات (Mocking)' },
    {
      type: 'code',
      code: `// اختبار مكوّن يعتمد على خدمة
describe('UserProfileComponent', () => {
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // إنشاء نسخة مُحاكاة (spy) من الخدمة
    const authSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      user:       signal({ name: 'أحمد', email: 'a@a.com' }),
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

  it('يعرض اسم المستخدم', () => {
    const name = fixture.nativeElement.querySelector('[data-testid="user-name"]');
    expect(name.textContent).toContain('أحمد');
  });

  it('يستدعي logout عند الضغط على الزر', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="logout-btn"]');
    btn.click();
    expect(authService.logout).toHaveBeenCalledOnce();
  });
});`,
    },
    { type: 'tip', text: 'أضف data-testid لكل عنصر تفاعلي — استخدم querySelector("[data-testid=\\"name\\"]") بدلاً من CSS classes التي تتغير مع إعادة التصميم.' },
    {
      type: 'qa',
      question: 'ما الفرق بين fixture.detectChanges() وfixture.whenStable()؟',
      answer: 'detectChanges() يُشغّل دورة كشف تغييرات واحدة متزامنة. whenStable() يُكمل بعد انتهاء كل العمليات غير المتزامنة المعلّقة (كالطلبات والمؤقتات). استخدم await fixture.whenStable() بعد العمليات غير المتزامنة.',
    },
    {
      type: 'qa',
      question: 'لماذا لا نختبر التنفيذ الداخلي بل السلوك الخارجي؟',
      answer: 'اختبار التنفيذ الداخلي يجعل الاختبارات هشّة — تنكسر عند إعادة التنظيم حتى لو الوظيفة لم تتغيّر. اختبر ما يراه المستخدم: "عند الضغط على الزر، تظهر رسالة الخطأ" — وليس "عند الضغط على الزر، يتم استدعاء setState بالقيمة X".',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Types of Tests' },
    {
      type: 'list',
      items: [
        'Unit Tests: test a single function or service in isolation — fast and numerous',
        'Integration Tests: test multiple units together — some use TestBed',
        'E2E Tests: simulate a real user via Playwright or Cypress',
        'Rule of thumb: 70% unit, 20% integration, 10% E2E',
      ],
    },

    { type: 'heading', text: 'Testing Services with Signals' },
    {
      type: 'code',
      code: `// counter.service.ts
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
});`,
    },

    { type: 'heading', text: 'Testing Components with TestBed' },
    {
      type: 'code',
      code: `// greeting.component.spec.ts
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
});`,
    },

    { type: 'heading', text: 'Mocking Dependencies' },
    {
      type: 'code',
      code: `describe('UserProfileComponent', () => {
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
});`,
    },
    { type: 'tip', text: 'Add data-testid to every interactive element — use querySelector("[data-testid=\\"name\\"]") instead of CSS classes that change during redesigns.' },
    {
      type: 'qa',
      question: 'What is the difference between fixture.detectChanges() and fixture.whenStable()?',
      answer: 'detectChanges() runs a single synchronous change detection cycle. whenStable() resolves after all pending async operations complete (requests, timers, etc.). Use await fixture.whenStable() after async operations.',
    },
    {
      type: 'qa',
      question: 'Why test external behavior instead of internal implementation?',
      answer: 'Testing implementation details makes tests brittle — they break on refactoring even if functionality has not changed. Test what the user sees: "when the button is clicked, the error message appears" — not "when the button is clicked, setState is called with value X".',
    },
  ],
};
