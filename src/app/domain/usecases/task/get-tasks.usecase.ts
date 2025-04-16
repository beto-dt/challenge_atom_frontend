import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@domain/models/task.model';
import {TaskRepositoryImpl} from '@data/repositories/task.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  /**
   * Obtener Tarea por Id
   * @param userId
   */
  execute(userId: string): Observable<Task[]> {
    return this.taskRepository.getTasks(userId);
  }
}
