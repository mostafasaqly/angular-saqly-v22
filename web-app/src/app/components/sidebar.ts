import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <aside class="sidebar" [class.open]="open" role="navigation" aria-label="أقسام الكورس">
      <!-- Header -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
            <polygon points="125,30 230,195 20,195" fill="#dd0031"/>
            <polygon points="125,55 210,195 40,195" fill="#c3002f"/>
            <polygon points="125,100 165,155 85,155" fill="white"/>
          </svg>
          <span>كورس أنجولار v22</span>
        </div>
        <div class="sidebar-controls">
          <button class="ctrl-btn" (click)="toggleTheme.emit()">
            {{ theme === 'dark' ? '☀️ فاتح' : '🌙 داكن' }}
          </button>
          <button class="ctrl-btn" (click)="toggleLang.emit()">
            {{ isAr ? 'EN' : 'ع' }}
          </button>
        </div>
      </div>

      <!-- Progress -->
      <div class="progress-wrap">
        <div class="progress-label">
          <span>{{ isAr ? 'التقدم' : 'Progress' }}</span>
          <span>{{ completed.size }} / {{ total }} ({{ percent }}%)</span>
        </div>
        <div class="progress-bar" role="progressbar" [attr.aria-valuenow]="percent" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar__fill" [style.width]="percent + '%'"></div>
        </div>
      </div>

      <!-- Search -->
      <div class="sidebar-search">
        <input
          type="search"
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearch($event)"
          [placeholder]="isAr ? '🔍 بحث في الأقسام…' : '🔍 Search sections…'"
        />
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        @for (s of filteredSections; track s.id) {
          <button
            class="nav-item"
            [class.active]="activeId === s.id"
            [class.completed]="completed.has(s.id)"
            [class.coming-soon]="s.comingSoon"
            [attr.aria-current]="activeId === s.id ? 'page' : null"
            [attr.aria-disabled]="s.comingSoon ? true : null"
            (click)="!s.comingSoon && selectSection.emit(s.id)"
          >
            <span class="nav-num">
              @if (completed.has(s.id)) { ✓ } @else { {{ s.id }} }
            </span>
            <span class="nav-title">{{ isAr ? s.title : s.titleEn }}</span>
          </button>
        }
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  @Input() sections: any[] = [];
  @Input() activeId = 1;
  @Input() completed = new Set<number>();
  @Input() total = 0;
  @Input() percent = 0;
  @Input() isAr = true;
  @Input() theme = 'dark';
  @Input() open = false;

  @Output() selectSection = new EventEmitter<number>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleLang = new EventEmitter<void>();
  @Output() closeSidebar = new EventEmitter<void>();

  searchQuery = '';
  filteredSections: any[] = [];

  ngOnChanges() {
    this.filteredSections = this.sections;
  }

  onSearch(q: string) {
    const lower = q.toLowerCase();
    this.filteredSections = q
      ? this.sections.filter(s =>
          s.title?.includes(q) || s.titleEn?.toLowerCase().includes(lower)
        )
      : this.sections;
  }
}
