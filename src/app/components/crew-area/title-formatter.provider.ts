import { LOCALE_ID, Injectable, inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  private locale = inject(LOCALE_ID);

  // you can override any of the methods defined in the parent class

  override month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}</b> ${
      event.title
    }`;
  }

  override week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'HH:mm', this.locale)}</b> ${
      event.title
    }`;
  }

  override day(event: CalendarEvent): string {
    return `<b>${event.title}</b>
      </br>${formatDate(event.start, 'HH:mm', this.locale)} - ${formatDate(event.end!, 'HH:mm', this.locale)}
      <br/><b>${event.meta?.stock.class} - ${event.meta?.stock.text}</b>`;
  }
}
