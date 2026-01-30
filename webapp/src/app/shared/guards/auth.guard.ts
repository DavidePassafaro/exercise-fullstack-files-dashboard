import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

/**
 * Guard to check if the user is authenticated
 */
export const isAuthenticatedGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuthenticated = !!userService.user();

  if (!isAuthenticated) {
    const homePath = router.parseUrl('/');
    return new RedirectCommand(homePath);
  }

  return true;
};

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuthenticated = !!userService.user();

  if (isAuthenticated) {
    const homePath = router.parseUrl('/dashboard');
    return new RedirectCommand(homePath);
  }

  return true;
};
