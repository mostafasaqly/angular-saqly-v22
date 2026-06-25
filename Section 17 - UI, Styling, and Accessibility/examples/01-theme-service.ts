import { Injectable, signal, computed } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<Theme>(this.getInitialTheme());

  theme = this._theme.asReadonly();
  isDark = computed(() => this._theme() === 'dark');

  toggle() {
    const next: Theme = this._theme() === 'light' ? 'dark' : 'light';
    this.apply(next);
  }

  private apply(theme: Theme) {
    this._theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
