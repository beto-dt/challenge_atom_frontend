import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import {
  LoadingIndicatorComponent
} from '@shared/components/loading-indicator/loading-indicator.component';
import {Observable} from 'rxjs';
import {AppRoutes} from '@config/app-settings';
import {ValidationErrors} from '@config/error-messages';
import {AuthFacade} from '@presentation/features/auth/auth.facade';
import {UserCreationDialog} from '@presentation/features/auth/dialogs/user-creation/user-creation.dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LoadingIndicatorComponent
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  validationErrors = ValidationErrors;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private authFacade: AuthFacade
  ) {
    this.loading$ = this.authFacade.loading$;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Envía el formulario e intenta iniciar sesión
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email;

    this.authFacade.findUser(email).subscribe(user => {
      if (user) {
        return this.router.navigate([AppRoutes.tasks]);
      } else {
        return this.showUserCreationDialog(email);
      }
    }, error => {
        if (error.status === 401) {
          this.loginForm.setErrors({ invalidCredentials: true });
        } else if (error.status === 0) {
          this.loginForm.setErrors({ connectionError: true });
        } else if (error.status === 403) {
          this.loginForm.setErrors({ permissionDenied: true });
        } else {
          this.loginForm.setErrors({ serverError: true });
        }
      }
      );
  }

  /**
   * Muestra el diálogo de confirmación para crear un nuevo usuario
   */
  private showUserCreationDialog(email: string): void {
    const dialogRef = this.dialog.open(UserCreationDialog, {
      width: '400px',
      data: { email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authFacade.createUser(email).subscribe(() => {
          return this.router.navigate([AppRoutes.tasks]);
        }, error => {
          if (error.status === 0) {
            this.loginForm.setErrors({ connectionError: true });
          } else {
            this.loginForm.setErrors({ serverError: true });
          }
        });
      }
    });
  }

  /**
   * Comprueba si un campo tiene errores y ha sido tocado
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.hasError(errorName) && (control.dirty || control.touched);
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   */
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (!control || !(control.dirty || control.touched)) {
      return '';
    }

    if (control.hasError('required')) {
      return this.validationErrors.required;
    }

    if (control.hasError('email')) {
      return this.validationErrors.email;
    }

    return 'Campo inválido';
  }
}
