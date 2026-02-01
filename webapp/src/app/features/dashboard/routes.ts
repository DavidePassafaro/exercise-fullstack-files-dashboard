import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { FileService } from '../../core/services/file.service';

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
        resolve: {
          files: () => inject(FileService).getFiles(),
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
