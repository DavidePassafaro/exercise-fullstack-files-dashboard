import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BASE_URL } from '../../shared/models/base-url';

/**
 * An HTTP interceptor that adds credentials to requests targeting the API server.
 * It checks if the request URL starts with the base API URL and, if so,
 * clones the request to include credentials (like cookies).
 */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(BASE_URL);

  // Check if the request URL does not start with the signup endpoint
  if (req.url.indexOf(`${baseUrl}/auth/signup`) !== 0) {
    // Clone the request and add credentials
    req = req.clone({ withCredentials: true });
  }

  return next(req);
};
