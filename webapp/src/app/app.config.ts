import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { UserService } from './core/services/user.service';
import { BASE_URL } from './shared/models/base-url';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      const userService = inject(UserService);

      return userService.getUser().pipe(catchError(() => of(null)));
    }),

    { provide: BASE_URL, useValue: 'http://localhost:3000' },
  ],
};
