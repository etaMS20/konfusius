import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShiftListComponent } from '../components/shift-list/shift-list.component';

@Component({
  selector: 'app-tickets',
  imports: [MatGridListModule, ShiftListComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent {}
