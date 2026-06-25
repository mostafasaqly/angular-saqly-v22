// 04-reactive-form-basic.component.ts
// Demonstrates FormControl and FormGroup — the core of the Reactive Forms API.

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

// ---------------------------------------------------------------------------
// Custom cross-field validator (group level)
// ---------------------------------------------------------------------------
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password        = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
@Component({
  selector: 'app-reactive-form-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Create Account — Reactive Form</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">

      <!-- First name -->
      <label>
        First Name
        <input formControlName="firstName" />
        @if (c('firstName').invalid && c('firstName').touched) {
          <span class="error">First name is required.</span>
        }
      </label>

      <!-- Last name -->
      <label>
        Last Name
        <input formControlName="lastName" />
        @if (c('lastName').invalid && c('lastName').touched) {
          <span class="error">Last name is required.</span>
        }
      </label>

      <!-- Email -->
      <label>
        Email
        <input type="email" formControlName="email" />
        @if (c('email').touched) {
          @if (c('email').errors?.['required']) {
            <span class="error">Email is required.</span>
          }
          @if (c('email').errors?.['email']) {
            <span class="error">Must be a valid email.</span>
          }
        }
      </label>

      <!-- Password group (nested FormGroup for cross-field validation) -->
      <fieldset formGroupName="passwords">
        <legend>Password</legend>

        <label>
          Password
          <input type="password" formControlName="password" />
          @if (pwGroup.get('password')?.errors?.['minlength'] && pwGroup.get('password')?.touched) {
            <span class="error">At least 8 characters required.</span>
          }
        </label>

        <label>
          Confirm Password
          <input type="password" formControlName="confirmPassword" />
        </label>

        @if (pwGroup.errors?.['passwordMismatch'] && pwGroup.get('confirmPassword')?.touched) {
          <span class="error">Passwords do not match.</span>
        }
      </fieldset>

      <!-- Whole form validity -->
      <p>Form valid: {{ form.valid }}</p>

      <button type="submit" [disabled]="form.invalid">Create Account</button>
    </form>
  `
})
export class ReactiveFormBasicComponent {
  // Build the form model in TypeScript — purely declarative
  form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName:  new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email:     new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),

    // Nested group to enable cross-field (password match) validation
    passwords: new FormGroup(
      {
        password:        new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
        confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      },
      { validators: passwordMatchValidator }
    ),
  });

  // Shortcut getter to avoid verbose form.get() calls in template
  c(name: string): AbstractControl {
    return this.form.get(name)!;
  }

  get pwGroup(): FormGroup {
    return this.form.get('passwords') as FormGroup;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    // form.getRawValue() includes disabled controls; .value does not
    const { firstName, lastName, email, passwords } = this.form.getRawValue();
    console.log('Submitting:', { firstName, lastName, email, password: passwords.password });
  }
}
