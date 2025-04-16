import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '@domain/models/task.model';

export interface TaskEditDialogData {
  task: Task;
}

export interface TaskEditDialogResult {
  title: string;
  description: string;
}

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit.dialog.html',
  styleUrls: ['./task-edit.dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class TaskEditDialog implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskEditDialog, TaskEditDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: TaskEditDialogData
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa el formulario con los datos de la tarea
   */
  private initForm(): void {
    this.taskForm = this.fb.group({
      title: [this.data.task.title, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      description: [this.data.task.description, [
        Validators.required,
        Validators.maxLength(500)
      ]]
    });
  }

  /**
   * Verifica si un campo tiene error y ha sido tocado
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.taskForm.get(controlName);
    return !!control && control.hasError(errorName) && (control.dirty || control.touched);
  }

  /**
   * Guarda los cambios y cierra el diálogo
   */
  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  /**
   * Cancela la edición y cierra el diálogo
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
