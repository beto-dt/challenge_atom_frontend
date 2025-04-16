import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TaskRepositoryImpl} from '@data/repositories/task.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  /**
   * Eliminar Tarea
   * @param userId
   * @param taskId
   */
  execute(userId:string, taskId: string): Observable<void> {
    return this.taskRepository.deleteTask(userId, taskId);
  }
}
