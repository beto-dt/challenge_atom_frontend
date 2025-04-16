import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpBaseService} from '@core/http/http-base.service';
import {UserDto} from '@data/dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private endpoint = 'users';

  constructor(private httpBase: HttpBaseService) {}

  /**
   * Encontrar usuario por Email
   * @param email
   */
  findUserByEmail(email: string): Observable<UserDto | null> {
    return this.httpBase.get<UserDto | null>(`${this.endpoint}/${email}`);
  }

  /**
   * Crear Usuario
   * @param email
   */
  createUser(email: string): Observable<UserDto> {
    return this.httpBase.post<UserDto>(this.endpoint, {
      email,
      createdAt: new Date().toISOString()
    });
  }
}
