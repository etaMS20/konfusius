import { DateTime, Duration } from 'luxon';

export class WcTimeframeUtil {
  private anchorDate: Date;

  constructor(anchorDate?: Date) {
    this.anchorDate = anchorDate ?? new Date();
  }

  parseRelativeInterval(
    interval: string,
    anchorDate?: DateTime,
  ): { start: Date; end: Date } {
    const defaultResult = { start: this.anchorDate, end: this.anchorDate };
    try {
      const anchor = anchorDate ?? DateTime.fromJSDate(this.anchorDate);
      const [offsetStr, durationStr] = interval.split('/');

      const offset = Duration.fromISO(offsetStr);
      const duration = Duration.fromISO(durationStr);

      if (!offset.isValid || !duration.isValid) {
        console.error(`Invalid ISO duration format: ${interval}`);
        return defaultResult;
      }

      const start = anchor.plus(offset);
      const end = start.plus(duration).minus({ seconds: 1 }); // inclusive end

      return { start: start.toJSDate(), end: end.toJSDate() };
    } catch (error) {
      console.error(`Failed to parse interval "${interval}":`, error);
      return defaultResult;
    }
  }
}
