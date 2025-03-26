import { FormControl } from '@angular/forms';

export type DisclaimerFormStore = {
  [key: number]: Disclaimer;
};

export type DisclaimerStore = {
  [key: number]: Disclaimer;
};

export interface DisclaimerFormControl {
  understood: FormControl<boolean>;
  experience: FormControl<string | undefined>;
}

export interface DisclaimerState {
  understood: boolean;
  experience?: string;
}

export type DisclaimerStateStore = Record<string, DisclaimerState>;

export type Disclaimer = {
  content?: string;
  textbox_content?: string;
};

export enum DisclaimerAttributeKey {
  CONTENT = 'disclaimer',
  TEXTBOX = 'disclaimer_textbox',
}
