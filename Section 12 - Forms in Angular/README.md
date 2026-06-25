# Section 12: Forms in Angular

> **Angular v22 Course** — Section 12 of 25
> Estimated time: ~2.5 hours · Level: Intermediate

Forms are at the heart of every data-driven application — login screens, checkout flows, admin panels, search bars, survey builders. Angular v22 gives you **three** form strategies, each suited to different scenarios. The brand-new **Signal Forms** API is now stable and the v22 default. You'll master all three, learn how to compose validators (built-in and custom), build dynamic fields, and finish with a clear decision guide for choosing the right approach every time.

---

## Table of Contents

1. [Forms Overview](#1-forms-overview)
2. [Signal Forms — The v22 Default Approach](#2-signal-forms--the-v22-default-approach)
3. [Creating a Signal Form](#3-creating-a-signal-form)
4. [Validation with Signal Forms](#4-validation-with-signal-forms)
5. [Template-Driven Forms](#5-template-driven-forms)
6. [Reactive Forms (FormControl, FormGroup, FormArray)](#6-reactive-forms-formcontrol-formgroup-formarray)
7. [Form Validation](#7-form-validation)
8. [Custom Validators](#8-custom-validators)
9. [Dynamic Forms](#9-dynamic-forms)
10. [Choosing Between Signal, Reactive, and Template-Driven Forms](#10-choosing-between-signal-reactive-and-template-driven-forms)

---

## 1. Forms Overview

Angular ships **three** form strategies out of the box. They are not competing — they serve different use cases:

| Strategy | When introduced | Reactive? | Signal-based? | Best for |
|---|---|---|---|---|
| **Template-Driven** | Angular 2 | Via NgModel | No | Simple forms, beginners |
| **Reactive** | Angular 2 | Yes (RxJS) | No | Complex, programmatic forms |
| **Signal Forms** | Angular 17 preview / v22 stable | Yes (Signals) | Yes | v22 default; most new forms |

### The two key concepts that apply to all strategies

1. **Form Control** — represents a single input field: its current value, its validity state, and whether it has been touched or dirtied.
2. **Form Group** — a collection of related controls treated as a unit. A form group is itself valid only when all its children are valid.

```typescript
// Underlying representation — same idea across all strategies
{
  value:   { name: 'Alice', email: 'alice@example.com' },
  valid:   true,
  touched: true,
  dirty:   true,
  errors:  null
}
```

### What changes across strategies

The *how* differs:
- **Template-driven** — you drive everything from the HTML template using directives (`ngModel`, `ngForm`). Angular creates the controls behind the scenes.
- **Reactive** — you create the form model in TypeScript code first, then bind it to the template. Full programmatic control.
- **Signal** — you create the form model in TypeScript using `signalForm()`. The model is itself a Signal, so the template is purely reactive.

---

## 2. Signal Forms — The v22 Default Approach

**Signal Forms** (`@angular/forms` → `signalForm`) are the official v22 default. They were in developer preview from Angular 17 and became stable in Angular v22.

### Why Signal Forms?

| Pain point with Reactive Forms | How Signal Forms fix it |
|---|---|
| `.value` is a plain object (not reactive) | `form.value()` is a Signal — auto-tracks in templates |
| Must subscribe to `valueChanges` Observable | Just read `form.fields.email.value()` — signal |
| Boilerplate: `new FormGroup({...})` | `signalForm({ email: ['', Validators.email] })` |
| Status as string: `form.status === 'VALID'` | `form.valid()` — boolean Signal |
| Async validators need manual wiring | First-class, same API |

### How Signal Forms work under the hood

`signalForm()` returns a **`SignalForm`** object. Every field inside it is a **`SignalControl`** — a tiny object whose `.value()`, `.valid()`, `.errors()`, `.touched()`, and `.dirty()` are all Signals.

```typescript
import { signalForm, Validators } from '@angular/forms';

const form = signalForm({
  username: ['', [Validators.required, Validators.minLength(3)]],
  email:    ['', [Validators.required, Validators.email]],
});

// All of these are Signals:
form.value()                     // { username: '', email: '' }
form.valid()                     // false
form.fields.email.value()        // ''
form.fields.email.errors()       // { required: true }
form.fields.email.touched()      // false
```

---

## 3. Creating a Signal Form

### Setup — no extra imports needed

Signal Forms are part of `@angular/forms`. In a standalone component, import `SignalFormsModule` or the individual directives.

```typescript
import { Component } from '@angular/core';
import { SignalFormsModule, signalForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SignalFormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>
        Username
        <input [sfControl]="form.fields.username" />
        @if (form.fields.username.errors()?.['required'] && form.fields.username.touched()) {
          <span class="error">Username is required.</span>
        }
      </label>

      <label>
        Email
        <input type="email" [sfControl]="form.fields.email" />
        @if (form.fields.email.errors()?.['email'] && form.fields.email.touched()) {
          <span class="error">Invalid email address.</span>
        }
      </label>

      <button type="submit" [disabled]="!form.valid()">Register</button>
    </form>
  `
})
export class RegisterComponent {
  form = signalForm({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.form.valid()) {
      console.log('Form value:', this.form.value());
      // { username: 'alice', email: 'alice@example.com' }
    }
  }
}
```

### Key directives

| Directive | Purpose |
|---|---|
| `[sfControl]` | Binds an `<input>` to a `SignalControl` |
| `[sfGroup]` | Binds a `<fieldset>` or `<div>` to a nested group |
| `[sfArray]` | Binds to a `SignalArray` |

### Reading form state in the template

```html
<!-- Is the whole form valid? -->
<button [disabled]="!form.valid()">Submit</button>

<!-- Show errors only after user has touched the field -->
@if (form.fields.name.invalid() && form.fields.name.touched()) {
  <p class="error">Name is required.</p>
}

<!-- Live value display (great for debugging) -->
<pre>{{ form.value() | json }}</pre>
```

---

## 4. Validation with Signal Forms

### Built-in validators

`Validators` from `@angular/forms` works with all three form strategies.

```typescript
import { signalForm, Validators } from '@angular/forms';

const form = signalForm({
  name:     ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  email:    ['', [Validators.required, Validators.email]],
  age:      [null, [Validators.required, Validators.min(18), Validators.max(120)]],
  website:  ['', Validators.pattern(/^https?:\/\/.+/)],
});
```

### Reading errors

`form.fields.fieldName.errors()` returns an `ValidationErrors | null` object:

```typescript
// If the user left "name" blank:
form.fields.name.errors()  // → { required: true }

// If they typed one character:
form.fields.name.errors()  // → { minlength: { requiredLength: 2, actualLength: 1 } }
```

### Async validators

Async validators return a `Promise<ValidationErrors | null>` or `Observable<ValidationErrors | null>`.

```typescript
import { signalForm, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { inject } from '@angular/core';
import { UserService } from './user.service';

// Inline async validator
const form = signalForm({
  username: ['', Validators.required, {
    asyncValidators: [
      async (control: AbstractControl) => {
        const userService = inject(UserService);
        const exists = await userService.checkUsernameExists(control.value);
        return exists ? { usernameTaken: true } : null;
      }
    ]
  }]
});
```

### Showing async validation state

```html
@if (form.fields.username.pending()) {
  <span>Checking username...</span>
}
@if (form.fields.username.errors()?.['usernameTaken']) {
  <span class="error">That username is already taken.</span>
}
```

---

## 5. Template-Driven Forms

Template-driven forms put the form definition in the template using Angular directives. Angular generates the `FormGroup` and `FormControl` objects behind the scenes. Best for simple forms or when migrating older Angular code.

### Setup

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
      <label>
        Email
        <input
          name="email"
          type="email"
          [(ngModel)]="credentials.email"
          required
          email
          #emailField="ngModel"
        />
        @if (emailField.invalid && emailField.touched) {
          <span class="error">Valid email required.</span>
        }
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          [(ngModel)]="credentials.password"
          required
          minlength="8"
          #passwordField="ngModel"
        />
        @if (passwordField.errors?.['minlength'] && passwordField.touched) {
          <span class="error">Password must be at least 8 characters.</span>
        }
      </label>

      <button type="submit" [disabled]="loginForm.invalid">Log in</button>
    </form>
  `
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Login with:', this.credentials);
    }
  }
}
```

### Key directives

| Directive | Purpose |
|---|---|
| `FormsModule` | Import in standalone component |
| `ngForm` | Auto-applied to `<form>` elements; access via `#f="ngForm"` |
| `ngModel` | Two-way binds an input to a component property |
| `[(ngModel)]` | Two-way binding shorthand |
| `name` attribute | Required on every `ngModel` input so Angular can track it |

### Template reference variables

```html
<!-- #loginForm="ngForm" gives you access to the FormGroup -->
<form #loginForm="ngForm">

<!-- #emailField="ngModel" gives you access to the FormControl for that field -->
<input name="email" [(ngModel)]="email" #emailField="ngModel" />

<!-- Now you can read emailField.valid, emailField.errors, etc. -->
```

---

## 6. Reactive Forms (FormControl, FormGroup, FormArray)

Reactive forms give you full programmatic control. The form model lives in TypeScript; the template just binds to it. Best for complex, dynamic, or heavily-tested forms.

### FormControl

A single input:

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input [formControl]="emailControl" type="email" />
    <p>Value: {{ emailControl.value }}</p>
    <p>Valid: {{ emailControl.valid }}</p>
  `
})
export class EmailFieldComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
}
```

### FormGroup

Group multiple controls:

```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';

const profileForm = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName:  new FormControl('', Validators.required),
  email:     new FormControl('', [Validators.required, Validators.email]),
});

// Read values
profileForm.value        // { firstName: '', lastName: '', email: '' }
profileForm.valid        // false
profileForm.get('email') // → the FormControl for email
```

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <input formControlName="firstName" />
  <input formControlName="lastName" />
  <input formControlName="email" type="email" />
  <button type="submit" [disabled]="profileForm.invalid">Save</button>
</form>
```

### FormArray

Dynamic list of controls:

```typescript
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

const form = new FormGroup({
  title: new FormControl('', Validators.required),
  tags:  new FormArray([
    new FormControl('angular'),
    new FormControl('typescript'),
  ]),
});

// Type-safe helper getter
get tags(): FormArray {
  return this.form.get('tags') as FormArray;
}

addTag(): void {
  this.tags.push(new FormControl(''));
}

removeTag(index: number): void {
  this.tags.removeAt(index);
}
```

```html
<div formArrayName="tags">
  @for (tag of tags.controls; track $index) {
    <div>
      <input [formControlName]="$index" />
      <button (click)="removeTag($index)">Remove</button>
    </div>
  }
</div>
<button (click)="addTag()">Add Tag</button>
```

---

## 7. Form Validation

### Validation states

Every control (Signal, Reactive, or Template-Driven) has these states:

| State | Description |
|---|---|
| `valid` / `invalid` | Passes all validators or not |
| `touched` / `untouched` | User has blurred the input or not |
| `dirty` / `pristine` | User has changed the value or not |
| `pending` | An async validator is running |

### Showing errors only at the right time

Always show errors only after the user has interacted with the field:

```html
<!-- Reactive: -->
@if (form.get('email')?.invalid && form.get('email')?.touched) {
  <span class="error">
    @if (form.get('email')?.errors?.['required']) { Email is required. }
    @if (form.get('email')?.errors?.['email']) { Must be a valid email. }
  </span>
}

<!-- Signal: -->
@if (form.fields.email.invalid() && form.fields.email.touched()) {
  <span class="error">
    @if (form.fields.email.errors()?.['required']) { Email is required. }
    @if (form.fields.email.errors()?.['email']) { Must be a valid email. }
  </span>
}
```

### Cross-field validation (group validator)

Validate one field against another (e.g., password confirmation):

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password        = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

// Apply to a FormGroup:
const form = new FormGroup(
  {
    password:        new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  },
  { validators: passwordMatchValidator() }
);
```

---

## 8. Custom Validators

### Synchronous custom validator

A validator is just a function that accepts an `AbstractControl` and returns `ValidationErrors | null`.

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// No-spaces validator
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = /\s/.test(control.value);
    return hasSpaces ? { noSpaces: { value: control.value } } : null;
  };
}

// Usage
const usernameControl = new FormControl('', [Validators.required, noSpacesValidator()]);
```

### Async custom validator

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export function uniqueEmailValidator(http: HttpClient) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    // Debounce 400ms to avoid too many requests while typing
    return timer(400).pipe(
      switchMap(() =>
        http.get<{ exists: boolean }>(`/api/check-email?email=${control.value}`)
      ),
      map(res => (res.exists ? { emailTaken: true } : null)),
      catchError(() => of(null))  // swallow network errors
    );
  };
}

// Usage in reactive form:
const emailControl = new FormControl('', {
  validators:      [Validators.required, Validators.email],
  asyncValidators: [uniqueEmailValidator(inject(HttpClient))],
  updateOn:        'blur'   // only run validators on blur, not every keystroke
});
```

### Custom validator directive (template-driven)

To use a custom validator in template-driven forms, wrap it in a directive:

```typescript
import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[noSpaces]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: NoSpacesDirective, multi: true }]
})
export class NoSpacesDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return /\s/.test(control.value) ? { noSpaces: true } : null;
  }
}

// In template:
// <input name="username" ngModel noSpaces />
```

---

## 9. Dynamic Forms

Dynamic forms build or mutate the form structure at runtime — adding/removing fields based on user actions or server-driven schema.

### Adding and removing fields

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="emails">
        @for (ctrl of emailControls.controls; track $index) {
          <div>
            <input [formControlName]="$index" type="email" placeholder="Email #{{ $index + 1 }}" />
            @if (emailControls.length > 1) {
              <button type="button" (click)="removeEmail($index)">Remove</button>
            }
          </div>
        }
      </div>

      <button type="button" (click)="addEmail()">+ Add Email</button>
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class DynamicFormComponent {
  form = new FormGroup({
    emails: new FormArray([
      new FormControl('', [Validators.required, Validators.email])
    ])
  });

  get emailControls(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  addEmail(): void {
    this.emailControls.push(
      new FormControl('', [Validators.required, Validators.email])
    );
  }

  removeEmail(index: number): void {
    this.emailControls.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
```

### Schema-driven dynamic forms

Build forms from a JSON schema (common in admin panels and form builders):

```typescript
interface FieldConfig {
  key:         string;
  label:       string;
  type:        'text' | 'email' | 'number' | 'select';
  required?:   boolean;
  options?:    string[];  // for select
}

// Schema from server or config file:
const schema: FieldConfig[] = [
  { key: 'name',  label: 'Full Name', type: 'text',   required: true  },
  { key: 'email', label: 'Email',     type: 'email',  required: true  },
  { key: 'role',  label: 'Role',      type: 'select', options: ['admin', 'user', 'viewer'] },
];

// Build FormGroup from schema:
function buildFormFromSchema(fields: FieldConfig[]): FormGroup {
  const controls: Record<string, FormControl> = {};
  for (const field of fields) {
    controls[field.key] = new FormControl('', field.required ? Validators.required : []);
  }
  return new FormGroup(controls);
}
```

---

## 10. Choosing Between Signal, Reactive, and Template-Driven Forms

### Decision guide

```
Start here: Is this a new Angular v22 project?
  YES → Use Signal Forms. They're the default and the future.
  NO (legacy codebase) → Continue reading.

Are you migrating from Reactive Forms?
  YES → Migrate incrementally: new forms → Signal, existing → keep as Reactive.

Is the form very simple (2-3 fields, one screen)?
  YES → Template-Driven is fine; quick to write.
  NO → Signal or Reactive.

Do you need complex programmatic logic (add/remove fields at runtime)?
  YES → Signal Forms (signalArray) or Reactive (FormArray). Both work.

Do you need deep RxJS integration (combineLatest across multiple streams)?
  YES → Reactive Forms (valueChanges returns Observables that compose nicely).

Does your team know Angular 14-v21 well?
  YES → Reactive Forms are familiar; no rush to migrate.
```

### Quick comparison table

| Concern | Signal Forms | Reactive Forms | Template-Driven |
|---|---|---|---|
| Setup verbosity | Low | Medium | Lowest |
| Type safety | Excellent | Good | Poor |
| Reactivity | Signals | RxJS Observables | NgModel two-way |
| Dynamic fields | `signalArray.push()` | `FormArray.push()` | Awkward |
| Unit testability | Excellent | Excellent | Hard |
| v22 recommendation | First choice | Second choice | Legacy/simple |
| Learning curve | Low | Medium | Lowest |

---

## ✅ Section 12 Recap

You can now:
- Explain the three Angular form strategies and when each fits.
- Build a **Signal Form** with `signalForm()`, bind it with `[sfControl]`, and read its Signal-based state.
- Apply **built-in validators** (`required`, `email`, `minLength`, `pattern`) to Signal and Reactive forms.
- Write **custom synchronous and asynchronous validators**.
- Use `FormControl`, `FormGroup`, and `FormArray` for classic **Reactive Forms**.
- Build **Template-Driven Forms** with `ngModel` and `ngForm`.
- Implement **dynamic forms** that add/remove fields at runtime.
- Choose the right form strategy for any situation.

### Knowledge Check

1. What function creates a Signal Form in Angular v22?
2. What is the difference between `touched` and `dirty` on a form control?
3. How do you perform cross-field validation in a Reactive Form?
4. Why should you prefer `updateOn: 'blur'` for async validators?
5. Name one advantage Signal Forms have over Reactive Forms.

<details>
<summary>Show answers</summary>

1. `signalForm()` imported from `@angular/forms`.
2. `touched` becomes `true` when the user blurs the field (leaves it). `dirty` becomes `true` when the user actually *changes* the value. A field can be touched without being dirty (user clicked into it then left without typing).
3. Pass a `ValidatorFn` to the **`FormGroup`'s** `validators` option (not to individual controls). The validator receives the whole group as `AbstractControl` and can call `group.get('password')` etc.
4. Async validators (e.g., HTTP calls to check unique emails) are expensive. Running them on every keystroke wastes requests. `updateOn: 'blur'` defers validation until the user leaves the field.
5. Any valid answer: Signal Forms expose control state as Signals (no `.value` vs `valueChanges` confusion), eliminate `.subscribe()` boilerplate, integrate naturally with OnPush change detection, have simpler TypeScript types, or require less code overall.

</details>

---

**Next up — [Section 13: RxJS Essentials](../Section%2013%20-%20RxJS%20Essentials/README.md)**
Even in the Signal era, RxJS is essential for HTTP streaming, complex async flows, and advanced event composition. We'll cover Observables, Subjects, and the operators you'll use every week.
