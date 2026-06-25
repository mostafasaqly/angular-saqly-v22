// 01-signal-form-basic.component.ts
// Demonstrates the basic signalForm() setup, binding, and submission in Angular v22.

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SignalFormsModule, signalForm, Validators } from '@angular/forms';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignalFormsModule],
  template: `
    <h2>Create Account</h2>

    <form (ngSubmit)="onSubmit()">

      <!-- Username -->
      <label>
        Username
        <input [sfControl]="form.fields.username" placeholder="e.g. alice42" />
        @if (form.fields.username.invalid() && form.fields.username.touched()) {
          <span class="error">Username is required (min 3 characters).</span>
        }
      </label>

      <!-- Email -->
      <label>
        Email
        <input type="email" [sfControl]="form.fields.email" placeholder="alice@example.com" />
        @if (form.fields.email.errors()?.['required'] && form.fields.email.touched()) {
          <span class="error">Email is required.</span>
        }
        @if (form.fields.email.errors()?.['email'] && form.fields.email.touched()) {
          <span class="error">Must be a valid email address.</span>
        }
      </label>

      <!-- Password -->
      <label>
        Password
        <input type="password" [sfControl]="form.fields.password" />
        @if (form.fields.password.errors()?.['minlength'] && form.fields.password.touched()) {
          <span class="error">Password must be at least 8 characters.</span>
        }
      </label>

      <!-- Submit -->
      <button type="submit" [disabled]="!form.valid()">
        Register
      </button>

      <!-- Debug: live form value -->
      <pre>{{ form.value() | json }}</pre>
    </form>
  `
})
export class RegisterComponent {
  // signalForm() — the v22 default. Each field is [initialValue, validators?].
  form = signalForm({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    if (!this.form.valid()) return;

    // form.value() is a plain snapshot object — send it to your API
    const payload: RegisterPayload = this.form.value() as RegisterPayload;
    console.log('Submitting:', payload);

    // After successful submission, reset:
    this.form.reset();
  }
}
