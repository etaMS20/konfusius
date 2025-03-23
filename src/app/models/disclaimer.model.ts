export type DisclaimerFormStore = {
  [key: number]: DisclaimerForm;
};

export type DisclaimerForm = {
  understood: boolean;
  experience?: string;
};
