import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
