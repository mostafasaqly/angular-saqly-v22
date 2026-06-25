/**
 * Section 15 — Example 04: RxJS BehaviorSubject-Based State Service
 *
 * Demonstrates the classic Angular state pattern using RxJS BehaviorSubject.
 * This approach is still excellent for:
 *  - Complex async pipelines (debounce, switchMap, mergeMap)
 *  - Composing multiple event sources
 *  - Code that predates Signals and needs gradual migration
 *
 * Also shows how to bridge RxJS → Signals with toSignal() for
 * template consumption without the async pipe.
 */

import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  Subject,
} from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of,
  startWith,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

// ─── Models ──────────────────────────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
}

interface PostState {
  posts: Post[];
  selectedId: number | null;
  loading: boolean;
  error: string | null;
}

// ─── RxJS State Service ───────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class PostStateService {
  private http = inject(HttpClient);

  // ── Private BehaviorSubjects ───────────────────────────────────────────────
  private _state$ = new BehaviorSubject<PostState>({
    posts: [],
    selectedId: null,
    loading: false,
    error: null,
  });

  private _searchQuery$ = new BehaviorSubject<string>('');

  // ── Public observables ─────────────────────────────────────────────────────

  readonly state$    = this._state$.asObservable();
  readonly posts$    = this.state$.pipe(map(s => s.posts));
  readonly loading$  = this.state$.pipe(map(s => s.loading));
  readonly error$    = this.state$.pipe(map(s => s.error));

  /**
   * Autocomplete-style search: debounces 300ms, only fires on change,
   * switches to a new HTTP call when query changes (cancels previous).
   */
  readonly searchResults$: Observable<Post[]> = this._searchQuery$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => {
      if (!query.trim()) return of([] as Post[]);
      return this.http.get<Post[]>(`/api/posts?q=${query}`).pipe(
        catchError(() => of([] as Post[]))
      );
    }),
    startWith([] as Post[]),
    shareReplay(1)
  );

  /** Combined view: posts + search results merged for the template */
  readonly viewPosts$: Observable<Post[]> = combineLatest([
    this.posts$,
    this._searchQuery$,
  ]).pipe(
    map(([posts, query]) => {
      if (!query) return posts;
      const q = query.toLowerCase();
      return posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
      );
    })
  );

  // ── Helper ─────────────────────────────────────────────────────────────────
  private patch(partial: Partial<PostState>): void {
    this._state$.next({ ...this._state$.value, ...partial });
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  loadPosts(): void {
    this.patch({ loading: true, error: null });

    this.http.get<Post[]>('/api/posts').pipe(
      tap(posts => this.patch({ posts, loading: false })),
      catchError(err => {
        this.patch({ error: err.message, loading: false });
        return of([]);
      })
    ).subscribe();
  }

  setSearch(query: string): void {
    this._searchQuery$.next(query);
  }

  selectPost(id: number | null): void {
    this.patch({ selectedId: id });
  }

  addPost(post: Post): void {
    const current = this._state$.value;
    this.patch({ posts: [...current.posts, post] });
  }

  removePost(id: number): void {
    const current = this._state$.value;
    this.patch({ posts: current.posts.filter(p => p.id !== id) });
  }
}

// ─── Component using the RxJS service ─────────────────────────────────────────

@Component({
  selector: 'app-post-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  template: `
    <div>
      <input
        type="search"
        placeholder="Filter posts…"
        (input)="onSearch($any($event.target).value)"
      />

      <!-- Option A: async pipe (classic) -->
      @if (svc.loading$ | async) { <p>Loading…</p> }

      <ul>
        @for (post of svc.viewPosts$ | async; track post.id) {
          <li (click)="svc.selectPost(post.id)">
            <strong>{{ post.title }}</strong>
          </li>
        }
      </ul>

      <!--
        Option B (commented out): toSignal bridge — no async pipe needed.
        Uncomment to use signals-based template consumption.

        posts = toSignal(this.svc.viewPosts$, { initialValue: [] });

        @for (post of posts(); track post.id) { ... }
      -->
    </div>
  `,
})
export class PostListComponent implements OnDestroy {
  svc = inject(PostStateService);

  // Convert an observable to a signal for template consumption.
  // Automatically unsubscribes when the component is destroyed.
  // (Uncomment the template block above to use this.)
  viewPostsSignal = toSignal(this.svc.viewPosts$, { initialValue: [] as Post[] });

  onSearch(query: string): void {
    this.svc.setSearch(query);
  }

  ngOnDestroy(): void {
    // No manual unsubscribe needed — toSignal() and async pipe both handle cleanup
  }
}

/*
  WHEN TO USE RxJS STATE vs SIGNAL STATE
  ─────────────────────────────────────────────────────────────────────────────
  Use RxJS when:
    ✓ You need time operators (debounceTime, throttleTime)
    ✓ You need stream switching (switchMap, mergeMap, exhaustMap)
    ✓ Multiple event sources need to be combined (combineLatest, zip, race)
    ✓ You want cancellation of in-flight HTTP requests automatically

  Use Signals when:
    ✓ State is synchronous (theme, cart items, UI toggles)
    ✓ You want simpler, more readable code without subscribe/unsubscribe
    ✓ Computed dependencies should be auto-tracked
    ✓ Fine-grained reactivity with OnPush is the goal

  Bridge them:
    - toSignal(observable$) → use an Observable in a Signal context
    - toObservable(signal)  → use a Signal in an RxJS pipeline
*/
