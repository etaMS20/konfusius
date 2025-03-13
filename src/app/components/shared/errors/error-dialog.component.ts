import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { WcStoreError } from './error-types';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
  selector: 'error-dialog',
  imports: [MatDialogModule, SafeHtmlPipe],
  template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content [innerHTML]="errData.message | safeHtml" />
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
    public errData: WcStoreError,
  ) {}

  close() {
    this.dialogRef.close();
  }
}
