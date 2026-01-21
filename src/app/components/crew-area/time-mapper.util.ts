import { DateTime, Duration } from 'luxon';

enum CustomTimes {
  OPEN_END = 'OPEN',
  START_OF_FESTIVAL = 'START',
}

export class WcTimeframeUtil {
  private anchorDate: Date;
  private defaultDate: Date;
  private defaultDuration = Duration.fromISO('PT4H');

  constructor(anchorDate?: Date, defaultDate?: Date) {
    this.anchorDate = anchorDate ?? new Date();
    this.defaultDate = defaultDate ?? new Date();
  }

  parseRelativeInterval(
    interval: string,
    anchorDate?: DateTime,
  ): { start: Date; end: Date; meta?: string } {
    const defaultResult = {
      start: this.defaultDate,
      end: this.defaultDate,
      meta: 'Fehler beim Parsen des Intervalls',
    };
    try {
      const anchor = anchorDate ?? DateTime.fromJSDate(this.anchorDate);
      const [rawInterval, meta] = interval.split(':'); // if the interval has metadata e.g. a price
      const [offsetStr, durationStr] = rawInterval.split('/');

      const offset = Duration.fromISO(offsetStr);
      const duration =
        durationStr === CustomTimes.OPEN_END
          ? this.defaultDuration
          : Duration.fromISO(durationStr);

      if (!offset.isValid || !duration.isValid) {
        console.error(`Invalid ISO duration format: ${rawInterval}`);
        return defaultResult;
      }

      const start = anchor.plus(offset);
      const end = start.plus(duration).minus({ seconds: 1 }); // inclusive end

      return { start: start.toJSDate(), end: end.toJSDate(), meta };
    } catch (error) {
      console.error(`Failed to parse interval "${interval}":`, error);
      return defaultResult;
    }
  }
}
