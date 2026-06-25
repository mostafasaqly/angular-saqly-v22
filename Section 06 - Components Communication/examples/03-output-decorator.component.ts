/**
 * Section 6, Example 3 — @Output Decorator + EventEmitter vs output()
 *
 * Shows both the classic @Output/EventEmitter pattern and the new
 * Angular v22 output() function side by side.
 *
 * Key concepts:
 *  - @Output() + EventEmitter<T> — classic, still 100% valid
 *  - output<T>() — v22 preferred; leaner, better tree-shaking
 *  - Emitting primitive values, objects, and void events
 *  - Event binding in the parent: (eventName)="handler($event)"
 *  - $event carries the emitted value
 */

import {
  Component,
  Output,
  EventEmitter,
  output,
  input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

// ------------------------------------------------------------------
// Shared types
// ------------------------------------------------------------------

export interface RatingEvent {
  itemId: number;
  stars: number;
  comment?: string;
}

// ------------------------------------------------------------------
// CLASSIC: @Output + EventEmitter
// ------------------------------------------------------------------

@Component({
  selector: 'app-rating-classic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rating">
      <p>Rate this item (classic @Output):</p>

      @for (star of stars; track star) {
        <button
          (click)="setRating(star)"
          [class.active]="star <= currentRating"
        >
          ★
        </button>
      }

      <!-- Emit a void event (no payload) -->
      <button (click)="cleared.emit()">Clear</button>

      <!-- Emit an object payload -->
      <button (click)="submitRating()">Submit</button>
    </div>
  `,
})
export class RatingClassicComponent {
  @Output() ratingSelected = new EventEmitter<number>();     // primitive payload
  @Output() ratingSubmitted = new EventEmitter<RatingEvent>(); // object payload
  @Output() cleared = new EventEmitter<void>();              // no payload

  // Also works with an alias: parent binds to (rating-change)
  @Output('rating-change') ratingChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];
  currentRating = 0;

  // Input from parent — note we still use @Input here for the classic example
  itemId = 0;

  setRating(star: number) {
    this.currentRating = star;
    this.ratingSelected.emit(star);    // emit primitive
    this.ratingChange.emit(star);      // aliased output
  }

  submitRating() {
    this.ratingSubmitted.emit({        // emit object
      itemId: this.itemId,
      stars: this.currentRating,
    });
  }
}

// ------------------------------------------------------------------
// MODERN: output() function (Angular v22)
// ------------------------------------------------------------------

@Component({
  selector: 'app-rating-modern',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rating">
      <p>Rate this item (v22 output()):</p>

      @for (star of stars; track star) {
        <button
          (click)="setRating(star)"
          [class.active]="star <= currentRating"
        >
          ★
        </button>
      }

      <button (click)="cleared.emit()">Clear</button>
      <button (click)="submitRating()">Submit</button>
    </div>
  `,
})
export class RatingModernComponent {
  // output<T>() — v22 syntax
  ratingSelected  = output<number>();
  ratingSubmitted = output<RatingEvent>();
  cleared         = output<void>();

  // Signal input for the item id
  itemId = input.required<number>();

  stars = [1, 2, 3, 4, 5];
  currentRating = 0;

  setRating(star: number) {
    this.currentRating = star;
    this.ratingSelected.emit(star);
  }

  submitRating() {
    this.ratingSubmitted.emit({
      itemId: this.itemId(),     // read signal input with ()
      stars: this.currentRating,
    });
  }
}

// ------------------------------------------------------------------
// Parent component listening to both
// ------------------------------------------------------------------

@Component({
  selector: 'app-output-decorator-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RatingClassicComponent, RatingModernComponent],
  template: `
    <h1>@Output & EventEmitter vs output()</h1>

    <h2>Classic @Output</h2>
    <app-rating-classic
      (ratingSelected)="onRatingSelected($event)"
      (ratingSubmitted)="onRatingSubmitted($event)"
      (cleared)="onCleared()"
    />

    <h2>Modern output() (v22)</h2>
    <app-rating-modern
      [itemId]="42"
      (ratingSelected)="onRatingSelected($event)"
      (ratingSubmitted)="onRatingSubmitted($event)"
      (cleared)="onCleared()"
    />

    <div class="log">
      <h3>Event Log</h3>
      @for (entry of log(); track $index) {
        <p>{{ entry }}</p>
      } @empty {
        <p>No events yet. Rate something above!</p>
      }
    </div>
  `,
})
export class OutputDecoratorDemoComponent {
  log = signal<string[]>([]);

  onRatingSelected(stars: number) {
    this.log.update(l => [`Selected: ${stars} stars`, ...l]);
  }

  onRatingSubmitted(event: RatingEvent) {
    this.log.update(l => [
      `Submitted: item #${event.itemId} got ${event.stars} stars`,
      ...l,
    ]);
  }

  onCleared() {
    this.log.update(l => ['Rating cleared', ...l]);
  }
}

// ------------------------------------------------------------------
// Summary: @Output vs output()
// ------------------------------------------------------------------

/**
 * @Output() x = new EventEmitter<T>()  |  x = output<T>()
 * ─────────────────────────────────────────────────────────
 * Emit:       this.x.emit(value)        |  this.x.emit(value)
 * Parent:     (x)="fn($event)"          |  (x)="fn($event)"
 * Alias:      @Output('a') x            |  x = output<T>({ alias: 'a' })
 * Observable: x.asObservable()          |  Not directly observable
 * Tree-shake: Heavier (includes RxJS)   |  Leaner
 * Preference: Legacy / libraries        |  New code in v22
 */
