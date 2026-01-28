export interface ParsedVariationTime {
  start: Date;
  end: Date;
}

export type ISODateTime =
  `${string}-${string}-${string}T${string}:${string}:${string}`;
export type ISODuration = `P${string}`;
export type ShiftInterval = `${ISODateTime}/${ISODuration}`;
