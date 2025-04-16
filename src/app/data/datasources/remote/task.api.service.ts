import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TaskDto} from '@data/dtos/task.dto';
import {HttpBaseService} from '@core/http/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private endpoint = 'tasks';

  constructor(private httpBase: HttpBaseService) {}

  /**
   * Obtener todas las tareas
   * @param userId
   */
  getTasks(userId: string): Observable<TaskDto[]> {
    return this.httpBase.get<TaskDto[]>(`${this.endpoint}?userId=${userId}`);
  }

  /**
   * Obtener una tarea por la id
   * @param id
   */
  getTaskById(id: string): Observable<TaskDto> {
    return this.httpBase.get<TaskDto>(`${this.endpoint}/${id}`);
  }

  /**
   * Crear Tarea
   * @param task
   */
  createTask(task: TaskDto): Observable<TaskDto> {
    return this.httpBase.post<TaskDto>(this.endpoint, task);
  }

  /**
   * Actualizar Tarea
   * @param id
   * @param task
   */
  updateTask(id: string, task: Partial<TaskDto>): Observable<TaskDto> {
    return this.httpBase.put<TaskDto>(`${this.endpoint}/${id}`, task);
  }

  /**
   * Eliminar Tarea
   * @param userId
   * @param taskId
   */
  deleteTask(userId: string,taskId: string): Observable<void> {
    return this.httpBase.delete<void>(`${this.endpoint}/${taskId}?userId=${userId}`);
  }
}
