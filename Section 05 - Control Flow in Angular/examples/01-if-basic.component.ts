import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-if-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="toggle()">Toggle</button>

    @if (isVisible()) {
      <p>This content is visible!</p>
    }

    @if (score() >= 60) {
      <span class="badge pass">PASS</span>
    } @else {
      <span class="badge fail">FAIL</span>
    }

    @if (role() === 'admin') {
      <nav>Admin Navigation</nav>
    } @else if (role() === 'editor') {
      <nav>Editor Navigation</nav>
    } @else {
      <nav>Guest Navigation</nav>
    }
  `
})
export class IfBasicComponent {
  isVisible = signal(true);
  score = signal(75);
  role = signal<'admin' | 'editor' | 'guest'>('guest');

  toggle() {
    this.isVisible.update(v => !v);
  }
}
