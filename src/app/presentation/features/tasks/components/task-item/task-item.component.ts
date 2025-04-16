import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task } from '@domain/models/task.model';
import {DateFormatPipe} from '@shared/pipes/date-format.pipe';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DateFormatPipe,
  ]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() statusChange = new EventEmitter<{ taskId: string; completed: boolean }>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  /**
   * Maneja el cambio de estado de la tarea (completada/pendiente)
   * @param completed Nuevo estado de completado
   */
  onStatusChange(completed: boolean): void {
    this.statusChange.emit({ taskId: this.task.id!, completed });
  }

  /**
   * Emite evento para editar la tarea
   */
  onEdit(): void {
    this.editTask.emit(this.task);
  }

  /**
   * Emite evento para eliminar la tarea
   */
  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }
}
