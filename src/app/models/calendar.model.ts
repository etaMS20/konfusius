import { DateTime } from 'luxon';

export enum CustomTime {
  OPEN_END = 'OPEN',
}

export interface ParsedVariationTime {
  start: DateTime;
  end: DateTime;
  meta?: string;
}
