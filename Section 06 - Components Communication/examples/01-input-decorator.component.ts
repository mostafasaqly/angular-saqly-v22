/**
 * Section 6, Example 1 — @Input Decorator (Classic Style)
 *
 * Demonstrates the traditional decorator-based way to pass data
 * from a parent component to a child component.
 *
 * Key concepts:
 *  - @Input() marks a property as receivable from the parent
 *  - @Input({ required: true }) — compiler error if parent omits it
 *  - @Input({ alias: '...' }) — different public name vs internal name
 *  - @Input({ transform: fn }) — transform value before assignment
 *  - Parent uses [propertyName]="expression" to bind
 */

import {
  Component,
  Input,
  OnInit,
  booleanAttribute,
  numberAttribute,
  ChangeDetectionStrategy,
} from '@angular/core';

// ------------------------------------------------------------------
// Shared model
// ------------------------------------------------------------------

export interface BadgeConfig {
  label: string;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

// ------------------------------------------------------------------
// Child Component
// ------------------------------------------------------------------

@Component({
  selector: 'app-user-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="profile-card">
      <!-- Basic string input -->
      <h2>{{ name }}</h2>

      <!-- Number input -->
      <p>Age: {{ age }}</p>

      <!-- Boolean input (from attribute or binding) -->
      <p>Premium: {{ isPremium }}</p>

      <!-- Required input -->
      <p>Role: {{ role }}</p>

      <!-- Aliased input: parent uses [display-name], we store as displayName -->
      <p>Display Name: {{ displayName }}</p>

      <!-- Object input -->
      @if (badge) {
        <span [class]="'badge badge-' + badge.color">
          {{ badge.label }}
        </span>
      }

      <!-- Disabled uses booleanAttribute transform -->
      @if (disabled) {
        <p class="notice">This account is disabled.</p>
      }

      <!-- Max items uses numberAttribute transform -->
      <p>Max items shown: {{ maxItems }}</p>
    </div>
  `,
})
export class UserProfileComponent implements OnInit {
  /** Simple optional string input with a default value */
  @Input() name: string = 'Anonymous';

  /** Optional number input */
  @Input() age: number = 0;

  /** Required input — Angular CLI will warn if parent forgets this */
  @Input({ required: true }) role!: string;

  /** Boolean input — works with both [isPremium]="true" and isPremium attribute */
  @Input({ transform: booleanAttribute }) isPremium = false;

  /**
   * Number transform — lets you pass a string attribute like maxItems="5"
   * and have it arrive as the number 5.
   */
  @Input({ transform: numberAttribute }) maxItems = 10;

  /** Alias: in the template the parent writes [display-name]="..." */
  @Input({ alias: 'display-name' }) displayName: string = '';

  /** Optional object input */
  @Input() badge?: BadgeConfig;

  /** Boolean with transform — lets parent write just disabled (no value) */
  @Input({ transform: booleanAttribute }) disabled = false;

  ngOnInit() {
    // You can react to initial input values here
    console.log(`UserProfileComponent initialized for: ${this.name}`);
  }
}

// ------------------------------------------------------------------
// Parent Component
// ------------------------------------------------------------------

@Component({
  selector: 'app-input-decorator-demo',
  standalone: true,
  imports: [UserProfileComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>@Input Decorator Demo</h1>

    <!-- Passing primitive values -->
    <app-user-profile
      name="Alice Johnson"
      [age]="28"
      role="Admin"
      [isPremium]="true"
      display-name="alice_j"
      [badge]="aliceBadge"
      [maxItems]="5"
    />

    <hr />

    <!-- Required input only — other fields use defaults -->
    <app-user-profile
      role="Viewer"
    />

    <hr />

    <!-- Disabled account demo -->
    <app-user-profile
      name="Bob Smith"
      role="Editor"
      disabled
    />
  `,
})
export class InputDecoratorDemoComponent {
  aliceBadge: BadgeConfig = { label: 'VIP', color: 'primary' };
}

// ------------------------------------------------------------------
// Usage notes
// ------------------------------------------------------------------

/**
 * To use in a real app:
 *
 * 1. Import UserProfileComponent in your module or component's `imports`
 * 2. Use the selector: <app-user-profile [name]="..." role="..." />
 *
 * Migration to signal inputs (v22 way):
 *   @Input() name = ''       →  name = input<string>('')
 *   @Input({ required }) x  →  x = input.required<T>()
 *   Read as this.name        →  Read as this.name()
 */
