import { Component, input, output, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading()"
      [attr.aria-disabled]="disabled()"
      class="btn"
      [class]="'btn--' + variant()"
      (click)="clicked.emit()"
    >
      @if (loading()) {
        <span class="spinner" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
      } @else {
        <ng-content />
      }
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      border-radius: var(--radius-md, 8px);
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity 150ms ease;
    }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn:focus-visible {
      outline: 2px solid var(--color-primary, #4f46e5);
      outline-offset: 2px;
    }
    .btn--primary { background: var(--color-primary, #4f46e5); color: white; }
    .btn--secondary { background: transparent; border: 1px solid currentColor; }
    .btn--danger { background: var(--color-error, #dc2626); color: white; }
    .spinner {
      width: 16px; height: 16px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 600ms linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); border: 0;
    }
  `]
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  disabled = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });
  clicked = output<void>();
}
