/**
 * Section 15 — Example 05: When to Use NgRx — Decision Guide
 *
 * This file is an annotated guide, not runnable production code.
 * It walks through the decision tree for choosing your state management
 * strategy in an Angular v22 application.
 *
 * TLDR:
 *   Local state  → signal() inside component
 *   Shared state → Injectable service + signals
 *   Async/complex→ RxJS + toSignal()
 *   Large scale  → @ngrx/signals (Signal Store)
 *   Legacy/Redux → @ngrx/store (class-based)
 */

// ─── DECISION TREE ────────────────────────────────────────────────────────────
//
//  Q1: Is the state used by only ONE component?
//    ├── YES → use signal() inside the component. STOP.
//    └── NO  → continue to Q2
//
//  Q2: Is the state shared between siblings or cousins (no direct parent link)?
//    ├── YES → lift into a providedIn: 'root' service with signals. STOP.
//    └── NO (parent-child) → use @Input / output() or a service. STOP.
//
//  Q3: Does the state involve complex async logic?
//      (debouncing, retry, cancellable HTTP, event queuing)
//    ├── YES → use RxJS BehaviorSubject + toSignal(). STOP.
//    └── NO  → service + signals is still fine. STOP.
//
//  Q4: Is the app large (>10 feature modules, >5 devs, need DevTools)?
//    ├── YES → consider @ngrx/signals (Signal Store). STOP.
//    └── NO  → you almost certainly don't need NgRx. STOP.
//
//  Q5: Are you maintaining a legacy codebase already on @ngrx/store?
//    ├── YES → continue with @ngrx/store; migrate slices to Signal Store gradually.
//    └── NO  → do not introduce classic NgRx in new projects.

// ─── SIZE COMPARISON ──────────────────────────────────────────────────────────

/*
  === Signals-only store (Section 15, Example 03) ===

  @Injectable({ providedIn: 'root' })
  export class CartStore {
    private _items = signal<CartItem[]>([]);
    readonly items = this._items.asReadonly();
    readonly total = computed(() => ...);
    addItem(item) { this._items.update(...); }
  }

  Lines of code: ~20
  Dependencies: none (built into Angular)
  DevTools: none
  Time-travel: no
  Boilerplate: minimal


  === @ngrx/signals Signal Store ===

  export const CartStore = signalStore(
    withState<CartState>({ items: [] }),
    withComputed(({ items }) => ({
      total: computed(() => items().reduce(...)),
    })),
    withMethods((store) => ({
      addItem: (item: CartItem) => patchState(store, s => ({
        items: [...s.items, item],
      })),
    }))
  );

  Lines of code: ~20 (similar!)
  Dependencies: @ngrx/signals
  DevTools: Redux DevTools integration
  Time-travel: yes (with DevTools)
  Boilerplate: low (much less than classic NgRx)


  === Classic @ngrx/store (Actions + Reducers + Selectors) ===

  // actions.ts
  export const addItem = createAction('[Cart] Add Item', props<{ item: CartItem }>());

  // reducer.ts
  export const cartReducer = createReducer(
    initialState,
    on(addItem, (state, { item }) => ({ ...state, items: [...state.items, item] }))
  );

  // selectors.ts
  export const selectItems = createSelector(selectCart, s => s.items);
  export const selectTotal  = createSelector(selectItems, items => items.reduce(...));

  // In component:
  this.store.dispatch(addItem({ item }));
  this.items$ = this.store.select(selectItems);

  Lines of code: ~50+ across 3-4 files per feature
  Dependencies: @ngrx/store, @ngrx/effects
  DevTools: yes
  Time-travel: yes
  Boilerplate: HIGH — only justified for very large apps
*/

// ─── PROS AND CONS TABLE ──────────────────────────────────────────────────────

/*
  ┌────────────────────┬───────────┬──────────────────┬──────────────────────┐
  │ Approach           │ Bundle    │ Best For         │ Avoid When           │
  ├────────────────────┼───────────┼──────────────────┼──────────────────────┤
  │ Component signals  │ 0 KB      │ Local UI state   │ State shared broadly │
  │ Service + signals  │ 0 KB      │ Shared features  │ Complex async flows  │
  │ RxJS BehaviorSubj  │ ~0 KB*    │ Async pipelines  │ Simple sync state    │
  │ @ngrx/signals      │ ~15 KB    │ Medium-large app │ Small/solo projects  │
  │ @ngrx/store        │ ~35 KB    │ Enterprise apps  │ Any new project      │
  └────────────────────┴───────────┴──────────────────┴──────────────────────┘
  * RxJS is already in every Angular app
*/

// ─── RED FLAGS: You might be over-engineering ─────────────────────────────────

/*
  - You're adding NgRx to a solo project with 3 routes
  - You have more action files than feature files
  - You're creating an Effect just to call an HTTP service
  - You're using a global store for form state
  - Components call `store.dispatch()` for purely local interactions

  If you see any of the above, step back and ask:
  "Can a service with signals handle this?" — the answer is usually YES.
*/

// ─── MIGRATION PATH ───────────────────────────────────────────────────────────

/*
  Start here: component signal
    ↓ (second component needs it)
  Move to: service + signals
    ↓ (need debounce / switchMap)
  Add: RxJS inside the service, toSignal() for template
    ↓ (team > 5 devs, DevTools needed)
  Upgrade to: @ngrx/signals Signal Store
    ↓ (legacy codebase already on @ngrx/store)
  Maintain: @ngrx/store, migrate slices one at a time
*/

// ─── FEATURE FLAGS — when NgRx IS the right choice ───────────────────────────

export const USE_NGRX_CHECKLIST = {
  /** More than 10 feature areas with shared state */
  multipleFeatureModules: false,

  /** Team of 5+ engineers committing to same state daily */
  largeTeam: false,

  /** Must support Redux DevTools for time-travel debugging */
  needsDevTools: false,

  /** Optimistic updates with server rollback on failure */
  optimisticUpdates: false,

  /** Complex side effects: WebSockets, polling, race conditions */
  complexEffects: false,

  /** State must be serialisable for SSR hydration */
  ssrHydration: false,

  get recommendation(): string {
    const score = Object.values(this)
      .filter(v => v === true).length;
    if (score >= 4) return '@ngrx/signals (Signal Store)';
    if (score >= 2) return 'Service + Signals with RxJS for async';
    return 'Service + Signals only';
  },
};

// Example evaluation
console.log(USE_NGRX_CHECKLIST.recommendation);
// → 'Service + Signals only'
