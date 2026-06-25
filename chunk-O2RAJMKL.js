import"./chunk-JS3ZFT6L.js";var e={id:7,title:"\u0623\u0633\u0627\u0633\u064A\u0627\u062A Signals",titleEn:"Signals Fundamentals",level:"\u0645\u062A\u0648\u0633\u0637",levelEn:"Intermediate",intro:"Signals \u0647\u064A \u0627\u0644\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u0623\u0647\u0645 \u0641\u064A Angular \u0627\u0644\u062D\u062F\u064A\u062B. \u0625\u0646\u0647\u0627 \u062A\u0633\u062A\u0628\u062F\u0644 Change Detection \u0627\u0644\u0645\u0628\u0646\u064A \u0639\u0644\u0649 Zone.js \u0628\u0623\u0633\u0627\u0633\u064A \u062A\u0641\u0627\u0639\u0644\u064A \u062F\u0642\u064A\u0642 \u2014 \u0639\u0646\u062F\u0645\u0627 \u062A\u062A\u063A\u064A\u0631 \u0642\u064A\u0645\u0629 Signal\u060C \u0641\u0642\u0637 Components \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0639\u062A\u0645\u062F \u0639\u0644\u064A\u0647\u0627 \u062A\u064F\u062D\u062F\u064E\u0651\u062B. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u0628\u0646\u064A \u0641\u0647\u0645\u0627\u064B \u0639\u0645\u064A\u0642\u0627\u064B \u0644\u0644\u0640 Signals \u0645\u0646 \u0627\u0644\u0635\u0641\u0631.",introEn:"Signals are the single most important concept in modern Angular. They replace Zone.js-based change detection with a precise, reactive primitive \u2014 when a Signal's value changes, only the components and computations that depend on it update. This section builds a deep understanding of Signals from scratch.",lessons:["\u0645\u0627 \u0647\u064A Signals\u061F","\u0625\u0646\u0634\u0627\u0621 Signals","\u0642\u0631\u0627\u0621\u0629 Signals","\u062A\u062D\u062F\u064A\u062B Signals","computed Signals","effect","Signals \u0645\u0642\u0627\u0628\u0644 RxJS","\u0623\u0641\u0636\u0644 \u0645\u0645\u0627\u0631\u0633\u0627\u062A Signals"],lessonsEn:["What are Signals?","Creating Signals","Reading Signals","Updating Signals","computed Signals","effect","Signals vs RxJS","Signals Best Practices"],content:[{type:"heading",text:"\u0645\u0627 \u0647\u064A Signals\u061F"},{type:"paragraph",text:"Signal \u0647\u0648 \u062D\u0627\u0648\u064A\u0629 \u0642\u064A\u0645\u0629 \u062A\u0641\u0627\u0639\u0644\u064A\u0629. \u062A\u062D\u0645\u0644 \u0642\u064A\u0645\u0629 \u0648\u062A\u062A\u062A\u0628\u0639 \u0645\u0646 \u064A\u0642\u0631\u0623\u0647\u0627. \u0639\u0646\u062F\u0645\u0627 \u062A\u062A\u063A\u064A\u0631 \u0627\u0644\u0642\u064A\u0645\u0629\u060C \u0643\u0644 \u0645\u0646 \u0642\u0631\u0623\u0647\u0627 \u064A\u064F\u062E\u0637\u064E\u0651\u0631 \u0648\u064A\u064F\u062D\u062F\u064E\u0651\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B."},{type:"code",code:`import { signal } from '@angular/core';

// \u0625\u0646\u0634\u0627\u0621 Signal \u0628\u0642\u064A\u0645\u0629 \u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629
const count = signal(0);

// \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0642\u064A\u0645\u0629 \u2014 \u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0643\u062F\u0627\u0644\u0629
console.log(count());   // 0

// \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u064A\u0645\u0629 \u2014 \u0643\u0644 \u0627\u0644\u0642\u0631\u0627\u0621 \u064A\u064F\u062E\u0637\u064E\u0651\u0631\u0648\u0646
count.set(5);
console.log(count());   // 5`},{type:"list",items:["signal(value) \u2014 \u064A\u0646\u0634\u0626 \u062D\u0627\u0648\u064A\u0629 \u0642\u064A\u0645\u0629 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0643\u062A\u0627\u0628\u0629","computed(() => \u2026) \u2014 Signal \u0645\u0634\u062A\u0642\u060C \u064A\u062A\u062D\u062F\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A","effect(() => \u2026) \u2014 \u064A\u064F\u0634\u063A\u0651\u0644 \u062A\u0623\u062B\u064A\u0631\u0627\u064B \u062C\u0627\u0646\u0628\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0640 Signals"]},{type:"tip",text:'\u0641\u0643\u0651\u0631 \u0641\u064A Signal \u0643\u0640 "\u0645\u062A\u063A\u064A\u0631 \u0630\u0643\u064A" \u064A\u0639\u0631\u0641 \u0645\u0646 \u064A\u0642\u0631\u0623\u0647. \u0639\u0646\u062F\u0645\u0627 \u062A\u062A\u063A\u064A\u0631 \u0642\u064A\u0645\u062A\u0647\u060C \u064A\u064F\u062E\u0628\u0631 \u0643\u0644 \u0627\u0644\u0642\u0631\u0627\u0621: "\u062A\u062D\u062A\u0627\u062C \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645."'},{type:"heading",text:"\u0625\u0646\u0634\u0627\u0621 Signals"},{type:"code",code:`import { signal, Injectable, computed } from '@angular/core';

// \u0623\u0646\u0648\u0627\u0639 \u0628\u062F\u0627\u0626\u064A\u0629
const name    = signal('\u0623\u062D\u0645\u062F');               // WritableSignal<string>
const age     = signal(25);                  // WritableSignal<number>
const isAdmin = signal(false);               // WritableSignal<boolean>

// \u0645\u0639 \u0646\u0648\u0639 \u0635\u0631\u064A\u062D
type Status = 'idle' | 'loading' | 'success' | 'error';
const status = signal<Status>('idle');

// \u0645\u0635\u0641\u0648\u0641\u0627\u062A \u0648\u0643\u0627\u0626\u0646\u0627\u062A
const items = signal<string[]>([]);
const user  = signal<{ name: string; email: string } | null>(null);

// \u0641\u064A Services \u2014 Pattern \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  // \u0627\u0643\u0634\u0641 Signal \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(user: User)  { this._user.set(user); }
  logout()           { this._user.set(null); }
}`},{type:"heading",text:"\u0642\u0631\u0627\u0621\u0629 Signals"},{type:"paragraph",text:"\u0642\u0631\u0627\u0621\u0629 Signal \u062F\u0627\u0626\u0645\u0627\u064B \u0628\u0646\u0641\u0633 \u0627\u0644\u0637\u0631\u064A\u0642\u0629: \u0627\u0633\u062A\u062F\u0639\u0650\u0647 \u0643\u062F\u0627\u0644\u0629. \u0627\u0644\u062A\u062A\u0628\u0639 \u064A\u062D\u062F\u062B \u0641\u0642\u0637 \u062F\u0627\u062E\u0644 \u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A (computed\u060C effect\u060C \u0627\u0644\u0642\u0648\u0627\u0644\u0628)."},{type:"code",code:`const count = signal(10);

// \u0641\u064A TypeScript \u2014 \u062E\u0627\u0631\u062C \u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A
const value = count();  // 10 \u2014 \u0644\u0627 \u062A\u062A\u0628\u0639

// \u0641\u064A computed \u2014 \u0633\u064A\u0627\u0642 \u062A\u0641\u0627\u0639\u0644\u064A
const double = computed(() => count() * 2);  // \u064A\u064F\u062A\u062A\u0628\u0639

// \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u2014 \u062F\u0627\u0626\u0645\u0627\u064B \u0633\u064A\u0627\u0642 \u062A\u0641\u0627\u0639\u0644\u064A
// <p>{{ count() }}</p>
// <p [class.hidden]="!isVisible()">\u0639\u0646\u0635\u0631 \u0645\u0634\u0631\u0648\u0637</p>

// toSignal: \u062A\u062D\u0648\u064A\u0644 Observable \u0625\u0644\u0649 Signal
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
const tick = toSignal(interval(1000), { initialValue: 0 });
// tick() \u064A\u064F\u0631\u062C\u0639 \u0622\u062E\u0631 \u0642\u064A\u0645\u0629 \u0645\u064F\u0631\u0633\u064E\u0644\u0629`},{type:"heading",text:"\u062A\u062D\u062F\u064A\u062B Signals"},{type:"code",code:`const count = signal(0);

// .set() \u2014 \u0627\u0633\u062A\u0628\u062F\u0644 \u0627\u0644\u0642\u064A\u0645\u0629 \u0643\u0627\u0645\u0644\u0627\u064B
count.set(5);

// .update() \u2014 \u0627\u062D\u0633\u0628 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0642\u062F\u064A\u0645\u0629
count.update(n => n + 1);   // 6
count.update(n => n * 10);  // 60

// \u0645\u0639 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062A \u2014 \u062F\u0627\u0626\u0645\u0627\u064B \u0628\u0645\u0631\u062C\u0639\u064A\u0629 \u062C\u062F\u064A\u062F\u0629 (\u0644\u0640 OnPush)
const items = signal<string[]>(['\u0623\u0646\u062C\u0648\u0644\u0627\u0631', 'TypeScript']);
items.update(arr => [...arr, 'Signals']);   // \u0645\u0631\u062C\u0639\u064A\u0629 \u062C\u062F\u064A\u062F\u0629 \u2713
// items.push('Signals') \u2014 \u062E\u0637\u0623! \u062A\u0639\u062F\u064A\u0644 \u0641\u064A \u0627\u0644\u0645\u0643\u0627\u0646 \u2717

// \u0645\u0639 \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A \u2014 spread \u0644\u0645\u0631\u062C\u0639\u064A\u0629 \u062C\u062F\u064A\u062F\u0629
const user = signal({ name: '\u0623\u062D\u0645\u062F', score: 0 });
user.update(u => ({ ...u, score: u.score + 10 }));`},{type:"warning",text:"\u062A\u0630\u0643\u0631: Angular OnPush (\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0641\u064A v22) \u064A\u064F\u0644\u0627\u062D\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629. \u062F\u0627\u0626\u0645\u0627\u064B \u0627\u0633\u062A\u062E\u062F\u0645 .update(arr => [...arr, item]) \u0644\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062A\u060C \u0644\u0627 .push()."},{type:"heading",text:"computed Signals"},{type:"paragraph",text:"computed Signal \u064A\u0634\u062A\u0642 \u0642\u064A\u0645\u062A\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 Signals \u0623\u062E\u0631\u0649. \u064A\u064F\u0639\u064A\u062F \u0627\u0644\u062D\u0633\u0627\u0628 \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A\u0647. \u0643\u0633\u0648\u0644 (Lazy) \u0648\u0645\u064F\u062E\u0632\u064E\u0651\u0646 \u0645\u0624\u0642\u062A\u0627\u064B (Memoized)."},{type:"code",code:`import { signal, computed } from '@angular/core';

const price    = signal(100);
const quantity = signal(3);
const discount = signal(0.1);

// \u064A\u062A\u062D\u062F\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0623\u064A \u0645\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A
const subtotal = computed(() => price() * quantity());
const total    = computed(() => subtotal() * (1 - discount()));

console.log(subtotal());  // 300
console.log(total());     // 270

price.set(120);
console.log(subtotal());  // 360 \u2014 \u0623\u064F\u0639\u064A\u062F \u062D\u0633\u0627\u0628\u0647
console.log(total());     // 324 \u2014 \u0623\u064F\u0639\u064A\u062F \u062D\u0633\u0627\u0628\u0647

// \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646
export class CartComponent {
  items   = signal<CartItem[]>([]);
  taxRate = signal(0.08);

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );
  tax   = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.tax());
}`},{type:"heading",text:"effect"},{type:"paragraph",text:"effect \u0647\u0648 \u062F\u0627\u0644\u0629 \u062A\u064F\u0634\u063A\u064E\u0651\u0644 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A\u0647\u0627 \u0645\u0646 Signals. \u0627\u0633\u062A\u062E\u062F\u0645\u0647 \u0644\u0644\u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u2014 \u062A\u0633\u062C\u064A\u0644\u060C localStorage\u060C DOM."},{type:"code",code:`import { Component, signal, effect } from '@angular/core';

@Component({ ... })
export class ThemeSwitcherComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // \u064A\u064F\u0634\u063A\u064E\u0651\u0644 \u0641\u0648\u0631\u0627\u064B \u062B\u0645 \u0639\u0646\u062F \u0643\u0644 \u062A\u063A\u064A\u064A\u0631 \u0644\u0640 theme()
    effect(() => {
      document.body.classList.toggle('dark', this.theme() === 'dark');
      localStorage.setItem('theme', this.theme());
    });
  }
}

// \u0642\u0627\u0639\u062F\u0629 \u0645\u0647\u0645\u0629: \u0644\u0627 \u062A\u064F\u062D\u062F\u0650\u0651\u062B signals \u062F\u0627\u062E\u0644 effect
// effect(() => { this.double.set(this.count() * 2); }); // \u062E\u0637\u0623! \u0627\u0633\u062A\u062E\u062F\u0645 computed
double = computed(() => this.count() * 2);  // \u0635\u062D\u064A\u062D`},{type:"warning",text:"\u0642\u0627\u0639\u062F\u0629 \u0623\u0633\u0627\u0633\u064A\u0629: \u0644\u0627 \u062A\u0633\u062A\u062E\u062F\u0645 effect() \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0634\u062A\u0642\u0629 \u2014 \u0647\u0630\u0627 \u0645\u0627 computed() \u0645\u0648\u062C\u0648\u062F \u0645\u0646 \u0623\u062C\u0644\u0647. effect() \u0644\u0644\u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0641\u0642\u0637 (localStorage\u060C DOM\u060C analytics)."},{type:"heading",text:"Signals \u0645\u0642\u0627\u0628\u0644 RxJS"},{type:"list",items:["Signals: \u0645\u0632\u0627\u0645\u0646\u060C \u0625\u062F\u0627\u0631\u0629 \u062D\u0627\u0644\u0629 UI\u060C \u0633\u0647\u0644 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u060C \u0644\u0627 \u064A\u062D\u062A\u0627\u062C unsubscribe","RxJS: \u0644\u0627\u062A\u0632\u0627\u0645\u0646\u064A\u060C \u062A\u062F\u0641\u0642\u0627\u062A \u0623\u062D\u062F\u0627\u062B\u060C \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u0639\u0642\u062F\u0629 (debounce\u060C switchMap\u060C retry)","\u0627\u0633\u062A\u062E\u062F\u0645 Signals \u0644\u062D\u0627\u0644\u0629 Components \u0648Services \u0648\u0645\u0627 \u064A\u064F\u0639\u0631\u0636 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628","\u0627\u0633\u062A\u062E\u062F\u0645 RxJS \u0644\u0644\u0640 HTTP\u060C WebSockets\u060C \u0648\u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0627\u0644\u0645\u0639\u0642\u062F\u0629","toSignal() \u0644\u062A\u062D\u0648\u064A\u0644 Observable \u0625\u0644\u0649 Signal \u0644\u0644\u0642\u0648\u0627\u0644\u0628","toObservable() \u0644\u062A\u062D\u0648\u064A\u0644 Signal \u0625\u0644\u0649 Observable \u0644\u0639\u0645\u0644\u064A\u0627\u062A RxJS"]},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 signal() \u0648computed() \u0648effect()\u061F \u0627\u0630\u0643\u0631 \u0627\u0644\u063A\u0631\u0636 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u0645\u0646 \u0643\u0644 \u0645\u0646\u0647\u0627 \u0628\u062C\u0645\u0644\u0629 \u0648\u0627\u062D\u062F\u0629.",answer:"signal(v) \u2014 \u064A\u0646\u0634\u0626 \u062D\u0627\u0648\u064A\u0629 \u0642\u064A\u0645\u0629 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0643\u062A\u0627\u0628\u0629. computed(() => expr) \u2014 \u064A\u0646\u0634\u0626 \u0642\u064A\u0645\u0629 \u0645\u0634\u062A\u0642\u0629 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 \u062A\u062A\u062D\u062F\u062B \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A\u0647\u0627 (\u0643\u0633\u0648\u0644 + \u0645\u064F\u062E\u0632\u064E\u0651\u0646 \u0645\u0624\u0642\u062A\u0627\u064B). effect(() => side) \u2014 \u064A\u064F\u0634\u063A\u0651\u0644 \u062A\u0623\u062B\u064A\u0631\u0627\u064B \u062C\u0627\u0646\u0628\u064A\u0627\u064B \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0639\u062A\u0645\u0627\u062F\u064A\u0627\u062A\u0647."},{type:"qa",question:"\u0644\u0645\u0627\u0630\u0627 \u064A\u062C\u0628 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 .update(arr => [...arr, item]) \u0628\u062F\u0644\u0627\u064B \u0645\u0646 .push() \u0645\u0639 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062A \u0641\u064A \u0645\u0643\u0648\u0651\u0646\u0627\u062A OnPush\u061F",answer:".push() \u064A\u064F\u0639\u062F\u0651\u0644 \u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0629 \u0641\u064A \u0645\u0643\u0627\u0646\u0647\u0627 \u062F\u0648\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629. OnPush \u064A\u064F\u0644\u0627\u062D\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 \u2014 \u0641\u0625\u0630\u0627 \u0628\u0642\u064A\u062A \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 \u0630\u0627\u062A\u0647\u0627\u060C \u0644\u0646 \u064A\u064F\u0639\u064A\u062F Angular \u0631\u0633\u0645 \u0627\u0644\u0645\u0643\u0648\u0651\u0646. .update(arr => [...arr, item]) \u064A\u0646\u0634\u0626 \u0645\u0635\u0641\u0648\u0641\u0629 \u062C\u062F\u064A\u062F\u0629 \u0628\u0645\u0631\u062C\u0639\u064A\u0629 \u062C\u062F\u064A\u062F\u0629 \u064A\u0643\u062A\u0634\u0641\u0647\u0627 OnPush."}],contentEn:[{type:"heading",text:"What are Signals?"},{type:"paragraph",text:"A Signal is a reactive value container. It holds a value and tracks who reads it. When the value changes, everyone who read it is notified and updated automatically."},{type:"code",code:`import { signal } from '@angular/core';

// Create a signal with initial value
const count = signal(0);

// Read it \u2014 call it as a function
console.log(count());   // 0

// Update it \u2014 all readers are notified
count.set(5);
console.log(count());   // 5`},{type:"list",items:["signal(value) \u2014 creates a writable reactive value container","computed(() => \u2026) \u2014 derived signal, auto-updates when dependencies change","effect(() => \u2026) \u2014 runs a side effect when its signals change"]},{type:"tip",text:'Think of a Signal as a "smart variable" that knows who is reading it. When its value changes, it tells all readers: "You need to re-evaluate."'},{type:"heading",text:"Creating Signals"},{type:"code",code:`import { signal, Injectable, computed } from '@angular/core';

// Primitive types
const name    = signal('Alice');               // WritableSignal<string>
const age     = signal(25);                   // WritableSignal<number>
const isAdmin = signal(false);                // WritableSignal<boolean>

// With explicit type
type Status = 'idle' | 'loading' | 'success' | 'error';
const status = signal<Status>('idle');

// Arrays and objects
const items = signal<string[]>([]);
const user  = signal<{ name: string; email: string } | null>(null);

// In services \u2014 recommended pattern
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  // Expose read-only signal to the outside
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(user: User)  { this._user.set(user); }
  logout()           { this._user.set(null); }
}`},{type:"heading",text:"Reading Signals"},{type:"paragraph",text:"Reading a Signal is always the same: call it as a function. Tracking only happens inside a reactive context (computed, effect, templates)."},{type:"code",code:`const count = signal(10);

// In TypeScript \u2014 outside reactive context: just a snapshot
const value = count();  // 10 \u2014 no tracking

// In computed \u2014 reactive context: tracked
const double = computed(() => count() * 2);

// In templates \u2014 always reactive:
// <p>{{ count() }}</p>

// toSignal: convert Observable to Signal
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
const tick = toSignal(interval(1000), { initialValue: 0 });
// tick() returns the latest emitted value`},{type:"heading",text:"Updating Signals"},{type:"code",code:`const count = signal(0);

// .set() \u2014 replace the value entirely
count.set(5);

// .update() \u2014 compute new value from old
count.update(n => n + 1);   // 6
count.update(n => n * 10);  // 60

// Arrays \u2014 always with new reference (for OnPush)
const items = signal<string[]>(['Angular', 'TypeScript']);
items.update(arr => [...arr, 'Signals']);   // new reference \u2713
// items().push('Signals') \u2014 WRONG! mutates in place \u2717

// Objects \u2014 spread for new reference
const user = signal({ name: 'Alice', score: 0 });
user.update(u => ({ ...u, score: u.score + 10 }));`},{type:"warning",text:"Remember: Angular OnPush (v22 default) only detects changes when the reference changes. Always use .update(arr => [...arr, item]) for arrays, never .push()."},{type:"heading",text:"computed Signals"},{type:"paragraph",text:"A computed signal automatically derives its value from other signals. It re-evaluates only when its dependencies change. It is lazy (runs on first read) and memoized (cached until dependencies change)."},{type:"code",code:`import { signal, computed } from '@angular/core';

const price    = signal(100);
const quantity = signal(3);
const discount = signal(0.1);

// Auto-updates when any dependency changes
const subtotal = computed(() => price() * quantity());
const total    = computed(() => subtotal() * (1 - discount()));

console.log(subtotal());  // 300
console.log(total());     // 270

price.set(120);
console.log(subtotal());  // 360 \u2014 recomputed
console.log(total());     // 324 \u2014 recomputed

// In a component
export class CartComponent {
  items   = signal<CartItem[]>([]);
  taxRate = signal(0.08);

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );
  tax   = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.tax());
}`},{type:"heading",text:"effect"},{type:"paragraph",text:"An effect is a function that runs whenever its Signal dependencies change. Use it for side effects \u2014 logging, localStorage, analytics, DOM manipulation."},{type:"code",code:`import { Component, signal, effect } from '@angular/core';

@Component({ ... })
export class ThemeSwitcherComponent {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // Runs immediately, then again whenever theme() changes
    effect(() => {
      document.body.classList.toggle('dark', this.theme() === 'dark');
      localStorage.setItem('theme', this.theme());
    });
  }
}

// Key rule: don't update signals inside effect
// effect(() => { this.double.set(this.count() * 2); }); // WRONG!
double = computed(() => this.count() * 2);  // CORRECT`},{type:"warning",text:"Core rule: never use effect() for derived values \u2014 that's what computed() is for. effect() is only for external side effects (localStorage, DOM, analytics)."},{type:"heading",text:"Signals vs RxJS"},{type:"list",items:["Signals: synchronous, UI state management, simple API, no unsubscribe needed","RxJS: async streams, event pipelines, rich operators (debounce, switchMap, retry)","Use Signals for component/service state and anything displayed in templates","Use RxJS for HTTP, WebSockets, and complex event handling","toSignal() converts an Observable to a Signal for template binding","toObservable() converts a Signal to an Observable for RxJS operators"]},{type:"qa",question:"What is the difference between signal(), computed(), and effect()? Give the one-line purpose of each.",answer:"signal(v) \u2014 creates a writable reactive value container. computed(() => expr) \u2014 creates a read-only derived value that auto-updates when its signal dependencies change (lazy + memoized). effect(() => side) \u2014 runs a side effect function whenever its signal dependencies change."},{type:"qa",question:"Why must you use .update(arr => [...arr, item]) instead of .push() when working with arrays in OnPush components?",answer:".push() modifies the array in place without changing its reference. OnPush change detection only re-checks a component when input references change. Since .push() doesn't change the reference, Angular won't re-render. .update(arr => [...arr, item]) creates a new array with a new reference, which OnPush detects correctly."}]};export{e as default};
