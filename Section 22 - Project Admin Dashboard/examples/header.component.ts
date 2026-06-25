// header.component.ts
// Top application header with user info and logout

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.guard';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <!-- Hamburger for mobile / sidebar toggle -->
      <button
        class="header__menu-btn"
        (click)="menuClick.emit()"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <h1 class="header__title">Admin Dashboard</h1>

      <div class="header__actions">
        <!-- Notification bell -->
        <button class="header__icon-btn" aria-label="Notifications">
          🔔
        </button>

        <!-- User chip -->
        <div class="header__user">
          <div class="header__avatar">
            {{ userInitial() }}
          </div>
          <span class="header__username">{{ userName() }}</span>
        </div>

        <!-- Logout -->
        <button class="header__logout" (click)="logout()">
          Logout
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 24px;
      height: 64px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .header__menu-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: #64748b;
      padding: 4px 8px;
      border-radius: 6px;
      transition: background 0.15s;
    }

    .header__menu-btn:hover {
      background: #f1f5f9;
    }

    .header__title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .header__actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: auto;
    }

    .header__icon-btn {
      background: none;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      transition: background 0.15s;
    }

    .header__icon-btn:hover {
      background: #f1f5f9;
    }

    .header__user {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header__avatar {
      width: 32px;
      height: 32px;
      background: #6366f1;
      color: white;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .header__username {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .header__logout {
      background: none;
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }

    .header__logout:hover {
      background: #fee2e2;
      color: #dc2626;
      border-color: #fca5a5;
    }
  `]
})
export class HeaderComponent {
  readonly menuClick = output<void>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  userName() {
    return this.authService.user()?.name ?? 'Guest';
  }

  userInitial() {
    return (this.authService.user()?.name ?? 'G')[0].toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
