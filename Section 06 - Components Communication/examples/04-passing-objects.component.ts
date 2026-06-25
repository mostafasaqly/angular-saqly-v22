/**
 * Section 6, Example 4 — Passing Objects Between Components
 *
 * Demonstrates how to pass complex typed objects between components,
 * handle immutability correctly with OnPush, and emit object payloads.
 *
 * Key concepts:
 *  - Shared interfaces imported by both parent and child
 *  - OnPush + immutable updates (spread operator / Array.map)
 *  - Emitting complex objects as event payloads
 *  - Typed $event in the parent handler
 *  - Reading nested object properties in templates
 */

import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

// ------------------------------------------------------------------
// Shared domain models
// ------------------------------------------------------------------

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customer: string;
  status: OrderStatus;
  createdAt: Date;
  shippingAddress: Address;
  items: OrderItem[];
}

export interface StatusChangeEvent {
  orderId: number;
  previousStatus: OrderStatus;
  newStatus: OrderStatus;
  changedAt: Date;
}

// ------------------------------------------------------------------
// OrderItemRow — deeply nested child
// ------------------------------------------------------------------

@Component({
  selector: 'app-order-item-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <tr>
      <td>{{ item().name }}</td>
      <td>{{ item().qty }}</td>
      <td>{{ item().unitPrice | currency }}</td>
      <td>{{ lineTotal() | currency }}</td>
    </tr>
  `,
})
export class OrderItemRowComponent {
  item = input.required<OrderItem>();

  // Computed from an object signal input
  lineTotal = computed(() => this.item().qty * this.item().unitPrice);
}

// ------------------------------------------------------------------
// OrderCard — middle child that receives Order and emits status change
// ------------------------------------------------------------------

@Component({
  selector: 'app-order-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe, OrderItemRowComponent],
  template: `
    <div class="order-card" [class]="'status-' + order().status">
      <header>
        <h3>Order #{{ order().id }}</h3>
        <span class="status-badge">{{ order().status | titlecase }}</span>
      </header>

      <p>Customer: <strong>{{ order().customer }}</strong></p>
      <p>Date: {{ order().createdAt | date:'mediumDate' }}</p>

      <address>
        {{ order().shippingAddress.street }}<br />
        {{ order().shippingAddress.city }},
        {{ order().shippingAddress.state }}
        {{ order().shippingAddress.zip }}
      </address>

      <table>
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
        </thead>
        <tbody>
          @for (item of order().items; track item.productId) {
            <app-order-item-row [item]="item" />
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Order Total</strong></td>
            <td><strong>{{ orderTotal() | currency }}</strong></td>
          </tr>
        </tfoot>
      </table>

      <div class="actions">
        @if (order().status === 'pending') {
          <button (click)="changeStatus('processing')">Mark Processing</button>
        }
        @if (order().status === 'processing') {
          <button (click)="changeStatus('shipped')">Mark Shipped</button>
        }
        @if (order().status === 'shipped') {
          <button (click)="changeStatus('delivered')">Mark Delivered</button>
        }
        @if (order().status !== 'cancelled' && order().status !== 'delivered') {
          <button class="danger" (click)="changeStatus('cancelled')">Cancel</button>
        }
      </div>
    </div>
  `,
})
export class OrderCardComponent {
  order = input.required<Order>();
  statusChanged = output<StatusChangeEvent>();

  orderTotal = computed(() =>
    this.order().items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  );

  changeStatus(newStatus: OrderStatus) {
    const current = this.order();
    this.statusChanged.emit({
      orderId: current.id,
      previousStatus: current.status,
      newStatus,
      changedAt: new Date(),
    });
  }
}

// ------------------------------------------------------------------
// OrderListPage — smart parent that holds state
// ------------------------------------------------------------------

@Component({
  selector: 'app-passing-objects-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrderCardComponent, DatePipe],
  template: `
    <h1>Order Management</h1>

    <p>Total orders: {{ orders().length }}</p>
    <p>Pending: {{ pendingCount() }}</p>

    @for (order of orders(); track order.id) {
      <app-order-card
        [order]="order"
        (statusChanged)="onStatusChanged($event)"
      />
    }

    <div class="event-log">
      <h2>Status Change Log</h2>
      @for (entry of changeLog(); track $index) {
        <p>
          Order #{{ entry.orderId }}:
          {{ entry.previousStatus }} → {{ entry.newStatus }}
          ({{ entry.changedAt | date:'shortTime' }})
        </p>
      } @empty {
        <p>No status changes yet.</p>
      }
    </div>
  `,
})
export class PassingObjectsDemoComponent {
  orders = signal<Order[]>([
    {
      id: 1001,
      customer: 'Alice Johnson',
      status: 'pending',
      createdAt: new Date('2026-06-20'),
      shippingAddress: { street: '123 Main St', city: 'Austin', state: 'TX', zip: '78701' },
      items: [
        { productId: 1, name: 'Laptop', qty: 1, unitPrice: 999 },
        { productId: 2, name: 'Mouse',  qty: 2, unitPrice: 29 },
      ],
    },
    {
      id: 1002,
      customer: 'Bob Smith',
      status: 'processing',
      createdAt: new Date('2026-06-21'),
      shippingAddress: { street: '456 Oak Ave', city: 'Portland', state: 'OR', zip: '97201' },
      items: [
        { productId: 3, name: 'Keyboard', qty: 1, unitPrice: 149 },
      ],
    },
  ]);

  changeLog = signal<StatusChangeEvent[]>([]);

  // Computed from the orders signal
  pendingCount = computed(() =>
    this.orders().filter(o => o.status === 'pending').length
  );

  /**
   * KEY PATTERN: Immutable update with OnPush
   *
   * We NEVER do: order.status = newStatus  ← mutation, OnPush won't see it
   * We ALWAYS: replace the array + the changed object with new references
   */
  onStatusChanged(event: StatusChangeEvent) {
    this.orders.update(orders =>
      orders.map(order =>
        order.id === event.orderId
          ? { ...order, status: event.newStatus }   // new object reference
          : order                                    // unchanged reference
      )
    );

    this.changeLog.update(log => [event, ...log]);
  }
}
