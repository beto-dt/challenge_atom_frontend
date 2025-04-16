import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../../domain/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Input() loading = false;
  @Output() submitTask = new EventEmitter<{ title: string; description: string }>();
  @Output() cancelEdit = new EventEmitter<void>();

  taskForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.taskForm) {
      this.updateForm();
    }
  }

  /**
   * Inicializa el formulario reactivo
   */
  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });

    this.updateForm();
  }

  /**
   * Actualiza el formulario con los datos de la tarea si existe
   */
  private updateForm(): void {
    this.isEditMode = !!this.task;

    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description
      });
    } else {
      this.taskForm.reset();
    }
  }

  /**
   * Envía el formulario para crear o actualizar tarea
   */
  onSubmit(): void {
    if (this.taskForm.invalid || this.loading) {
      return;
    }

    const { title, description } = this.taskForm.value;
    this.submitTask.emit({ title, description });

    if (!this.isEditMode) {
      this.taskForm.reset();
    }
  }

  /**
   * Cancela la edición de la tarea
   */
  onCancel(): void {
    this.cancelEdit.emit();
    this.taskForm.reset();
  }

  /**
   * Comprueba si un campo tiene errores y ha sido tocado
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.taskForm.get(controlName);
    return !!control && control.hasError(errorName) && (control.dirty || control.touched);
  }
}
