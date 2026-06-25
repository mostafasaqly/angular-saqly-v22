# Section 1: Course Introduction

> **Angular v22 Course** — Section 1 of 25
> Estimated time: ~30 minutes · Level: Beginner

Welcome to the course! This first section sets the stage. There's no code to write yet — instead, we'll cover what Angular is, what you'll build, what you need to know before starting, what's genuinely *new* in v22, how it compares to React and Vue, and how to study so the lessons stick. By the end you'll have a clear mental map of the journey ahead.

---

## Table of Contents

1. [Welcome to Angular v22 Course](#1-welcome-to-angular-v22-course)
2. [What You Will Build in This Course](#2-what-you-will-build-in-this-course)
3. [Prerequisites and Course Roadmap](#3-prerequisites-and-course-roadmap)
4. [Angular v22 Overview — The Signal-First Era](#4-angular-v22-overview--the-signal-first-era)
5. [What's New in v22](#5-whats-new-in-v22)
6. [Angular vs React vs Vue](#6-angular-vs-react-vs-vue)
7. [When to Use Angular](#7-when-to-use-angular)
8. [How to Get the Most from This Course](#8-how-to-get-the-most-from-this-course)

---

## 1. Welcome to Angular v22 Course

### What is this course?

This is a **hands-on, project-driven crash course** on Angular v22 — the latest major version of Google's enterprise-grade web framework. We won't just read theory; we'll write real components, wire up real state with Signals, fetch real data, and ship **two** complete projects.

### Why Angular?

Angular is a **complete, opinionated framework** — it comes with everything built in: routing, forms, HTTP, dependency injection, testing utilities, and a powerful CLI. You don't need to hunt for third-party libraries to assemble a production app.

```typescript
// You describe a component...
@Component({
  selector: 'app-greeting',
  template: `<h1>Hello, {{ name() }}!</h1>`
})
export class GreetingComponent {
  name = signal('Angular');   // Signal — the v22 way
}

// ...Angular handles change detection and DOM updates for you.
```

### What makes Angular v22 special?

Angular v22 (released **June 3, 2026**) marks what the team calls the **Signal-First Era**. Signal Forms are now stable and the default approach, OnPush is the default change detection strategy for every new component, and new projects run **Zoneless** out of the box. This release makes Angular faster, leaner, and far less boilerplate-heavy than it used to be.

---

## 2. What You Will Build in This Course

By the end of this course, you'll have built **two complete, portfolio-ready applications** plus dozens of smaller examples along the way.

### 🗂️ Project 1 — Admin Dashboard (Section 22)

A fully featured admin interface:

| Feature | Angular concept used |
|---|---|
| Display data from a REST API | `httpResource` (Resource API) |
| Search and filter records | Signal-based reactive state |
| Add / edit / delete items | Signal Forms + HTTP mutations |
| Loading and error states | Resource status signals |
| Protected routes | Route Guards + Auth Service |

### 🛒 Project 2 — E-Commerce Mini App (Section 23)

A small shop with cart management:

| Feature | Angular concept used |
|---|---|
| Product list from API | `httpResource` |
| Product details page | Angular Router + route params |
| Add to cart / update qty / remove | Service-based state with Signals |
| Order summary and checkout form | Signal Forms + Validators |
| Persist cart across reloads | localStorage + service |

### Along the way

You'll also build small focused demos for **every concept**. Keep them all — by the end you'll have a personal "Angular cookbook."

---

## 3. Prerequisites and Course Roadmap

### What you need to know before starting

You **don't** need any prior Angular experience. You **do** need comfortable familiarity with these:

**Required:**
- **HTML** — tags, attributes, basic page structure.
- **CSS** — selectors, the box model, flexbox basics.
- **TypeScript (basic)** — this is the big one:
  - Types, interfaces, and type annotations
  - Classes, constructors, and access modifiers (`public`, `private`)
  - Decorators (`@Component`, `@Injectable`)
  - `async` / `await` and Promises
  - ES Modules: `import` / `export`
- **OOP concepts** — classes, inheritance, encapsulation.
- **Node.js v22+ and npm** — Angular CLI requires Node 22.

> ⚠️ **Honest note:** If TypeScript is completely new to you, spend a couple of hours on the basics first. Angular is written *in* TypeScript — not optional JavaScript.

### The Roadmap

The course has **25 sections** in five phases:

```
PHASE 1 — FOUNDATIONS
  ── Section 1   Course Introduction               ← you are here
  ── Section 2   Development Environment Setup
  ── Section 3   Angular Fundamentals
  ── Section 4   Templates and Binding
  ── Section 5   Control Flow in Angular

PHASE 2 — SIGNALS, COMPONENTS & DIRECTIVES
  ── Section 6   Components Communication
  ── Section 7   Signals Fundamentals
  ── Section 8   Advanced Signals
  ── Section 9   Directives and Pipes
  ── Section 10  Services and Dependency Injection

PHASE 3 — ROUTING, FORMS & DATA
  ── Section 11  Routing
  ── Section 12  Forms in Angular
  ── Section 13  RxJS Essentials
  ── Section 14  HTTP and APIs

PHASE 4 — STATE, PERFORMANCE & QUALITY
  ── Section 15  State Management
  ── Section 16  Authentication and Guards
  ── Section 17  UI, Styling, and Accessibility
  ── Section 18  Performance and Optimization
  ── Section 19  SSR and Hydration
  ── Section 20  Testing Basics
  ── Section 21  AI Tooling and Developer Experience

PHASE 5 — PROJECTS, SHIP & REVIEW
  ── Section 22  Project 1 — Admin Dashboard
  ── Section 23  Project 2 — E-Commerce Mini App
  ── Section 24  Deployment
  ── Section 25  Final Review and Next Steps
```

Each phase builds on the last. Phase 1 gets you productive, Phase 2 adds reactivity and directives, Phase 3 wires up routing and data, Phase 4 optimizes and tests, and Phase 5 ships real projects.

---

## 4. Angular v22 Overview — The Signal-First Era

Angular is a **complete framework** (not just a library) focused on building large-scale web applications. Its core ideas:

- **Components** — reusable pieces of UI, each with a TypeScript class + HTML template + CSS.
- **Signals** — the v22 reactive primitive for state. When a signal changes, only the parts of the UI that depend on it update.
- **Dependency Injection** — services are injected automatically; Angular manages their lifecycle.
- **Standalone Components** — components that declare their own dependencies, no `NgModule` required.
- **Angular CLI** — `ng generate`, `ng build`, `ng serve`, `ng test` — one tool for everything.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ double() }}</p>
    <button (click)="increment()">+1</button>
  `
})
export class CounterComponent {
  count  = signal(0);
  double = computed(() => this.count() * 2);   // derived signal

  increment() {
    this.count.update(n => n + 1);
  }
}
```

> Angular v22's mantra: **Signals first, less boilerplate, faster by default.**

---

## 5. What's New in v22

Here's a tour of what changed. Don't worry about mastering these now; each gets its own deep dive later.

### ⚡ Signal Forms — Stable (Section 12)

The new default way to build forms. Built on Signals — less code, easier to test, reactive by nature.

```typescript
import { signalForm, Validators } from '@angular/forms';

const form = signalForm({
  name:  ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
});

// Read value as a Signal — no .value property needed
console.log(form.value()); // { name: '', email: '' }
```

### 🎯 OnPush by Default (Section 18)

Every new component generated with the CLI now uses `ChangeDetectionStrategy.OnPush` automatically. Better performance with zero extra effort. The old "Default" strategy is renamed **Eager**.

### 🌐 Zoneless by Default (Section 18)

New projects no longer ship Zone.js. Angular uses Signals to know exactly what changed — no zone patching needed. Smaller bundle, faster startup.

### 📦 Resource API — Stable (Section 14)

```typescript
import { httpResource } from '@angular/common/http';

// Declarative async data — like a Signal for HTTP
readonly users = httpResource<User[]>('/api/users');
// users.value()  → the data
// users.isLoading() → boolean
// users.error()  → any error
```

### 🧩 Other v22 Additions

| Feature | What it does | Section |
|---|---|---|
| Selectorless Components | Components without a `selector` — used by composition | 6 |
| Angular Aria | Built-in accessible component primitives | 17 |
| Navigation API support | Router integrates Web Navigation API | 11 |
| Linked Signals | `linkedSignal()` — a writable signal derived from another | 8 |
| `takeUntilDestroyed` | Cleaner RxJS subscription cleanup | 13 |

---

## 6. Angular vs React vs Vue

| | Angular | React | Vue |
|---|---|---|---|
| **Type** | Complete framework | UI library | Progressive framework |
| **Language** | TypeScript (required) | JavaScript / TypeScript | JavaScript / TypeScript |
| **Learning curve** | Steeper | Moderate | Easiest |
| **Opinionated** | Yes — one way to do things | No — you choose | Moderate |
| **Best for** | Enterprise, large teams | Startups, varied projects | Mid-size, quick integrations |
| **Bundle size** | Medium (Zoneless helps) | Small | Small |
| **Backed by** | Google | Meta | Community |

> **Key insight:** Angular's "opinionated" nature is a feature in large teams — everyone writes code the same way, code reviews are faster, and onboarding new developers is easier.

---

## 7. When to Use Angular

Angular shines in specific scenarios. Choose it when:

✅ **Large enterprise application** that needs to be maintained for years.
✅ **Big team** that needs consistent patterns and clear conventions.
✅ **TypeScript and OOP** are core to your project's architecture.
✅ **You want everything built in** — forms, HTTP, router, DI, testing — without assembling libraries.
✅ **Long-term stability** matters — Angular has a strict deprecation policy and LTS support.

Reach for something else when:

❌ **Simple site or landing page** — plain HTML/CSS or Astro is simpler.
❌ **Very small project with 1–2 developers** — React or Vue has less ceremony.
❌ **Rapid prototype** where framework conventions slow you down.

> ⚠️ Angular has a steeper learning curve than React and Vue. The investment pays off at scale — a team of 10 writing consistent Angular code is dramatically more productive than a team of 10 each making their own React architecture decisions.

---

## 8. How to Get the Most from This Course

A few habits will make a huge difference:

1. **Code along — don't just read.** Type every example yourself. Muscle memory matters more than you think.
2. **Break things on purpose.** Change a value, delete a decorator, see what TypeScript complains about.
3. **Read the error messages fully.** Angular's error messages are detailed — they usually tell you exactly what's wrong.
4. **Do the knowledge checks.** Each section ends with questions. Answer before peeking.
5. **Build both projects fully** — including deploy. A finished project teaches more than ten tutorials.
6. **Use Angular DevTools.** Install the Chrome extension — it shows the Signal graph and the DI tree live.
7. **Take breaks.** Sections are bite-sized on purpose. Rest helps memory.

> 💡 **The golden rule:** the best way to get good at Angular is to **build with Angular**. Reading is the warm-up; building is the workout.

---

## ✅ Section 1 Recap

You now know:
- **What Angular is** — a complete, opinionated framework from Google for enterprise web apps.
- **What you'll build** — two projects (Admin Dashboard, E-Commerce Mini App) plus many demos.
- **What you need** — TypeScript basics, OOP concepts, Node v22+, and modern JavaScript.
- **What's new in v22** — Signal Forms stable, OnPush by default, Zoneless, Resource API, and more.
- **Angular vs React vs Vue** — Angular wins at scale and consistency; others win at simplicity.
- **How to study** — code along, break things, do the checks, finish the projects.

### Knowledge Check

1. In one sentence, what is the main difference between Angular and React?
2. Name three new features stable in Angular v22.
3. What change detection strategy does every new Angular v22 component use by default?

<details>
<summary>Show answers</summary>

1. Angular is a complete framework that provides everything out of the box (forms, HTTP, router, DI), while React is a UI library only and requires assembling external packages.
2. Any three of: Signal Forms, OnPush by default, Zoneless by default, Resource API (httpResource), Selectorless Components, Angular Aria, Navigation API support.
3. `OnPush` — the strategy that only re-checks a component when its Signal inputs change or an event originates from it.

</details>

---

**Next up — [Section 2: Development Environment Setup](../Section%2002%20-%20Development%20Environment%20Setup/README.md)**
We'll install Node.js v22+, TypeScript v6, the Angular CLI, scaffold a real Angular v22 project, and run it. 🚀
