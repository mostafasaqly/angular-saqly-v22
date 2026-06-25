# Section 21: AI Tooling and Developer Experience

> **Angular v22 Course** — Section 21 of 25 · Optional / Bonus
> Estimated time: ~60 minutes · Level: Intermediate

This bonus section covers the AI-powered developer experience tools that ship with or integrate into Angular v22. These tools don't change how Angular works — they change how *fast* you can work with Angular. We'll configure the Angular MCP server, explore AI skills, and master the Signal and Dependency Injection graphs in Angular DevTools. We'll also look at the improved Hot Module Replacement workflow in v22.

> **This section is optional.** If you want to jump straight to the projects, skip to Section 22. Come back here whenever you want to level up your tooling.

---

## Table of Contents

1. [Angular AI Tooling Overview](#1-angular-ai-tooling-overview)
2. [The Angular CLI MCP Server](#2-the-angular-cli-mcp-server)
3. [Angular Skills for Coding Agents](#3-angular-skills-for-coding-agents)
4. [Debugging with the Signal Graph (DevTools)](#4-debugging-with-the-signal-graph-devtools)
5. [Debugging with the Dependency Injection Graph](#5-debugging-with-the-dependency-injection-graph)
6. [Hot Module Replacement Improvements](#6-hot-module-replacement-improvements)

---

## 1. Angular AI Tooling Overview

Angular v22 ships with first-class AI tooling support across three layers:

```
┌─────────────────────────────────────────────────────────┐
│  Layer 3 — AI Skills (pre-built prompt templates)       │
│  "Generate me a product list component"                 │
├─────────────────────────────────────────────────────────┤
│  Layer 2 — Angular MCP Server (project context)         │
│  Reads your routes, services, components in real time   │
├─────────────────────────────────────────────────────────┤
│  Layer 1 — Angular CLI (toolchain foundation)           │
│  ng generate, ng build, ng serve, ng test               │
└─────────────────────────────────────────────────────────┘
```

### Why AI tooling matters for Angular specifically

Angular is a *structured* framework. Every component has a predictable shape: a TypeScript class, a decorator, a template, optional imports. Every service uses `inject()`. Every route follows the same pattern. This structure is exactly what makes Angular ideal for AI code generation — the patterns are well-defined enough that an AI agent can get them right.

Without AI tooling, a coding agent generating Angular code often:
- Uses `NgModule` (the old approach) instead of standalone components
- Uses `@Input()` decorator instead of the `input()` signal function
- Uses `HttpClient` directly instead of `httpResource`
- Forgets to add the component to the `imports` array

With the Angular MCP server and skills configured, agents generate idiomatic v22 code on the first try.

### What tools we'll cover

| Tool | What it does | Required? |
|---|---|---|
| Angular MCP Server | Gives AI agents live project context | Recommended |
| Angular AI Skills | Pre-built prompts for idiomatic code gen | Recommended |
| Angular DevTools (Signal Graph) | Visualise Signal dependencies in the browser | Yes |
| Angular DevTools (DI Graph) | Visualise the injector tree | Yes |
| HMR v22 improvements | Faster, state-preserving hot reload | Automatic |

---

## 2. The Angular CLI MCP Server

The **Model Context Protocol (MCP)** is an open standard that lets AI assistants communicate with tools and data sources. The Angular team ships an official MCP server — `@angular/mcp` — that exposes your Angular project's structure to any MCP-compatible AI client.

### Install the MCP server

```bash
npm install -g @angular/mcp@latest
```

Verify:

```bash
ng-mcp --version
# @angular/mcp 22.x.x
```

### Configure it for Claude Code

Create `.claude/mcp.json` in your project root (the file in `examples/01-mcp-config.json` is a ready-to-use template):

```json
{
  "mcpServers": {
    "angular": {
      "command": "ng-mcp",
      "args": ["--project", "."],
      "description": "Angular v22 project context server"
    }
  }
}
```

### Configure it for VS Code (Copilot / Continue)

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "angular": {
      "type": "stdio",
      "command": "ng-mcp",
      "args": ["--project", "."]
    }
  }
}
```

### What the MCP server exposes

Once running, an MCP-compatible AI client can query:

```
angular/components       → list all components with their selector and input/output signatures
angular/services         → list all services with their provided-in scope
angular/routes           → full route tree
angular/signals          → all top-level signals and computed values per component
angular/schema           → project angular.json build configuration
angular/generate         → trigger ng generate commands directly via AI
```

### Practical example

Without MCP, you'd prompt: *"Create a ProductListComponent that fetches from /api/products and displays them in a grid."*

The AI might generate outdated patterns.

With MCP running, the AI knows:
- Your existing `ProductService` already has `getProducts()` using `httpResource`
- Your project uses a `CardComponent` in `src/app/shared/card/`
- Your routes file expects a named export from `product-list/product-list.ts`

So it generates code that *fits your existing project* — not a generic blank-slate example.

### MCP server capabilities table

| Capability | Description |
|---|---|
| `listComponents` | Returns all component selectors, input names, output names |
| `listServices` | Returns service class names, injection tokens, methods |
| `listRoutes` | Returns the full lazy-loaded route tree |
| `readFile` | Reads a specific project file for context |
| `generateComponent` | Runs `ng generate component` with specified options |
| `generateService` | Runs `ng generate service` with specified options |
| `runBuild` | Triggers `ng build` and streams output |
| `runTests` | Triggers `ng test` and returns results |

---

## 3. Angular Skills for Coding Agents

Angular v22 introduces **AI Skills** — a set of opinionated prompt templates that teach coding agents the idiomatic Angular v22 way to do things. Think of them as a rulebook the agent loads before writing any Angular code.

### Install skills

```bash
# List available skills
ng ai skills list

# Install all Angular skills into your project
ng ai skills add --all
```

Skills are installed as Markdown files in `.angular/skills/`. The agent reads these automatically when the MCP server is running.

### What each skill covers

| Skill name | What it teaches the agent |
|---|---|
| `component` | Standalone components, `input()` / `output()` signals, OnPush |
| `service` | `inject()`, `providedIn: 'root'`, signal-based state |
| `forms` | Signal Forms (`signalForm`), validators, typed controls |
| `routing` | Lazy-loaded routes, route guards, `withComponentInputBinding` |
| `http` | `httpResource`, `HttpClient`, interceptors |
| `state` | Service-based signal stores, `computed()`, `effect()` |
| `testing` | `TestBed`, `ComponentFixture`, signal testing patterns |
| `performance` | OnPush, `trackBy`, lazy loading, `deferrable views` |

### How a skill looks (simplified)

```markdown
# Angular Component Skill

When generating an Angular component:
- Always use `standalone: true`
- Always use `ChangeDetectionStrategy.OnPush`
- Use `input()` instead of `@Input()` decorator
- Use `output()` instead of `@Output() EventEmitter`
- Use `inject()` for dependency injection instead of constructor params
- Keep templates in a separate `.html` file unless the component is tiny

## Example

\`\`\`typescript
import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  private productService = inject(ProductService);
}
\`\`\`
```

### Writing custom skills

You can add your own skills for project-specific conventions:

```bash
# Create a custom skill
ng ai skills create --name "data-table" --description "How to build data tables in this project"
```

Edit `.angular/skills/data-table.md` with your team's conventions. The agent will apply them automatically.

### Agent workflow with skills enabled

```
User: "Generate a UserListComponent that shows a paginated table of users"

Agent (with skills):
1. Reads `component` skill → uses standalone, OnPush, input() signals
2. Reads `http` skill → uses httpResource for data fetching
3. Reads MCP route list → matches your existing route pattern
4. Reads MCP component list → reuses your existing TableComponent
5. Generates idiomatic, project-consistent code
```

---

## 4. Debugging with the Signal Graph (DevTools)

Angular DevTools is a Chrome extension that gives you deep visibility into your running Angular application. In v22 the most powerful panel is the **Signal Graph** — a live visualisation of every signal and computed value in your app and their dependency relationships.

### Install Angular DevTools

Install from the Chrome Web Store: search "Angular DevTools" (publisher: angular.io).

Once installed, open Chrome DevTools (`F12`) and look for the **Angular** tab.

### The Signal Graph panel

The Signal Graph shows:

```
signal(0) [count]
    ↓
computed(() => count() * 2) [double]
    ↓
computed(() => `Count is ${double()}`) [label]
    ↓
DOM: <p>{{ label() }}</p>
```

Every arrow means "this node reads that node." When `count` changes:
1. The graph highlights the changed signal in red/orange
2. Propagation arrows light up showing which computed values re-run
3. Finally the DOM nodes that re-render are highlighted

### Reading the graph

| Node colour | Meaning |
|---|---|
| Blue | Signal — writable source value |
| Green | Computed — derived read-only value |
| Purple | Effect — side effect triggered by signals |
| Orange | Currently dirty (value changed, dependants not yet re-run) |
| Red | Error in a computed or effect |

### Practical debugging: finding an unexpected re-render

Symptom: your component re-renders more often than expected.

Steps:
1. Open Angular DevTools → Signal Graph tab
2. Click the component in the component tree (left panel)
3. Interact with the UI and watch which signals turn orange
4. If a signal you didn't expect turns orange, it means something is writing to it unintentionally

### Checking signal subscriptions

```typescript
// This pattern creates an untracked subscription — easy to miss
@Component({ ... })
export class ExampleComponent {
  count = signal(0);
  // BAD: reading inside ngOnInit is not tracked by the Signal Graph
  ngOnInit() {
    console.log(this.count()); // not reactive!
  }

  // GOOD: use effect() for reactive side effects
  constructor() {
    effect(() => {
      console.log(this.count()); // tracked — shows in Signal Graph
    });
  }
}
```

The Signal Graph will show the `effect()` as a node connected to `count`. If you used `ngOnInit()` instead, there's no node — DevTools won't show the connection, which is your clue that something is wrong.

### Inspecting computed chain depth

A deep computed chain (signal → computed → computed → computed → DOM) can be a performance problem. DevTools shows the full depth. Rule of thumb: chains deeper than 4–5 levels should be refactored.

---

## 5. Debugging with the Dependency Injection Graph

The **DI Graph** panel in Angular DevTools shows the injector tree — which services are available at the root level, which are scoped to a lazy-loaded route, and which are component-level providers.

### Opening the DI Graph

Angular DevTools → **Injector Tree** tab.

The tree looks like:

```
Root Injector
├── AuthService (providedIn: 'root')
├── HttpClient (provideHttpClient())
└── Router (provideRouter())

Lazy Route Injector: /admin
├── AdminService (provided in AdminModule / lazy route)
└── AdminGuard

Component Injector: ProductListComponent
└── ProductStateService (providers: [ProductStateService])
```

### Common DI debugging scenarios

**Scenario 1: Service is not found (NullInjectorError)**

```
Error: NullInjectorError: No provider for CartService!
```

Steps:
1. Open DI Graph
2. Search for `CartService`
3. If it doesn't appear anywhere — it's not provided. Add `providedIn: 'root'` or add it to the `providers` array.
4. If it appears in a different branch — it's scoped to a lazy module that hasn't loaded yet.

**Scenario 2: Multiple instances of a service**

You expect a singleton but the service has different state in different components.

```typescript
// BUG: providing a service at component level creates a NEW instance
@Component({
  providers: [CartService]  // ← separate instance, not the singleton!
})
export class CheckoutComponent { ... }
```

In the DI Graph you'll see `CartService` appearing twice — once in Root Injector and once in the CheckoutComponent injector. That's your bug.

**Scenario 3: Lazy route service leaking to root**

```typescript
// WRONG: this makes AdminService a root singleton — any route can inject it
@Injectable({ providedIn: 'root' })
export class AdminService { ... }

// CORRECT: scope it to the admin route
@Injectable()
export class AdminService { ... }
// and in the route definition:
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes'),
  providers: [AdminService]  // scoped to admin route only
}
```

The DI Graph will confirm that `AdminService` only appears under the `/admin` route injector node.

### Inspecting an injector node

Click any node in the DI Graph to see:
- All tokens provided at that level
- The provider type (class, factory, value, alias)
- Whether it's been instantiated (lazy providers are only created when first injected)

---

## 6. Hot Module Replacement Improvements

Hot Module Replacement (HMR) lets the browser update individual modules without a full page reload. Angular v22 significantly improves HMR, making it faster and capable of preserving application state across style and template changes.

### What's new in v22 HMR

| Feature | Before v22 | v22 |
|---|---|---|
| Style changes | Full page reload | CSS injected live, no reload |
| Template changes | Component re-rendered from scratch | Component patched in place |
| Signal state preservation | State lost on reload | State preserved across template edits |
| TypeScript changes | Full app reload | Module-level reload, state preserved where possible |
| Error overlay | Generic error message | Full source-mapped error with component name |

### Enabling HMR

HMR is **enabled by default** in Angular v22 dev server. No configuration needed:

```bash
ng serve
# HMR is active — look for "Hot Module Replacement: enabled" in the terminal output
```

To verify HMR is working:
1. Start `ng serve`
2. Open `http://localhost:4200`
3. Increment a counter in your app (set state)
4. Edit the component's `.css` file (change a colour)
5. Watch the browser — the colour changes instantly, the counter value is preserved

### HMR and Signals — the key interaction

Because Angular v22's change detection is Signal-driven, HMR can be much smarter than before:

```typescript
@Component({ ... })
export class CounterComponent {
  // This signal's value is preserved across template-only HMR updates
  count = signal(0);

  increment() { this.count.update(n => n + 1); }
}
```

When you edit the template of `CounterComponent`, Angular replaces only the template view — the `count` signal keeps its current value. In previous Angular versions, the component would re-instantiate and `count` would reset to 0.

### When HMR triggers a full reload

Some changes still require a full page reload:

| Change type | Full reload? | Why |
|---|---|---|
| `app.config.ts` | Yes | App-level providers changed |
| Route configuration | Yes | Router must reinitialise |
| Service class | Yes | Singleton may have changed shape |
| Component class (TypeScript) | Partial | Class re-instantiated, template preserved |
| Component template only | No | Patch in place |
| Component styles only | No | CSS hot-swapped |
| Global styles (`styles.css`) | No | CSS hot-swapped |

### Configuring HMR behaviour

```json
// angular.json — fine-tune HMR
{
  "serve": {
    "options": {
      "hmr": true,
      "liveReload": true
    }
  }
}
```

To disable HMR (e.g., for debugging a reload-specific issue):

```bash
ng serve --no-hmr
```

### Common HMR gotchas

**Gotcha 1: State is preserved but the UI shows stale data**

If your component reads from a service (not a local signal), HMR won't reset the service state. This is usually what you want, but occasionally you'll see data that should have been fetched fresh. Use the browser's hard reload (`Ctrl + Shift + R`) to reset fully.

**Gotcha 2: HMR loop — the browser keeps refreshing**

This happens when a file-watcher picks up a file that the build step itself modifies. Check for circular imports or a code-gen script that writes back into `src/`.

**Gotcha 3: TypeScript error overlay blocks the screen**

Angular v22 shows a full-screen error overlay when compilation fails. This is intentional — the overlay includes the source-mapped error with the exact file and line. Fix the error and the overlay disappears automatically.

---

## ✅ Section 21 Recap

You now know:
- **How Angular's AI tooling layers fit together** — CLI foundation, MCP server for context, AI Skills for idiomatic code.
- **How to configure the Angular MCP server** for Claude Code and VS Code.
- **What Angular AI Skills are** — rulebooks that teach agents idiomatic v22 patterns.
- **How to use the Signal Graph** in Angular DevTools to debug reactive dependencies.
- **How to use the DI Graph** to trace provider scope and diagnose `NullInjectorError` or duplicate instances.
- **How v22 HMR works** — style and template changes are hot-patched; Signal state is preserved across template edits.

### Knowledge Check

1. What does the Angular MCP server provide that a raw AI model cannot know on its own?
2. In the Signal Graph, what does an orange node indicate?
3. You see `CartService` appear in both the Root Injector and a `CheckoutComponent` injector node in the DI Graph. What is the likely bug and how do you fix it?
4. What types of Angular file changes trigger a full page reload despite HMR being enabled?

<details>
<summary>Show answers</summary>

1. The MCP server provides **live project context** — the actual component names, service methods, routes, and Signal shapes in *your specific project*. A raw model only knows Angular patterns from its training data and cannot know your project's structure.
2. An orange node means the signal's value has **changed (it is dirty)** but its dependants (computed values or effects downstream) have not yet re-run. It turns back to its normal colour once propagation completes.
3. The bug is that `CheckoutComponent` has `providers: [CartService]` in its `@Component` decorator, which creates a **new isolated instance** of `CartService` instead of using the root singleton. Fix: remove `CartService` from the component's `providers` array and ensure it has `providedIn: 'root'` in its `@Injectable` decorator.
4. Changes to `app.config.ts` (app-level providers), route configuration files, and service TypeScript classes all trigger a full page reload because Angular must reinitialise providers or the router. Template-only and style-only changes use HMR patch without a reload.

</details>

---

**Next up — [Section 22: Project — Admin Dashboard](../Section%2022%20-%20Project%20Admin%20Dashboard/README.md)**
Time to build the first full project: a feature-complete Admin Dashboard with Signal-based state, `httpResource` data fetching, Signal Forms, and route guards.
