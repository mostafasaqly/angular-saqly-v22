/**
 * Example 06 — Data Binding Overview
 * -------------------------------------------------------
 * Demonstrates all four types of data binding in Angular v22
 * in a single component, side by side.
 *
 *  1. Interpolation      {{ expression }}
 *  2. Property Binding   [property]="expression"
 *  3. Event Binding      (event)="handler()"
 *  4. Two-Way Binding    [(ngModel)]="value"
 *
 * This component serves as a quick reference card.
 * Each binding type is explored in depth in Section 4.
 */

import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binding-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <div class="demo">
      <h2>Angular Data Binding Overview</h2>

      <!-- ═══════════════════════════════════════════════════
           1. INTERPOLATION — {{ }}
           Direction: Class → Template (as text)
           Use for: rendering values as text content
           ═══════════════════════════════════════════════════ -->

      <section>
        <h3>1. Interpolation <code>{{ '{{' }} expression {{ '}}' }}</code></h3>
        <p>Name: {{ name() }}</p>
        <p>Count: {{ count() }}</p>
        <p>Double: {{ count() * 2 }}</p>
        <p>Is positive: {{ count() > 0 }}</p>
        <p>Greeting: {{ 'Hello, ' + name() + '!' }}</p>
      </section>

      <!-- ═══════════════════════════════════════════════════
           2. PROPERTY BINDING — [property]="expression"
           Direction: Class → Template (as DOM property)
           Use for: setting DOM properties, component @Inputs
           ═══════════════════════════════════════════════════ -->

      <section>
        <h3>2. Property Binding <code>[property]="expr"</code></h3>

        <!-- Sets the 'src' DOM property of the <img> element -->
        <img [src]="avatarUrl()" [alt]="name() + ' avatar'" width="48" height="48" />

        <!-- Sets the 'disabled' DOM property of <button> -->
        <button [disabled]="isSubmitting()">
          {{ isSubmitting() ? 'Saving...' : 'Save' }}
        </button>

        <!-- Sets the 'href' property (attribute binding with attr.) -->
        <a [attr.href]="profileUrl()">View Profile</a>

        <!-- Sets 'title' attribute — use [attr.title] for non-property attributes -->
        <span [attr.title]="tooltipText()">Hover over me</span>
      </section>

      <!-- ═══════════════════════════════════════════════════
           3. EVENT BINDING — (event)="handler()"
           Direction: Template → Class
           Use for: reacting to DOM events (click, input, submit...)
           ═══════════════════════════════════════════════════ -->

      <section>
        <h3>3. Event Binding <code>(event)="fn()"</code></h3>

        <!-- Simple click event -->
        <button (click)="increment()">Increment ({{ count() }})</button>
        <button (click)="decrement()">Decrement</button>
        <button (click)="reset()">Reset</button>

        <!-- Passing $event — the native DOM Event object -->
        <input
          placeholder="Type here..."
          (input)="onInput($event)"
        />
        <p>Last typed: <em>{{ lastInput() }}</em></p>

        <!-- Key combination event -->
        <input
          placeholder="Press Enter to submit"
          (keydown.enter)="onEnterKey()"
        />
        <p>Enter key presses: {{ enterCount() }}</p>
      </section>

      <!-- ═══════════════════════════════════════════════════
           4. TWO-WAY BINDING — [(ngModel)]="value"
           Direction: Both — class ↔ template
           Use for: form inputs where you need sync in both directions
           NOTE: In Angular v22, prefer Signal Forms for real forms.
                 ngModel is useful for simple, non-form bindings.
           ═══════════════════════════════════════════════════ -->

      <section>
        <h3>4. Two-Way Binding <code>[(ngModel)]="prop"</code></h3>

        <!-- ngModel requires FormsModule in imports -->
        <input [(ngModel)]="searchTerm" placeholder="Search..." />
        <p>You searched for: <strong>{{ searchTerm }}</strong></p>

        <!-- Two-way binding desugared — equivalent to the above: -->
        <!-- <input [ngModel]="searchTerm" (ngModelChange)="searchTerm = $event" /> -->

        <textarea [(ngModel)]="notes" rows="3" placeholder="Take notes..."></textarea>
        <p>Notes length: {{ notes.length }} characters</p>
      </section>

      <!-- ═══════════════════════════════════════════════════
           SUMMARY TABLE
           ═══════════════════════════════════════════════════ -->

      <section class="summary">
        <h3>Quick Reference</h3>
        <table>
          <thead>
            <tr>
              <th>Syntax</th>
              <th>Type</th>
              <th>Direction</th>
              <th>Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>{{ '{{' }} expr {{ '}}' }}</code></td>
              <td>Interpolation</td>
              <td>Class → Template</td>
              <td>Text content</td>
            </tr>
            <tr>
              <td><code>[prop]="expr"</code></td>
              <td>Property</td>
              <td>Class → Template</td>
              <td>DOM properties & @Inputs</td>
            </tr>
            <tr>
              <td><code>(event)="fn()"</code></td>
              <td>Event</td>
              <td>Template → Class</td>
              <td>DOM events</td>
            </tr>
            <tr>
              <td><code>[(ngModel)]="v"</code></td>
              <td>Two-way</td>
              <td>Both ↔</td>
              <td>Simple form inputs</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .demo { font-family: 'Segoe UI', sans-serif; max-width: 640px; padding: 1rem; }
    h2 { color: #3f51b5; }
    h3 { color: #424242; margin-top: 1.5rem; border-bottom: 1px solid #e0e0e0; padding-bottom: 0.4rem; }
    section { margin-bottom: 1.5rem; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
    button { margin: 0 0.25rem; padding: 0.3rem 0.8rem; cursor: pointer; }
    input, textarea { display: block; margin: 0.5rem 0; padding: 0.4rem 0.6rem; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
    img { border-radius: 50%; border: 2px solid #3f51b5; }
    table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
    th, td { border: 1px solid #e0e0e0; padding: 0.4rem 0.75rem; text-align: left; }
    th { background: #e8eaf6; }
    .summary { background: #fafafa; padding: 1rem; border-radius: 6px; }
  `],
})
export class BindingOverviewComponent {
  // ── Signals for interpolation and property binding ──
  name = signal('Angular Developer');
  count = signal(0);
  avatarUrl = signal('https://api.dicebear.com/7.x/initials/svg?seed=AD');
  isSubmitting = signal(false);
  profileUrl = computed(() => `https://example.com/user/${this.name()}`);
  tooltipText = computed(() => `Profile of ${this.name()}`);

  // ── Signals for event binding ──
  lastInput = signal('');
  enterCount = signal(0);

  // ── Plain properties for two-way binding (ngModel) ──
  // ngModel works with plain class properties (not just signals)
  searchTerm = '';
  notes = '';

  // ── Event handlers ──
  increment(): void {
    this.count.update(n => n + 1);
  }

  decrement(): void {
    this.count.update(n => n - 1);
  }

  reset(): void {
    this.count.set(0);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.lastInput.set(value);
  }

  onEnterKey(): void {
    this.enterCount.update(n => n + 1);
  }

  // ── Simulate form submit ──
  submitForm(): void {
    this.isSubmitting.set(true);
    setTimeout(() => this.isSubmitting.set(false), 2000);
  }
}
