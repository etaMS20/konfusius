import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Shift } from '../shift/shift.model';
import { ShiftComponent } from '../shift/shift.component';
import { ShiftsService } from '../../services/shifts.service';
import { catchError } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'shift-list',
  imports: [MatGridListModule, ShiftComponent, NgFor],
  templateUrl: './shift-list.component.html',
  styleUrl: './shift-list.component.scss',
})
export class ShiftListComponent implements OnInit {
  shiftService = inject(ShiftsService);
  shifts = signal<Array<Shift>>([]);
  products = signal<any>([]);

  ngOnInit(): void {
    this.shifts.set(this.shiftService.shifts);
  }

  selectedShift: Shift | null = null;

  selectShift(shift: Shift) {
    this.selectedShift = this.selectedShift === shift ? null : shift;

    if (this.selectedShift === shift) console.log('Selected product:', shift);
  }

  queryShifts() {
    console.log('Querying shifts...');
    this.shiftService.getShiftsBackend
      .pipe(
        catchError((err) => {
          console.error('Error fetching shifts:', err);
          throw err;
        })
      )
      .subscribe((shifts) => {
        this.products.set(shifts);
        console.log('Shifts:', this.products());
      });
  }
}
