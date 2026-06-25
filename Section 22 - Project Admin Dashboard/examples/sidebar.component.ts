// sidebar.component.ts
// Navigation sidebar with collapsible support and active route highlight

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavItem } from '../models/product.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">
      <!-- Brand -->
      <div class="sidebar__brand">
        <span class="sidebar__logo">A</span>
        @if (!collapsed()) {
          <span class="sidebar__name">AdminPro</span>
        }
      </div>

      <!-- Navigation -->
      <nav class="sidebar__nav">
        @for (item of navItems; track item.route) {
          <a
            class="sidebar__link"
            [routerLink]="item.route"
            routerLinkActive="sidebar__link--active"
            [title]="collapsed() ? item.label : ''"
          >
            <span class="sidebar__icon" [attr.aria-label]="item.icon">{{ item.icon }}</span>
            @if (!collapsed()) {
              <span class="sidebar__label">{{ item.label }}</span>
              @if (item.badge) {
                <span class="sidebar__badge">{{ item.badge }}</span>
              }
            }
          </a>
        }
      </nav>

      <!-- Collapse toggle -->
      <button
        class="sidebar__toggle"
        (click)="toggleCollapse.emit()"
        [attr.aria-label]="collapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        {{ collapsed() ? '→' : '←' }}
      </button>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      background: #1e293b;
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: sticky;
      top: 0;
      transition: width 0.25s ease;
      overflow: hidden;
    }

    .sidebar.collapsed {
      width: 64px;
    }

    .sidebar__brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 16px;
      border-bottom: 1px solid #334155;
    }

    .sidebar__logo {
      width: 36px;
      height: 36px;
      background: #6366f1;
      border-radius: 8px;
      display: grid;
      place-items: center;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
    }

    .sidebar__name {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f1f5f9;
      white-space: nowrap;
    }

    .sidebar__nav {
      flex: 1;
      padding: 16px 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sidebar__link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      text-decoration: none;
      color: #94a3b8;
      font-size: 0.875rem;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }

    .sidebar__link:hover {
      background: #334155;
      color: #f1f5f9;
    }

    .sidebar__link--active {
      background: #6366f1;
      color: #ffffff;
    }

    .sidebar__icon {
      font-size: 1.1rem;
      flex-shrink: 0;
      width: 24px;
      text-align: center;
    }

    .sidebar__label {
      flex: 1;
    }

    .sidebar__badge {
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 99px;
    }

    .sidebar__toggle {
      margin: 16px;
      padding: 8px;
      background: #334155;
      border: none;
      border-radius: 8px;
      color: #cbd5e1;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.15s;
    }

    .sidebar__toggle:hover {
      background: #475569;
    }
  `]
})
export class SidebarComponent {
  readonly collapsed = input<boolean>(false);
  readonly toggleCollapse = output<void>();

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Products',  icon: '📦', route: '/products', badge: 3 },
    { label: 'Settings',  icon: '⚙️',  route: '/settings' }
  ];
}
