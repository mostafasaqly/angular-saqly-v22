import { Component, Input, Output, EventEmitter, signal, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeBlockComponent } from './code-block';
import { QABlockComponent } from './qa-block';

@Component({
  selector: 'app-lesson-content',
  standalone: true,
  imports: [FormsModule, CodeBlockComponent, QABlockComponent],
  template: `
    <div class="content-inner">
    @if (!section) {
      <div class="coming-soon-block">
        <h2>اختر قسماً من القائمة</h2>
        <p>ابدأ بالقسم الأول من الشريط الجانبي</p>
      </div>
    } @else if (section.comingSoon) {
      <div class="coming-soon-block">
        <h2>⏳ قريباً</h2>
        <p>هذا القسم سيكون متاحاً قريباً.</p>
      </div>
    } @else {
      <!-- Meta -->
      <div class="section-meta">
        <span class="badge badge-section">القسم {{ section.id }}</span>
        <span class="badge badge-level">{{ isAr ? section.level : section.levelEn }}</span>
      </div>

      <h1 class="section-title">{{ isAr ? section.title : section.titleEn }}</h1>

      <p class="section-intro">{{ isAr ? section.intro : section.introEn }}</p>

      <!-- Table of contents -->
      <div class="lessons-toc">
        <h3>{{ isAr ? 'الدروس' : 'Lessons' }}</h3>
        <ol>
          @for (lesson of (isAr ? section.lessons : section.lessonsEn); track $index) {
            <li>{{ lesson }}</li>
          }
        </ol>
      </div>

      <!-- Content blocks -->
      <div class="content-blocks">
        @for (block of (isAr ? section.content : (section.contentEn || section.content)); track $index) {
          @switch (block.type) {
            @case ('heading') {
              <h2 class="block-heading">{{ block.text }}</h2>
            }
            @case ('subheading') {
              <h3 class="block-subheading">{{ block.text }}</h3>
            }
            @case ('paragraph') {
              <p class="block-paragraph">{{ block.text }}</p>
            }
            @case ('tip') {
              <div class="block-tip">💡 {{ block.text }}</div>
            }
            @case ('warning') {
              <div class="block-warning">⚠️ {{ block.text }}</div>
            }
            @case ('list') {
              <ul class="block-list">
                @for (item of block.items; track $index) {
                  <li>{{ item }}</li>
                }
              </ul>
            }
            @case ('cta') {
              <div class="block-cta">
                <span>{{ block.text }}</span>
                <a [href]="block.link" target="_blank" rel="noopener">{{ block.linkLabel }}</a>
              </div>
            }
            @case ('code') {
              <app-code-block [code]="block.code" />
            }
            @case ('qa') {
              <app-qa-block [question]="block.question" [answer]="block.answer" />
            }
          }
        }
      </div>

      <!-- Notes -->
      <div class="notes-wrap">
        <label>{{ isAr ? '📝 ملاحظاتك' : '📝 Your Notes' }}</label>
        <textarea
          [placeholder]="isAr ? 'اكتب ملاحظاتك هنا… تحفظ تلقائياً.' : 'Write your notes here… auto-saved.'"
          [value]="note"
          (input)="onNote($event)"
        ></textarea>
      </div>

      <!-- Complete button -->
      <div class="complete-wrap">
        <button class="complete-btn" [class.done]="completed" (click)="toggleComplete.emit()">
          {{ completed
            ? (isAr ? '✅ مكتمل' : '✅ Completed')
            : (isAr ? 'وضع علامة مكتمل' : 'Mark as Complete') }}
        </button>
      </div>
    }
    </div>
  `
})
export class LessonContentComponent implements OnChanges {
  @Input() section: any = null;
  @Input() isAr = true;
  @Input() completed = false;
  @Input() note = '';
  @Output() toggleComplete = new EventEmitter<void>();
  @Output() noteChange = new EventEmitter<string>();

  ngOnChanges() {}

  onNote(e: Event) {
    this.noteChange.emit((e.target as HTMLTextAreaElement).value);
  }
}
