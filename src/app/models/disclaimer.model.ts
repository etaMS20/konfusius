export type DisclaimerFormStore = {
  [key: number]: DisclaimerForm;
};

export type DisclaimerStore = {
  [key: number]: Disclaimer;
};

export type DisclaimerForm = {
  understood: boolean;
  experience?: string;
};

export type Disclaimer = {
  content?: string;
  textbox_content?: string;
};

export enum DisclaimerAttributeKey {
  CONTENT = 'disclaimer',
  TEXTBOX = 'disclaimer_textbox',
}
