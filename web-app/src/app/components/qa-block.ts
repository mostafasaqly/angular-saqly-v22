import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

function scoreAnswer(userAns: string, correctAns: string): number {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^؀-ۿa-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const correct = normalize(correctAns);
  const user    = normalize(userAns);
  if (!correct.length || !user.length) return 0;
  const hits = correct.filter(w => user.includes(w)).length;
  return Math.min(100, Math.round((hits / Math.min(correct.length, 8)) * 100));
}

@Component({
  selector: 'app-qa-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <div class="qa-block">
      <div class="qa-question" (click)="open.update(v => !v)">
        <span class="qa-icon">✍️</span>
        <span>{{ question() }}</span>
      </div>

      @if (open()) {
        <div class="qa-body">
          @if (mode() === 'writing' || mode() === 'checked' || mode() === 'revealed') {
            <textarea
              class="qa-textarea"
              [(ngModel)]="userAnswer"
              [placeholder]="isAr() ? 'اكتب إجابتك هنا…' : 'Write your answer here…'"
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
              <strong>{{ isAr() ? 'الإجابة الصحيحة:' : 'Correct answer:' }}</strong><br>{{ answer() }}
            </div>
          }

          <div class="qa-actions">
            @if (mode() === 'writing') {
              <button class="qa-btn qa-btn-check"  (click)="check()">
                {{ isAr() ? 'تحقق' : 'Check' }}
              </button>
              <button class="qa-btn qa-btn-reveal" (click)="reveal()">
                {{ isAr() ? 'أظهر الإجابة' : 'Show answer' }}
              </button>
            }
            @if (mode() === 'checked' && score() < 70) {
              <button class="qa-btn qa-btn-reveal" (click)="reveal()">
                {{ isAr() ? 'أظهر الإجابة الصحيحة' : 'Show correct answer' }}
              </button>
            }
            @if (mode() === 'checked' || mode() === 'revealed') {
              <button class="qa-btn qa-btn-reveal" (click)="reset()">
                {{ isAr() ? 'إعادة المحاولة' : 'Try again' }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class QABlockComponent {
  readonly question = input('');
  readonly answer   = input('');
  readonly isAr     = input(true);

  readonly open  = signal(false);
  readonly mode  = signal<'writing' | 'checked' | 'revealed'>('writing');
  readonly score = signal(0);
  userAnswer = '';

  check()  { this.score.set(scoreAnswer(this.userAnswer, this.answer())); this.mode.set('checked'); }
  reveal() { this.mode.set('revealed'); }
  reset()  { this.userAnswer = ''; this.score.set(0); this.mode.set('writing'); }

  scoreClass() {
    const s = this.score();
    return s >= 70 ? 'high' : s >= 40 ? 'mid' : 'low';
  }

  scoreLabel() {
    const s  = this.score();
    const ar = this.isAr();
    if (s >= 70) return ar ? 'ممتاز 🎉' : 'Excellent 🎉';
    if (s >= 40) return ar ? 'جيد، راجع الإجابة' : 'Good, review the answer';
    return ar ? 'راجع الإجابة' : 'Review the answer';
  }
}
