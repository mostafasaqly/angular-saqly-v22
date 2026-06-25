/**
 * Section 9 — Example 05: Custom Pipe (Truncate)
 *
 * Demonstrates:
 *  - @Pipe decorator with standalone: true
 *  - Implementing PipeTransform interface
 *  - Type-safe transform() method
 *  - Using the pipe inside a standalone component
 *
 * Angular v22 · standalone: true
 */

import {
  Component,
  ChangeDetectionStrategy,
  Pipe,
  PipeTransform,
  signal,
} from '@angular/core';

// ─── 1. TruncatePipe ─────────────────────────────────────────────────────────

/**
 * Truncates a string to a maximum character count and appends a trail.
 *
 * Usage:
 *   {{ text | truncate }}               → truncates at 100 chars, appends '…'
 *   {{ text | truncate:50 }}            → truncates at 50 chars
 *   {{ text | truncate:50:'[read more]' }} → custom trail
 *   {{ text | truncate:50:'' }}         → no trail (hard cut)
 */
@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true, // default — only recalculates when the input reference changes
})
export class TruncatePipe implements PipeTransform {
  /**
   * @param value  - Source string to truncate
   * @param limit  - Maximum number of characters (default: 100)
   * @param trail  - Appended when the string is truncated (default: '…')
   * @returns      - Truncated string or the original if within limit
   */
  transform(value: string | null | undefined, limit = 100, trail = '…'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit).trimEnd() + trail;
  }
}

// ─── 2. WordCountPipe ─────────────────────────────────────────────────────────

/**
 * Counts words in a string.
 *
 * Usage:
 *   {{ article | wordCount }} words
 */
@Pipe({
  name: 'wordCount',
  standalone: true,
  pure: true,
})
export class WordCountPipe implements PipeTransform {
  transform(value: string | null | undefined): number {
    if (!value?.trim()) return 0;
    return value.trim().split(/\s+/).length;
  }
}

// ─── 3. ReadingTimePipe ───────────────────────────────────────────────────────

/**
 * Estimates reading time at a given words-per-minute rate.
 *
 * Usage:
 *   {{ article | readingTime }}           → "3 min read" (avg 200 wpm)
 *   {{ article | readingTime:300 }}       → faster reader rate
 */
@Pipe({
  name: 'readingTime',
  standalone: true,
  pure: true,
})
export class ReadingTimePipe implements PipeTransform {
  transform(value: string | null | undefined, wpm = 200): string {
    if (!value?.trim()) return '< 1 min read';
    const words   = value.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wpm);
    return `${minutes} min read`;
  }
}

// ─── 4. InitialsPipe ──────────────────────────────────────────────────────────

/**
 * Extracts initials from a full name.
 *
 * Usage:
 *   {{ 'Mostafa Saqly' | initials }}   → 'MS'
 *   {{ 'John' | initials }}            → 'J'
 */
@Pipe({
  name: 'initials',
  standalone: true,
  pure: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, max = 2): string {
    if (!value?.trim()) return '?';
    return value
      .trim()
      .split(/\s+/)
      .slice(0, max)
      .map(word => word[0].toUpperCase())
      .join('');
  }
}

// ─── 5. Demo component ────────────────────────────────────────────────────────

interface Article {
  title: string;
  author: string;
  body: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Angular v22: The Signal-First Era',
    author: 'Mostafa Saqly',
    body: `Angular v22, released on June 3 2026, marks a pivotal moment in the
framework's evolution. The Angular team has officially moved to a
signal-first architecture, deprecating Zone.js for new projects and
making OnPush change detection the default for every generated component.
The new Signal Forms API is now stable, replacing the aging reactive-forms
paradigm with a lightweight, type-safe, signal-driven approach that
integrates naturally with the rest of the reactive system. The Resource
API — introduced for declarative async data fetching — is now out of
developer preview, making server-side data loading elegant and testable.
For developers coming from React or Vue, the new Angular feels leaner,
more predictable, and far easier to debug. Bundle sizes have dropped by
up to 40 % for typical applications.`,
  },
  {
    title: 'Why TypeScript 6 Changes Everything',
    author: 'Sarah Chen',
    body: `TypeScript 6 ships with several transformative features: improved
type inference for generics, native decorator support matching the TC39
decorator specification, and the new Strict Nullability Propagation option
that makes the type system even more precise. For Angular developers, the
biggest win is that Angular v22 requires TypeScript 6 and leverages its
native decorators internally — meaning faster compilation, smaller output,
and better IDE autocomplete for signals, inputs, and outputs.`,
  },
];

@Component({
  selector: 'app-custom-pipe-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TruncatePipe, WordCountPipe, ReadingTimePipe, InitialsPipe],
  template: `
    <h2>Custom Pipes</h2>

    <!-- Article cards -->
    <div class="cards">
      @for (article of articles; track article.title) {
        <div class="card">
          <!-- Avatar using InitialsPipe -->
          <div class="avatar">{{ article.author | initials }}</div>

          <div class="card__body">
            <h3>{{ article.title | truncate:40 }}</h3>

            <p class="meta">
              By {{ article.author }} ·
              {{ article.body | wordCount }} words ·
              {{ article.body | readingTime }}
            </p>

            <!-- Truncated preview -->
            <p>{{ article.body | truncate:previewLength() }}</p>

            <button (click)="toggleExpanded(article.title)">
              {{ isExpanded(article.title) ? 'Show less' : 'Read more' }}
            </button>

            @if (isExpanded(article.title)) {
              <p>{{ article.body | truncate:99999:'' }}</p>
            }
          </div>
        </div>
      }
    </div>

    <!-- Preview length control -->
    <div class="controls">
      <label>
        Preview length: {{ previewLength() }} chars
        <input
          type="range" min="30" max="200"
          [value]="previewLength()"
          (input)="previewLength.set(+$any($event.target).value)"
        />
      </label>
    </div>

    <!-- Pipe chaining demo -->
    <section class="chain-demo">
      <h3>Pipe chaining</h3>
      <p>{{ longTitle | truncate:20 | initials }}</p>
      <small>
        <code>{{ "'Angular v22: The Signal-First Era' | truncate:20 | initials" }}</code>
        <br />→ truncated to 20 chars → initials extracted
      </small>
    </section>
  `,
  styles: [`
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .card  { display: flex; gap: 12px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; }
    .card__body { flex: 1; }
    .avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: #6366f1; color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; flex-shrink: 0;
    }
    h3 { margin: 0 0 4px; font-size: 16px; }
    .meta { font-size: 12px; color: #6b7280; margin: 0 0 8px; }
    p  { font-size: 14px; line-height: 1.6; margin-bottom: 8px; }
    button { font-size: 13px; cursor: pointer; padding: 4px 10px; }
    .controls { margin: 16px 0; }
    .chain-demo { padding: 12px; background: #f9fafb; border-radius: 8px; }
    label { display: block; font-size: 14px; }
    input[type=range] { width: 200px; margin-left: 8px; }
    code { background: #1e293b; color: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
  `],
})
export class CustomPipeDemoComponent {
  articles     = ARTICLES;
  previewLength = signal(120);
  longTitle    = 'Angular v22: The Signal-First Era Has Arrived';

  private expanded = signal<Set<string>>(new Set());

  isExpanded(title: string): boolean {
    return this.expanded().has(title);
  }

  toggleExpanded(title: string): void {
    this.expanded.update(set => {
      const next = new Set(set);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }
}
