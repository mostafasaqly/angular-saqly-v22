// 08-forms-comparison.ts
// Annotated comparison of Angular's three form strategies.
// This is not a runnable component — it is a reference and decision guide.

// ============================================================================
// THE THREE FORM STRATEGIES AT A GLANCE
// ============================================================================

// STRATEGY 1 — SIGNAL FORMS (Angular v22 default)
// ─────────────────────────────────────────────────
// Import:   signalForm, SignalFormsModule from '@angular/forms'
// Binding:  [sfControl]="form.fields.fieldName"  (in template)
// State:    form.valid()  form.value()  form.fields.x.errors()  — all Signals
// Best for: New v22 projects. Most reactive, least boilerplate.

// import { signalForm, Validators, SignalFormsModule } from '@angular/forms';
//
// form = signalForm({
//   email: ['', [Validators.required, Validators.email]],
// });
//
// Template:
//   <input [sfControl]="form.fields.email" />
//   <button [disabled]="!form.valid()">Submit</button>

// ─────────────────────────────────────────────────────────────────────────────

// STRATEGY 2 — REACTIVE FORMS
// ─────────────────────────────────────────────────
// Import:   ReactiveFormsModule from '@angular/forms'
//           FormControl, FormGroup, FormArray
// Binding:  [formGroup]="form"  formControlName="field"
// State:    form.valid   form.value   form.get('x').errors  — plain values
//           form.valueChanges — RxJS Observable
// Best for: Complex RxJS pipelines, older codebases, FormArray-heavy forms.

// import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
//
// form = new FormGroup({
//   email: new FormControl('', [Validators.required, Validators.email]),
// });
//
// Template:
//   <form [formGroup]="form">
//     <input formControlName="email" />
//     <button [disabled]="form.invalid">Submit</button>
//   </form>

// ─────────────────────────────────────────────────────────────────────────────

// STRATEGY 3 — TEMPLATE-DRIVEN FORMS
// ─────────────────────────────────────────────────
// Import:   FormsModule from '@angular/forms'
// Binding:  [(ngModel)]="property"  (two-way binding)
// State:    Access via template reference #f="ngForm", #x="ngModel"
// Best for: Very simple forms, 2-3 fields, prototypes, or teams new to Angular.

// import { FormsModule, NgForm } from '@angular/forms';
//
// model = { email: '' };
//
// Template:
//   <form #f="ngForm" (ngSubmit)="onSubmit(f)">
//     <input name="email" [(ngModel)]="model.email" required email #emailF="ngModel" />
//     <button [disabled]="f.invalid">Submit</button>
//   </form>

// ============================================================================
// DECISION FLOWCHART (as code comments)
// ============================================================================

// Q1: Is this a NEW Angular v22 project with no legacy constraints?
//   YES → USE SIGNAL FORMS
//   NO  → continue...

// Q2: Does the form require deep RxJS integration?
//   (e.g., combineLatest with other observables, valueChanges piped into HTTP)
//   YES → USE REACTIVE FORMS  (valueChanges returns Observable, composes well)
//   NO  → continue...

// Q3: Does the form need programmatic add/remove of fields at runtime?
//   YES → SIGNAL FORMS (signalArray) or REACTIVE FORMS (FormArray) — both fine.
//   NO  → continue...

// Q4: Is this a very simple form (≤ 3 fields, one submit, no complex validation)?
//   YES → TEMPLATE-DRIVEN (fastest to write)
//   NO  → USE SIGNAL FORMS or REACTIVE FORMS

// ============================================================================
// QUICK FEATURE MATRIX
// ============================================================================

// Feature                      | Signal    | Reactive  | Template-Driven
// ─────────────────────────────|───────────|───────────|─────────────────
// Defined in                   | TypeScript| TypeScript| Template (HTML)
// Reactivity model             | Signals   | RxJS      | NgModel
// form.valid access            | .valid()  | .valid    | form.valid (ref)
// Dynamic fields (add/remove)  | signalArray.push() | FormArray.push() | Awkward
// Cross-field validators       | GroupValidator | GroupValidator | Directive
// Async validators             | First-class | First-class | Directive wrapper
// TypeScript type safety       | Excellent | Good     | Poor
// Unit testable (no DOM)       | Yes       | Yes       | No (needs TestBed)
// v22 recommended              | FIRST     | SECOND    | Legacy/simple only
// Import required              | SignalFormsModule | ReactiveFormsModule | FormsModule

// ============================================================================
// MIGRATION NOTE
// ============================================================================

// If you have an Angular 14-17 codebase using Reactive Forms:
//   - Do NOT rewrite everything immediately.
//   - Add Signal Forms for NEW forms as you build them.
//   - Migrate old forms one at a time when they need significant changes.
//   - Signal Forms and Reactive Forms can coexist in the same application.

// ============================================================================
// COMMON MISTAKES
// ============================================================================

// 1. Forgetting to import the right module:
//    Signal Forms:    imports: [SignalFormsModule]
//    Reactive:        imports: [ReactiveFormsModule]
//    Template-driven: imports: [FormsModule]

// 2. Forgetting `name` attribute on template-driven inputs — Angular
//    cannot register the control with the parent NgForm without it.

// 3. Checking form.valid BEFORE marking controls as touched —
//    errors won't show until the user interacts. Call form.markAllAsTouched()
//    on submit to force all error messages to appear.

// 4. Using [(ngModel)] in a component that also uses ReactiveFormsModule —
//    this works but mixing strategies in one form is confusing. Pick one.

// 5. Forgetting to unsubscribe from valueChanges in Reactive Forms —
//    use takeUntilDestroyed() from '@angular/core/rxjs-interop'.
