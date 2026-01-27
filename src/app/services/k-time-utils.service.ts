import { Injectable } from '@angular/core';
import { CustomTime, ParsedVariationTime } from '@models/calendar.model';
import { DateTime, Duration } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class KTimeUtilsService {
  public variationIntervalRegex =
    /P(?:\d+D)?T(?:\d+H)?(?:\d+M)?\/PT(?:\d+H)?(?:\d+M)?/;
  public anchorDate: Date = new Date();
  public festivalStart: Date = new Date();
  public defaultDuration = Duration.fromISO('PT4H');

  public locale = 'de-DE';

  constructor() {}

  setFestivalStart(festivalStart: Date) {
    this.festivalStart = festivalStart;
    this.anchorDate = new Date(
      festivalStart.getFullYear(),
      festivalStart.getMonth(),
      0,
    );
  }

  parseAnchorInterval(
    rawInterval: string,
    anchorDate?: DateTime,
  ): ParsedVariationTime | undefined {
    try {
      const anchor = anchorDate ?? DateTime.fromJSDate(this.anchorDate);
      const [interval, meta] = rawInterval.split(':'); // if the interval has metadata e.g. a price
      const [offsetStr, durationStr] = interval.split('/');

      const offset = Duration.fromISO(offsetStr);
      const duration =
        durationStr === CustomTime.OPEN_END
          ? this.defaultDuration
          : Duration.fromISO(durationStr);

      if (!offset.isValid || !duration.isValid) {
        console.error(`Invalid ISO duration format: ${rawInterval}`);
        return undefined;
      }

      const start = anchor.plus(offset);
      const end = start.plus(duration);

      return { start, end, meta };
    } catch (error) {
      console.error(`Failed to parse interval "${rawInterval}":`, error);
      return;
    }
  }

  formatToHumanReadable(parsed: ParsedVariationTime): string {
    const { start, end } = parsed;

    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    const weekdayFormat: Intl.DateTimeFormatOptions = { weekday: 'long' };

    const startStr = `${start.setLocale(this.locale).toLocaleString(weekdayFormat)} ${start.setLocale(this.locale).toLocaleString(timeFormat)}`;

    const endStr = start.hasSame(end, 'day')
      ? end.setLocale(this.locale).toLocaleString(timeFormat)
      : `${end.setLocale(this.locale).toLocaleString(weekdayFormat)} ${end.setLocale(this.locale).toLocaleString(timeFormat)}`;

    return `${startStr} bis ${endStr}`;
  }
}
