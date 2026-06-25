/**
 * Section 9 — Example 03: Custom Structural Directive
 *
 * Demonstrates:
 *  - Building a structural directive with TemplateRef + ViewContainerRef
 *  - The *unless alias pattern (opposite of *ngIf)
 *  - A *repeat directive that stamps a template N times
 *  - Using inject() instead of constructor injection
 *  - The micro-syntax context variable ($implicit)
 *
 * Angular v22 · standalone: true
 */

import {
  Component,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';

// ─── 1. appUnless — opposite of *ngIf ────────────────────────────────────────

/**
 * Stamps the template when the condition is FALSE.
 *
 * Usage:
 *   <p *appUnless="isLoggedIn">Please sign in to continue.</p>
 *
 * Angular expands the * syntax into:
 *   <ng-template [appUnless]="isLoggedIn">
 *     <p>Please sign in to continue.</p>
 *   </ng-template>
 */
@Directive({
  selector: '[appUnless]',
  standalone: true,
})
export class UnlessDirective implements OnChanges {
  // Angular injects TemplateRef (the ng-template content) and
  // ViewContainerRef (where to insert / clear the view).
  private templateRef = inject(TemplateRef<unknown>);
  private vcr         = inject(ViewContainerRef);

  @Input() appUnless = false;

  private hasView = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('appUnless' in changes) {
      if (!this.appUnless && !this.hasView) {
        // Condition is false → stamp the template
        this.vcr.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (this.appUnless && this.hasView) {
        // Condition became true → remove the stamped view
        this.vcr.clear();
        this.hasView = false;
      }
    }
  }
}

// ─── 2. appRepeat — stamp a template N times ──────────────────────────────────

/**
 * Context type for the embedded view — lets us use `let-i` in the template.
 */
interface RepeatContext {
  $implicit: number; // the current index (0-based)
  index:     number;
  count:     number;
  first:     boolean;
  last:      boolean;
}

/**
 * Stamps the template `count` times, passing the index as implicit context.
 *
 * Usage:
 *   <li *appRepeat="5; let i">Item {{ i + 1 }}</li>
 *
 * Which desugars to:
 *   <ng-template [appRepeat]="5" let-i>
 *     <li>Item {{ i + 1 }}</li>
 *   </ng-template>
 */
@Directive({
  selector: '[appRepeat]',
  standalone: true,
})
export class RepeatDirective implements OnChanges {
  private templateRef = inject(TemplateRef<RepeatContext>);
  private vcr         = inject(ViewContainerRef);

  @Input() appRepeat = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if ('appRepeat' in changes) {
      this.render();
    }
  }

  private render(): void {
    this.vcr.clear();
    const count = Math.max(0, this.appRepeat);
    for (let i = 0; i < count; i++) {
      this.vcr.createEmbeddedView(this.templateRef, {
        $implicit: i,
        index:     i,
        count,
        first:     i === 0,
        last:      i === count - 1,
      });
    }
  }

  /** Type guard so Angular can type-check the let-bindings in the template */
  static ngTemplateContextGuard(
    _dir: RepeatDirective,
    ctx: unknown
  ): ctx is RepeatContext {
    return true;
  }
}

// ─── 3. appPermission — role-based rendering ─────────────────────────────────

type Role = 'admin' | 'editor' | 'viewer';

/**
 * Renders content only when the current user has one of the allowed roles.
 *
 * Usage:
 *   <button *appPermission="['admin', 'editor']">Edit</button>
 *   <button *appPermission="['admin']">Delete</button>
 */
@Directive({
  selector: '[appPermission]',
  standalone: true,
})
export class PermissionDirective implements OnChanges {
  private templateRef = inject(TemplateRef<unknown>);
  private vcr         = inject(ViewContainerRef);

  @Input() appPermission: Role[] = [];
  @Input() appPermissionCurrentRole: Role = 'viewer';

  private hasView = false;

  ngOnChanges(): void {
    const allowed = this.appPermission.includes(this.appPermissionCurrentRole);
    if (allowed && !this.hasView) {
      this.vcr.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!allowed && this.hasView) {
      this.vcr.clear();
      this.hasView = false;
    }
  }
}

// ─── 4. Demo Component ────────────────────────────────────────────────────────

@Component({
  selector: 'app-structural-demo',
  standalone: true,
  imports: [UnlessDirective, RepeatDirective, PermissionDirective],
  template: `
    <h2>Custom Structural Directives</h2>

    <!-- ── appUnless ──────────────────── -->
    <section>
      <h3>*appUnless</h3>
      <button (click)="loggedIn.update(v => !v)">
        {{ loggedIn() ? 'Log out' : 'Log in' }}
      </button>
      <p *appUnless="loggedIn()">⚠️ You are not logged in. Please sign in.</p>
      <p *appUnless="!loggedIn()">✅ Welcome back, {{ username() }}!</p>
    </section>

    <!-- ── appRepeat ──────────────────── -->
    <section>
      <h3>*appRepeat</h3>
      <label>
        Stars: {{ starCount() }}
        <input
          type="range" min="1" max="10"
          [value]="starCount()"
          (input)="starCount.set(+$any($event.target).value)"
        />
      </label>
      <div style="display:flex; gap:4px; font-size:1.5rem;">
        <span *appRepeat="starCount(); let i; let last=last">
          ⭐{{ last ? ' (' + (i + 1) + ')' : '' }}
        </span>
      </div>
    </section>

    <!-- ── appPermission ──────────────── -->
    <section>
      <h3>*appPermission</h3>
      <label>
        Current role:
        <select (change)="role.set($any($event.target).value)">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <p>Logged in as: <strong>{{ role() }}</strong></p>

      <button
        *appPermission="['editor', 'admin']"
        [appPermissionCurrentRole]="role()"
      >
        ✏️ Edit (editor + admin only)
      </button>

      <button
        *appPermission="['admin']"
        [appPermissionCurrentRole]="role()"
      >
        🗑️ Delete (admin only)
      </button>

      <p *appPermission="['viewer']" [appPermissionCurrentRole]="role()">
        👀 You have read-only access.
      </p>
    </section>
  `,
  styles: [`
    section {
      margin-bottom: 1.5rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    button { margin: 4px 4px 4px 0; padding: 6px 12px; cursor: pointer; }
    select { margin-left: 8px; }
  `],
})
export class StructuralDemoComponent {
  loggedIn  = signal(false);
  username  = signal('Mostafa');
  starCount = signal(5);
  role      = signal<Role>('viewer');
}
