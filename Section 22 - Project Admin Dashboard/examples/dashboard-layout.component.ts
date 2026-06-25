// dashboard-layout.component.ts
// Shell layout component — sidebar + header + main content slot

import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="layout" [class.sidebar-collapsed]="sidebarCollapsed()">
      <!-- Sidebar -->
      <app-sidebar
        [collapsed]="sidebarCollapsed()"
        (toggleCollapse)="toggleSidebar()"
      />

      <!-- Main area -->
      <div class="layout__main">
        <app-header (menuClick)="toggleSidebar()" />

        <main class="layout__content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 100vh;
      background: #f0f2f5;
      transition: grid-template-columns 0.25s ease;
    }

    .layout.sidebar-collapsed {
      grid-template-columns: 64px 1fr;
    }

    .layout__main {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .layout__content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .layout {
        grid-template-columns: 0 1fr;
      }

      .layout.sidebar-collapsed {
        grid-template-columns: 0 1fr;
      }
    }
  `]
})
export class DashboardLayoutComponent {
  readonly sidebarCollapsed = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }
}
