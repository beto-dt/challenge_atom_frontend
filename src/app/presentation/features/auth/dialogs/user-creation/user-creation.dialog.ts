import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface UserCreationDialogData {
  email: string;
}

@Component({
  selector: 'app-user-creation-dialog',
  templateUrl: './user-creation.dialog.html',
  styleUrls: ['./user-creation.dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class UserCreationDialog {
  constructor(
    public dialogRef: MatDialogRef<UserCreationDialog, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: UserCreationDialogData
  ) {}

  /**
   * Confirma la creación del usuario
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Cancela la creación del usuario
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
