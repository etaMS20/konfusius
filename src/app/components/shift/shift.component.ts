import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShiftDialogComponent } from '../shift-dialog/shift-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  imports: [MatCardModule, MatExpansionModule, CommonModule],
})
export class ShiftComponent {
  @Input() shift: any;
  @Input() isSelected: boolean = false;
  @Output() shiftSelected = new EventEmitter<any>();

  constructor(private readonly dialog: MatDialog) {}

  onShiftSelect(event: Event): void {
    this.shiftSelected.emit();
  }

  openDetailsDialog(event: Event) {
    event.stopPropagation();
    this.dialog.open(ShiftDialogComponent, {
      data: this.shift,
      width: '800px',
    });
  }
}
