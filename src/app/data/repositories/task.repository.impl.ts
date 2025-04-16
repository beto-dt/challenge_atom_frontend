import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Task } from '@domain/models/task.model';
import { TaskRepository } from '@domain/repositories/task.repository';
import {TaskApiService} from '@data/datasources/remote/task.api.service';
import {TaskMapper} from '@data/mappers/task.mapper';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    private taskApiService: TaskApiService,
    private taskMapper: TaskMapper
  ) {}

  /**
   * Obtener todas las tareas
   * @param userId
   */
  getTasks(userId: string): Observable<Task[]> {
    return this.taskApiService.getTasks(userId).pipe(
      map(taskDtos => taskDtos.map(dto => this.taskMapper.fromDto(dto)))
    );
  }

  /**
   * Obtener una tarea por la id
   * @param id
   */
  getTaskById(id: string): Observable<Task> {
    return this.taskApiService.getTaskById(id).pipe(
      map(taskDto => this.taskMapper.fromDto(taskDto))
    );
  }

  /**
   * Crear Tarea
   * @param task
   */
  createTask(task: Task): Observable<Task> {
    const dto = this.taskMapper.toDto(task);
    return this.taskApiService.createTask(dto).pipe(
      map(responseDto => this.taskMapper.fromDto(responseDto))
    );
  }

  /**
   * Actualizar Tarea
   * @param id
   * @param task
   */
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    const dto = this.taskMapper.toDto(task as Task);
    return this.taskApiService.updateTask(id, dto).pipe(
      map(responseDto => this.taskMapper.fromDto(responseDto))
    );
  }

  /**
   * Eliminar Tarea
   * @param userId
   * @param taskId
   */
  deleteTask(userId: string,taskId: string): Observable<void> {
    return this.taskApiService.deleteTask(userId, taskId);
  }
}
