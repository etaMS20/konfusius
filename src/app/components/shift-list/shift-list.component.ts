import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WcProduct } from '../shift/shift.model';
import { ShiftComponent } from '../shift/shift.component';
import { ShiftsService } from '../../services/shifts.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'shift-list',
  imports: [MatGridListModule, ShiftComponent, NgFor, NgIf],
  templateUrl: './shift-list.component.html',
  styleUrl: './shift-list.component.scss',
})
export class ShiftListComponent implements OnInit {
  shiftService = inject(ShiftsService);
  shifts = signal<Array<WcProduct>>([]);
  shiftsLoaded = signal<boolean>(false);

  ngOnInit(): void {
    this.queryShifts();
  }

  selectedShift: WcProduct | null = null;

  selectShift(shift: WcProduct) {
    this.selectedShift = this.selectedShift === shift ? null : shift;

    if (this.selectedShift === shift) console.log('Selected product:', shift);
  }

  queryShifts() {
    this.shiftService.getShiftsBackend.subscribe((products) => {
      this.shifts.set(products);
      this.shiftsLoaded.set(true);
      console.log('Shifts:', this.shifts());
    });
  }
}
