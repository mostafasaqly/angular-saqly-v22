import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="order-card">
      <h3>Order #1042</h3>

      @switch (status()) {
        @case ('pending') {
          <span class="badge yellow">Pending</span>
        }
        @case ('processing') {
          <span class="badge blue">Processing</span>
        }
        @case ('shipped') {
          <span class="badge purple">Shipped</span>
        }
        @case ('delivered') {
          <span class="badge green">Delivered ✓</span>
        }
        @case ('cancelled') {
          <span class="badge red">Cancelled</span>
        }
        @default {
          <span class="badge gray">Unknown</span>
        }
      }

      <div class="controls">
        <button (click)="setStatus('pending')">Pending</button>
        <button (click)="setStatus('processing')">Processing</button>
        <button (click)="setStatus('shipped')">Shipped</button>
        <button (click)="setStatus('delivered')">Delivered</button>
        <button (click)="setStatus('cancelled')">Cancelled</button>
      </div>
    </div>
  `
})
export class SwitchDemoComponent {
  status = signal<OrderStatus>('pending');

  setStatus(s: OrderStatus) {
    this.status.set(s);
  }
}
