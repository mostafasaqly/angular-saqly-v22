/**
 * Section 6, Example 5 — Component Composition
 *
 * Shows the "smart vs dumb" (container vs presentational) pattern.
 * A container component fetches data and holds state; presentational
 * components only accept inputs and emit outputs.
 *
 * Key concepts:
 *  - Single-responsibility components
 *  - Smart (container) components own state and services
 *  - Dumb (presentational) components are stateless and reusable
 *  - Composing a full page from small focused pieces
 */

import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// ------------------------------------------------------------------
// Shared types
// ------------------------------------------------------------------

export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  isActive: boolean;
}

// ------------------------------------------------------------------
// PRESENTATIONAL — SearchBar
// ------------------------------------------------------------------

@Component({
  selector: 'app-search-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="search-bar">
      <input
        type="text"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
      />
      @if (value()) {
        <button (click)="cleared.emit()">✕</button>
      }
    </div>
  `,
})
export class SearchBarComponent {
  placeholder = input<string>('Search...');
  value       = input<string>('');
  searched    = output<string>();
  cleared     = output<void>();

  onInput(event: Event) {
    this.searched.emit((event.target as HTMLInputElement).value);
  }
}

// ------------------------------------------------------------------
// PRESENTATIONAL — EmployeeRow
// ------------------------------------------------------------------

@Component({
  selector: 'app-employee-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <tr [class.inactive]="!employee().isActive">
      <td>{{ employee().name }}</td>
      <td>{{ employee().department }}</td>
      <td>{{ employee().salary | currency }}</td>
      <td>
        <span [class]="employee().isActive ? 'badge-active' : 'badge-inactive'">
          {{ employee().isActive ? 'Active' : 'Inactive' }}
        </span>
      </td>
      <td>
        <button (click)="editClicked.emit(employee())">Edit</button>
        <button (click)="toggleClicked.emit(employee().id)">
          {{ employee().isActive ? 'Deactivate' : 'Activate' }}
        </button>
      </td>
    </tr>
  `,
})
export class EmployeeRowComponent {
  employee     = input.required<Employee>();
  editClicked  = output<Employee>();
  toggleClicked = output<number>();
}

// ------------------------------------------------------------------
// PRESENTATIONAL — EmployeeTable
// ------------------------------------------------------------------

@Component({
  selector: 'app-employee-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmployeeRowComponent],
  template: `
    <div class="table-wrapper">
      @if (employees().length === 0) {
        <p class="empty">No employees found.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th (click)="sortBy('name')">Name</th>
              <th (click)="sortBy('department')">Department</th>
              <th (click)="sortBy('salary')">Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (emp of employees(); track emp.id) {
              <app-employee-row
                [employee]="emp"
                (editClicked)="editEmployee.emit($event)"
                (toggleClicked)="toggleEmployee.emit($event)"
              />
            }
          </tbody>
        </table>
      }
    </div>
  `,
})
export class EmployeeTableComponent {
  employees      = input.required<Employee[]>();
  editEmployee   = output<Employee>();
  toggleEmployee = output<number>();
  sortRequested  = output<keyof Employee>();

  sortBy(field: keyof Employee) {
    this.sortRequested.emit(field);
  }
}

// ------------------------------------------------------------------
// PRESENTATIONAL — StatsPanel
// ------------------------------------------------------------------

@Component({
  selector: 'app-stats-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <div class="stats-panel">
      <div class="stat">
        <span class="label">Total Employees</span>
        <span class="value">{{ total() }}</span>
      </div>
      <div class="stat">
        <span class="label">Active</span>
        <span class="value">{{ active() }}</span>
      </div>
      <div class="stat">
        <span class="label">Avg Salary</span>
        <span class="value">{{ avgSalary() | currency }}</span>
      </div>
    </div>
  `,
})
export class StatsPanelComponent {
  total     = input.required<number>();
  active    = input.required<number>();
  avgSalary = input.required<number>();
}

// ------------------------------------------------------------------
// SMART — EmployeeDashboard (container)
// ------------------------------------------------------------------

@Component({
  selector: 'app-component-composition-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchBarComponent, EmployeeTableComponent, StatsPanelComponent],
  template: `
    <h1>Employee Dashboard</h1>

    <!-- Stats are derived, passed down as inputs -->
    <app-stats-panel
      [total]="totalCount()"
      [active]="activeCount()"
      [avgSalary]="averageSalary()"
    />

    <!-- Search is stateless — it emits, we update state -->
    <app-search-bar
      placeholder="Search by name or department..."
      [value]="searchTerm()"
      (searched)="searchTerm.set($event)"
      (cleared)="searchTerm.set('')"
    />

    <!-- Table is stateless — it just displays and emits -->
    <app-employee-table
      [employees]="filteredEmployees()"
      (editEmployee)="onEdit($event)"
      (toggleEmployee)="onToggle($event)"
      (sortRequested)="onSort($event)"
    />

    @if (editingEmployee()) {
      <div class="edit-dialog">
        <p>Editing: {{ editingEmployee()!.name }}</p>
        <button (click)="editingEmployee.set(null)">Close</button>
      </div>
    }
  `,
})
export class ComponentCompositionDemoComponent {
  // ------ State lives here in the smart component ------

  employees = signal<Employee[]>([
    { id: 1, name: 'Alice Johnson',  department: 'Engineering', salary: 120000, isActive: true },
    { id: 2, name: 'Bob Smith',      department: 'Marketing',   salary: 85000,  isActive: true },
    { id: 3, name: 'Carol White',    department: 'Engineering', salary: 130000, isActive: false },
    { id: 4, name: 'David Brown',    department: 'HR',          salary: 72000,  isActive: true },
    { id: 5, name: 'Eve Martinez',   department: 'Engineering', salary: 110000, isActive: true },
  ]);

  searchTerm     = signal('');
  sortField      = signal<keyof Employee>('name');
  editingEmployee = signal<Employee | null>(null);

  // ------ Derived state (computed) ------

  filteredEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const sorted = [...this.employees()].sort((a, b) => {
      const f = this.sortField();
      return String(a[f]).localeCompare(String(b[f]));
    });
    if (!term) return sorted;
    return sorted.filter(
      e =>
        e.name.toLowerCase().includes(term) ||
        e.department.toLowerCase().includes(term)
    );
  });

  totalCount    = computed(() => this.employees().length);
  activeCount   = computed(() => this.employees().filter(e => e.isActive).length);
  averageSalary = computed(() => {
    const all = this.employees();
    return all.length ? all.reduce((s, e) => s + e.salary, 0) / all.length : 0;
  });

  // ------ Event handlers ------

  onEdit(emp: Employee) {
    this.editingEmployee.set(emp);
  }

  onToggle(id: number) {
    this.employees.update(list =>
      list.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e)
    );
  }

  onSort(field: keyof Employee) {
    this.sortField.set(field);
  }
}
