import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { CalendarEvent, CalendarView, CalendarModule } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { setHours, setMinutes } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WcStoreAPI } from '@services/api/wc-store-api.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CalendarModule, MatButtonToggleModule, FormsModule],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  private readonly wcStoreApi = inject(WcStoreAPI);
  view: CalendarView = CalendarView.Day;

  viewDates: Date[] = [
    new Date(2026, 4, 15),
    new Date(2026, 4, 16),
    new Date(2026, 4, 17),
    new Date(2026, 4, 18),
  ];

  viewDate: Date = this.viewDates[0];

  calendarEntries = signal<CalendarEvent[]>([]);

  ngOnInit() {
    this.loadProductsToCalendar();
  }

  events: CalendarEvent[] = [
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(2026, 4, 15), 0), 3),
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(2026, 4, 15), 0), 3),
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(2026, 4, 15), 0), 5),
    },
  ];

  private loadProductsToCalendar() {
    this.wcStoreApi.listProducts().subscribe((products) => {
      const shifts = products.map((product) => ({
        title: product.name ?? 'Untitled Shift',
        start: setHours(setMinutes(new Date(2026, 4, 15), 0), 5), // Example: using product ID as timestamp
        end: setHours(setMinutes(new Date(2026, 4, 15), 30), 13), // Example end time
      }));
      this.calendarEntries.set(shifts);
    });
  }
}
