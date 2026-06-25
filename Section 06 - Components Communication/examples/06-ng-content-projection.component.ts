/**
 * Section 6, Example 6 — Content Projection with ng-content
 *
 * Shows how to use <ng-content> to project arbitrary HTML from a
 * parent component into "slots" inside a child component.
 *
 * Key concepts:
 *  - Single-slot projection: <ng-content />
 *  - Named multi-slot projection: <ng-content select="[slot-name]" />
 *  - Fallback content inside <ng-content>
 *  - Projecting components, not just plain HTML
 *  - Combining ng-content with @if for conditional slots
 */

import {
  Component,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

// ------------------------------------------------------------------
// Example 1 — Simple single-slot card
// ------------------------------------------------------------------

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [class]="'elevation-' + elevation()">
      <!-- Everything the parent puts inside <app-card>...</app-card>
           lands here -->
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  elevation = input<1 | 2 | 3>(1);
}

// ------------------------------------------------------------------
// Example 2 — Named slots modal
// ------------------------------------------------------------------

@Component({
  selector: 'app-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="modal-overlay" (click)="closeOnOverlay($event)">
        <div class="modal" role="dialog">

          <header class="modal-header">
            <!-- Only content with [modal-header] attribute lands here -->
            <ng-content select="[modal-header]">
              <!-- Fallback if parent provides no header slot -->
              <span>Dialog</span>
            </ng-content>
            <button class="modal-close" (click)="closed.emit()">✕</button>
          </header>

          <main class="modal-body">
            <ng-content select="[modal-body]" />
          </main>

          <footer class="modal-footer">
            <!-- Fallback footer if parent doesn't project one -->
            <ng-content select="[modal-footer]">
              <button (click)="closed.emit()">OK</button>
            </ng-content>
          </footer>

        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  closed = output<void>();

  closeOnOverlay(event: MouseEvent) {
    // Only close if clicking the overlay itself, not the modal content
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closed.emit();
    }
  }
}

// ------------------------------------------------------------------
// Example 3 — Tabs with named content slots
// ------------------------------------------------------------------

@Component({
  selector: 'app-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tabs">
      <nav class="tab-nav">
        @for (tab of tabLabels(); track tab; let i = $index) {
          <button
            [class.active]="activeIndex() === i"
            (click)="activeIndex.set(i)"
          >
            {{ tab }}
          </button>
        }
      </nav>

      <div class="tab-content">
        <!--
          Multi-slot projection by index via CSS nth-child selectors
          isn't possible with ng-content — for dynamic tabs you'd use
          a different pattern (QueryList + *ngIf). This shows static slots.
        -->
        <div [hidden]="activeIndex() !== 0">
          <ng-content select="[tab-1]" />
        </div>
        <div [hidden]="activeIndex() !== 1">
          <ng-content select="[tab-2]" />
        </div>
        <div [hidden]="activeIndex() !== 2">
          <ng-content select="[tab-3]" />
        </div>
      </div>
    </div>
  `,
})
export class TabsComponent {
  tabLabels   = input<string[]>([]);
  activeIndex = signal(0);
}

// ------------------------------------------------------------------
// Example 4 — Alert box with icon slot and message slot
// ------------------------------------------------------------------

@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="alert" [class]="'alert-' + type()">
      <span class="alert-icon">
        <!-- Optional custom icon slot; falls back to default -->
        <ng-content select="[alert-icon]">
          @switch (type()) {
            @case ('info')    { ℹ️ }
            @case ('success') { ✅ }
            @case ('warning') { ⚠️ }
            @case ('error')   { ❌ }
          }
        </ng-content>
      </span>
      <div class="alert-content">
        <ng-content />
      </div>
      @if (dismissible()) {
        <button class="alert-dismiss" (click)="dismissed.emit()">✕</button>
      }
    </div>
  `,
})
export class AlertComponent {
  type        = input<'info' | 'success' | 'warning' | 'error'>('info');
  dismissible = input<boolean>(false);
  dismissed   = output<void>();
}

// ------------------------------------------------------------------
// Parent — Demo page using all projections
// ------------------------------------------------------------------

@Component({
  selector: 'app-ng-content-projection-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, ModalComponent, TabsComponent, AlertComponent],
  template: `
    <h1>ng-content Projection Demo</h1>

    <!-- ── Single slot card ── -->
    <h2>Simple Card</h2>
    <app-card [elevation]="2">
      <h3>Card Title</h3>
      <p>Any HTML can go here — the card just wraps it.</p>
      <button>Action</button>
    </app-card>

    <!-- ── Named slot modal ── -->
    <h2>Named Slot Modal</h2>
    <button (click)="showModal.set(true)">Open Modal</button>

    <app-modal [isOpen]="showModal()" (closed)="showModal.set(false)">
      <h2 modal-header>Confirm Action</h2>

      <div modal-body>
        <p>Are you sure you want to proceed?</p>
        <p>This action cannot be undone.</p>
      </div>

      <div modal-footer>
        <button (click)="showModal.set(false)">Cancel</button>
        <button class="primary" (click)="onConfirm()">Confirm</button>
      </div>
    </app-modal>

    <!-- ── Tabs ── -->
    <h2>Tabs</h2>
    <app-tabs [tabLabels]="['Overview', 'Details', 'Settings']">
      <div tab-1>
        <h3>Overview</h3>
        <p>Summary content goes here.</p>
      </div>
      <div tab-2>
        <h3>Details</h3>
        <p>Detailed information goes here.</p>
      </div>
      <div tab-3>
        <h3>Settings</h3>
        <p>Configuration options go here.</p>
      </div>
    </app-tabs>

    <!-- ── Alerts with and without custom icon ── -->
    <h2>Alerts</h2>
    <app-alert type="success" [dismissible]="true" (dismissed)="onDismiss()">
      Your changes have been saved successfully.
    </app-alert>

    <app-alert type="warning">
      <!-- Custom icon slot overrides the default -->
      <span alert-icon>🔔</span>
      Your trial expires in 3 days.
    </app-alert>

    <app-alert type="error">
      Failed to connect to server. Please retry.
    </app-alert>
  `,
})
export class NgContentProjectionDemoComponent {
  showModal = signal(false);

  onConfirm() {
    console.log('Confirmed!');
    this.showModal.set(false);
  }

  onDismiss() {
    console.log('Alert dismissed');
  }
}
