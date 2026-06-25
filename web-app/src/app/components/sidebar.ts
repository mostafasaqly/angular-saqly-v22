import {
  Component, input, output, signal, computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionMeta } from '../models/section.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <aside class="sidebar" [class.open]="open()" role="navigation"
           [attr.aria-label]="isAr() ? 'أقسام الكورس' : 'Course sections'">

      <!-- Header -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
            <polygon points="125,30 230,195 20,195" fill="#dd0031"/>
            <polygon points="125,55 210,195 40,195" fill="#c3002f"/>
            <polygon points="125,100 165,155 85,155" fill="white"/>
          </svg>
          <span>{{ isAr() ? 'كورس أنجولار v22' : 'Angular v22 Course' }}</span>
          <a class="react-link"
             href="https://mostafasaqly.github.io/react-saqly-v19/"
             target="_blank"
             rel="noopener noreferrer"
             [title]="isAr() ? 'كورس React' : 'React Course'">
            <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="8" fill="#61dafb"/>
              <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61dafb" stroke-width="5"/>
              <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61dafb" stroke-width="5" transform="rotate(60 50 50)"/>
              <ellipse cx="50" cy="50" rx="42" ry="16" fill="none" stroke="#61dafb" stroke-width="5" transform="rotate(120 50 50)"/>
            </svg>
          </a>
        </div>
        <div class="sidebar-controls">
          <button class="ctrl-btn" (click)="toggleTheme.emit()">
            {{ theme() === 'dark' ? '☀️' : '🌙' }}
            {{ theme() === 'dark' ? (isAr() ? 'فاتح' : 'Light') : (isAr() ? 'داكن' : 'Dark') }}
          </button>
          <button class="ctrl-btn" (click)="toggleLang.emit()">
            {{ isAr() ? 'EN' : 'ع' }}
          </button>
        </div>
      </div>

      <!-- Progress -->
      <div class="progress-wrap">
        <div class="progress-label">
          <span>{{ isAr() ? 'التقدم' : 'Progress' }}</span>
          <span>{{ completed().size }} / {{ total() }} ({{ percent() }}%)</span>
        </div>
        <div class="progress-bar"
             role="progressbar"
             [attr.aria-valuenow]="percent()"
             aria-valuemin="0"
             aria-valuemax="100">
          <div class="progress-bar__fill" [style.width]="percent() + '%'"></div>
        </div>
      </div>

      <!-- Search -->
      <div class="sidebar-search">
        <input
          type="search"
          [value]="searchQuery()"
          (input)="searchQuery.set($any($event.target).value)"
          [placeholder]="isAr() ? '🔍 بحث في الأقسام…' : '🔍 Search sections…'"
        />
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        @for (s of filteredSections(); track s.id) {
          <button
            class="nav-item"
            [class.active]="activeId() === s.id"
            [class.completed]="completed().has(s.id)"
            [class.coming-soon]="s.comingSoon"
            [attr.aria-current]="activeId() === s.id ? 'page' : null"
            [attr.aria-disabled]="s.comingSoon ? true : null"
            (click)="!s.comingSoon && selectSection.emit(s.id)"
          >
            <span class="nav-num">
              @if (completed().has(s.id)) { ✓ } @else { {{ s.id }} }
            </span>
            <span class="nav-title">{{ isAr() ? s.title : s.titleEn }}</span>
          </button>
        }
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  readonly sections  = input<SectionMeta[]>([]);
  readonly activeId  = input(1);
  readonly completed = input(new Set<number>());
  readonly total     = input(0);
  readonly percent   = input(0);
  readonly isAr      = input(true);
  readonly theme     = input<'dark' | 'light'>('dark');
  readonly open      = input(false);

  readonly selectSection = output<number>();
  readonly toggleTheme   = output<void>();
  readonly toggleLang    = output<void>();

  readonly searchQuery = signal('');

  readonly filteredSections = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.sections();
    return this.sections().filter(s =>
      s.title?.includes(q) || s.titleEn?.toLowerCase().includes(q)
    );
  });
}
