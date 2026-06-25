/**
 * Section 15 — Example 01: Local Component State with Signals
 *
 * Demonstrates how to manage UI state that is private to a single component.
 * Uses signal(), computed(), and effect() — Angular v22 reactive primitives.
 *
 * Key points:
 *  - signal()   → writable reactive value
 *  - computed() → derived, read-only, memoised
 *  - effect()   → side-effects that run when signals change
 *  - changeDetection: ChangeDetectionStrategy.OnPush works perfectly with signals
 */

import {
  Component,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgClass } from '@angular/common';

// ─── Todo Model ─────────────────────────────────────────────────────────────

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type FilterType = 'all' | 'active' | 'done';

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  template: `
    <div class="todo-app">
      <h2>My Todos</h2>

      <!-- Add form -->
      <div class="add-row">
        <input
          #newTodo
          type="text"
          placeholder="What needs to be done?"
          (keyup.enter)="addTodo(newTodo.value); newTodo.value = ''"
        />
        <button (click)="addTodo(newTodo.value); newTodo.value = ''">Add</button>
      </div>

      <!-- Filter tabs -->
      <div class="filters">
        @for (f of filterOptions; track f) {
          <button
            [class.active]="filter() === f"
            (click)="filter.set(f)"
          >{{ f }}</button>
        }
      </div>

      <!-- Stats (computed) -->
      <p class="stats">
        {{ remaining() }} remaining · {{ doneCount() }} completed
      </p>

      <!-- Todo list -->
      <ul>
        @for (todo of filteredTodos(); track todo.id) {
          <li [ngClass]="{ done: todo.done }">
            <input
              type="checkbox"
              [checked]="todo.done"
              (change)="toggle(todo.id)"
            />
            <span>{{ todo.text }}</span>
            <button (click)="remove(todo.id)">✕</button>
          </li>
        }
        @empty {
          <li class="empty">Nothing here!</li>
        }
      </ul>

      <!-- Clear completed -->
      @if (doneCount() > 0) {
        <button class="clear" (click)="clearDone()">
          Clear completed ({{ doneCount() }})
        </button>
      }
    </div>
  `,
  styles: [`
    .todo-app { max-width: 400px; margin: 2rem auto; font-family: sans-serif; }
    .add-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    input[type=text] { flex: 1; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
    .filters { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
    button { padding: 0.4rem 0.8rem; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; }
    button.active { background: #333; color: #fff; }
    ul { list-style: none; padding: 0; }
    li { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0; border-bottom: 1px solid #eee; }
    li.done span { text-decoration: line-through; color: #999; }
    li.empty { color: #aaa; font-style: italic; }
    .stats { font-size: 0.85rem; color: #666; margin: 0.5rem 0; }
    .clear { margin-top: 1rem; background: #fee; color: #c00; border-color: #fcc; }
  `],
})
export class TodoListComponent {
  // ── State signals ──────────────────────────────────────────────────────────
  private _todos = signal<Todo[]>([
    { id: 1, text: 'Learn Angular Signals', done: true },
    { id: 2, text: 'Build a Signal Store', done: false },
    { id: 3, text: 'Understand OnPush', done: false },
  ]);

  filter = signal<FilterType>('all');

  readonly filterOptions: FilterType[] = ['all', 'active', 'done'];

  // ── Computed (derived, never stored separately) ────────────────────────────
  readonly remaining = computed(() =>
    this._todos().filter(t => !t.done).length
  );

  readonly doneCount = computed(() =>
    this._todos().filter(t => t.done).length
  );

  readonly filteredTodos = computed(() => {
    const f = this.filter();
    return this._todos().filter(t => {
      if (f === 'active') return !t.done;
      if (f === 'done')   return t.done;
      return true;
    });
  });

  // ── Side-effect: persist to localStorage whenever todos change ─────────────
  constructor() {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this._todos()));
    });
  }

  // ── Mutations ──────────────────────────────────────────────────────────────
  private _nextId = 4;

  addTodo(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    this._todos.update(list => [
      ...list,
      { id: this._nextId++, text: trimmed, done: false },
    ]);
  }

  toggle(id: number): void {
    this._todos.update(list =>
      list.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }

  remove(id: number): void {
    this._todos.update(list => list.filter(t => t.id !== id));
  }

  clearDone(): void {
    this._todos.update(list => list.filter(t => !t.done));
  }
}
