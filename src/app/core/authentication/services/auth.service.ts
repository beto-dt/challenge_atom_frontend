import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import {User} from '@domain/models/user.model';
import {AppRoutes} from '@config/app-settings';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_STORAGE_KEY = 'currentUser';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.initializeFromStorage();
  }

  /**
   * Inicializa el servicio cargando el usuario del localStorage si existe
   */
  private initializeFromStorage(): void {
    const storedUser = this.localStorageService.getItem<User>(this.USER_STORAGE_KEY);
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.getValue();
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  /**
   * Inicia sesión con un usuario
   * @param user Usuario para iniciar sesión
   */
  login(user: User): void {
    this.localStorageService.setItem(this.USER_STORAGE_KEY, user);
    this.currentUserSubject.next(user);
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    this.localStorageService.removeItem(this.USER_STORAGE_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate([AppRoutes.login]);
  }
}
