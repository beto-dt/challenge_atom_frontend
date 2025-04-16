import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserRepository } from '@domain/repositories/user.repository';
import {User} from '@domain/models/user.model';
import {UserApiService} from '@data/datasources/remote/user.api.service';
import {UserMapper} from '@data/mappers/user.mapper';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private userApiService: UserApiService,
    private userMapper: UserMapper
  ) {}

  /**
   * Encontrar usuario por Email
   * @param email
   */
  findUserByEmail(email: string): Observable<User | null> {
    return this.userApiService.findUserByEmail(email).pipe(
      map(userDto => userDto ? this.userMapper.fromDto(userDto) : null),
      catchError(error => {
        console.error('Error finding user by email:', error);
        return of(null);
      })
    );
  }

  /**
   * Crear Usuario
   * @param email
   */
  createUser(email: string): Observable<User> {
    return this.userApiService.createUser(email).pipe(
      map(userDto => this.userMapper.fromDto(userDto))
    );
  }
}
