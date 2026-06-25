import {
  Component, inject, input, computed, signal,
  ChangeDetectionStrategy, effect,
} from '@angular/core';
import { Router } from '@angular/router';
import { loadSection } from '../../data/sections';
import { ProgressService } from '../services/progress.service';
import { LessonContentComponent } from '../components/lesson-content';
import { Section } from '../models/section.model';

@Component({
  selector: 'app-section-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonContentComponent],
  template: `
    <app-lesson-content
      [section]="section()"
      [isAr]="progress.isAr()"
      [completed]="isCompleted()"
      [note]="note()"
      (toggleComplete)="progress.toggleComplete(sectionId())"
      (noteChange)="progress.updateNote(sectionId(), $event)"
    />
  `,
})
export class SectionPageComponent {
  readonly id = input.required<string>();

  protected readonly progress = inject(ProgressService);
  private  readonly router    = inject(Router);

  readonly sectionId   = computed(() => Number(this.id()));
  readonly isCompleted = computed(() => this.progress.isCompleted(this.sectionId())());
  readonly note        = computed(() => this.progress.noteFor(this.sectionId())());

  readonly section = signal<Section | null>(null);

  constructor() {
    effect(() => {
      const id = this.sectionId();
      if (!id || id < 1 || id > 25) {
        this.router.navigate(['/section/1']);
        return;
      }
      this.section.set(null);
      loadSection(id)
        .then((s: Section) => this.section.set(s))
        .catch(() => this.section.set({ comingSoon: true } as any));
      window.scrollTo({ top: 0 });
    });
  }
}
