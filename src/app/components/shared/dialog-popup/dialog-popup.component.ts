import { Component, Inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { BaseDialogData } from '@models/types.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.scss'],
  standalone: true,
  imports: [
    MatIconButton,
    MatIconModule,
    MatDividerModule,
    SafeHtmlPipe,
    CommonModule,
  ],
})
export class DialogPopupComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<DialogPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BaseDialogData,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
