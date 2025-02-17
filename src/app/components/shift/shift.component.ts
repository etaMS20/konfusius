import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShiftDialogComponent } from '../shift-dialog/shift-dialog.component';
import { CommonModule } from '@angular/common';
import { WcProduct } from './shift.model';

@Component({
  selector: 'shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  imports: [MatCardModule, MatExpansionModule, CommonModule],
})
export class ShiftComponent {
  @Input() shift!: WcProduct;
  @Input() isSelected: boolean = false;
  @Output() shiftSelected = new EventEmitter<any>();
  isSelectedSignal = signal(this.isSelected);
  constructor(private readonly dialog: MatDialog) {}

  ngOnChanges(): void {
    this.isSelectedSignal.set(this.isSelected);
  }

  ngOnInit(): void {
    // Manually sync the signal with the initial state
    this.isSelectedSignal.set(this.isSelected);
  }

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
