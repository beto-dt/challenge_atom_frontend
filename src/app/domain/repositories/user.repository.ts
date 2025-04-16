import { Observable } from 'rxjs';
import {User} from '../models/user.model';

export interface UserRepository {
  findUserByEmail(email: string): Observable<User | null>;
  createUser(email: string): Observable<User>;
}
