/**
 * Section 10 — Example 02: inject() Function Patterns
 *
 * Demonstrates:
 *  - inject() at field initialisation level
 *  - inject() in the constructor body
 *  - inject() with InjectionToken (non-class dependency)
 *  - Composable utility functions built with inject()
 *  - Using inject() to build reusable "hooks" (composition pattern)
 *
 * Angular v22 · standalone: true · OnPush
 */

import {
  Component,
  ChangeDetectionStrategy,
  Injectable,
  InjectionToken,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';

// ─── App Config via InjectionToken ────────────────────────────────────────────

export interface AppConfig {
  apiUrl:      string;
  appName:     string;
  debugMode:   boolean;
  maxPageSize: number;
}

/**
 * InjectionToken is used for non-class values.
 * The generic type parameter gives full type-safety at injection sites.
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  // providedIn: 'root' with a factory — works just like @Injectable
  providedIn: 'root',
  factory: () => ({
    apiUrl:      'https://api.example.com/v1',
    appName:     'Angular v22 Demo',
    debugMode:   false,
    maxPageSize: 50,
  }),
});

// ─── Services ─────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(level: 'info' | 'warn' | 'error', ...args: unknown[]): void {
    const prefix = `[${level.toUpperCase()}]`;
    console[level](prefix, ...args);
  }
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<'light' | 'dark'>('light');
  readonly theme = this._theme.asReadonly();

  toggle(): void {
    this._theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}

@Injectable({ providedIn: 'root' })
export class UserPrefsService {
  private _lang    = signal('en');
  private _compact = signal(false);

  readonly lang    = this._lang.asReadonly();
  readonly compact = this._compact.asReadonly();

  setLang(lang: string): void     { this._lang.set(lang); }
  toggleCompact(): void           { this._compact.update(v => !v); }
}

// ─── Composable injection utilities ("hooks") ──────────────────────────────────

/**
 * useTheme() — a composable utility that encapsulates ThemeService injection.
 *
 * Must be called during class construction (field init or constructor).
 */
export function useTheme() {
  const svc = inject(ThemeService);
  return {
    theme:  svc.theme,
    toggle: () => svc.toggle(),
    isDark: computed(() => svc.theme() === 'dark'),
  };
}

/**
 * useLogger() — creates a prefixed logger.
 *
 * @param context  Prefix added to every log line
 */
export function useLogger(context: string) {
  const logger = inject(LoggerService);
  return {
    info:  (...args: unknown[]) => logger.log('info',  `[${context}]`, ...args),
    warn:  (...args: unknown[]) => logger.log('warn',  `[${context}]`, ...args),
    error: (...args: unknown[]) => logger.log('error', `[${context}]`, ...args),
  };
}

/**
 * useConfig() — provides typed access to the app configuration.
 */
export function useConfig() {
  return inject(APP_CONFIG);
}

// ─── Component A: inject() at field level (recommended) ───────────────────────

@Component({
  selector: 'app-inject-field-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h3>inject() at field level (recommended)</h3>
      <p>App: <strong>{{ config.appName }}</strong></p>
      <p>API: <code>{{ config.apiUrl }}</code></p>
      <p>Theme: <strong>{{ theme.theme() }}</strong></p>
      <button (click)="theme.toggle()">Toggle theme</button>
      <p [style.color]="theme.isDark() ? '#e2e8f0' : '#1e293b'"
         [style.background]="theme.isDark() ? '#1e293b' : '#f8fafc'"
         style="padding: 8px; border-radius: 6px;">
        This text respects the theme.
      </p>
      <p>Language: {{ prefs.lang() }} · Compact: {{ prefs.compact() }}</p>
      <button (click)="prefs.setLang('ar')">Arabic</button>
      <button (click)="prefs.setLang('en')">English</button>
      <button (click)="prefs.toggleCompact()">Toggle compact</button>
    </section>
  `,
})
export class InjectFieldDemoComponent {
  // Pattern 1: inject() as field initialiser — most common
  private logger = inject(LoggerService);

  // Pattern 2: inject() with InjectionToken
  readonly config = inject(APP_CONFIG);

  // Pattern 3: composable utility (inject() runs during field init of useTheme())
  readonly theme = useTheme();
  readonly prefs = inject(UserPrefsService);
  readonly log   = useLogger('InjectFieldDemoComponent');

  constructor() {
    // Pattern 4: inject() inside constructor body — also valid
    const logger = inject(LoggerService);
    logger.log('info', 'InjectFieldDemoComponent constructed');
    this.log.info('Component ready');
  }
}

// ─── Component B: Demonstrating all patterns together ─────────────────────────

@Component({
  selector: 'app-inject-patterns-showcase',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InjectFieldDemoComponent],
  template: `
    <h2>inject() Function Patterns</h2>

    <app-inject-field-demo />

    <section>
      <h3>InjectionToken demo</h3>
      <dl>
        <dt>apiUrl</dt>      <dd>{{ config.apiUrl }}</dd>
        <dt>appName</dt>     <dd>{{ config.appName }}</dd>
        <dt>debugMode</dt>   <dd>{{ config.debugMode }}</dd>
        <dt>maxPageSize</dt> <dd>{{ config.maxPageSize }}</dd>
      </dl>
    </section>

    <section>
      <h3>Composable useTheme()</h3>
      <p>
        Both this component and the child component share the same
        <code>ThemeService</code> singleton. Toggling in either place
        updates both.
      </p>
      <p>Current theme: <strong>{{ theme.theme() }}</strong></p>
      <button (click)="theme.toggle()">Toggle from parent</button>
    </section>
  `,
  styles: [`
    section { margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; }
    dl { display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; font-size: 14px; }
    dt { font-weight: 700; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    button { margin: 4px 4px 0 0; padding: 6px 12px; cursor: pointer; }
  `],
})
export class InjectPatternsShowcaseComponent {
  readonly config = useConfig();
  readonly theme  = useTheme();
  readonly log    = useLogger('InjectPatternsShowcase');
}
