import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanReadableDate',
})
export class HumanReadableDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleDateString('de-DE', options);
  }
}
