/**
 * Section 18 — Example 05: @defer Triggers
 *
 * Demonstrates all major @defer trigger types:
 *   on idle         — fires when the browser is idle (default)
 *   on viewport     — fires when the block scrolls into view
 *   on interaction  — fires on click / touch of the placeholder
 *   on hover        — fires when the user hovers over the placeholder
 *   on timer(Xms)   — fires after a specified delay
 *   on immediate    — fires immediately (no deferral, but still code-splits)
 *   when expression — fires when a signal/expression becomes truthy
 *   prefetch        — pre-downloads the chunk before the trigger fires
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

// Simulated heavy components (each would be in its own file in a real app)
@Component({ selector: 'app-review-list',    standalone: true, template: `<p>Reviews loaded!</p>` })
export class ReviewListComponent {}

@Component({ selector: 'app-related-items',  standalone: true, template: `<p>Related items loaded!</p>` })
export class RelatedItemsComponent {}

@Component({ selector: 'app-quick-view',     standalone: true, template: `<p>Quick view panel loaded!</p>` })
export class QuickViewComponent {}

@Component({ selector: 'app-tooltip-detail', standalone: true, template: `<p>Tooltip detail loaded!</p>` })
export class TooltipDetailComponent {}

@Component({ selector: 'app-live-chat',      standalone: true, template: `<p>Live chat loaded!</p>` })
export class LiveChatComponent {}

@Component({ selector: 'app-user-dashboard', standalone: true, template: `<p>User dashboard loaded!</p>` })
export class UserDashboardComponent {}

@Component({ selector: 'app-heavy-widget',   standalone: true, template: `<p>Heavy widget loaded!</p>` })
export class HeavyWidgetComponent {}

// ---------------------------------------------------------------------------
// Main demo component
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-defer-triggers-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>@defer Trigger Examples</h1>

    <!-- ----------------------------------------------------------------
         1. on idle (DEFAULT)
         Fires when the browser is idle — perfect for non-critical content
         that improves the page but isn't needed immediately.
    ---------------------------------------------------------------- -->
    <section>
      <h2>1. on idle (default)</h2>
      @defer (on idle) {
        <app-review-list />
      } @placeholder {
        <p class="placeholder">Reviews will load when browser is idle...</p>
      }
    </section>

    <!-- ----------------------------------------------------------------
         2. on viewport
         Fires when the deferred block's placeholder scrolls into the
         browser's viewport. Perfect for below-the-fold content.

         Use case: product recommendations, related articles, comment sections.
    ---------------------------------------------------------------- -->
    <section>
      <h2>2. on viewport</h2>
      @defer (on viewport) {
        <app-related-items />
      } @placeholder {
        <div style="height: 100px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <p>Scroll here to load related items</p>
        </div>
      } @loading {
        <p>Fetching related items...</p>
      }
    </section>

    <!-- ----------------------------------------------------------------
         3. on interaction
         Fires when the user clicks or touches the placeholder element.
         Perfect for "load more" patterns or expandable sections.

         Note: the PLACEHOLDER is the trigger target — the user clicks
         the placeholder to trigger loading.
    ---------------------------------------------------------------- -->
    <section>
      <h2>3. on interaction</h2>
      @defer (on interaction) {
        <app-quick-view />
      } @placeholder {
        <!-- This button IS the trigger — clicking it fires the defer -->
        <button class="load-btn">Click to load Quick View panel</button>
      } @loading {
        <p>Loading quick view...</p>
      }
    </section>

    <!-- ----------------------------------------------------------------
         4. on hover
         Fires when the user hovers the placeholder.
         Perfect for tooltips or preview panels.
    ---------------------------------------------------------------- -->
    <section>
      <h2>4. on hover</h2>
      @defer (on hover) {
        <app-tooltip-detail />
      } @placeholder {
        <span class="hoverable">Hover over this text to load detail panel</span>
      } @loading {
        <p>Loading...</p>
      }
    </section>

    <!-- ----------------------------------------------------------------
         5. on timer(Xms)
         Fires after a specified delay from when the component renders.
         Use sparingly — usually on idle or on viewport is better.

         Use case: loading a live chat widget 3 seconds after page load
         so it doesn't slow down the critical path.
    ---------------------------------------------------------------- -->
    <section>
      <h2>5. on timer(3000ms)</h2>
      @defer (on timer(3000ms)) {
        <app-live-chat />
      } @placeholder {
        <p class="placeholder">Live chat loads in 3 seconds...</p>
      } @loading {
        <p>Connecting to chat...</p>
      }
    </section>

    <!-- ----------------------------------------------------------------
         6. when expression
         Fires when a signal or expression evaluates to truthy.
         The condition is checked on every change detection cycle.

         Use case: load a user-specific dashboard only after login.
    ---------------------------------------------------------------- -->
    <section>
      <h2>6. when expression</h2>
      <button (click)="login()">Simulate Login</button>
      <button (click)="logout()">Simulate Logout</button>
      <p>Logged in: {{ isLoggedIn() }}</p>

      @defer (when isLoggedIn()) {
        <!-- Only downloads and renders after isLoggedIn() becomes true -->
        <app-user-dashboard />
      } @placeholder {
        <p>Log in to see your dashboard.</p>
      } @loading {
        <p>Loading your dashboard...</p>
      }
    </section>

    <!-- ----------------------------------------------------------------
         7. prefetch — separate from the render trigger
         You can specify WHEN to download the chunk separately from
         WHEN to render the content.

         on viewport           → render when scrolled into view
         prefetch on idle      → download the chunk while browser is idle
                                  (before the user even scrolls there)
    ---------------------------------------------------------------- -->
    <section>
      <h2>7. Prefetch on idle, render on viewport</h2>
      @defer (on viewport; prefetch on idle) {
        <!--
          The JS chunk for HeavyWidgetComponent is downloaded during idle time.
          When the user scrolls here, it's already in the cache → instant render.
        -->
        <app-heavy-widget />
      } @placeholder {
        <div style="height: 150px; background: #e8f4f8; display: flex; align-items: center; justify-content: center;">
          <p>Heavy widget (prefetched, renders on scroll)</p>
        </div>
      }
    </section>

    <!-- ----------------------------------------------------------------
         8. Multiple triggers (OR logic)
         You can combine triggers — the first one to fire wins.
    ---------------------------------------------------------------- -->
    <section>
      <h2>8. Multiple triggers</h2>
      @defer (on viewport; on interaction) {
        <p>Loaded! (viewport OR interaction — whichever came first)</p>
      } @placeholder {
        <button>Scroll here or click to load</button>
      }
    </section>
  `,
  styles: [`
    section { margin: 2rem 0; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; }
    .placeholder { color: #888; font-style: italic; }
    .load-btn { cursor: pointer; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; }
    .hoverable { text-decoration: underline dashed; cursor: help; }
  `],
})
export class DeferTriggersDemoComponent {
  isLoggedIn = signal(false);

  login(): void {
    this.isLoggedIn.set(true);
    // Angular sees isLoggedIn() is now true →
    // evaluates the `when isLoggedIn()` expression →
    // triggers the @defer block → downloads and renders UserDashboardComponent
  }

  logout(): void {
    this.isLoggedIn.set(false);
    // Note: once a @defer block has rendered, setting the condition back
    // to false does NOT unmount the content — it stays rendered.
  }
}
