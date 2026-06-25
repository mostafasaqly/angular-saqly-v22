/**
 * Section 15 — Example 03: Simple Store with Signals (No NgRx)
 *
 * A lightweight store pattern built with plain Angular Signals.
 * Mimics the structure of a Redux/NgRx store without any third-party library:
 *
 *   - State interface defines the shape
 *   - Private signal holds the state object
 *   - Computed selectors derive slices
 *   - Named action methods mutate state immutably
 *   - Loading / error / success flags handled uniformly
 *
 * Usage: inject UserStore anywhere in the app.
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ─── State Interface ──────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  active: boolean;
}

interface UserState {
  users: User[];
  selectedId: number | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: UserState = {
  users: [],
  selectedId: null,
  loading: false,
  error: null,
  searchQuery: '',
};

// ─── Store ────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class UserStore {
  private http = inject(HttpClient);

  // ── Private writable state ─────────────────────────────────────────────────
  private _state = signal<UserState>(initialState);

  // ── Public selectors (computed read-only signals) ──────────────────────────

  readonly loading      = computed(() => this._state().loading);
  readonly error        = computed(() => this._state().error);
  readonly searchQuery  = computed(() => this._state().searchQuery);
  readonly selectedId   = computed(() => this._state().selectedId);

  readonly allUsers     = computed(() => this._state().users);

  readonly filteredUsers = computed(() => {
    const query = this._state().searchQuery.toLowerCase();
    if (!query) return this._state().users;
    return this._state().users.filter(u =>
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
    );
  });

  readonly selectedUser = computed(() => {
    const id = this._state().selectedId;
    return id ? this._state().users.find(u => u.id === id) ?? null : null;
  });

  readonly activeCount  = computed(() =>
    this._state().users.filter(u => u.active).length
  );

  readonly adminUsers   = computed(() =>
    this._state().users.filter(u => u.role === 'admin')
  );

  readonly hasError     = computed(() => this._state().error !== null);

  // ── Helper: patch partial state immutably ──────────────────────────────────
  private patch(partial: Partial<UserState>): void {
    this._state.update(s => ({ ...s, ...partial }));
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  /** Load all users from the API */
  loadUsers(): void {
    this.patch({ loading: true, error: null });

    this.http.get<User[]>('/api/users').subscribe({
      next: users => this.patch({ users, loading: false }),
      error: err  => this.patch({ error: err.message, loading: false }),
    });
  }

  /** Select a user by ID */
  selectUser(id: number | null): void {
    this.patch({ selectedId: id });
  }

  /** Update the search query */
  setSearch(query: string): void {
    this.patch({ searchQuery: query });
  }

  /** Add a new user optimistically */
  addUser(user: User): void {
    this._state.update(s => ({
      ...s,
      users: [...s.users, user],
    }));
  }

  /** Update a user by ID */
  updateUser(id: number, changes: Partial<User>): void {
    this._state.update(s => ({
      ...s,
      users: s.users.map(u => u.id === id ? { ...u, ...changes } : u),
    }));
  }

  /** Soft-delete (deactivate) a user */
  deactivateUser(id: number): void {
    this.updateUser(id, { active: false });
  }

  /** Remove a user permanently */
  deleteUser(id: number): void {
    this._state.update(s => ({
      ...s,
      users: s.users.filter(u => u.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    }));
  }

  /** Clear any error */
  clearError(): void {
    this.patch({ error: null });
  }

  /** Reset the entire store to initial state */
  reset(): void {
    this._state.set(initialState);
  }
}

// ─── Example component using the store ────────────────────────────────────────

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <!-- Search -->
      <input
        type="search"
        [value]="store.searchQuery()"
        (input)="store.setSearch($any($event.target).value)"
        placeholder="Search users..."
      />

      <!-- Loading / Error -->
      @if (store.loading()) { <p>Loading…</p> }
      @if (store.hasError()) {
        <p class="error">{{ store.error() }}</p>
        <button (click)="store.clearError()">Dismiss</button>
      }

      <!-- Stats -->
      <p>Active: {{ store.activeCount() }} of {{ store.allUsers().length }}</p>

      <!-- List -->
      <ul>
        @for (user of store.filteredUsers(); track user.id) {
          <li
            [class.selected]="store.selectedId() === user.id"
            (click)="store.selectUser(user.id)"
          >
            <strong>{{ user.name }}</strong> — {{ user.email }}
            <span class="role">{{ user.role }}</span>
            @if (!user.active) { <span class="inactive">inactive</span> }
            <button (click)="store.deleteUser(user.id)">Delete</button>
          </li>
        }
      </ul>

      <!-- Selected detail -->
      @if (store.selectedUser(); as user) {
        <div class="detail">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }} · {{ user.role }}</p>
          <button (click)="store.deactivateUser(user.id)">Deactivate</button>
        </div>
      }
    </div>
  `,
})
export class UserListComponent implements OnInit {
  store = inject(UserStore);

  ngOnInit(): void {
    this.store.loadUsers();
  }
}
