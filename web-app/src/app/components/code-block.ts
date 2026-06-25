import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { highlight } from '../utils/highlight';

@Component({
  selector: 'app-code-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-lang">TypeScript / Angular</span>
        <button class="copy-btn" [class.copied]="copied()" (click)="copy()">
          {{ copied() ? '✓ Copied' : 'Copy' }}
        </button>
      </div>
      <pre><code [innerHTML]="highlighted()"></code></pre>
    </div>
  `,
})
export class CodeBlockComponent {
  readonly code = input('');

  readonly copied      = signal(false);
  readonly highlighted = computed(() => highlight(this.code()));

  copy() {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
