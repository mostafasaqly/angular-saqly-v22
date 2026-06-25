import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'section/:id', loadComponent: () => import('./pages/section-page').then(m => m.SectionPageComponent) },
  { path: '', redirectTo: 'section/1', pathMatch: 'full' },
  { path: '**', redirectTo: 'section/1' },
];
