import { Injectable } from '@angular/core';
import { ParsedVariationTime } from '@models/time.model';
import { DateTime, Duration } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class KTimeUtilsService {
  public festivalStart: Date = new Date();
  public defaultDuration = Duration.fromISO('PT1H');

  public locale = 'de-DE';

  constructor() {}

  setFestivalStart(festivalStart: Date) {
    this.festivalStart = festivalStart;
  }

  parseShiftInterval(rawInterval?: string): ParsedVariationTime {
    const [startIso, durationIso] = (rawInterval || '').split('/');
    const start = DateTime.fromISO(startIso);

    if (!start.isValid) {
      return {
        start: new Date(),
        end: new Date(),
      };
    }

    const duration = Duration.fromISO(durationIso);
    const end = start.plus(duration.isValid ? duration : this.defaultDuration);

    return {
      start: start.toJSDate(),
      end: end.minus({ seconds: 1 }).toJSDate(),
    };
  }
}
