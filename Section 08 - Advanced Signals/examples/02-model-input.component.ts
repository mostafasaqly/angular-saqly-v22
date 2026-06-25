import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';

// Child component — owns the checked state, exposes it for two-way binding
@Component({
  selector: 'app-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="toggle"
      [class.active]="checked()"
      (click)="toggle()"
      [attr.aria-pressed]="checked()"
    >
      <span class="knob"></span>
    </button>
  `
})
export class ToggleComponent {
  checked = model(false);  // creates input + "checkedChange" output

  toggle() {
    this.checked.update(v => !v);
  }
}

// Parent component — two-way binds to the toggle
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>Dark Mode</label>
    <app-toggle [(checked)]="darkMode" />
    <p>Dark mode is: {{ darkMode() ? 'on' : 'off' }}</p>

    <label>Notifications</label>
    <app-toggle [(checked)]="notifications" />
    <p>Notifications: {{ notifications() ? 'enabled' : 'disabled' }}</p>
  `
})
export class SettingsComponent {
  darkMode = signal(false);
  notifications = signal(true);
}
