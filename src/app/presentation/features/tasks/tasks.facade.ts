import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of, tap } from 'rxjs';
import { Task } from '@domain/models/task.model';
import { GetTasksUseCase } from '@domain/usecases/task/get-tasks.usecase';
import { CreateTaskUseCase } from '@domain/usecases/task/create-task.usecase';
import { UpdateTaskUseCase } from '@domain/usecases/task/update-task.usecase';
import { DeleteTaskUseCase } from '@domain/usecases/task/delete-task.usecase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private savingTaskSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  tasks$ = this.tasksSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  savingTask$ = this.savingTaskSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(
    private getTasksUseCase: GetTasksUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Carga las tareas de un usuario
   * @param userId ID del usuario
   */
  loadTasks(userId: string): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.getTasksUseCase.execute(userId).pipe(
      tap(tasks => {
        const sortedTasks = [...tasks].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.tasksSubject.next(sortedTasks);
      }),
      catchError(error => {
        console.error('Error loading tasks', error);
        this.errorSubject.next('No se pudieron cargar las tareas. Inténtalo de nuevo.');
        this.snackBar.open('Error al cargar las tareas', 'Cerrar', { duration: 3000 });
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }

  /**
   * Crea una nueva tarea
   * @param userId ID del usuario propietario
   * @param taskData Datos de la tarea
   */
  createTask(userId: string, taskData: { title: string; description: string }): void {
    this.savingTaskSubject.next(true);
    this.errorSubject.next(null);

    this.createTaskUseCase.execute(userId, taskData).pipe(
      tap(newTask => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next([newTask, ...currentTasks]);
        this.snackBar.open('Tarea creada con éxito', 'Cerrar', { duration: 3000 });
      }),
      catchError(error => {
        console.error('Error creating task', error);
        this.errorSubject.next('No se pudo crear la tarea. Inténtalo de nuevo.');
        this.snackBar.open('Error al crear la tarea', 'Cerrar', { duration: 3000 });
        return of(null);
      }),
      finalize(() => this.savingTaskSubject.next(false))
    ).subscribe();
  }

  /**
   * Actualiza una tarea existente
   * @param taskId ID de la tarea
   * @param taskData Datos parciales de la tarea
   */
  updateTask(taskId: string, taskData: Partial<Task>): void {
    this.savingTaskSubject.next(true);
    this.errorSubject.next(null);

    this.updateTaskUseCase.execute(taskId, taskData).pipe(
      tap(updatedTask => {
        const currentTasks = this.tasksSubject.getValue();
        const index = currentTasks.findIndex(task => task.id === taskId);

        if (index !== -1) {
          const updatedTasks = [...currentTasks];
          updatedTasks[index] = updatedTask;
          this.tasksSubject.next(updatedTasks);
        }

        if (taskData.title || taskData.description) {
          this.snackBar.open('Tarea actualizada con éxito', 'Cerrar', { duration: 3000 });
        }
      }),
      catchError(error => {
        console.error('Error updating task', error);
        this.errorSubject.next('No se pudo actualizar la tarea. Inténtalo de nuevo.');
        this.snackBar.open('Error al actualizar la tarea', 'Cerrar', { duration: 3000 });
        return of(null);
      }),
      finalize(() => this.savingTaskSubject.next(false))
    ).subscribe();
  }

  /**
   * Elimina una tarea
   * @param userId
   * @param taskId ID de la tarea a eliminar
   */
  deleteTask(userId: string,taskId: string): void {
    this.savingTaskSubject.next(true);
    this.errorSubject.next(null);

    this.deleteTaskUseCase.execute(userId,taskId).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.getValue();
        const updatedTasks = currentTasks.filter(task => task.id !== taskId);
        this.tasksSubject.next(updatedTasks);
        this.snackBar.open('Tarea eliminada con éxito', 'Cerrar', { duration: 3000 });
      }),
      catchError(error => {
        console.error('Error deleting task', error);
        this.errorSubject.next('No se pudo eliminar la tarea. Inténtalo de nuevo.');
        this.snackBar.open('Error al eliminar la tarea', 'Cerrar', { duration: 3000 });
        return of(null);
      }),
      finalize(() => this.savingTaskSubject.next(false))
    ).subscribe();
  }
}
