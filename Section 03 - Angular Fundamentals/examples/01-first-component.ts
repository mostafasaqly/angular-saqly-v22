/**
 * Example 01 — First Component
 * -------------------------------------------------------
 * The absolute minimum you need to create a working
 * Angular v22 standalone component.
 *
 * Key concepts:
 *  - @Component decorator
 *  - standalone: true (no NgModule required)
 *  - ChangeDetectionStrategy.OnPush (v22 default)
 *  - signal() for reactive state
 *  - Inline template + inline styles
 *
 * To use in a parent template: <app-hello />
 * To bootstrap as root: bootstrapApplication(HelloComponent)
 */

import {
  Component,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
    <div class="greeting">
      <h1>Hello, {{ name() }}!</h1>
      <p>This is your first Angular v22 component.</p>
      <button (click)="changeName()">Change Name</button>
    </div>
  `,

  styles: [`
    .greeting {
      font-family: 'Segoe UI', sans-serif;
      text-align: center;
      padding: 2rem;
    }

    h1 {
      color: #3f51b5;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1.5rem;
      background: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #303f9f;
    }
  `],
})
export class HelloComponent {
  // signal() creates a reactive piece of state.
  // Reading it in the template: {{ name() }}  (call it like a function)
  // Writing it: this.name.set('new value') or this.name.update(v => ...)
  name = signal('Angular v22');

  readonly names = ['Alice', 'Bob', 'Carol', 'Angular v22'];
  private nameIndex = 0;

  changeName(): void {
    this.nameIndex = (this.nameIndex + 1) % this.names.length;
    this.name.set(this.names[this.nameIndex]);
  }
}
