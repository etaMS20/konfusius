export enum AuthType {
  CREW = 'crew',
  GUEST = 'guest',
  ARTIST = 'artist',
}

export const authProductCatMap: Record<AuthType, Array<number>> = {
  [AuthType.CREW]: [32, 22, 59],
  [AuthType.GUEST]: [22],
  [AuthType.ARTIST]: [22, 59],
};
