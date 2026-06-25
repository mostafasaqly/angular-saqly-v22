# HMR Workflow Notes — Angular v22

> Hot Module Replacement (HMR) in Angular v22
> HMR is enabled by default — no configuration needed for basic use.

---

## What is HMR?

Hot Module Replacement replaces changed modules in the browser **without a full page reload**.
The JavaScript runtime patches itself in place — state is preserved, the scroll position stays,
and the UI updates in milliseconds.

Angular v22 significantly improves on earlier versions: template and style changes now preserve
Signal state across the hot update.

---

## Quick Start

```bash
# HMR is active by default
ng serve

# Confirm HMR is running — look for this line in terminal output:
# Hot Module Replacement: enabled
```

Navigate to `http://localhost:4200` and start editing. Changes appear in < 200ms typically.

---

## What Gets HMR'd vs Full Reload

| File Changed | HMR Behaviour | Signal State |
|---|---|---|
| `*.css` (component styles) | Hot-swapped, no reload | Preserved |
| `*.css` (`styles.css` global) | Hot-swapped, no reload | Preserved |
| `*.html` (component template) | Component patched in place | Preserved |
| `*.ts` (component class) | Component re-instantiated | **Reset** |
| `*.ts` (service) | Service re-instantiated | **Reset** |
| `app.config.ts` | Full page reload | **Reset** |
| `app.routes.ts` | Full page reload | **Reset** |
| `angular.json` | Full page reload | **Reset** |
| `tsconfig.json` | Full page reload | **Reset** |

### Key rule of thumb

**Template/style only change = state preserved. Class/service change = state reset.**

This means you can iterate on layouts and styles without losing your place in the app.
When you change logic, expect a fresh start.

---

## Verifying HMR is Working

1. Start the app: `ng serve`
2. Navigate to a component with a counter or input field
3. Change the value (e.g., increment counter to 5, type in an input)
4. Edit the component's `.css` file — change a colour or font size
5. Save the file
6. The browser updates the style instantly; the counter shows 5 and the input still has your text

If the counter reset to 0 after a CSS change, HMR is not working — check the gotchas section below.

---

## Signal State Preservation — How it Works

In Angular v22, component signals are owned by the component *instance*.
When HMR patches a template, it:

1. Keeps the existing component instance alive
2. Replaces only the compiled template view factory
3. Triggers a re-render using the existing instance's signals

```typescript
@Component({ ... })
export class CounterComponent {
  count = signal(0); // ← this instance field is NOT reset on template HMR

  increment() { this.count.update(n => n + 1); }
}
```

Edit the template (`<button>Increment</button>` → `<button>Add One</button>`), save, and
`count()` still holds its current value.

**Class change scenario (state does reset):**

If you add a new field or change `constructor()`, Angular must re-instantiate the class.
`count` resets to its initial value `signal(0)` → `0`.

---

## Configuration Options

### angular.json — serve options

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "hmr": true,
            "liveReload": true,
            "open": false,
            "port": 4200
          }
        }
      }
    }
  }
}
```

### Disable HMR for a session

```bash
# Full reload on every change (useful for debugging reload-specific bugs)
ng serve --no-hmr

# Disable live reload entirely (manual refresh only)
ng serve --no-live-reload
```

### Custom port

```bash
ng serve --port 4300
```

---

## Common Gotchas

### Gotcha 1: State preserved but shows stale data

**Symptom:** You updated server-side data, reloaded a component via HMR, but the old
data is still displayed.

**Cause:** `httpResource` (or an `effect` that fetched data) ran once on component
init and cached the result in a signal. HMR kept the signal value — it didn't re-fetch.

**Fix options:**
- Press `Ctrl + Shift + R` for a hard reload to reset all state
- Or add a "refresh" button in development that calls `resource.reload()`

```typescript
// Debug helper — expose resource reload in dev
products = httpResource<Product[]>('/api/products');

// In template (dev only):
// <button (click)="products.reload()">Refresh</button>
```

---

### Gotcha 2: HMR triggers a full reload unexpectedly

**Symptom:** You edited a CSS file but got a full page reload instead of a hot swap.

**Common causes:**

1. **The CSS file is imported in a TypeScript file** (not referenced as `styleUrl`):
   ```typescript
   // This import path makes TS treat the CSS as a TS module change → full reload
   import styles from './component.css'; // avoid this pattern
   ```
   Fix: use `styleUrl: './component.css'` in the `@Component` decorator.

2. **A code-generation script writes back to `src/`** during the build.
   The watcher sees the generated file change → triggers another build → loop.
   Fix: move generated files outside `src/` or add them to `.gitignore` + `angular.json` exclude.

3. **Circular imports** between changed files.
   Fix: break the circular dependency.

---

### Gotcha 3: The error overlay covers the whole screen

**Symptom:** You introduced a TypeScript error and now a red overlay blocks the app.

**This is intentional.** The overlay shows the source-mapped error with file and line number.
Fix the TypeScript error, save, and the overlay disappears automatically.

To see errors without the overlay (e.g., you want to see current UI state despite errors):

```bash
# This is NOT recommended for daily use — you may miss errors
ng serve --no-error-overlay  # not a real flag; use browser console instead
```

The correct approach: fix the error. The overlay is there to help you.

---

### Gotcha 4: Template error after HMR but TypeScript says it's fine

**Symptom:** After a template change, the DevTools console shows an Angular template error
but `ng build` succeeds.

**Cause:** The Angular Language Service (VS Code extension) and the runtime compiler
can occasionally disagree on what's valid.

**Fix:**
1. Stop `ng serve`
2. Run `ng build` to get a clean compile check
3. Start `ng serve` again

---

### Gotcha 5: HMR works for styles but not for templates

**Symptom:** CSS changes hot-swap correctly but HTML template changes trigger a full reload.

**Cause:** Usually an older version of the Angular CLI cached in `node_modules`.

**Fix:**
```bash
# Clear build cache
ng cache clean

# Restart dev server
ng serve
```

---

## HMR and Testing

HMR only applies to `ng serve`. When running `ng test`:
- Karma re-runs only the affected test spec files (file-level HMR equivalent)
- The test browser window updates without a full reload for spec-only changes
- Component test HMR follows the same rules as app HMR

---

## Performance: Build Time vs HMR Patch Time

| Operation | Typical Time (v22 esbuild) |
|---|---|
| Initial build | 3–8 seconds |
| TypeScript file change → full module rebuild | 200–800ms |
| Template-only change → HMR patch | 50–200ms |
| CSS-only change → HMR patch | 20–80ms |
| Global CSS change → HMR patch | 20–80ms |

Template and style changes are dramatically faster because they skip TypeScript compilation entirely.

---

## HMR Workflow for Common Tasks

### Iterating on a layout

1. Run `ng serve`
2. Open the component's `.html` and `.css` files side by side with the browser
3. Edit → save → see the change in < 100ms
4. Signal state (form input values, counter values) is never reset

### Debugging a form

1. Fill in a form in the browser
2. Edit the form component template (add a validation message, move a field)
3. HMR patches the template — form values are preserved
4. Continue debugging without re-filling the form

### Debugging a multi-step wizard

1. Navigate to step 3 of a wizard
2. Edit step 3's template
3. HMR patches — you're still on step 3 with the same data
4. Without HMR you'd need to navigate back to step 3 every save
