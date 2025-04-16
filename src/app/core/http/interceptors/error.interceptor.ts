import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {AuthService} from '@core/authentication/services/auth.service';
import {AppRoutes} from '@config/app-settings';
import {AuthErrors} from '@config/error-messages';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);
  const authService = inject(AuthService);

  const showErrorMessage = (message: string): void => {
    snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  };

  const handleUnauthorizedError = (): void => {
    authService.logout();
    router.navigate([AppRoutes.login]);
    showErrorMessage(AuthErrors.session);
  };

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = AuthErrors.occasional_error;

      switch (error.status) {
        case 400:
          errorMessage = AuthErrors.bad_request;
          break;
        case 401:
          errorMessage = AuthErrors.unauthorized;
          handleUnauthorizedError();
          break;
        case 403:
          errorMessage = AuthErrors.access_prohibited;
          break;
        case 404:
          errorMessage = AuthErrors.resource_not_found;
          break;
        case 500:
          errorMessage = AuthErrors.internal_server_error;
          break;
        default:
          if (!navigator.onLine) {
            errorMessage = AuthErrors.no_internet_connection;
          } else if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else if (error.error && typeof error.error === 'object' && error.error.message) {
            errorMessage = error.error.message;
          }
      }

      if (error.status !== 401) {
        showErrorMessage(errorMessage);
      }

      console.error('Error HTTP:', error);

      return throwError(() => error);
    })
  );
};
