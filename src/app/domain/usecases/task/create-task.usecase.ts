import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@domain/models/task.model';
import {TaskRepositoryImpl} from '@data/repositories/task.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  /**
   * Crear Tarea
   * @param userId
   * @param taskData
   */
  execute(userId: string, taskData: { title: string; description: string }): Observable<Task> {
    const newTask: Task = {
      userId,
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date()
    };

    return this.taskRepository.createTask(newTask);
  }
}
