/**
 * Section 18 — Example 04: @defer with @loading, @error, @placeholder
 *
 * @defer is Angular v22's template-level lazy loading primitive.
 * Components inside @defer are:
 *   - NOT included in the initial bundle (code-split automatically)
 *   - Downloaded and rendered only when the specified trigger fires
 *
 * Block types:
 *   @defer      — the lazily loaded content
 *   @placeholder — shown immediately before the trigger fires (synchronous)
 *   @loading    — shown while the deferred content is downloading
 *   @error      — shown if the download or initialization fails
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

// ---------------------------------------------------------------------------
// Heavy component that will be deferred (imagine this is in its own file
// and is a large, complex component not needed on first paint)
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="analytics">
      <h3>Analytics Dashboard</h3>
      <p>Revenue: $128,430</p>
      <p>Users: 14,203</p>
      <p>Conversion: 3.2%</p>
      <!-- In a real app, this might be a heavy charting library -->
    </div>
  `,
})
export class AnalyticsDashboardComponent {}

// ---------------------------------------------------------------------------
// Skeleton / placeholder component (lightweight — ships in the main bundle)
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-dashboard-skeleton',
  standalone: true,
  template: `
    <div class="skeleton">
      <div class="skeleton-header"></div>
      <div class="skeleton-row"></div>
      <div class="skeleton-row"></div>
      <div class="skeleton-row"></div>
    </div>
  `,
  styles: [`
    .skeleton { padding: 1rem; }
    .skeleton-header, .skeleton-row {
      background: #eee;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      animation: pulse 1.5s ease-in-out infinite;
    }
    .skeleton-header { height: 24px; width: 60%; }
    .skeleton-row { height: 16px; width: 100%; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `],
})
export class DashboardSkeletonComponent {}

// ---------------------------------------------------------------------------
// Host component demonstrating all four @defer blocks
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-admin-page',
  standalone: true,
  // Note: No need to import AnalyticsDashboardComponent here!
  // The @defer block handles the import lazily at runtime.
  imports: [DashboardSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Admin Page</h1>

    <!-- ----------------------------------------------------------------
         Basic @defer — triggers on browser idle (the default trigger).
         The browser downloads AnalyticsDashboardComponent only after
         all critical rendering is done and the browser is idle.
    ---------------------------------------------------------------- -->
    @defer {
      <app-analytics-dashboard />
    } @placeholder {
      <!--
        @placeholder is shown immediately on first render.
        It's synchronous — no download needed.
        Good for: skeleton screens, "click to load" buttons, empty divs.
      -->
      <app-dashboard-skeleton />
    } @loading (minimum 400ms) {
      <!--
        @loading is shown AFTER the trigger fires, while the JS chunk
        for AnalyticsDashboardComponent is being downloaded.

        minimum 400ms: prevents a flash if loading is very fast
        (without this, @loading might show for only 50ms and flicker)
      -->
      <p>Downloading analytics module...</p>
    } @error {
      <!--
        @error is shown if the lazy import fails (network error, 404, etc.)
        Always include this for production robustness.
      -->
      <p>Failed to load analytics. <button (click)="reload()">Retry</button></p>
    }

    <!-- ----------------------------------------------------------------
         @defer with after (minimum display time for placeholder)
    ---------------------------------------------------------------- -->
    @defer (on idle; prefetch on idle) {
      <section>
        <h2>Secondary Panel</h2>
        <p>This panel was prefetched during idle time.</p>
      </section>
    } @placeholder (minimum 200ms) {
      <!--
        minimum on @placeholder: ensures the placeholder is shown for
        at least 200ms even if the deferred content loads instantly
        from cache — prevents jarring flash
      -->
      <div class="panel-placeholder">Loading panel...</div>
    }
  `,
})
export class AdminPageComponent {
  reload(): void {
    // In a real app, trigger a router navigation or manual re-import
    window.location.reload();
  }
}

// ---------------------------------------------------------------------------
// Key points to remember:
// ---------------------------------------------------------------------------
//
// 1. Components inside @defer are automatically code-split by the Angular
//    compiler — no webpack magic-comments or dynamic imports needed.
//
// 2. @placeholder content IS in the initial bundle — keep it lightweight.
//
// 3. @loading content IS in the initial bundle — also keep it lightweight.
//
// 4. The "minimum" option on @loading and @placeholder prevents UI flicker
//    when the deferred content loads very quickly.
//
// 5. Multiple @defer blocks in one template each create their own code chunk.
//
// 6. You can nest @defer blocks, but avoid too many levels — it makes
//    the loading sequence hard to reason about.
