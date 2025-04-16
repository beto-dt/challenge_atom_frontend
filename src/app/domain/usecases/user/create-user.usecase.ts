import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserRepositoryImpl} from '@data/repositories/user.repository.impl';
import {User} from '@domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  /**
   * Crea un nuevo usuario
   * @param email Email del nuevo usuario
   * @returns Observable con el usuario creado
   */
  execute(email: string): Observable<User> {
    return this.userRepository.createUser(email);
  }
}
