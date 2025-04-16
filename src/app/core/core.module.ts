import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {AuthService} from '@core/authentication/services/auth.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {ErrorHandlerService} from '@core/services/error-handler.service';
import {HttpBaseService} from '@core/http/http-base.service';
import {httpTokenInterceptor} from '@core/http/interceptors/http.token.interceptor';
import {errorInterceptor} from '@core/http/interceptors/error.interceptor';
import {ModulesErrors} from '@config/error-messages';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    LocalStorageService,
    HttpBaseService,

    { provide: ErrorHandler, useClass: ErrorHandlerService },

    provideHttpClient(
      withInterceptors([
        httpTokenInterceptor,
        errorInterceptor
      ])
    )
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(ModulesErrors.code_module_errpr);
    }
  }
}
