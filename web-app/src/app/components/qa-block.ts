import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

function scoreAnswer(userAns: string, correctAns: string): number {
  const normalize = (s: string) => s.toLowerCase().replace(/[^؀-ۿa-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const correct = normalize(correctAns);
  const user = normalize(userAns);
  if (!correct.length || !user.length) return 0;
  const hits = correct.filter(w => user.includes(w)).length;
  return Math.min(100, Math.round((hits / Math.min(correct.length, 8)) * 100));
}

@Component({
  selector: 'app-qa-block',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="qa-block">
      <div class="qa-question" (click)="toggle()">
        <span class="qa-icon">✍️</span>
        <span>{{ question }}</span>
      </div>

      @if (open()) {
        <div class="qa-body">
          @if (mode() === 'writing' || mode() === 'checked' || mode() === 'revealed') {
            <textarea
              class="qa-textarea"
              [(ngModel)]="userAnswer"
              placeholder="اكتب إجابتك هنا…"
              [disabled]="mode() === 'revealed'"
            ></textarea>
          }

          @if (mode() === 'checked' || mode() === 'revealed') {
            <div class="qa-score" [class]="scoreClass()">
              {{ scoreLabel() }} — {{ score() }}%
            </div>
          }

          @if (mode() === 'revealed') {
            <div class="qa-answer">
              <strong>الإجابة الصحيحة:</strong><br>{{ answer }}
            </div>
          }

          <div class="qa-actions">
            @if (mode() === 'writing') {
              <button class="qa-btn qa-btn-check" (click)="check()">تحقق</button>
              <button class="qa-btn qa-btn-reveal" (click)="reveal()">أظهر الإجابة</button>
            }
            @if (mode() === 'checked' && score() < 70) {
              <button class="qa-btn qa-btn-reveal" (click)="reveal()">أظهر الإجابة الصحيحة</button>
            }
            @if (mode() === 'checked' || mode() === 'revealed') {
              <button class="qa-btn qa-btn-reveal" (click)="reset()">إعادة المحاولة</button>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class QABlockComponent {
  @Input() question = '';
  @Input() answer = '';

  open = signal(false);
  mode = signal<'writing'|'checked'|'revealed'>('writing');
  score = signal(0);
  userAnswer = '';

  toggle() {
    this.open.update(v => !v);
  }

  check() {
    this.score.set(scoreAnswer(this.userAnswer, this.answer));
    this.mode.set('checked');
  }

  reveal() { this.mode.set('revealed'); }

  reset() {
    this.userAnswer = '';
    this.score.set(0);
    this.mode.set('writing');
  }

  scoreClass() {
    const s = this.score();
    if (s >= 70) return 'high';
    if (s >= 40) return 'mid';
    return 'low';
  }

  scoreLabel() {
    const s = this.score();
    if (s >= 70) return 'ممتاز 🎉';
    if (s >= 40) return 'جيد، راجع الإجابة';
    return 'راجع الإجابة';
  }
}
