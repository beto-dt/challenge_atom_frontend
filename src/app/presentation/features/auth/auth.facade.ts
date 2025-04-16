import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FindUserUseCase } from '@domain/usecases/user/find-user.usecase';
import { CreateUserUseCase } from '@domain/usecases/user/create-user.usecase';
import { AuthService } from '@core/authentication/services/auth.service';
import {User} from '@domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  // Estados observables
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(
    private findUserUseCase: FindUserUseCase,
    private createUserUseCase: CreateUserUseCase,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Busca un usuario por su email
   * @param email Email del usuario
   * @returns Observable con el usuario o null si no existe
   */
  findUser(email: string): Observable<User | null> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.findUserUseCase.execute(email).pipe(
      tap(user => {
        if (user) {
          this.authService.login(user);
        }
      }),
      catchError(error => {
        this.errorSubject.next('No se pudo verificar el usuario. Inténtalo de nuevo.');
        this.snackBar.open('Error al buscar usuario', 'Cerrar', { duration: 3000 });
        return of(null);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * Crea un nuevo usuario
   * @param email Email del nuevo usuario
   * @returns Observable con el usuario creado
   */
  createUser(email: string): Observable<User | null> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.createUserUseCase.execute(email).pipe(
      tap(user => {
        if (user) {
          this.authService.login(user);
          this.snackBar.open('Usuario creado con éxito', 'Cerrar', { duration: 3000 });
        }
      }),
      catchError(error => {
        this.errorSubject.next('No se pudo crear el usuario. Inténtalo de nuevo.');
        this.snackBar.open('Error al crear usuario', 'Cerrar', { duration: 3000 });
        return of(null);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
