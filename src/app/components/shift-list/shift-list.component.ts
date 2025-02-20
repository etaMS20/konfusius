import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
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
  @Output() shiftsLoadedChange = new EventEmitter<boolean>();
  shiftService = inject(ShiftsService);
  shifts = signal<Array<WcProduct>>([]);
  shiftsLoaded = signal<boolean>(false);
  selectedShift = signal<WcProduct | null>(null);

  ngOnInit(): void {
    this.queryShifts();
    this.shiftService.getSelectedShift.subscribe((shift) => {
      this.selectedShift.set(shift);
    });
  }

  isSelected(shift: WcProduct): boolean {
    return this.selectedShift() === shift;
  }

  selectShift(shift: WcProduct) {
    this.shiftService.setSelectedShift(this.isSelected(shift) ? null : shift);
  }

  queryShifts() {
    this.shiftService.listAllShifts.subscribe((products) => {
      this.shifts.set(products);
      this.shiftsLoaded.set(true);
      console.log('Shifts:', this.shifts());
    });
  }

  queryShift(id: number) {
    this.shiftService.getShiftById(id).subscribe((product) => {
      console.log('Product:', product);
    });
  }

  addShiftToCart(id: number) {
    this.shiftService.addShiftToCart(id).subscribe((response) => {
      console.log(response);
    });
  }
}
