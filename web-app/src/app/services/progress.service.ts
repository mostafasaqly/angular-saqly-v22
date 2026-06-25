import { Injectable, signal, computed, effect } from '@angular/core';

const KEYS = {
  theme:    'ng-theme',
  lang:     'ng-lang',
  progress: 'ng-progress',
  notes:    'ng-notes',
} as const;

@Injectable({ providedIn: 'root' })
export class ProgressService {
  readonly theme    = signal<'dark' | 'light'>(
    (localStorage.getItem(KEYS.theme) as 'dark' | 'light') ?? 'dark'
  );
  readonly isAr     = signal(localStorage.getItem(KEYS.lang) !== 'en');
  readonly completed = signal<Set<number>>(
    new Set(JSON.parse(localStorage.getItem(KEYS.progress) ?? '[]'))
  );
  readonly notes    = signal<Record<number, string>>(
    JSON.parse(localStorage.getItem(KEYS.notes) ?? '{}')
  );

  constructor() {
    effect(() => localStorage.setItem(KEYS.theme,    this.theme()));
    effect(() => localStorage.setItem(KEYS.lang,     this.isAr() ? 'ar' : 'en'));
    effect(() => localStorage.setItem(KEYS.progress, JSON.stringify([...this.completed()])));
    effect(() => localStorage.setItem(KEYS.notes,    JSON.stringify(this.notes())));
  }

  toggleTheme() {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  toggleLang() {
    this.isAr.update(v => !v);
  }

  toggleComplete(id: number) {
    this.completed.update(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  updateNote(id: number, text: string) {
    this.notes.update(n => ({ ...n, [id]: text }));
  }

  noteFor = (id: number) => computed(() => this.notes()[id] ?? '');
  isCompleted = (id: number) => computed(() => this.completed().has(id));
}
