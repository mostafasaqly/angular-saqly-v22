import { Component, signal, computed, OnInit } from '@angular/core';
import { sections, loadSection } from '../data/sections';
import { SidebarComponent } from './components/sidebar';
import { LessonContentComponent } from './components/lesson-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, LessonContentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly allSections = sections;

  activeId    = signal(1);
  activeSection = signal<any>(null);
  theme       = signal(localStorage.getItem('ng-theme') || 'dark');
  isAr        = signal(localStorage.getItem('ng-lang') !== 'en');
  completed   = signal<Set<number>>(new Set(JSON.parse(localStorage.getItem('ng-progress') || '[]')));
  notes       = signal<Record<number, string>>(JSON.parse(localStorage.getItem('ng-notes') || '{}'));
  sidebarOpen = signal(false);

  percent = computed(() => {
    const avail = this.allSections.filter((s: any) => !s.comingSoon).length;
    return avail ? Math.round((this.completed().size / avail) * 100) : 0;
  });

  currentNote = computed(() => this.notes()[this.activeId()] || '');

  isCompleted = computed(() => this.completed().has(this.activeId()));

  ngOnInit() {
    this.applyTheme();
    this.applyLang();
    this.loadActive();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme());
  }

  applyLang() {
    const ar = this.isAr();
    document.documentElement.dir  = ar ? 'rtl' : 'ltr';
    document.documentElement.lang = ar ? 'ar'  : 'en';
  }

  loadActive() {
    this.activeSection.set(null);
    loadSection(this.activeId()).then(s => this.activeSection.set(s)).catch(() => {
      this.activeSection.set({ comingSoon: true });
    });
  }

  selectSection(id: number) {
    this.activeId.set(id);
    this.sidebarOpen.set(false);
    this.loadActive();
    window.scrollTo({ top: 0 });
  }

  toggleTheme() {
    const t = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(t);
    localStorage.setItem('ng-theme', t);
    this.applyTheme();
  }

  toggleLang() {
    const ar = !this.isAr();
    this.isAr.set(ar);
    localStorage.setItem('ng-lang', ar ? 'ar' : 'en');
    this.applyLang();
  }

  toggleComplete() {
    const id   = this.activeId();
    const prev = this.completed();
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    this.completed.set(next);
    localStorage.setItem('ng-progress', JSON.stringify([...next]));
  }

  onNoteChange(text: string) {
    const n = { ...this.notes(), [this.activeId()]: text };
    this.notes.set(n);
    localStorage.setItem('ng-notes', JSON.stringify(n));
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }
}
