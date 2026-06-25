/**
 * Section 10 — Example 01: Basic Service with providedIn: 'root'
 *
 * Demonstrates:
 *  - @Injectable decorator
 *  - providedIn: 'root' for singleton registration
 *  - Simple in-memory data service
 *  - Type-safe return values
 *  - Using the service inside a standalone component
 *
 * Angular v22 · standalone: true · OnPush
 */

import {
  Component,
  ChangeDetectionStrategy,
  Injectable,
  inject,
  signal,
  computed,
} from '@angular/core';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Note {
  id:        number;
  title:     string;
  content:   string;
  createdAt: Date;
  pinned:    boolean;
}

// ─── 1. NoteService ───────────────────────────────────────────────────────────

/**
 * A root-scoped singleton service that manages a collection of notes.
 *
 * Key patterns:
 *  - Private _notes WritableSignal is the single source of truth
 *  - Public notes / pinnedNotes are readonly computed views
 *  - All mutation goes through explicit service methods
 */
@Injectable({
  providedIn: 'root', // Registered with the root injector — one instance app-wide
})
export class NoteService {
  // ── Private mutable state ────────────────────────────────
  private _notes = signal<Note[]>([
    {
      id: 1,
      title: 'Angular v22 is signal-first',
      content: 'Signals replace Zone.js for change detection in new projects.',
      createdAt: new Date('2026-06-01'),
      pinned: true,
    },
    {
      id: 2,
      title: 'inject() is the preferred way',
      content: 'Use inject() in field initialisers instead of constructor params.',
      createdAt: new Date('2026-06-05'),
      pinned: false,
    },
    {
      id: 3,
      title: 'OnPush is the new default',
      content: 'All new components use OnPush change detection strategy.',
      createdAt: new Date('2026-06-10'),
      pinned: false,
    },
  ]);

  private _nextId = 4;

  // ── Public read-only views ────────────────────────────────

  /** All notes, pinned first */
  readonly notes = computed(() =>
    [...this._notes()].sort((a, b) => +b.pinned - +a.pinned)
  );

  /** Only pinned notes */
  readonly pinnedNotes = computed(() =>
    this._notes().filter(n => n.pinned)
  );

  /** Total note count */
  readonly count = computed(() => this._notes().length);

  // ── Mutation methods ──────────────────────────────────────

  add(title: string, content: string): void {
    const note: Note = {
      id:        this._nextId++,
      title:     title.trim(),
      content:   content.trim(),
      createdAt: new Date(),
      pinned:    false,
    };
    this._notes.update(list => [...list, note]);
  }

  remove(id: number): void {
    this._notes.update(list => list.filter(n => n.id !== id));
  }

  togglePin(id: number): void {
    this._notes.update(list =>
      list.map(n => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  }

  update(id: number, changes: Partial<Pick<Note, 'title' | 'content'>>): void {
    this._notes.update(list =>
      list.map(n => (n.id === id ? { ...n, ...changes } : n))
    );
  }

  getById(id: number): Note | undefined {
    return this._notes().find(n => n.id === id);
  }
}

// ─── 2. Consumer component ────────────────────────────────────────────────────

@Component({
  selector: 'app-notes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Notes ({{ svc.count() }} total)</h2>

    <!-- Add form -->
    <div class="add-form">
      <input
        #titleInput
        type="text"
        placeholder="Title"
        (input)="newTitle.set(titleInput.value)"
      />
      <textarea
        #contentInput
        placeholder="Content"
        rows="3"
        (input)="newContent.set(contentInput.value)"
      ></textarea>
      <button
        [disabled]="!canAdd()"
        (click)="addNote(titleInput, contentInput)"
      >
        Add note
      </button>
    </div>

    <!-- Notes grid -->
    <div class="notes-grid">
      @for (note of svc.notes(); track note.id) {
        <div class="note" [class.note--pinned]="note.pinned">
          <div class="note__header">
            <h3>{{ note.title }}</h3>
            <div class="note__actions">
              <button (click)="svc.togglePin(note.id)" [title]="note.pinned ? 'Unpin' : 'Pin'">
                {{ note.pinned ? '📌' : '📍' }}
              </button>
              <button (click)="svc.remove(note.id)" title="Delete">🗑️</button>
            </div>
          </div>
          <p>{{ note.content }}</p>
          <time>{{ note.createdAt.toLocaleDateString() }}</time>
        </div>
      }
    </div>

    <p>Pinned: {{ svc.pinnedNotes().length }}</p>
  `,
  styles: [`
    .add-form { display: flex; flex-direction: column; gap: 8px; max-width: 400px; margin-bottom: 24px; }
    input, textarea { padding: 8px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; }
    button:not(:disabled) { cursor: pointer; }

    .notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
    .note { padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; }
    .note--pinned { border-color: #6366f1; background: #eef2ff; }
    .note__header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .note__header h3 { margin: 0; font-size: 15px; }
    .note__actions { display: flex; gap: 4px; }
    .note__actions button { background: none; border: none; cursor: pointer; font-size: 14px; }
    p { font-size: 13px; color: #4b5563; margin: 6px 0; }
    time { font-size: 11px; color: #9ca3af; }
  `],
})
export class NotesComponent {
  // inject() — the v22 preferred pattern
  svc = inject(NoteService);

  newTitle   = signal('');
  newContent = signal('');

  canAdd = computed(() => this.newTitle().trim().length > 0);

  addNote(titleEl: HTMLInputElement, contentEl: HTMLTextAreaElement): void {
    if (!this.canAdd()) return;
    this.svc.add(this.newTitle(), this.newContent());
    // Reset inputs
    titleEl.value = '';
    contentEl.value = '';
    this.newTitle.set('');
    this.newContent.set('');
  }
}
