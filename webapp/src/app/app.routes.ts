import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/routes').then((m) => m.routes),
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/routes').then((m) => m.routes),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
