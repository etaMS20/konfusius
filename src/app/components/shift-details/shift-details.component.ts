import { Component, inject, OnInit } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';
import { Observable } from 'rxjs';
import { WcProduct } from '../shift/shift.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
  ],
})
export class ShiftDetailsComponent implements OnInit {
  private readonly shiftsService = inject(ShiftsService);
  selectedShift$!: Observable<WcProduct | null>;

  ngOnInit(): void {
    this.selectedShift$ = this.shiftsService.getSelectedShift;
  }

  checkout() {
    // Logic to close the footer, e.g., hide it or emit an event to the parent component
    console.log('Footer closed');
  }
}
