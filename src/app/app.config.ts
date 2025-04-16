import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { routes } from './app.routes';

import { httpTokenInterceptor } from '@core/http/interceptors/http.token.interceptor';
import { errorInterceptor } from '@core/http/interceptors/error.interceptor';

import { ErrorHandlerService } from '@core/services/error-handler.service';

import { provideClientHydration } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es-ES');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding()
    ),

    provideHttpClient(
      withInterceptors([
        httpTokenInterceptor,
        errorInterceptor
      ])
    ),

    provideAnimations(),

    provideClientHydration(),

    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },

    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    },
  ]
};
