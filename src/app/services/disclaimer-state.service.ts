import { Injectable } from '@angular/core';
import {
  Disclaimer,
  DisclaimerAttributeKey,
  DisclaimerForm,
  DisclaimerFormStore,
  DisclaimerStore,
} from '@models/disclaimer.model';
import {
  productsWithDisclaimer,
  WcProduct,
  WcProductAttribute,
} from '@models/product.model';

/**
 * Service to communicate the Disclaimer state to the checkout page
 */
@Injectable({
  providedIn: 'root',
})
export class DisclaimerStateService {
  private stateStore: DisclaimerFormStore = {};
  private contentStore: DisclaimerStore = {};
  public context?: number;
  public contextName?: string;

  constructor() {}

  validateDisclaimerState(id: number): boolean {
    const state = this.stateStore[id];
    if (state) {
      return state.understood === true;
    } else return false;
  }

  hasProductDisclaimer(productId?: number) {
    if (productId) {
      return productsWithDisclaimer.has(productId);
    } else return false;
  }

  pushDisclaimerState(pKey: number, pushEvent: DisclaimerForm) {
    this.stateStore[pKey] = pushEvent;
  }

  setDisclaimer(p: WcProduct) {
    this.context = p.id;
    this.contextName = p.name;
    const id = p.id;

    const fetchedContent =
      p.attributes?.find(
        (attr: WcProductAttribute) =>
          attr.name === DisclaimerAttributeKey.CONTENT,
      )?.terms[0].name ?? undefined;

    const fetchedTextbox =
      p.attributes?.find(
        (attr: WcProductAttribute) =>
          attr.name === DisclaimerAttributeKey.TEXTBOX,
      )?.terms[0].name ?? undefined;

    this.contentStore[id] = {
      content: fetchedContent,
      textbox_content: fetchedTextbox,
    };
  }

  getDisclaimer(pKey?: number): Disclaimer | undefined {
    return pKey ? this.contentStore[pKey] : undefined;
  }

  purgeDisclaimerState() {
    this.stateStore = {};
  }
}
