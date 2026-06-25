# Angular v22 Crash Course — Revised Outline

> Updated to reflect Angular v22 (released June 3, 2026). Key changes from the original: OnPush is now the default change detection strategy, Signal Forms and the Resource API are stable, Selectorless Components and Angular Aria (accessibility) are added, RxJS now precedes HTTP, version requirements (TypeScript 6 / Node 22+) are included in setup, and an AI Tooling section was added. A full list of changes is at the bottom.

---

## Section 1: Course Introduction

1. Welcome to Angular v22 Crash Course
2. What You Will Build in This Course
3. Course Prerequisites
4. Course Roadmap
5. Angular v22 Overview (Signal-First Era)
6. What's New in v22 (Stable Signal Forms, OnPush by Default, Zoneless)
7. Angular vs React vs Vue
8. When to Use Angular

---

## Section 2: Development Environment Setup

1. Installing Node.js (v22+ required, v20 no longer supported)
2. TypeScript v6 Requirement
3. Installing Angular CLI
4. Creating a New Angular v22 Project
5. Understanding Angular Workspace
6. Project Folder Structure
7. Running the Development Server
8. Recommended VS Code Extensions
9. Setting Up the Angular MCP Server and AI Skills (optional)

---

## Section 3: Angular Fundamentals

1. What is Angular?
2. Components in Angular
3. Standalone Components
4. Component Metadata
5. Templates
6. Styles
7. Selectors
8. Data Binding Overview

---

## Section 4: Templates and Binding

1. Interpolation
2. Property Binding
3. Event Binding
4. Two-Way Binding
5. Template Reference Variables
6. Class Binding
7. Style Binding
8. Attribute Binding

---

## Section 5: Control Flow in Angular

1. Introduction to Angular Control Flow
2. @if
3. @else and @else if
4. @for
5. track in @for
6. @empty
7. @switch
8. Migrating from *ngIf and *ngFor

---

## Section 6: Components Communication

1. Parent to Child Communication
2. @Input
3. Child to Parent Communication
4. @Output
5. EventEmitter
6. Passing Objects Between Components
7. Component Composition
8. Content Projection with ng-content
9. Selectorless Components (new in v22)

---

## Section 7: Signals Fundamentals

1. What are Signals?
2. Creating Signals
3. Reading Signals
4. Updating Signals
5. computed Signals
6. effect
7. Signals vs RxJS
8. Signals Best Practices

---

## Section 8: Advanced Signals

1. Signal Inputs
2. Model Inputs
3. Signal Queries
4. Linked Signals
5. Resources (resource, rxResource, httpResource — stable in v22)
6. Async Data with Signals
7. Signal-Based State Management
8. Common Signal Mistakes

---

## Section 9: Directives and Pipes

1. What are Directives?
2. Built-in Directives
3. Attribute Directives
4. Structural Directives Overview
5. Creating a Custom Directive
6. What are Pipes?
7. Built-in Pipes
8. Creating a Custom Pipe

---

## Section 10: Services and Dependency Injection

1. What is a Service?
2. Creating Services
3. Dependency Injection Overview
4. providedIn: 'root'
5. Injecting Services
6. inject() Function
7. Service Scope
8. Sharing Data with Services

---

## Section 11: Routing

1. Angular Routing Overview
2. Creating Routes
3. Router Outlet
4. Router Links
5. Active Links
6. Route Parameters
7. Query Parameters
8. Child Routes
9. Lazy Loading Routes
10. Navigation API Support (new in v22)
11. Not Found Page

---

## Section 12: Forms in Angular

1. Forms Overview
2. Signal Forms — The v22 Default Approach
3. Creating a Signal Form
4. Validation with Signal Forms
5. Template-Driven Forms
6. Reactive Forms (FormControl, FormGroup, FormArray)
7. Form Validation
8. Custom Validators
9. Dynamic Forms
10. Choosing Between Signal, Reactive, and Template-Driven Forms

---

## Section 13: RxJS Essentials

> Moved before HTTP, since HTTP responses are Observables.

1. What is RxJS?
2. Observables
3. Subscriptions
4. Subjects
5. BehaviorSubject
6. Common RxJS Operators
7. map
8. filter
9. switchMap
10. catchError
11. takeUntilDestroyed
12. RxJS vs Signals — When to Use Each

---

## Section 14: HTTP and APIs

1. HTTP Client Overview (Fetch by default in v22)
2. Providing HTTP Client
3. GET Requests
4. POST Requests
5. PUT and PATCH Requests
6. DELETE Requests
7. Fetching Data with httpResource (Resource API)
8. Handling Loading States
9. Handling Errors
10. Interceptors
11. API Service Layer

---

## Section 15: State Management

1. What is State Management?
2. Local Component State
3. Service-Based State
4. Signals for State Management
5. RxJS for State Management
6. When to Use NgRx
7. Simple Store with Signals
8. State Management Best Practices

---

## Section 16: Authentication and Guards

1. Authentication Flow Overview
2. Login Page
3. Register Page
4. Token Storage
5. Auth Service
6. Route Guards
7. Protected Routes
8. Role-Based Access
9. Logout
10. Auth Best Practices

---

## Section 17: UI, Styling, and Accessibility

1. Global Styles
2. Component Styles
3. CSS Variables
4. Responsive Layout
5. Angular Aria — Accessible Components (stable in v22)
6. Accessibility Best Practices (ARIA, keyboard, focus)
7. Angular Material Overview
8. Tailwind CSS with Angular
9. PrimeNG with Angular
10. Building Reusable UI Components

---

## Section 18: Performance and Optimization

1. Angular Rendering Overview
2. Change Detection Basics
3. OnPush as the Default Strategy in v22
4. The Eager Strategy (formerly "Default") and When to Use It
5. Zoneless Angular (default for new projects)
6. Lazy Loading
7. Deferrable Views with @defer
8. Image Optimization
9. track in @for
10. Bundle Size Optimization
11. Performance Best Practices

---

## Section 19: SSR and Hydration

1. What is Server-Side Rendering?
2. Angular SSR Overview
3. Creating an SSR Angular App
4. Hydration
5. Incremental Hydration
6. SEO Benefits
7. Static Site Generation
8. Common SSR Issues

---

## Section 20: Testing Basics

1. Testing Overview
2. Unit Testing Components
3. Testing Services
4. Testing Pipes
5. Testing Signals and Signal Forms
6. Testing HTTP Requests
7. Component Testing Best Practices
8. End-to-End Testing Overview

---

## Section 21: AI Tooling and Developer Experience (optional)

1. Angular AI Tooling Overview
2. The Angular CLI MCP Server
3. Angular Skills for Coding Agents
4. Debugging with the Signal Graph (DevTools)
5. Debugging with the Dependency Injection Graph
6. Hot Module Replacement Improvements

---

## Section 22: Project — Admin Dashboard

1. Project Overview
2. Creating Dashboard Layout
3. Creating Sidebar and Header
4. Building Reusable Cards
5. Displaying API Data with httpResource
6. Search and Filter
7. Add Item Form (Signal Forms)
8. Edit Item Form
9. Delete Item
10. Loading and Error States
11. Route Protection
12. Final Refactoring

---

## Section 23: Project — E-Commerce Mini App

1. Project Overview
2. Products Page
3. Product Details Page
4. Cart Service
5. Add to Cart
6. Update Quantity
7. Remove from Cart
8. Checkout Form
9. Order Summary
10. Persisting Cart Data
11. Using Signals in the Cart
12. Final Project Review

---

## Section 24: Deployment

1. Preparing Angular App for Production
2. Environment Files
3. Building the App
4. Deploying to Netlify
5. Deploying to Firebase Hosting
6. GitHub Pages Deployment
7. Common Deployment Issues

---

## Section 25: Final Review and Next Steps

1. Angular v22 Recap
2. Common Angular Interview Questions
3. Angular vs Next.js
4. Angular Career Path
5. What to Learn After Angular
6. Final Project Ideas
7. Course Conclusion

---

## Summary of Changes from the Original Outline

- **Section 1:** Added a "What's New in v22" lesson covering stable Signal Forms, OnPush by default, and Zoneless.
- **Section 2:** Added Node v22+ and TypeScript v6 requirements, plus an optional Angular MCP/AI skills setup lesson.
- **Section 6:** Added Selectorless Components (new v22 feature).
- **Section 11:** Added Navigation API support (new v22 router feature).
- **Section 12 (Forms):** Promoted Signal Forms from a final "overview" to the primary approach, with dedicated lessons; reorganized reactive/template-driven forms around it.
- **Sections 13–14:** Moved RxJS Essentials *before* HTTP, since HTTP returns Observables. Added httpResource / Resource API and noted Fetch is the v22 default.
- **Section 17:** Renamed to include Accessibility and added Angular Aria (stable in v22) plus accessibility best practices.
- **Section 18 (Performance):** Reframed OnPush as the v22 default, added the renamed "Eager" strategy, and elevated Zoneless as the default for new projects.
- **Section 20:** Added a lesson on testing Signals and Signal Forms.
- **Section 21 (new, optional):** AI Tooling and Developer Experience — MCP server, Angular skills, and DevTools signal/DI graphs.
- **Projects:** Updated to use httpResource and Signal Forms so learners apply the modern v22 stack.
