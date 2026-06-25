/**
 * Section 9 — Example 01: Built-in Directives (NgClass & NgStyle)
 *
 * Demonstrates:
 *  - NgClass with an object map for conditional CSS classes
 *  - NgStyle with an object map for inline styles
 *  - Driving both from signal-based state
 *
 * Angular v22 · standalone: true · OnPush
 */

import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertKind = 'info' | 'success' | 'warning' | 'error';

interface Alert {
  kind: AlertKind;
  message: string;
  dismissed: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-built-in-directives-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle],

  template: `
    <!-- ── NgClass demo ─────────────────────────────────── -->
    <section>
      <h2>NgClass — Alert Banners</h2>

      @for (alert of alerts(); track alert.message) {
        <div
          [ngClass]="{
            alert: true,
            'alert--info':    alert.kind === 'info',
            'alert--success': alert.kind === 'success',
            'alert--warning': alert.kind === 'warning',
            'alert--error':   alert.kind === 'error',
            'alert--dismissed': alert.dismissed
          }"
        >
          <span class="alert__icon">{{ iconFor(alert.kind) }}</span>
          <span class="alert__message">{{ alert.message }}</span>
          <button class="alert__close" (click)="dismiss(alert)">✕</button>
        </div>
      }

      <button (click)="addRandomAlert()">Add random alert</button>
    </section>

    <!-- ── NgStyle demo ──────────────────────────────────── -->
    <section>
      <h2>NgStyle — Dynamic Color Box</h2>

      <div
        class="color-box"
        [ngStyle]="{
          'background-color': bgColor(),
          'color':            textColor(),
          'font-size.px':     fontSize(),
          'border-radius.px': radius()
        }"
      >
        {{ label() }}
      </div>

      <label>
        Background
        <input
          type="color"
          [value]="bgColor()"
          (input)="bgColor.set(asString($event))"
        />
      </label>

      <label>
        Font size: {{ fontSize() }}px
        <input
          type="range" min="12" max="48"
          [value]="fontSize()"
          (input)="fontSize.set(asNumber($event))"
        />
      </label>

      <label>
        Border radius: {{ radius() }}px
        <input
          type="range" min="0" max="80"
          [value]="radius()"
          (input)="radius.set(asNumber($event))"
        />
      </label>
    </section>
  `,

  styles: [`
    section { margin-bottom: 2rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; }

    /* Alert */
    .alert {
      display: flex; align-items: center; gap: 8px;
      padding: 12px 16px; margin-bottom: 8px;
      border-radius: 6px; border-left: 4px solid transparent;
      transition: opacity 0.3s;
    }
    .alert--info    { background: #eff6ff; border-color: #3b82f6; color: #1e40af; }
    .alert--success { background: #f0fdf4; border-color: #22c55e; color: #166534; }
    .alert--warning { background: #fffbeb; border-color: #f59e0b; color: #92400e; }
    .alert--error   { background: #fef2f2; border-color: #ef4444; color: #991b1b; }
    .alert--dismissed { opacity: 0.3; pointer-events: none; }
    .alert__message { flex: 1; }
    .alert__close { background: none; border: none; cursor: pointer; font-size: 14px; }

    /* Color box */
    .color-box {
      width: 200px; height: 100px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; margin-bottom: 12px;
      transition: all 0.2s;
    }
    label { display: block; margin: 6px 0; font-size: 14px; }
    input[type=range] { width: 200px; }
  `],
})
export class BuiltInDirectivesDemoComponent {
  // ── NgClass state ────────────────────────────────────────

  alerts = signal<Alert[]>([
    { kind: 'info',    message: 'New version available.',         dismissed: false },
    { kind: 'success', message: 'Profile saved successfully.',    dismissed: false },
    { kind: 'warning', message: 'Your session expires in 5 min.', dismissed: false },
    { kind: 'error',   message: 'Failed to load data.',           dismissed: false },
  ]);

  private readonly allKinds: AlertKind[] = ['info', 'success', 'warning', 'error'];
  private msgCount = this.alerts().length;

  addRandomAlert(): void {
    const kind = this.allKinds[Math.floor(Math.random() * this.allKinds.length)];
    this.msgCount++;
    this.alerts.update(list => [
      ...list,
      { kind, message: `Auto-generated alert #${this.msgCount}`, dismissed: false },
    ]);
  }

  dismiss(target: Alert): void {
    this.alerts.update(list =>
      list.map(a => (a === target ? { ...a, dismissed: true } : a))
    );
  }

  iconFor(kind: AlertKind): string {
    return { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' }[kind];
  }

  // ── NgStyle state ────────────────────────────────────────

  bgColor  = signal('#6366f1');
  fontSize = signal(20);
  radius   = signal(8);

  textColor = computed(() => {
    // Simple luminance check — swap text colour based on background
    const hex = this.bgColor().replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#111827' : '#ffffff';
  });

  label = computed(() => `${this.bgColor()} · ${this.fontSize()}px`);

  // ── Helpers ──────────────────────────────────────────────

  asString(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  asNumber(event: Event): number {
    return +(event.target as HTMLInputElement).value;
  }
}
