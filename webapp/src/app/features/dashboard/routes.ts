import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Dashboard',
        data: {
          breadcrumbs: '',
        },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/file-preview/file-preview.component').then((m) => m.FilePreviewComponent),
        title: 'File Preview',
        data: {
          breadcrumbs: 'File Upload - Preview',
        },
      },
    ],
    data: {
      breadcrumbs: 'Dashboard',
    },
  },
];
