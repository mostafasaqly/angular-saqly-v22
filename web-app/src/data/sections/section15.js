// Section 15 — State Management
export default {
  id: 15,
  title: 'إدارة الحالة',
  titleEn: 'State Management',
  level: 'متوسط – متقدم',
  levelEn: 'Intermediate–Advanced',
  intro: 'إدارة الحالة هي كيفية تخزين ومشاركة البيانات عبر المكوّنات. Angular v22 يوفر عدة مستويات: حالة محلية للمكوّن (Signals)، حالة مشتركة عبر الخدمات، وNgRx للتطبيقات الكبيرة جداً. هذا القسم يغطي متى تستخدم كل نمط.',
  introEn: 'State management is how you store and share data across components. Angular v22 provides several levels: local component state (Signals), shared state via services, and NgRx for very large applications. This section covers when to use each pattern.',

  lessons: [
    'أنواع الحالة في Angular',
    'الحالة المحلية مع Signals',
    'الحالة المشتركة مع الخدمات',
    'نمط Store بسيط مع Signals',
    'التخزين المحلي (localStorage)',
    'متى تستخدم NgRx؟',
    'NgRx Signals — نظرة عامة',
    'أنماط إدارة الحالة المتقدمة',
  ],
  lessonsEn: [
    'Types of State in Angular',
    'Local State with Signals',
    'Shared State via Services',
    'Simple Store Pattern with Signals',
    'localStorage Persistence',
    'When to Use NgRx?',
    'NgRx Signals — Overview',
    'Advanced State Patterns',
  ],

  content: [
    { type: 'heading', text: 'أنواع الحالة في Angular' },
    {
      type: 'list',
      items: [
        'الحالة المحلية — بيانات مكوّن واحد: signal() في المكوّن مباشرةً',
        'الحالة المشتركة — بين عدة مكوّنات: signal() في خدمة providedIn: "root"',
        'الحالة الخادمية — بيانات من API: httpResource() أو Resource API',
        'الحالة المستمرة — بيانات تبقى بعد إغلاق المتصفح: localStorage مع Signals',
        'حالة URL — البيانات في عنوان الصفحة: Router params وquery params',
      ],
    },
    { type: 'tip', text: 'ابدأ دائماً بأبسط حل: signal() في المكوّن. انتقل لخدمة مشتركة عند الحاجة لمشاركة الحالة. أضف NgRx فقط عند التعقيد الحقيقي.' },

    { type: 'heading', text: 'نمط Store بسيط مع Signals' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoStore {
  // الحالة الداخلية
  private _todos  = signal<Todo[]>([]);
  private _filter = signal<'all' | 'active' | 'done'>('all');

  // للقراءة فقط — ما يُكشف للخارج
  readonly todos    = this._todos.asReadonly();
  readonly filter   = this._filter.asReadonly();

  // مشتقات (computed)
  readonly filtered = computed(() => {
    const f = this._filter();
    const t = this._todos();
    if (f === 'active') return t.filter(td => !td.completed);
    if (f === 'done')   return t.filter(td => td.completed);
    return t;
  });
  readonly count     = computed(() => this._todos().length);
  readonly doneCount = computed(() => this._todos().filter(t => t.completed).length);

  // الأفعال (Actions)
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
}`,
    },

    { type: 'heading', text: 'التخزين المحلي (localStorage) مع Signals' },
    {
      type: 'code',
      code: `import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly KEY = 'app_theme';

  private _theme = signal<'light' | 'dark'>(
    (localStorage.getItem(this.KEY) as 'light' | 'dark') ?? 'light'
  );

  readonly theme  = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    // حفظ تلقائي في localStorage عند كل تغيير
    effect(() => {
      const theme = this._theme();
      localStorage.setItem(this.KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  toggle(): void {
    this._theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}`,
    },

    { type: 'heading', text: 'متى تستخدم NgRx؟' },
    { type: 'paragraph', text: 'الخدمات + Signals كافية في 80-90% من التطبيقات. استخدم NgRx عندما:' },
    {
      type: 'list',
      items: [
        'تحتاج إلى سجل تدقيق (audit trail) كامل لكل تغيير في الحالة',
        'تحتاج Redux DevTools لتتبع الحالة ومعالجة الأخطاء في الإنتاج',
        'لديك تأثيرات جانبية (Effects) معقدة جداً بين عدة خدمات',
        'فريق كبير يحتاج لعقد ثابت لتغييرات الحالة (Actions)',
        'التطبيق يتضمن حالة معقدة جداً تُعدَّل من مصادر متعددة',
      ],
    },
    { type: 'warning', text: 'لا تُضيف NgRx "للتأكد من جاهزية التطبيق للمستقبل" — فهو يُضيف تعقيداً حقيقياً. Service + Signals هو الخيار الصحيح لمعظم التطبيقات.' },

    { type: 'heading', text: 'NgRx Signals — نظرة عامة' },
    {
      type: 'code',
      code: `// NgRx Signals — API حديث مُعتمد على Signals
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

// في المكوّن:
// store = inject(BooksStore);
// store.books()، store.selectedBook()، store.select(id)`,
    },
    {
      type: 'qa',
      question: 'ما القاعدة العامة لاختيار نمط إدارة الحالة المناسب في Angular v22؟',
      answer: 'ابدأ بـ signal() في المكوّن للحالة المحلية. انتقل إلى خدمة مع Signals عند الحاجة للمشاركة بين مكوّنات متعددة. أضف NgRx أو NgRx Signals فقط عند وجود حالة معقدة جداً، حاجة لـ DevTools، أو فريق كبير يحتاج لعقد موحّد.',
    },
    {
      type: 'qa',
      question: 'كيف تجعل حالة الخدمة تستمر بعد تحديث الصفحة؟',
      answer: 'استخدم effect() لمراقبة الحالة وحفظها في localStorage عند كل تغيير، وابدأ بتحميل القيمة من localStorage في حقل الـ Signal الابتدائية. هذا يُعطيك مزامنة تلقائية دون أي جهد إضافي.',
    },
  ],

  contentEn: [
    { type: 'heading', text: 'Types of State in Angular' },
    {
      type: 'list',
      items: [
        'Local state — data for a single component: signal() in the component',
        'Shared state — across multiple components: signal() in a providedIn: "root" service',
        'Server state — data from an API: httpResource() or Resource API',
        'Persistent state — data that survives page reload: localStorage with Signals + effect()',
        'URL state — data in the page address: Router params and query params',
      ],
    },
    { type: 'tip', text: 'Always start with the simplest solution: signal() in the component. Move to a shared service when you need to share state. Add NgRx only when there is real complexity.' },

    { type: 'heading', text: 'Simple Store Pattern with Signals' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed } from '@angular/core';

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
}`,
    },

    { type: 'heading', text: 'localStorage Persistence with Signals' },
    {
      type: 'code',
      code: `import { Injectable, signal, computed, effect } from '@angular/core';

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
}`,
    },

    { type: 'heading', text: 'When to Use NgRx?' },
    { type: 'paragraph', text: 'Services + Signals are sufficient for 80–90% of applications. Use NgRx when:' },
    {
      type: 'list',
      items: [
        'You need a complete audit trail of every state change',
        'You need Redux DevTools for state tracking and production debugging',
        'You have complex side effects (Effects) involving multiple services',
        'A large team needs a shared contract for state mutations (Actions)',
        'The app has extremely complex state mutated from many sources',
      ],
    },
    { type: 'warning', text: 'Don\'t add NgRx "just to be enterprise-ready" — it adds real complexity. Service + Signals is the right choice for most Angular applications.' },

    { type: 'heading', text: 'NgRx Signals — Overview' },
    {
      type: 'code',
      code: `// NgRx Signals — modern Signal-based API
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
// store.books(), store.selectedBook(), store.select(id)`,
    },
    {
      type: 'qa',
      question: 'What is the general rule for choosing a state management pattern in Angular v22?',
      answer: 'Start with signal() in the component for local state. Move to a service with Signals when you need to share state across multiple components. Add NgRx or NgRx Signals only when you have very complex state, need DevTools, or have a large team that needs a shared contract for mutations.',
    },
    {
      type: 'qa',
      question: 'How do you make service state persist across page reloads?',
      answer: 'Use effect() to watch the state Signal and save to localStorage on every change. Initialize the Signal with a value loaded from localStorage. This gives you automatic sync between the Signal and localStorage with no extra code.',
    },
  ],
};
