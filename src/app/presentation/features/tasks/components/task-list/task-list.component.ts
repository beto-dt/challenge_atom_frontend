import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { Task } from '@domain/models/task.model';
import { AuthService } from '@core/authentication/services/auth.service';

import {
  ConfirmDialogComponent,
  ConfirmDialogData
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {
  LoadingIndicatorComponent
} from '@shared/components/loading-indicator/loading-indicator.component';
import {Observable} from 'rxjs';
import {TaskFormComponent} from '@presentation/features/tasks/components/task-form/task-form.component';
import {TaskItemComponent} from '@presentation/features/tasks/components/task-item/task-item.component';
import {TasksFacade} from '@presentation/features/tasks/tasks.facade';
import {AppRoutes} from '@config/app-settings';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    LoadingIndicatorComponent,
    TaskFormComponent,
    TaskItemComponent
  ]
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  savingTask$: Observable<boolean>;

  selectedTask: Task | null = null;

  constructor(
    private tasksFacade: TasksFacade,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.tasks$ = this.tasksFacade.tasks$;
    this.loading$ = this.tasksFacade.loading$;
    this.savingTask$ = this.tasksFacade.savingTask$;
  }

  ngOnInit(): void {
    this.loadUserTasks();
  }

  /**
   * Carga las tareas del usuario actual
   */
  private loadUserTasks(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.tasksFacade.loadTasks(currentUser.id!);
    } else {
      this.router.navigate([AppRoutes.login]);
    }
  }

  /**
   * Maneja la creación o actualización de una tarea
   */
  onTaskSubmit(taskData: { title: string; description: string }): void {
    const userId = this.authService.getCurrentUser()?.id;

    if (!userId) {
      return;
    }

    if (this.selectedTask) {
      this.tasksFacade.updateTask(this.selectedTask.id!, {
        ...taskData, userId
      });
    } else {
      this.tasksFacade.createTask(userId, taskData);
    }

    this.selectedTask = null;
  }

  /**
   * Cancela la edición de una tarea
   */
  onCancelEdit(): void {
    this.selectedTask = null;
  }

  /**
   * Selecciona una tarea para editar
   */
  onEditTask(task: Task): void {
    this.selectedTask = task;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Actualiza el estado de completado de una tarea
   */
  onTaskStatusChange(event: { taskId: string; completed: boolean }): void {
    const userId = this.authService.getCurrentUser()?.id;

    if (!userId) {
      return;
    }
    this.tasksFacade.updateTask(event.taskId, { completed: event.completed, userId });
  }

  /**
   * Muestra diálogo de confirmación y elimina la tarea si se confirma
   */
  onDeleteTask(taskId: string): void {
    const dialogData: ConfirmDialogData = {
      title: 'Eliminar tarea',
      message: '¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'warn'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      const userId = this.authService.getCurrentUser()?.id;
      if (!userId) {
        return;
      }
      if (result) {
        this.tasksFacade.deleteTask(userId,taskId);
      }
    });
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate([AppRoutes.login]);
  }

  /**
   * Función para optimizar el renderizado de listas con *ngFor
   */
  trackByTaskId(index: number, task: Task): string {
    return task.id || '';
  }
}
