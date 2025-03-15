export enum AuthType {
  CREW = 'crew',
  GUEST = 'guest',
}

export const authProductCatMap: Record<AuthType, number> = {
  [AuthType.CREW]: 32,
  [AuthType.GUEST]: 22,
};
