import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@domain/models/task.model';
import {TaskRepositoryImpl} from '@data/repositories/task.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  /**
   * Actualizar Tarea
   * @param id
   * @param taskData
   */
  execute(id: string, taskData: Partial<Task>): Observable<Task> {
    return this.taskRepository.updateTask(id, taskData);
  }
}
