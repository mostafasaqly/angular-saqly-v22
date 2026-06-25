import"./chunk-JS3ZFT6L.js";var e={id:15,title:"State Management",titleEn:"State Management",level:"\u0645\u062A\u0648\u0633\u0637 \u2013 \u0645\u062A\u0642\u062F\u0645",levelEn:"Intermediate\u2013Advanced",intro:"State Management \u0647\u064A \u0643\u064A\u0641\u064A\u0629 \u062A\u062E\u0632\u064A\u0646 \u0648\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0639\u0628\u0631 Components. Angular v22 \u064A\u0648\u0641\u0631 \u0639\u062F\u0629 \u0645\u0633\u062A\u0648\u064A\u0627\u062A: \u062D\u0627\u0644\u0629 \u0645\u062D\u0644\u064A\u0629 \u0644\u0644\u0645\u0643\u0648\u0651\u0646 (Signals)\u060C \u062D\u0627\u0644\u0629 \u0645\u0634\u062A\u0631\u0643\u0629 \u0639\u0628\u0631 Services\u060C \u0648NgRx \u0644\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627\u064B. \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u063A\u0637\u064A \u0645\u062A\u0649 \u062A\u0633\u062A\u062E\u062F\u0645 \u0643\u0644 \u0646\u0645\u0637.",introEn:"State management is how you store and share data across components. Angular v22 provides several levels: local component state (Signals), shared state via services, and NgRx for very large applications. This section covers when to use each pattern.",lessons:["Types of State in Angular","Local State with Signals","Shared State via Services","Simple Store Pattern with Signals","localStorage Persistence","\u0645\u062A\u0649 \u062A\u0633\u062A\u062E\u062F\u0645 NgRx\u061F","NgRx Signals \u2014 Overview","Advanced State Patterns"],lessonsEn:["Types of State in Angular","Local State with Signals","Shared State via Services","Simple Store Pattern with Signals","localStorage Persistence","When to Use NgRx?","NgRx Signals \u2014 Overview","Advanced State Patterns"],content:[{type:"heading",text:"\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0627\u0644\u0629 \u0641\u064A Angular"},{type:"list",items:["\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0643\u0648\u0651\u0646 \u0648\u0627\u062D\u062F: signal() \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0645\u0628\u0627\u0634\u0631\u0629\u064B",'\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u0629 \u2014 \u0628\u064A\u0646 \u0639\u062F\u0629 \u0645\u0643\u0648\u0651\u0646\u0627\u062A: signal() \u0641\u064A \u062E\u062F\u0645\u0629 providedIn: "root"',"\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u062F\u0645\u064A\u0629 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 API: httpResource() \u0623\u0648 Resource API","\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u062A\u0645\u0631\u0629 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0628\u0642\u0649 \u0628\u0639\u062F \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0635\u0641\u062D: localStorage \u0645\u0639 Signals","\u062D\u0627\u0644\u0629 URL \u2014 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u0641\u062D\u0629: Router params \u0648query params"]},{type:"tip",text:"\u0627\u0628\u062F\u0623 \u062F\u0627\u0626\u0645\u0627\u064B \u0628\u0623\u0628\u0633\u0637 \u062D\u0644: signal() \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646. \u0627\u0646\u062A\u0642\u0644 \u0644\u062E\u062F\u0645\u0629 \u0645\u0634\u062A\u0631\u0643\u0629 \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u062D\u0627\u0644\u0629. \u0623\u0636\u0641 NgRx \u0641\u0642\u0637 \u0639\u0646\u062F \u0627\u0644\u062A\u0639\u0642\u064A\u062F \u0627\u0644\u062D\u0642\u064A\u0642\u064A."},{type:"heading",text:"\u0646\u0645\u0637 Store \u0628\u0633\u064A\u0637 \u0645\u0639 Signals"},{type:"code",code:`import { Injectable, signal, computed } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoStore {
  // \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629
  private _todos  = signal<Todo[]>([]);
  private _filter = signal<'all' | 'active' | 'done'>('all');

  // \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 \u2014 \u0645\u0627 \u064A\u064F\u0643\u0634\u0641 \u0644\u0644\u062E\u0627\u0631\u062C
  readonly todos    = this._todos.asReadonly();
  readonly filter   = this._filter.asReadonly();

  // \u0645\u0634\u062A\u0642\u0627\u062A (computed)
  readonly filtered = computed(() => {
    const f = this._filter();
    const t = this._todos();
    if (f === 'active') return t.filter(td => !td.completed);
    if (f === 'done')   return t.filter(td => td.completed);
    return t;
  });
  readonly count     = computed(() => this._todos().length);
  readonly doneCount = computed(() => this._todos().filter(t => t.completed).length);

  // \u0627\u0644\u0623\u0641\u0639\u0627\u0644 (Actions)
  add(text: string): void {
    this._todos.update(todos => [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  }

  toggle(id: number): void {
    this._todos.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  remove(id: number): void {
    this._todos.update(todos => todos.filter(t => t.id !== id));
  }

  setFilter(filter: 'all' | 'active' | 'done'): void {
    this._filter.set(filter);
  }
}`},{type:"heading",text:"\u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062D\u0644\u064A (localStorage) \u0645\u0639 Signals"},{type:"code",code:`import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly KEY = 'app_theme';

  private _theme = signal<'light' | 'dark'>(
    (localStorage.getItem(this.KEY) as 'light' | 'dark') ?? 'light'
  );

  readonly theme  = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    // \u062D\u0641\u0638 \u062A\u0644\u0642\u0627\u0626\u064A \u0641\u064A localStorage \u0639\u0646\u062F \u0643\u0644 \u062A\u063A\u064A\u064A\u0631
    effect(() => {
      const theme = this._theme();
      localStorage.setItem(this.KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  toggle(): void {
    this._theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}`},{type:"heading",text:"\u0645\u062A\u0649 \u062A\u0633\u062A\u062E\u062F\u0645 NgRx\u061F"},{type:"paragraph",text:"Services + Signals \u0643\u0627\u0641\u064A\u0629 \u0641\u064A 80-90% \u0645\u0646 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A. \u0627\u0633\u062A\u062E\u062F\u0645 NgRx \u0639\u0646\u062F\u0645\u0627:"},{type:"list",items:["\u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u0633\u062C\u0644 \u062A\u062F\u0642\u064A\u0642 (audit trail) \u0643\u0627\u0645\u0644 \u0644\u0643\u0644 \u062A\u063A\u064A\u064A\u0631 \u0641\u064A \u0627\u0644\u062D\u0627\u0644\u0629","\u062A\u062D\u062A\u0627\u062C Redux DevTools \u0644\u062A\u062A\u0628\u0639 \u0627\u0644\u062D\u0627\u0644\u0629 \u0648\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0641\u064A \u0627\u0644\u0625\u0646\u062A\u0627\u062C","\u0644\u062F\u064A\u0643 \u062A\u0623\u062B\u064A\u0631\u0627\u062A \u062C\u0627\u0646\u0628\u064A\u0629 (Effects) \u0645\u0639\u0642\u062F\u0629 \u062C\u062F\u0627\u064B \u0628\u064A\u0646 \u0639\u062F\u0629 \u062E\u062F\u0645\u0627\u062A","\u0641\u0631\u064A\u0642 \u0643\u0628\u064A\u0631 \u064A\u062D\u062A\u0627\u062C \u0644\u0639\u0642\u062F \u062B\u0627\u0628\u062A \u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u0629 (Actions)","\u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u064A\u062A\u0636\u0645\u0646 \u062D\u0627\u0644\u0629 \u0645\u0639\u0642\u062F\u0629 \u062C\u062F\u0627\u064B \u062A\u064F\u0639\u062F\u064E\u0651\u0644 \u0645\u0646 \u0645\u0635\u0627\u062F\u0631 \u0645\u062A\u0639\u062F\u062F\u0629"]},{type:"warning",text:'\u0644\u0627 \u062A\u064F\u0636\u064A\u0641 NgRx "\u0644\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062C\u0627\u0647\u0632\u064A\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0644\u0644\u0645\u0633\u062A\u0642\u0628\u0644" \u2014 \u0641\u0647\u0648 \u064A\u064F\u0636\u064A\u0641 \u062A\u0639\u0642\u064A\u062F\u0627\u064B \u062D\u0642\u064A\u0642\u064A\u0627\u064B. Service + Signals \u0647\u0648 \u0627\u0644\u062E\u064A\u0627\u0631 \u0627\u0644\u0635\u062D\u064A\u062D \u0644\u0645\u0639\u0638\u0645 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A.'},{type:"heading",text:"NgRx Signals \u2014 \u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629"},{type:"code",code:`// NgRx Signals \u2014 API \u062D\u062F\u064A\u062B \u0645\u064F\u0639\u062A\u0645\u062F \u0639\u0644\u0649 Signals
import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';

interface BooksState {
  books: Book[];
  selectedId: number | null;
  loading: boolean;
}

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState<BooksState>({
    books: [],
    selectedId: null,
    loading: false,
  }),
  withComputed(({ books, selectedId }) => ({
    selectedBook: computed(() =>
      books().find(b => b.id === selectedId()) ?? null
    ),
    booksCount: computed(() => books().length),
  })),
  withMethods((store) => ({
    select(id: number) {
      patchState(store, { selectedId: id });
    },
  })),
);

// \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646:
// store = inject(BooksStore);
// store.books()\u060C store.selectedBook()\u060C store.select(id)`},{type:"qa",question:"\u0645\u0627 \u0627\u0644\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0645\u0637 State Management \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0641\u064A Angular v22\u061F",answer:"\u0627\u0628\u062F\u0623 \u0628\u0640 signal() \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0651\u0646 \u0644\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629. \u0627\u0646\u062A\u0642\u0644 \u0625\u0644\u0649 \u062E\u062F\u0645\u0629 \u0645\u0639 Signals \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u0628\u064A\u0646 \u0645\u0643\u0648\u0651\u0646\u0627\u062A \u0645\u062A\u0639\u062F\u062F\u0629. \u0623\u0636\u0641 NgRx \u0623\u0648 NgRx Signals \u0641\u0642\u0637 \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u062D\u0627\u0644\u0629 \u0645\u0639\u0642\u062F\u0629 \u062C\u062F\u0627\u064B\u060C \u062D\u0627\u062C\u0629 \u0644\u0640 DevTools\u060C \u0623\u0648 \u0641\u0631\u064A\u0642 \u0643\u0628\u064A\u0631 \u064A\u062D\u062A\u0627\u062C \u0644\u0639\u0642\u062F \u0645\u0648\u062D\u0651\u062F."},{type:"qa",question:"\u0643\u064A\u0641 \u062A\u062C\u0639\u0644 \u062D\u0627\u0644\u0629 \u0627\u0644\u062E\u062F\u0645\u0629 \u062A\u0633\u062A\u0645\u0631 \u0628\u0639\u062F \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629\u061F",answer:"\u0627\u0633\u062A\u062E\u062F\u0645 effect() \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062D\u0627\u0644\u0629 \u0648\u062D\u0641\u0638\u0647\u0627 \u0641\u064A localStorage \u0639\u0646\u062F \u0643\u0644 \u062A\u063A\u064A\u064A\u0631\u060C \u0648\u0627\u0628\u062F\u0623 \u0628\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u064A\u0645\u0629 \u0645\u0646 localStorage \u0641\u064A \u062D\u0642\u0644 \u0627\u0644\u0640 Signal \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629. \u0647\u0630\u0627 \u064A\u064F\u0639\u0637\u064A\u0643 \u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u062F\u0648\u0646 \u0623\u064A \u062C\u0647\u062F \u0625\u0636\u0627\u0641\u064A."}],contentEn:[{type:"heading",text:"Types of State in Angular"},{type:"list",items:["Local state \u2014 data for a single component: signal() in the component",'Shared state \u2014 across multiple components: signal() in a providedIn: "root" service',"Server state \u2014 data from an API: httpResource() or Resource API","Persistent state \u2014 data that survives page reload: localStorage with Signals + effect()","URL state \u2014 data in the page address: Router params and query params"]},{type:"tip",text:"Always start with the simplest solution: signal() in the component. Move to a shared service when you need to share state. Add NgRx only when there is real complexity."},{type:"heading",text:"Simple Store Pattern with Signals"},{type:"code",code:`import { Injectable, signal, computed } from '@angular/core';

interface Todo {
  id: number; text: string; completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoStore {
  // Internal state
  private _todos  = signal<Todo[]>([]);
  private _filter = signal<'all' | 'active' | 'done'>('all');

  // Read-only exposure
  readonly todos  = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();

  // Derived values
  readonly filtered = computed(() => {
    const f = this._filter();
    const t = this._todos();
    if (f === 'active') return t.filter(td => !td.completed);
    if (f === 'done')   return t.filter(td => td.completed);
    return t;
  });
  readonly count     = computed(() => this._todos().length);
  readonly doneCount = computed(() => this._todos().filter(t => t.completed).length);

  // Actions
  add(text: string): void {
    this._todos.update(todos => [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  }

  toggle(id: number): void {
    this._todos.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  remove(id: number): void {
    this._todos.update(todos => todos.filter(t => t.id !== id));
  }

  setFilter(filter: 'all' | 'active' | 'done'): void {
    this._filter.set(filter);
  }
}`},{type:"heading",text:"localStorage Persistence with Signals"},{type:"code",code:`import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly KEY = 'app_theme';

  private _theme = signal<'light' | 'dark'>(
    (localStorage.getItem(this.KEY) as 'light' | 'dark') ?? 'light'
  );

  readonly theme  = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    // Auto-save to localStorage on every change
    effect(() => {
      const theme = this._theme();
      localStorage.setItem(this.KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  toggle(): void {
    this._theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}`},{type:"heading",text:"When to Use NgRx?"},{type:"paragraph",text:"Services + Signals are sufficient for 80\u201390% of applications. Use NgRx when:"},{type:"list",items:["You need a complete audit trail of every state change","You need Redux DevTools for state tracking and production debugging","You have complex side effects (Effects) involving multiple services","A large team needs a shared contract for state mutations (Actions)","The app has extremely complex state mutated from many sources"]},{type:"warning",text:`Don't add NgRx "just to be enterprise-ready" \u2014 it adds real complexity. Service + Signals is the right choice for most Angular applications.`},{type:"heading",text:"NgRx Signals \u2014 Overview"},{type:"code",code:`// NgRx Signals \u2014 modern Signal-based API
import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';

interface BooksState {
  books: Book[]; selectedId: number | null; loading: boolean;
}

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState<BooksState>({ books: [], selectedId: null, loading: false }),
  withComputed(({ books, selectedId }) => ({
    selectedBook: computed(() => books().find(b => b.id === selectedId()) ?? null),
    booksCount: computed(() => books().length),
  })),
  withMethods((store) => ({
    select(id: number) { patchState(store, { selectedId: id }); },
  })),
);

// In a component:
// store = inject(BooksStore);
// store.books(), store.selectedBook(), store.select(id)`},{type:"qa",question:"What is the general rule for choosing a state management pattern in Angular v22?",answer:"Start with signal() in the component for local state. Move to a service with Signals when you need to share state across multiple components. Add NgRx or NgRx Signals only when you have very complex state, need DevTools, or have a large team that needs a shared contract for mutations."},{type:"qa",question:"How do you make service state persist across page reloads?",answer:"Use effect() to watch the state Signal and save to localStorage on every change. Initialize the Signal with a value loaded from localStorage. This gives you automatic sync between the Signal and localStorage with no extra code."}]};export{e as default};
