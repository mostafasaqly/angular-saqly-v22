import {
  Component, OnInit, inject, computed, signal,
  ChangeDetectionStrategy, effect,
} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { sections } from '../data/sections';
import { SidebarComponent } from './components/sidebar';
import { ProgressService } from './services/progress.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly progress = inject(ProgressService);
  private  readonly router    = inject(Router);

  readonly allSections  = sections;
  readonly sidebarOpen  = signal(false);

  readonly activeId = computed(() => {
    const url = this.router.url;
    const m   = url.match(/section\/(\d+)/);
    return m ? Number(m[1]) : 1;
  });

  readonly percent = computed(() => {
    const avail = this.allSections.filter(s => !s.comingSoon).length;
    return avail ? Math.round((this.progress.completed().size / avail) * 100) : 0;
  });

  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.progress.theme());
    });
    effect(() => {
      const ar = this.progress.isAr();
      document.documentElement.dir  = ar ? 'rtl' : 'ltr';
      document.documentElement.lang = ar ? 'ar'  : 'en';
    });
  }

  protected selectSection(id: number) {
    this.router.navigate(['/section', id]);
  }
}
