import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, Router, Routes } from '@angular/router';
import { FileService } from '../../core/services/file.service';
import { catchError, of } from 'rxjs';

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
        resolve: {
          file: (route: ActivatedRouteSnapshot) => {
            const router = inject(Router);
            const fileService = inject(FileService);
            const fileId = route.paramMap.get('id');

            return fileService
              .getFileById(fileId!)
              .pipe(catchError(() => of(new RedirectCommand(router.parseUrl('/dashboard')))));
          },
        },
      },
    ],
    data: {
      breadcrumbs: 'Dashboard',
    },
  },
];
