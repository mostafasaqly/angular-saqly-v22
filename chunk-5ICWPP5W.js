import"./chunk-JS3ZFT6L.js";var e={id:13,title:"\u0623\u0633\u0627\u0633\u064A\u0627\u062A RxJS",titleEn:"RxJS Essentials",level:"\u0645\u062A\u0648\u0633\u0637 \u2013 \u0645\u062A\u0642\u062F\u0645",levelEn:"Intermediate\u2013Advanced",intro:"RxJS \u0647\u064A \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0628\u0631\u0645\u062C\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0641\u064A Angular \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u062F\u0641\u0642\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u062A\u0632\u0627\u0645\u0646\u0629. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629: Observables\u060C Operators \u0627\u0644\u0623\u0643\u062B\u0631 \u0623\u0647\u0645\u064A\u0629 (map\u060C filter\u060C switchMap\u060C debounceTime)\u060C \u0648\u0643\u064A\u0641\u064A\u0629 \u062F\u0645\u062C RxJS \u0645\u0639 Signals \u0641\u064A Angular v22.",introEn:"RxJS is the reactive programming library used in Angular for managing asynchronous streams. This section covers the core concepts: Observables, the most important operators (map, filter, switchMap, debounceTime), and how to combine RxJS with Signals in Angular v22.",lessons:["\u0645\u0627 \u0647\u0648 Observable\u061F","\u0625\u0646\u0634\u0627\u0621 Observables","Core Operators","map, filter, tap","switchMap, mergeMap, concatMap","debounceTime and distinctUntilChanged","Subscription Management","RxJS with Signals \u2014 toSignal and toObservable"],lessonsEn:["What is an Observable?","Creating Observables","Core Operators","map, filter, tap","switchMap, mergeMap, concatMap","debounceTime and distinctUntilChanged","Subscription Management","RxJS with Signals \u2014 toSignal and toObservable"],content:[{type:"heading",text:"\u0645\u0627 \u0647\u0648 Observable\u061F"},{type:"paragraph",text:"Observable \u0647\u0648 \u062A\u062F\u0641\u0642 \u0645\u0646 \u0627\u0644\u0642\u064A\u0645 \u0639\u0628\u0631 \u0627\u0644\u0632\u0645\u0646. \u064A\u0645\u0643\u0646 \u0623\u0646 \u064A\u064F\u0631\u0633\u0644: \u0642\u064A\u0645\u0629 \u0648\u0627\u062D\u062F\u0629\u060C \u0639\u062F\u0629 \u0642\u064A\u0645\u060C \u0623\u0648 \u0644\u0627 \u0634\u064A\u0621. \u064A\u0645\u0643\u0646 \u0623\u0646 \u064A\u0643\u062A\u0645\u0644\u060C \u0623\u0648 \u064A\u0646\u062A\u062C \u062E\u0637\u0623\u064B. \u0627\u0644\u0641\u0631\u0642 \u0639\u0646 Promise: Observable \u0643\u0633\u0648\u0644 (lazy) \u0648\u064A\u0645\u0643\u0646 \u0625\u0644\u063A\u0627\u0624\u0647."},{type:"code",code:`import { Observable, of, from, interval, fromEvent } from 'rxjs';

// \u0642\u064A\u0645\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0648\u0631\u0627\u064B
const immediate$ = of('\u0645\u0631\u062D\u0628\u0627\u064B');

// \u0642\u064A\u0645 \u0645\u062A\u0639\u062F\u062F\u0629 \u0628\u0634\u0643\u0644 \u0645\u062A\u0632\u0627\u0645\u0646
const sequence$ = of(1, 2, 3, 4, 5);

// \u0645\u0646 \u0645\u0635\u0641\u0648\u0641\u0629
const array$ = from([10, 20, 30]);

// \u0645\u0624\u0642\u062A \u2014 \u064A\u064F\u0631\u0633\u0644 \u0631\u0642\u0645 \u0643\u0644 \u062B\u0627\u0646\u064A\u0629
const timer$ = interval(1000);

// \u0645\u0646 \u062D\u062F\u062B DOM
const clicks$ = fromEvent(document, 'click');

// Observable \u0645\u062E\u0635\u0635
const custom$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643
const sub = sequence$.subscribe({
  next:     (value) => console.log(value),
  error:    (err)   => console.error(err),
  complete: ()      => console.log('\u0627\u0643\u062A\u0645\u0644'),
});`},{type:"tip",text:"\u0627\u0644\u0640 $ \u0641\u064A \u0646\u0647\u0627\u064A\u0629 \u0627\u0633\u0645 \u0627\u0644\u0645\u062A\u063A\u064A\u0631 \u0647\u0648 \u0627\u062A\u0641\u0627\u0642\u064A\u0629 \u0644\u062A\u0645\u064A\u064A\u0632 Observables. \u0644\u064A\u0633 \u0625\u0644\u0632\u0627\u0645\u064A\u0627\u064B \u0644\u0643\u0646\u0647 \u0634\u0627\u0626\u0639 \u0641\u064A \u0645\u0634\u0627\u0631\u064A\u0639 Angular."},{type:"heading",text:"Operators \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629"},{type:"paragraph",text:"Operators \u0647\u064A \u062F\u0648\u0627\u0644 \u0646\u0642\u064A\u0629 \u062A\u064F\u062D\u0648\u0651\u0644 Observable \u0625\u0644\u0649 Observable \u0622\u062E\u0631. \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0645\u0639 pipe()."},{type:"code",code:`import { of, interval } from 'rxjs';
import { map, filter, tap, take } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5, 6);

source$.pipe(
  filter(n => n % 2 === 0),       // 2\u060C 4\u060C 6
  map(n => n * n),                // 4\u060C 16\u060C 36
  tap(n => console.log('\u0642\u064A\u0645\u0629:', n)), // \u062A\u0623\u062B\u064A\u0631 \u062C\u0627\u0646\u0628\u064A \u0628\u062F\u0648\u0646 \u062A\u0639\u062F\u064A\u0644
).subscribe(console.log);

// take: \u062E\u0630 \u0639\u062F\u062F \u0645\u062D\u062F\u062F \u0645\u0646 \u0627\u0644\u0642\u064A\u0645 \u062B\u0645 \u0623\u0643\u0645\u0644
interval(500).pipe(
  take(5),   // \u064A\u0633\u062A\u0645\u0631 \u0641\u0642\u0637 5 \u0645\u0631\u0627\u062A
).subscribe(i => console.log(i));`},{type:"heading",text:"switchMap \u0648mergeMap \u0648concatMap"},{type:"code",code:`import { fromEvent } from 'rxjs';
import { switchMap, debounceTime, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// switchMap: \u064A\u0644\u063A\u064A \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0633\u0627\u0628\u0642 \u0639\u0646\u062F \u0648\u0635\u0648\u0644 \u0637\u0644\u0628 \u062C\u062F\u064A\u062F
// \u0645\u062B\u0627\u0644\u064A \u0644\u0644\u0628\u062D\u062B \u0627\u0644\u0641\u0648\u0631\u064A
const searchResults$ = searchInput$.pipe(
  debounceTime(300),
  switchMap(term =>
    this.http.get<Product[]>(\`/api/products?q=\${term}\`)
  )
);

// mergeMap: \u064A\u064F\u0634\u063A\u0651\u0644 \u0643\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0628\u0627\u0644\u062A\u0648\u0627\u0632\u064A
// \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629

// concatMap: \u064A\u0646\u062A\u0638\u0631 \u0627\u0643\u062A\u0645\u0627\u0644 \u0643\u0644 \u0637\u0644\u0628 \u0642\u0628\u0644 \u0627\u0644\u0634\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u062A\u0627\u0644\u064A
// \u0645\u0646\u0627\u0633\u0628 \u0639\u0646\u062F\u0645\u0627 \u064A\u0647\u0645 \u0627\u0644\u062A\u0631\u062A\u064A\u0628`},{type:"heading",text:"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A"},{type:"code",code:`import { Component, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({ ... })
export class TimerComponent {
  count = 0;

  constructor() {
    // takeUntilDestroyed: \u064A\u064F\u0644\u063A\u064A \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u062F\u0645\u064A\u0631 \u0627\u0644\u0645\u0643\u0648\u0651\u0646
    interval(1000).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => this.count++);
  }
}

// \u0627\u0644\u0628\u062F\u064A\u0644: async pipe \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u2014 \u064A\u064F\u062F\u064A\u0631 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B
// template: <p>{{ timer$ | async }}</p>`},{type:"warning",text:"\u0646\u0633\u064A\u0627\u0646 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A (memory leaks) \u0645\u0646 \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0634\u064A\u0648\u0639\u0627\u064B \u0641\u064A Angular. \u0627\u0633\u062A\u062E\u062F\u0645 takeUntilDestroyed() \u062F\u0627\u0626\u0645\u0627\u064B \u0623\u0648 async pipe \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628."},{type:"heading",text:"RxJS \u0645\u0639 Signals \u2014 toSignal \u0648toObservable"},{type:"code",code:`import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';

// Observable \u2192 Signal: \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628
const tick = toSignal(interval(1000), { initialValue: 0 });
// template: <p>{{ tick() }}</p>

// Signal \u2192 Observable: \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639 RxJS operators
const searchTerm = signal('');
const results$ = toObservable(searchTerm).pipe(
  debounceTime(300),
  switchMap(term =>
    term ? this.http.get(\`/api/search?q=\${term}\`) : of([])
  )
);
const results = toSignal(results$, { initialValue: [] });`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 switchMap \u0648mergeMap \u0648concatMap\u061F",answer:"switchMap: \u064A\u0644\u063A\u064A \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0633\u0627\u0628\u0642 \u0639\u0646\u062F \u0648\u0635\u0648\u0644 \u0642\u064A\u0645\u0629 \u062C\u062F\u064A\u062F\u0629 \u2014 \u0645\u062B\u0627\u0644\u064A \u0644\u0644\u0628\u062D\u062B \u0627\u0644\u0641\u0648\u0631\u064A. mergeMap: \u064A\u064F\u0634\u063A\u0651\u0644 \u0643\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0628\u0627\u0644\u062A\u0648\u0627\u0632\u064A \u2014 \u0644\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629. concatMap: \u064A\u0646\u062A\u0638\u0631 \u0627\u0643\u062A\u0645\u0627\u0644 \u0643\u0644 \u0637\u0644\u0628 \u0642\u0628\u0644 \u0627\u0644\u0634\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u062A\u0627\u0644\u064A \u2014 \u0639\u0646\u062F\u0645\u0627 \u064A\u0647\u0645 \u0627\u0644\u062A\u0631\u062A\u064A\u0628."},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629 \u0644\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643\u0627\u062A \u0641\u064A Angular v22 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B\u061F",answer:"takeUntilDestroyed() \u0645\u0646 @angular/core/rxjs-interop \u2014 \u064A\u064F\u0644\u063A\u064A \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u062F\u0645\u064A\u0631 \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0623\u0648 \u0627\u0644\u062E\u062F\u0645\u0629. \u0627\u0644\u0628\u062F\u064A\u0644 \u0627\u0644\u0622\u062E\u0631 \u0647\u0648 async pipe \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u2014 \u064A\u064F\u0646\u0634\u0626 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u0648\u064A\u064F\u0644\u063A\u064A\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B."}],contentEn:[{type:"heading",text:"What is an Observable?"},{type:"paragraph",text:"An Observable is a stream of values over time. It can emit one value, multiple values, or none. It can complete or produce an error. Unlike a Promise: an Observable is lazy and cancellable."},{type:"code",code:`import { Observable, of, from, interval, fromEvent } from 'rxjs';

// Single value immediately
const immediate$ = of('Hello');

// Multiple values synchronously
const sequence$ = of(1, 2, 3, 4, 5);

// From an array
const array$ = from([10, 20, 30]);

// Timer \u2014 emits a number every second
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
});`},{type:"tip",text:"The $ suffix on variable names is a convention for identifying Observables. Not required but widely used in Angular projects."},{type:"heading",text:"Core Operators"},{type:"paragraph",text:"Operators are pure functions that transform one Observable into another. Used with pipe()."},{type:"code",code:`import { of, interval } from 'rxjs';
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
).subscribe(i => console.log(i));`},{type:"heading",text:"switchMap, mergeMap, concatMap"},{type:"code",code:`import { switchMap, mergeMap, concatMap, debounceTime } from 'rxjs/operators';
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
// When order matters`},{type:"heading",text:"Subscription Management"},{type:"code",code:`import { Component, inject } from '@angular/core';
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

// Alternative: async pipe in template \u2014 manages subscription automatically
// template: <p>{{ timer$ | async }}</p>`},{type:"warning",text:"Forgetting to unsubscribe (memory leaks) is one of the most common bugs in Angular. Always use takeUntilDestroyed() or the async pipe in templates."},{type:"heading",text:"RxJS with Signals \u2014 toSignal and toObservable"},{type:"code",code:`import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';
import { switchMap, debounceTime } from 'rxjs/operators';

// Observable \u2192 Signal: for template binding
const tick = toSignal(interval(1000), { initialValue: 0 });
// template: <p>{{ tick() }}</p>

// Signal \u2192 Observable: for RxJS operators
const searchTerm = signal('');
const results$ = toObservable(searchTerm).pipe(
  debounceTime(300),
  switchMap(term =>
    term ? this.http.get(\`/api/search?q=\${term}\`) : of([])
  )
);
const results = toSignal(results$, { initialValue: [] });`},{type:"qa",question:"What is the difference between switchMap, mergeMap, and concatMap?",answer:"switchMap: cancels the previous inner Observable when a new outer value arrives \u2014 ideal for live search. mergeMap: runs all inner Observables in parallel \u2014 for independent operations. concatMap: waits for each inner Observable to complete before starting the next \u2014 when order matters."},{type:"qa",question:"What is the preferred way to automatically cancel subscriptions in Angular v22?",answer:"takeUntilDestroyed() from @angular/core/rxjs-interop \u2014 automatically cancels the subscription when the component or service is destroyed. The other option is the async pipe in templates \u2014 it creates and cancels subscriptions automatically."}]};export{e as default};
