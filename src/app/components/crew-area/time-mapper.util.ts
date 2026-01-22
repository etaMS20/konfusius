import { ParsedVariationTime } from '@models/calendar.model';
import { DateTime, Duration } from 'luxon';

enum CustomTimes {
  OPEN_END = 'OPEN',
}

export class WcTimeframeUtil {
  private anchorDate: Date;
  private defaultDate: Date;
  private defaultDuration = Duration.fromISO('PT4H');
  private defaultResult: ParsedVariationTime;

  constructor(anchorDate?: Date, defaultDate?: Date) {
    this.anchorDate = anchorDate ?? new Date();
    this.defaultDate = defaultDate ?? new Date();
    this.defaultResult = {
      start: this.defaultDate,
      end: this.defaultDate,
      meta: 'Fallback Wert',
    };
  }

  parseAnchorInterval(
    rawInterval: string,
    anchorDate?: DateTime,
  ): ParsedVariationTime {
    try {
      const anchor = anchorDate ?? DateTime.fromJSDate(this.anchorDate);
      const [interval, meta] = rawInterval.split(':'); // if the interval has metadata e.g. a price
      const [offsetStr, durationStr] = interval.split('/');

      const offset = Duration.fromISO(offsetStr);
      const duration =
        durationStr === CustomTimes.OPEN_END
          ? this.defaultDuration
          : Duration.fromISO(durationStr);

      if (!offset.isValid || !duration.isValid) {
        console.error(`Invalid ISO duration format: ${rawInterval}`);
        return this.defaultResult;
      }

      const start = anchor.plus(offset);
      const end = start.plus(duration).minus({ seconds: 1 }); // inclusive end

      return { start: start.toJSDate(), end: end.toJSDate(), meta };
    } catch (error) {
      console.error(`Failed to parse interval "${rawInterval}":`, error);
      return this.defaultResult;
    }
  }

  parseCustomInterval(rawInterval: string): ParsedVariationTime {
    const [interval, meta] = rawInterval.split(':');
    const [dateTime, durationStr] = interval.split('/');
    const absPart = DateTime.fromISO(dateTime);
    const relPart = absPart.plus(Duration.fromISO(durationStr));
    if (!absPart.isValid || !relPart.isValid) {
      throw new Error(`Invalid ISO format: ${rawInterval}`);
    }
    if (absPart >= relPart) {
      return {
        start: relPart.toJSDate(),
        end: absPart.minus({ seconds: 1 }).toJSDate(),
        meta,
      };
    } else {
      return {
        start: absPart.toJSDate(),
        end: relPart.minus({ seconds: 1 }).toJSDate(),
        meta,
      };
    }
  }
}
