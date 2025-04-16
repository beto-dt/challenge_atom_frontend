import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserRepositoryImpl} from '@data/repositories/user.repository.impl';
import {User} from '@domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FindUserUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  /**
   * Busca un usuario por su email
   * @param email Email del usuario
   * @returns Observable con el usuario o null si no existe
   */
  execute(email: string): Observable<User | null> {
    return this.userRepository.findUserByEmail(email);
  }
}
