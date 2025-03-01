import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { WcStoreError } from './error-types';

@Component({
  selector: 'error-dialog',
  imports: [MatDialogModule],
  template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content>{{ errData.message }}</mat-dialog-content>
    <mat-dialog-content
      >{{ errData.data.status }}: {{ errData.code }}</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        color: red;
        font-weight: bold;
      }
    `,
  ],
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public errData: WcStoreError
  ) {}

  close() {
    this.dialogRef.close();
  }
}
