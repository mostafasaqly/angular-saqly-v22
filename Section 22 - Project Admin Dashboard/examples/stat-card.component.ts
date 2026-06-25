// stat-card.component.ts
// Reusable statistics card for the dashboard home page

import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardTrend = 'up' | 'down' | 'neutral';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-card" [style.--accent]="accentColor()">
      <div class="stat-card__icon">{{ icon() }}</div>

      <div class="stat-card__body">
        <p class="stat-card__label">{{ label() }}</p>
        <p class="stat-card__value">{{ formattedValue() }}</p>

        @if (change() !== undefined) {
          <p class="stat-card__change" [class]="'stat-card__change--' + trend()">
            {{ trendIcon() }} {{ change() }}% vs last month
          </p>
        }
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      gap: 16px;
      align-items: flex-start;
      box-shadow: 0 1px 3px rgba(0,0,0,0.07);
      border-left: 4px solid var(--accent, #6366f1);
      transition: box-shadow 0.2s;
    }

    .stat-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .stat-card__icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .stat-card__body {
      flex: 1;
    }

    .stat-card__label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin: 0 0 4px;
    }

    .stat-card__value {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 6px;
    }

    .stat-card__change {
      font-size: 0.75rem;
      margin: 0;
    }

    .stat-card__change--up    { color: #16a34a; }
    .stat-card__change--down  { color: #dc2626; }
    .stat-card__change--neutral { color: #64748b; }
  `]
})
export class StatCardComponent {
  // Required inputs
  readonly label  = input.required<string>();
  readonly value  = input.required<number>();
  readonly icon   = input.required<string>();

  // Optional inputs
  readonly prefix      = input<string>('');
  readonly suffix      = input<string>('');
  readonly change      = input<number | undefined>(undefined);
  readonly trend       = input<CardTrend>('neutral');
  readonly accentColor = input<string>('#6366f1');

  readonly formattedValue = computed(
    () => `${this.prefix()}${this.value().toLocaleString()}${this.suffix()}`
  );

  readonly trendIcon = computed(() => {
    const t = this.trend();
    if (t === 'up')   return '▲';
    if (t === 'down') return '▼';
    return '—';
  });
}


// -----------------------------------------------------------------------
// Example usage in dashboard-home.component.ts
// -----------------------------------------------------------------------
// <div class="stats-grid">
//   <app-stat-card
//     label="Total Products"
//     [value]="stats().totalProducts"
//     icon="📦"
//     [change]="12"
//     trend="up"
//     accentColor="#6366f1"
//   />
//   <app-stat-card
//     label="Total Revenue"
//     [value]="stats().totalRevenue"
//     icon="💰"
//     prefix="$"
//     [change]="8"
//     trend="up"
//     accentColor="#10b981"
//   />
//   <app-stat-card
//     label="Total Orders"
//     [value]="stats().totalOrders"
//     icon="🛒"
//     [change]="3"
//     trend="down"
//     accentColor="#f59e0b"
//   />
//   <app-stat-card
//     label="Active Users"
//     [value]="stats().activeUsers"
//     icon="👥"
//     trend="neutral"
//     accentColor="#3b82f6"
//   />
// </div>
