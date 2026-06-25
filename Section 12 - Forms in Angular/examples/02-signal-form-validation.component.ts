// 02-signal-form-validation.component.ts
// Demonstrates built-in validators with Signal Forms, error display, and async validation.

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SignalFormsModule,
  signalForm,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

// ---------------------------------------------------------------------------
// Async validator: checks whether a username is already taken via HTTP
// ---------------------------------------------------------------------------
function uniqueUsernameValidator(http: HttpClient) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value || control.value.length < 3) return of(null);

    // Wait 400ms after the user stops typing before making the HTTP call
    return timer(400).pipe(
      switchMap(() =>
        http.get<{ taken: boolean }>(`/api/check-username?name=${control.value}`)
      ),
      map(res => (res.taken ? { usernameTaken: true } : null)),
      catchError(() => of(null)) // Don't break the form on network error
    );
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
@Component({
  selector: 'app-signup-validation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignalFormsModule],
  template: `
    <h2>Sign Up — Validation Demo</h2>

    <form (ngSubmit)="onSubmit()">

      <!-- Username with async validation -->
      <label>
        Username
        <input [sfControl]="form.fields.username" />

        @if (form.fields.username.pending()) {
          <span class="hint">Checking availability...</span>
        }
        @if (form.fields.username.touched() && !form.fields.username.pending()) {
          @if (form.fields.username.errors()?.['required']) {
            <span class="error">Username is required.</span>
          }
          @if (form.fields.username.errors()?.['minlength']) {
            <span class="error">
              Username must be at least
              {{ form.fields.username.errors()?.['minlength']?.requiredLength }} characters.
            </span>
          }
          @if (form.fields.username.errors()?.['usernameTaken']) {
            <span class="error">That username is already taken.</span>
          }
        }
      </label>

      <!-- Email -->
      <label>
        Email
        <input type="email" [sfControl]="form.fields.email" />
        @if (form.fields.email.touched()) {
          @if (form.fields.email.errors()?.['required']) {
            <span class="error">Email is required.</span>
          }
          @if (form.fields.email.errors()?.['email']) {
            <span class="error">Must be a valid email address.</span>
          }
        }
      </label>

      <!-- Age with min/max -->
      <label>
        Age
        <input type="number" [sfControl]="form.fields.age" />
        @if (form.fields.age.touched()) {
          @if (form.fields.age.errors()?.['required']) {
            <span class="error">Age is required.</span>
          }
          @if (form.fields.age.errors()?.['min']) {
            <span class="error">You must be at least 18 years old.</span>
          }
          @if (form.fields.age.errors()?.['max']) {
            <span class="error">Age cannot exceed 120.</span>
          }
        }
      </label>

      <!-- Website with pattern -->
      <label>
        Website (optional)
        <input type="url" [sfControl]="form.fields.website" placeholder="https://" />
        @if (form.fields.website.errors()?.['pattern'] && form.fields.website.touched()) {
          <span class="error">Must start with http:// or https://</span>
        }
      </label>

      <!-- Form-level status -->
      <p>Form status: <strong>{{ form.valid() ? 'VALID' : 'INVALID' }}</strong></p>

      <button type="submit" [disabled]="!form.valid() || form.pending()">
        Create Account
      </button>
    </form>
  `
})
export class SignupValidationComponent {
  private http = inject(HttpClient);

  form = signalForm({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      { asyncValidators: [uniqueUsernameValidator(this.http)] }
    ],
    email:   ['', [Validators.required, Validators.email]],
    age:     [null as number | null, [Validators.required, Validators.min(18), Validators.max(120)]],
    website: ['', Validators.pattern(/^https?:\/\/.+/)],
  });

  onSubmit(): void {
    if (this.form.valid()) {
      console.log('Account created:', this.form.value());
    }
  }
}
