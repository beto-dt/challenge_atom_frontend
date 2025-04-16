import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from '@core/authentication/services/auth.service';

export const httpTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  const currentUser = authService.getCurrentUser();

  if (currentUser) {
    request = request.clone({
      setHeaders: {
        'User-ID': currentUser.id || '',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  return next(request);
};
