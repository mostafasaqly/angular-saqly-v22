# Angular DevTools — Signal Graph Guide

> Angular v22 · Chrome Extension required
> Install: Chrome Web Store → search "Angular DevTools" (publisher: angular.io)

---

## Opening the Signal Graph

1. Run your Angular app: `ng serve`
2. Open Chrome and navigate to `http://localhost:4200`
3. Open Chrome DevTools: `F12` (or right-click → Inspect)
4. Click the **Angular** tab (added by the extension)
5. In the Angular panel, click **Signal Graph**

---

## Panel Layout

```
┌──────────────────┬────────────────────────────────────────┐
│  Component Tree  │  Signal Graph (main canvas)            │
│                  │                                        │
│ ▼ AppComponent   │  [count] ──→ [double] ──→ DOM          │
│   ▼ NavComponent │  signal    computed     template       │
│   ▼ HomeComponent│                                        │
│     CounterComp  │  [items]   [total]                     │
│                  │  signal ──→ computed                   │
└──────────────────┴────────────────────────────────────────┘
```

- **Left panel:** Click any component to load its signal graph on the right.
- **Right canvas:** Drag to pan, scroll to zoom. Click any node for details.

---

## Node Types and Colours

| Colour | Node Type | Description |
|--------|-----------|-------------|
| Blue | `signal()` | Writable source value |
| Green | `computed()` | Derived read-only value |
| Purple | `effect()` | Side-effect triggered by signal reads |
| Teal | `linkedSignal()` | Writable derived signal |
| Orange | Dirty | Value has changed; dependants not yet notified |
| Red | Error | An error was thrown in a computed or effect |
| Grey | Inactive | Signal exists but has no current subscribers |

---

## Reading a Signal Graph

### Simple example

```typescript
// Counter component
count  = signal(0);
double = computed(() => this.count() * 2);
label  = computed(() => `Value is ${this.double()}`);
```

Graph:

```
[count: 0] ──→ [double: 0] ──→ [label: "Value is 0"] ──→ DOM
  (blue)          (green)              (green)
```

When you call `count.update(n => n + 1)`:

```
[count: 1] ──→ [double: 2] ──→ [label: "Value is 2"] ──→ DOM
  (orange)        (orange)           (orange)           re-rendered
```

All orange nodes turn back to their normal colours after the DOM updates.

### Service signals in the graph

Signals from injected services also appear:

```typescript
// Component
private cartService = inject(CartService);
itemCount = computed(() => this.cartService.items().length);
```

Graph:

```
CartService.items (blue, from root injector)
    ↓
itemCount (green, in ProductListComponent)
    ↓
DOM: <span>{{ itemCount() }}</span>
```

The service signal appears with a label showing which service owns it.

---

## Step-by-Step: Debug an Unexpected Re-Render

**Symptom:** Your list component re-renders every time the user types in a search box,
even though the list data hasn't changed.

**Steps:**

1. Open Signal Graph, click your list component.
2. Type in the search box.
3. Watch for nodes that turn orange.
4. If `searchTerm` (blue) turns orange and it connects to `filteredProducts` (green)
   which connects to the DOM — that's expected.
5. BUT if `allProducts` (blue, from HTTP service) also turns orange unexpectedly,
   something is writing to `allProducts` on every keystroke. That's your bug.

**Common cause:** An `effect()` that reads search term AND writes to the products signal:

```typescript
// BUG: this effect writes to products when search changes
effect(() => {
  const term = this.searchTerm();
  this.products.set(this.allProducts.filter(p => p.name.includes(term)));
  //             ↑ writing to a signal inside an effect that reads another signal
});

// FIX: use computed() instead — reads are tracked, no writes
filteredProducts = computed(() =>
  this.allProducts().filter(p => p.name.includes(this.searchTerm()))
);
```

---

## Step-by-Step: Find a Missing Reactive Connection

**Symptom:** The template doesn't update when a signal changes.

**Steps:**

1. Open Signal Graph, click the component.
2. Find the signal that should trigger the update (e.g., `userRole`).
3. Check if there's an arrow from `userRole` to the DOM node.
4. If there's no arrow — the template is NOT reading the signal reactively.

**Common cause:** Reading the signal outside a reactive context:

```typescript
// BUG: read in ngOnInit — not tracked
ngOnInit() {
  this.displayName = this.user().name; // plain string, not reactive
}

// FIX: use computed() — tracked by Signal Graph
displayName = computed(() => this.user().name);
```

The Signal Graph will now show `user → displayName → DOM`.

---

## Step-by-Step: Detect a Signal Cycle

**Symptom:** Error in console: `ExpressionChangedAfterItWasCheckedError` or infinite effect loop.

In the Signal Graph, a cycle appears as a circular arrow: A → B → A.

Angular v22 detects most cycles at runtime and throws:

```
Error: Detected cycle in signal graph: [count] → [derived] → [count]
```

**Common cause:**

```typescript
// BUG: effect writes back to a signal it reads
count = signal(0);

constructor() {
  effect(() => {
    const val = this.count(); // reads count
    this.count.set(val + 1); // writes count → infinite loop!
  });
}

// FIX: don't write to signals you read in the same effect
// If you need to transform, use computed() or update from an event
```

---

## Tips and Tricks

### Tip 1: Filter by signal name

Use the search box in the Signal Graph header to filter nodes by name.
Type "cart" to see only signals with "cart" in their name across all components.

### Tip 2: Pause graph updates

Click the pause button (⏸) to freeze the graph at the current state.
Useful when a lot of changes happen simultaneously and you need to read the graph.

### Tip 3: Export the graph

Right-click the canvas → "Export as PNG". Useful for documenting state architecture
or sharing with teammates during code review.

### Tip 4: Signal Inspector panel

Click any signal node to open the inspector panel (bottom of the canvas):

```
Signal: count
Type: WritableSignal<number>
Current value: 5
Last changed: 43ms ago
Subscribers: 2 (double, DOM)
Owner: CounterComponent (instance #3)
```

### Tip 5: Watch effects in real time

Effects (purple nodes) show their last run time and the signals they read.
If an effect is running too frequently, you'll see its "Last run" timestamp updating rapidly.
This is often a sign the effect is reading a signal that changes on every render.

---

## Common Signal Graph Patterns

### Pattern: Service store → Multiple components

```
UserService._user (blue, root injector)
├──→ NavComponent.userName (green)
├──→ ProfileComponent.user (green)
└──→ AdminGuard.isAdmin (green)
```

This is healthy — one source of truth, multiple consumers.

### Pattern: Form → Validation → Submit button

```
form.email (blue) ──→ emailValid (green) ──→ formValid (green) ──→ DOM (button disabled)
form.name  (blue) ──→ nameValid  (green) ──┘
```

### Pattern: Search → Filter → Sorted → Paginated list

```
searchTerm (blue)
    ↓
filtered (green) ←── allItems (blue, from httpResource)
    ↓
sorted (green) ←── sortField (blue)
    ↓
paginated (green) ←── currentPage (blue)
    ↓
DOM: @for (item of paginated(); ...) { ... }
```

Deep chains like this are readable but watch the depth — more than 5 levels can indicate
the state logic should be moved into a dedicated service.
