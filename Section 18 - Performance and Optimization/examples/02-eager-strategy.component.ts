/**
 * Section 18 — Example 02: Eager (formerly "Default") Change Detection Strategy
 *
 * ChangeDetectionStrategy.Default is called "Eager" in Angular v22 docs.
 * This strategy re-checks the component on EVERY change detection cycle,
 * regardless of whether its inputs changed.
 *
 * Use Eager when:
 *   - Integrating a third-party library that mutates data outside Angular's
 *     Signal system and doesn't emit Angular events.
 *   - Migrating legacy code that uses mutable objects (not signals).
 *   - You need a component to re-render on every cycle (rare edge case).
 *
 * In new Angular v22 code, you should almost never use Eager.
 * If you need it, reconsider whether your state should be in a signal().
 */

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

// ---------------------------------------------------------------------------
// Example A: Legitimate use of Eager — third-party library integration
// ---------------------------------------------------------------------------

// Simulated third-party chart library that mutates an object directly
// (does not use Angular signals or events)
declare const ThirdPartyChart: {
  init(canvas: HTMLCanvasElement, data: ChartData): void;
  getData(): ChartData;
  onDataChange(cb: () => void): void;
};

interface ChartData {
  labels: string[];
  values: number[];
}

@Component({
  selector: 'app-chart-wrapper',
  standalone: true,
  // Eager because ThirdPartyChart mutates data outside Angular's awareness.
  // Zone.js (in non-Zoneless setups) would catch the async callbacks.
  // In Zoneless + no Signals, Eager is the safe fallback.
  changeDetection: ChangeDetectionStrategy.Default, // Eager
  template: `
    <div class="chart-container">
      <h3>Third-Party Chart (Eager CD)</h3>
      <canvas #chartCanvas width="400" height="200"></canvas>
      <p class="note">
        This component uses Eager (Default) change detection because the
        third-party chart library mutates state outside Angular's Signal system.
      </p>
    </div>
  `,
})
export class ChartWrapperComponent implements OnInit, OnDestroy {
  private cleanup?: () => void;

  ngOnInit(): void {
    // Third-party library mutates data directly — no Angular signals involved.
    // Angular must check this component on every cycle to catch changes.
    // ThirdPartyChart.onDataChange(() => {
    //   // Chart mutated its internal data — Angular needs to re-check the template.
    //   // With OnPush, this would NOT trigger a re-check (no signal changed).
    //   // With Eager, it will be checked on the next cycle automatically.
    // });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}

// ---------------------------------------------------------------------------
// Example B: Anti-pattern to AVOID — using Eager because of an impure function
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-clock-bad',
  standalone: true,
  imports: [DatePipe],
  // BAD: Using Eager just to make an impure function re-evaluate.
  // This forces Angular to check this component on EVERY global CD cycle.
  changeDetection: ChangeDetectionStrategy.Default, // Eager — avoid this!
  template: `
    <!--
      BAD: getCurrentTime() is called on every single CD cycle.
      With Eager CD, every event anywhere in the app re-evaluates this function.
    -->
    <p>Current time (BAD): {{ getCurrentTime() }}</p>
  `,
})
export class ClockBadComponent {
  getCurrentTime(): string {
    // This is an impure function — it returns a different value every millisecond.
    // Calling it in a template with Eager CD is a performance anti-pattern.
    return new Date().toLocaleTimeString();
  }
}

// ---------------------------------------------------------------------------
// Example C: The CORRECT way — use a signal with setInterval
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-clock-good',
  standalone: true,
  imports: [DatePipe],
  // GOOD: OnPush — Angular only re-checks when the signal changes.
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--
      GOOD: currentTime() is a signal. Angular updates only this component
      when the signal emits, once per second — not on every global CD cycle.
    -->
    <p>Current time (GOOD): {{ currentTime() | date:'HH:mm:ss' }}</p>
  `,
})
export class ClockGoodComponent implements OnInit, OnDestroy {
  // Signal holds the current time — updated once per second via setInterval.
  // In a Zoneless app, updating a signal schedules a targeted re-render.
  readonly currentTime = signal(new Date());

  private intervalId?: ReturnType<typeof setInterval>;

  // We need to import signal from @angular/core
  constructor() {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentTime.set(new Date());
      // Angular sees the signal changed → schedules re-render for THIS component only.
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

// Need to add signal import — fix the constructor to use inject pattern
import { signal, inject, DestroyRef } from '@angular/core';
