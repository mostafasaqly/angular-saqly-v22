import { Component, Input, signal, computed } from '@angular/core';
import { highlight } from '../utils/highlight';

@Component({
  selector: 'app-code-block',
  standalone: true,
  template: `
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-lang">TypeScript / Angular</span>
        <button class="copy-btn" [class.copied]="copied()" (click)="copy()">
          {{ copied() ? '✓ تم النسخ' : 'نسخ' }}
        </button>
      </div>
      <pre><code [innerHTML]="highlighted()"></code></pre>
    </div>
  `
})
export class CodeBlockComponent {
  @Input() code = '';
  copied = signal(false);

  highlighted = computed(() => highlight(this.code));

  copy() {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
