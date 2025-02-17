import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shift-dialog',
  imports: [],
  templateUrl: './shift-dialog.component.html',
  styleUrl: './shift-dialog.component.scss',
  standalone: true,
})
export class ShiftDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public shift: any) {}
}
