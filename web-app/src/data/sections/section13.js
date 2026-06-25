// Section 13 — RxJS Essentials
export default {
  id: 13,
  title: 'أساسيات RxJS',
  titleEn: 'RxJS Essentials',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'RxJS هي مكتبة البرمجة التفاعلية المستخدمة في Angular لإدارة التدفقات غير المتزامنة. هذا القسم يغطي المفاهيم الأساسية: Observables، Operators الأكثر أهمية (map، filter، switchMap، debounceTime)، وكيفية دمج RxJS مع Signals في Angular v22.',
  introEn: 'RxJS is the reactive programming library used in Angular for managing asynchronous streams. This section covers the core concepts: Observables, the most important operators (map, filter, switchMap, debounceTime), and how to combine RxJS with Signals in Angular v22.',

  lessons: [
    'ما هو Observable؟',
    'إنشاء Observables',
    'Operators الأساسية',
    'map وfilter وtap',
    'switchMap وmergeMap وconcatMap',
    'debounceTime وdistinctUntilChanged',
    'إدارة الاشتراكات',
    'RxJS مع Signals — toSignal وtoObservable',
  ],
  lessonsEn: [
    'What is an Observable?',
    'Creating Observables',
    'Core Operators',
    'map, filter, tap',
    'switchMap, mergeMap, concatMap',
    'debounceTime and distinctUntilChanged',
    'Subscription Management',
    'RxJS with Signals — toSignal and toObservable',
  ],

  content: [
    { type: 'heading', text: 'ما هو Observable؟' },
    { type: 'paragraph', text: 'Observable هو تدفق من القيم عبر الزمن. يمكن أن يُرسل: قيمة واحدة، عدة قيم، أو لا شيء. يمكن أن يكتمل، أو ينتج خطأً. الفرق عن Promise: Observable كسول (lazy) ويمكن إلغاؤه.' },
    {
      type: 'code',
      code: `import { Observable, of, from, interval, fromEvent } from 'rxjs';

// قيمة واحدة فوراً
const immediate$ = of('مرحباً');

// قيم متعددة بشكل متزامن
const sequence$ = of(1, 2, 3, 4, 5);

// من مصفوفة
const array$ = from([10, 20, 30]);

// مؤقت — يُرسل رقم كل ثانية
const timer$ = interval(1000);

// من حدث DOM
const clicks$ = fromEvent(document, 'click');

// Observable مخصص
const custom$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// الاشتراك
const sub = sequence$.subscribe({
  next:     (value) => console.log(value),
  error:    (err)   => console.error(err),
  complete: ()      => console.log('اكتمل'),
});`,
    },
    { type: 'tip', text: 'الـ $ في نهاية اسم المتغير هو اتفاقية لتمييز Observables. ليس إلزامياً لكنه شائع في مشاريع Angular.' },

    { type: 'heading', text: 'Operators الأساسية' },
    { type: 'paragraph', text: 'Operators هي دوال نقية تُحوّل Observable إلى Observable آخر. تُستخدم مع pipe().' },
    {
      type: 'code',
      code: `import { of, interval } from 'rxjs';
import { map, filter, tap, take } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5, 6);

source$.pipe(
  filter(n => n % 2 === 0),       // 2، 4، 6
  map(n => n * n),                // 4، 16، 36
  tap(n => console.log('قيمة:', n)), // تأثير جانبي بدون تعديل
).subscribe(console.log);

// take: خذ عدد محدد من القيم ثم أكمل
interval(500).pipe(
  take(5),   // يستمر فقط 5 مرات
).subscribe(i => console.log(i));`,
    },

    { type: 'heading', text: 'switchMap وmergeMap وconcatMap' },
    {
      type: 'code',
      code: `import { fromEvent } from 'rxjs';
import { switchMap, debounceTime, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// switchMap: يلغي الطلب السابق عند وصول طلب جديد
// مثالي للبحث الفوري
const searchResults$ = searchInput$.pipe(
  debounceTime(300),
  switchMap(term =>
    this.http.get<Product[]>(\`/api/products?q=\${term}\`)
  )
);

// mergeMap: يُشغّل كل الطلبات بالتوازي
// مناسب للعمليات المستقلة

// concatMap: ينتظر اكتمال كل طلب قبل الشروع في التالي
// مناسب عندما يهم الترتيب`,
    },

    { type: 'heading', text: 'إدارة الاشتراكات' },
    {
      type: 'code',
      code: `import { Component, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({ ... })
export class TimerComponent {
  count = 0;

  constructor() {
    // takeUntilDestroyed: يُلغي الاشتراك تلقائياً عند تدمير المكوّن
    interval(1000).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => this.count++);
  }
}

// البديل: async pipe في القالب — يُدير الاشتراك تلقائياً
// template: <p>{{ timer$ | async }}</p>`,
    },
    { type: 'warning', text: 'نسيان إلغاء الاشتراكات (memory leaks) من أكثر الأخطاء شيوعاً في Angular. استخدم takeUntilDestroyed() دائماً أو async pipe في القوالب.' },

    { type: 'heading', text: 'RxJS مع Signals — toSignal وtoObservable' },
    {
      type: 'code',
      code: `import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';

// Observable → Signal: للاستخدام في القوالب
const tick = toSignal(interval(1000), { initialValue: 0 });
// template: <p>{{ tick() }}</p>

// Signal → Observable: للاستخدام مع RxJS operators
const searchTerm = signal('');
const results$ = toObservable(searchTerm).pipe(
  debounceTime(300),
  switchMap(term =>
    term ? this.http.get(\`/api/search?q=\${term}\`) : of([])
  )
);
const results = toSignal(results$, { initialValue: [] });`,
    },
    {
      type: 'qa',
      question: 'ما الفرق بين switchMap وmergeMap وconcatMap؟',
      answer: 'switchMap: يلغي الطلب السابق عند وصول قيمة جديدة — مثالي للبحث الفوري. mergeMap: يُشغّل كل الطلبات بالتوازي — للعمليات المستقلة. concatMap: ينتظر اكتمال كل طلب قبل الشروع في التالي — عندما يهم الترتيب.',
    },
    {
      type: 'qa',
      question: 'ما الطريقة المفضّلة لإلغاء الاشتراكات في Angular v22 تلقائياً؟',
      answer: 'takeUntilDestroyed() من @angular/core/rxjs-interop — يُلغي الاشتراك تلقائياً عند تدمير المكوّن أو الخدمة. البديل الآخر هو async pipe في القالب — يُنشئ الاشتراك ويُلغيه تلقائياً.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'What is an Observable?' },
    { type: 'paragraph', text: 'An Observable is a stream of values over time. It can emit one value, multiple values, or none. It can complete or produce an error. Unlike a Promise: an Observable is lazy and cancellable.' },
    {
      type: 'code',
      code: `import { Observable, of, from, interval, fromEvent } from 'rxjs';

// Single value immediately
const immediate$ = of('Hello');

// Multiple values synchronously
const sequence$ = of(1, 2, 3, 4, 5);

// From an array
const array$ = from([10, 20, 30]);

// Timer — emits a number every second
const timer$ = interval(1000);

// From a DOM event
const clicks$ = fromEvent(document, 'click');

// Custom Observable
const custom$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// Subscribe
const sub = sequence$.subscribe({
  next:     (value) => console.log(value),
  error:    (err)   => console.error(err),
  complete: ()      => console.log('Completed'),
});`,
    },
    { type: 'tip', text: 'The $ suffix on variable names is a convention for identifying Observables. Not required but widely used in Angular projects.' },

    { type: 'heading', text: 'Core Operators' },
    { type: 'paragraph', text: 'Operators are pure functions that transform one Observable into another. Used with pipe().' },
    {
      type: 'code',
      code: `import { of, interval } from 'rxjs';
import { map, filter, tap, take } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5, 6);

source$.pipe(
  filter(n => n % 2 === 0),       // 2, 4, 6
  map(n => n * n),                // 4, 16, 36
  tap(n => console.log('val:', n)), // side effect without modifying
).subscribe(console.log);

// take: take N values then complete
interval(500).pipe(
  take(5),   // only continues 5 times
).subscribe(i => console.log(i));`,
    },

    { type: 'heading', text: 'switchMap, mergeMap, concatMap' },
    {
      type: 'code',
      code: `import { switchMap, mergeMap, concatMap, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// switchMap: cancels the previous request when a new one arrives
// Ideal for live search
const searchResults$ = searchInput$.pipe(
  debounceTime(300),
  switchMap(term =>
    this.http.get<Product[]>(\`/api/products?q=\${term}\`)
  )
);

// mergeMap: runs all requests in parallel
// For independent operations

// concatMap: waits for each request to complete before starting the next
// When order matters`,
    },

    { type: 'heading', text: 'Subscription Management' },
    {
      type: 'code',
      code: `import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({ ... })
export class TimerComponent {
  count = 0;

  constructor() {
    // takeUntilDestroyed: auto-cancels when the component is destroyed
    interval(1000).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => this.count++);
  }
}

// Alternative: async pipe in template — manages subscription automatically
// template: <p>{{ timer$ | async }}</p>`,
    },
    { type: 'warning', text: 'Forgetting to unsubscribe (memory leaks) is one of the most common bugs in Angular. Always use takeUntilDestroyed() or the async pipe in templates.' },

    { type: 'heading', text: 'RxJS with Signals — toSignal and toObservable' },
    {
      type: 'code',
      code: `import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';

// Observable → Signal: for template binding
const tick = toSignal(interval(1000), { initialValue: 0 });
// template: <p>{{ tick() }}</p>

// Signal → Observable: for RxJS operators
const searchTerm = signal('');
const results$ = toObservable(searchTerm).pipe(
  debounceTime(300),
  switchMap(term =>
    term ? this.http.get(\`/api/search?q=\${term}\`) : of([])
  )
);
const results = toSignal(results$, { initialValue: [] });`,
    },
    {
      type: 'qa',
      question: 'What is the difference between switchMap, mergeMap, and concatMap?',
      answer: 'switchMap: cancels the previous inner Observable when a new outer value arrives — ideal for live search. mergeMap: runs all inner Observables in parallel — for independent operations. concatMap: waits for each inner Observable to complete before starting the next — when order matters.',
    },
    {
      type: 'qa',
      question: 'What is the preferred way to automatically cancel subscriptions in Angular v22?',
      answer: 'takeUntilDestroyed() from @angular/core/rxjs-interop — automatically cancels the subscription when the component or service is destroyed. The other option is the async pipe in templates — it creates and cancels subscriptions automatically.',
    },
  ],
};
