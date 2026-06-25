/**
 * Section 18 — Example 03: Zoneless Angular Setup
 *
 * Angular v22 new projects are Zoneless by default — no zone.js is loaded.
 * Angular uses Signals to track state changes instead of monkey-patching
 * every async browser API.
 *
 * Benefits:
 *   - ~15KB smaller bundle (no zone.js)
 *   - Faster startup (no async API patching at boot)
 *   - Change detection only runs when signals actually change
 *   - Native async/await works without Zone.js patches
 *
 * This file shows the full setup: app.config.ts, main.ts, and angular.json note.
 */

// ============================================================================
// FILE: src/app/app.config.ts
// ============================================================================

import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // KEY: replaces zone.js — tells Angular to use Signals for change detection.
    // This is the default for new Angular v22 projects created with `ng new`.
    provideExperimentalZonelessChangeDetection(),

    // Standard providers — no changes needed for Zoneless
    provideRouter(routes, withComponentInputBinding()),

    // withFetch() uses the native Fetch API instead of XMLHttpRequest.
    // In Zoneless, this is preferred because Zone.js used to patch XHR.
    provideHttpClient(withFetch()),
  ],
};

// ============================================================================
// FILE: src/app/app.routes.ts
// ============================================================================

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
];

// ============================================================================
// FILE: src/main.ts
// ============================================================================

import { bootstrapApplication } from '@angular/platform-browser';

// Note: NO import of 'zone.js' — it is not installed or needed.
// In zone.js-based apps, you'd see: import 'zone.js';   ← this is GONE in v22.

// bootstrapApplication uses the appConfig above which includes
// provideExperimentalZonelessChangeDetection() — that's all you need.
bootstrapApplication(
  // AppComponent would be imported here — omitted to keep this file focused.
  {} as any, // placeholder — in a real app: AppComponent
  appConfig
).catch(err => console.error(err));

// ============================================================================
// NOTE: angular.json — polyfills field
// ============================================================================
//
// In a Zoneless project, the polyfills array in angular.json does NOT
// include "zone.js":
//
// "polyfills": []   ← empty, or only other polyfills you actually need
//
// If you see "zone.js" in the polyfills array of an existing project,
// that project is NOT Zoneless. Remove it and add
// provideExperimentalZonelessChangeDetection() to your providers to migrate.

// ============================================================================
// Demonstration: Zoneless-compatible component
// ============================================================================

import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  DestroyRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Users</h2>

    @if (isLoading()) {
      <p>Loading users...</p>
    }

    @if (error()) {
      <p class="error">Error: {{ error() }}</p>
    }

    @for (user of users(); track user.id) {
      <div class="user-card">
        <strong>{{ user.name }}</strong>
        <span>{{ user.email }}</span>
      </div>
    }

    <p>Total: {{ userCount() }}</p>
  `,
})
export class UserListComponent {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  // All state in signals — Zoneless works perfectly with this pattern.
  users = signal<User[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  userCount = computed(() => this.users().length);

  constructor() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          // Setting a signal triggers targeted re-render of this component only.
          // In Zoneless mode, Angular does NOT rely on Zone.js to detect this —
          // the Signal graph handles it directly.
          this.users.set(users);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
        },
      });
  }
}

// ============================================================================
// Migration note: Zone.js app → Zoneless
// ============================================================================
//
// Step 1: Remove zone.js from polyfills in angular.json
// Step 2: Add provideExperimentalZonelessChangeDetection() to app.config.ts
// Step 3: Ensure all components use OnPush change detection
// Step 4: Replace mutable state with signal() / computed()
// Step 5: Replace .pipe(async) subscriptions with signal-based patterns
//         (httpResource, toSignal(), or manual signal.set() in subscribe)
// Step 6: Test that all async operations still trigger re-renders correctly
