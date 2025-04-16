import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

export interface TaskRepository {
  getTasks(userId: string): Observable<Task[]>;
  getTaskById(id: string): Observable<Task>;
  createTask(task: Task): Observable<Task>;
  updateTask(id: string, task: Partial<Task>): Observable<Task>;
  deleteTask(userId: string,taskId: string): Observable<void>;
}
