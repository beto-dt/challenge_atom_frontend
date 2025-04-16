import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthService } from '../authentication/services/auth.service';
import {AuthErrors, ServiceErrors} from '@config/error-messages';
import {AppRoutes} from '@config/app-settings';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  /**
   * Maneja cualquier error no capturado en la aplicación
   * @param error Error a manejar
   */
  handleError(error: Error | HttpErrorResponse): void {
    if (environment.production) {
      this.handleErrorProduction(error);
    } else {
      this.handleErrorDevelopment(error);
    }
  }

  /**
   * Maneja errores en entorno de desarrollo
   */
  private handleErrorDevelopment(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      console.error('Error HTTP:', error);
      this.showErrorMessage(`Error HTTP ${error.status}: ${error.message}`);
    } else {
      console.error('Error:', error);
      this.showErrorMessage(`Error: ${error.message}`);
    }
  }

  /**
   * Maneja errores en entorno de producción
   */
  private handleErrorProduction(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.handleUnauthorizedError();
      } else {
        this.showUserFriendlyErrorMessage(error);
      }
    } else {
      this.showErrorMessage(AuthErrors.occasional_error);
    }
  }

  /**
   * Muestra un mensaje de error user-friendly basado en el código de error HTTP
   */
  private showUserFriendlyErrorMessage(error: HttpErrorResponse): void {
    let message = ServiceErrors.occasional_error;

    switch (error.status) {
      case 400:
        message = ServiceErrors.incorrect_data;
        break;
      case 404:
        message = ServiceErrors.resource_not_found;
        break;
      case 403:
        message = ServiceErrors.access_prohibited;
        break;
      case 500:
        message = ServiceErrors.internal_server_error;
        break;
      case 0:
        message = ServiceErrors.no_internet_connection;
        break;
    }

    this.showErrorMessage(message);
  }

  /**
   * Maneja errores de autenticación (401)
   */
  private handleUnauthorizedError(): void {
    const authService = this.injector.get(AuthService);
    const router = this.injector.get(Router);

    authService.logout();
    router.navigate([AppRoutes.login]);
    this.showErrorMessage(ServiceErrors.session);
  }

  /**
   * Muestra un mensaje de error usando snackbar
   */
  private showErrorMessage(message: string): void {
    const snackBar = this.injector.get(MatSnackBar);

    snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
