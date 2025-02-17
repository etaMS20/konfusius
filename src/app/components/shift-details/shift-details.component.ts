import { Component, inject } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.scss'],
  standalone: true,
})
export class ShiftDetailsComponent {
  private readonly shiftsService = inject(ShiftsService);

  closeFooter() {
    // Logic to close the footer, e.g., hide it or emit an event to the parent component
    console.log('Footer closed');
  }
}
