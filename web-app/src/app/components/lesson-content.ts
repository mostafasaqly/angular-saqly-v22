import {
  Component, input, output, ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeBlockComponent } from './code-block';
import { QABlockComponent } from './qa-block';
import { Section, ContentBlockType } from '../models/section.model';

@Component({
  selector: 'app-lesson-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CodeBlockComponent, QABlockComponent],
  template: `
    <div class="content-inner">
    @if (!section()) {
      <div class="coming-soon-block">
        <h2>{{ isAr() ? 'اختر قسماً من القائمة' : 'Select a section' }}</h2>
        <p>{{ isAr() ? 'ابدأ بالقسم الأول من الشريط الجانبي' : 'Start with section 1 from the sidebar' }}</p>
      </div>
    } @else if (section()?.comingSoon) {
      <div class="coming-soon-block">
        <h2>⏳ {{ isAr() ? 'قريباً' : 'Coming Soon' }}</h2>
        <p>{{ isAr() ? 'هذا القسم سيكون متاحاً قريباً.' : 'This section will be available soon.' }}</p>
      </div>
    } @else {
      <!-- Meta -->
      <div class="section-meta">
        <span class="badge badge-section">{{ isAr() ? 'القسم' : 'Section' }} {{ section()!.id }}</span>
        <span class="badge badge-level">{{ isAr() ? section()!.level : section()!.levelEn }}</span>
      </div>

      <h1 class="section-title">{{ isAr() ? section()!.title : section()!.titleEn }}</h1>

      <p class="section-intro">{{ isAr() ? section()!.intro : section()!.introEn }}</p>

      <!-- Table of contents -->
      <div class="lessons-toc">
        <h3>{{ isAr() ? 'الدروس' : 'Lessons' }}</h3>
        <ol>
          @for (lesson of (isAr() ? section()!.lessons : section()!.lessonsEn); track $index) {
            <li>{{ lesson }}</li>
          }
        </ol>
      </div>

      <!-- Content blocks -->
      <div class="content-blocks">
        @for (block of blocks(); track $index) {
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
                @if (block.link) {
                  <a [href]="block.link" target="_blank" rel="noopener">{{ block.linkLabel }}</a>
                }
              </div>
            }
            @case ('code') {
              <app-code-block [code]="block.code" />
            }
            @case ('qa') {
              <app-qa-block [question]="block.question" [answer]="block.answer" [isAr]="isAr()" />
            }
          }
        }
      </div>

      <!-- Notes -->
      <div class="notes-wrap">
        <label>{{ isAr() ? '📝 ملاحظاتك' : '📝 Your Notes' }}</label>
        <textarea
          [placeholder]="isAr() ? 'اكتب ملاحظاتك هنا… تحفظ تلقائياً.' : 'Write your notes here… auto-saved.'"
          [value]="note()"
          (input)="noteChange.emit($any($event.target).value)"
        ></textarea>
      </div>

      <!-- Complete button -->
      <div class="complete-wrap">
        <button class="complete-btn" [class.done]="completed()" (click)="toggleComplete.emit()">
          {{ completed()
            ? (isAr() ? '✅ مكتمل' : '✅ Completed')
            : (isAr() ? 'وضع علامة مكتمل' : 'Mark as Complete') }}
        </button>
      </div>
    }
    </div>
  `,
})
export class LessonContentComponent {
  readonly section       = input<Section | null>(null);
  readonly isAr          = input(true);
  readonly completed     = input(false);
  readonly note          = input('');

  readonly toggleComplete = output<void>();
  readonly noteChange     = output<string>();

  readonly blocks = () => {
    const s = this.section();
    if (!s) return [] as ContentBlockType[];
    return (this.isAr() ? s.content : (s.contentEn ?? s.content)) as ContentBlockType[];
  };
}
