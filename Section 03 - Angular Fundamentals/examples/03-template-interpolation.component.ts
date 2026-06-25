/**
 * Example 03 — Template Interpolation
 * -------------------------------------------------------
 * Demonstrates {{ }} interpolation in Angular templates.
 *
 * Key concepts:
 *  - Reading Signals in templates with {{ signal() }}
 *  - Interpolating strings, numbers, and computed values
 *  - Calling methods inside {{ }}
 *  - Using pipes inside {{ }}
 *  - Template expressions (what's allowed and what isn't)
 */

import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DatePipe, UpperCasePipe, CurrencyPipe } from '@angular/common';

interface User {
  firstName: string;
  lastName: string;
  role: string;
  joinedAt: Date;
  balance: number;
}

@Component({
  selector: 'app-interpolation-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, UpperCasePipe, CurrencyPipe],
  template: `
    <section>
      <h2>Template Interpolation Demo</h2>

      <!-- 1. Reading a Signal -->
      <p>First name: {{ user().firstName }}</p>
      <p>Last name: {{ user().lastName }}</p>

      <!-- 2. Computed signal — derived value, auto-updates -->
      <p>Full name: {{ fullName() }}</p>

      <!-- 3. Calling a class method in the template -->
      <!-- NOTE: Prefer computed() over methods for values that are read often -->
      <p>Initials: {{ getInitials() }}</p>

      <!-- 4. Simple expressions inside {{ }} -->
      <p>Balance doubled: {{ user().balance * 2 }}</p>
      <p>Is admin: {{ user().role === 'admin' }}</p>

      <!-- 5. String concatenation -->
      <p>Welcome: {{ 'Hello, ' + user().firstName + '!' }}</p>

      <!-- 6. Ternary expression -->
      <p>Status: {{ user().role === 'admin' ? 'Administrator' : 'Member' }}</p>

      <!-- 7. Using pipes inside interpolation -->
      <p>Role (uppercase): {{ user().role | uppercase }}</p>
      <p>Joined: {{ user().joinedAt | date:'longDate' }}</p>
      <p>Balance: {{ user().balance | currency:'USD' }}</p>

      <!-- 8. Template literal equivalent (NOT allowed — use computed()) -->
      <!-- WRONG: {{ `${user().firstName} ${user().lastName}` }} -->
      <!-- RIGHT: use computed() fullName above, or concatenate with + -->

      <hr />

      <!-- Interactive demo -->
      <button (click)="promoteToAdmin()">Make Admin</button>
      <button (click)="resetUser()">Reset</button>
    </section>
  `,
  styles: [`
    section { font-family: 'Segoe UI', sans-serif; padding: 1rem; max-width: 480px; }
    h2 { color: #3f51b5; }
    p { margin: 0.4rem 0; }
    button { margin: 0.5rem 0.5rem 0 0; padding: 0.4rem 1rem; cursor: pointer; }
    hr { margin: 1rem 0; }
  `],
})
export class InterpolationDemoComponent {
  user = signal<User>({
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'member',
    joinedAt: new Date('2024-03-15'),
    balance: 1234.56,
  });

  // computed() is the idiomatic way to derive a value from signals.
  // It recalculates automatically when user() changes.
  fullName = computed(() => `${this.user().firstName} ${this.user().lastName}`);

  // A method called inside {{ }} also works, but be careful:
  // methods are called on every change detection cycle.
  // Use computed() for anything non-trivial.
  getInitials(): string {
    const u = this.user();
    return `${u.firstName[0]}.${u.lastName[0]}.`;
  }

  promoteToAdmin(): void {
    // .update() lets you transform the current value
    this.user.update(u => ({ ...u, role: 'admin' }));
  }

  resetUser(): void {
    // .set() replaces the value entirely
    this.user.set({
      firstName: 'Alice',
      lastName: 'Johnson',
      role: 'member',
      joinedAt: new Date('2024-03-15'),
      balance: 1234.56,
    });
  }
}

/*
 * RULES FOR TEMPLATE EXPRESSIONS:
 * ─────────────────────────────────────────────────────────────
 * Allowed inside {{ }}:
 *   signal()              → read a signal
 *   prop                  → read a class property
 *   method()              → call a class method
 *   a + b, a * b, etc.   → arithmetic
 *   a === b               → comparison (returns boolean)
 *   cond ? a : b          → ternary
 *   value | pipe          → pipe transforms
 *
 * NOT allowed inside {{ }}:
 *   new SomeClass()       → no constructor calls
 *   a = b                 → no assignment
 *   ++ / --               → no increment/decrement
 *   `template literals`   → no backtick strings
 *   import(...)           → no dynamic imports
 *   console.log()         → no side effects (technically works but bad practice)
 */
