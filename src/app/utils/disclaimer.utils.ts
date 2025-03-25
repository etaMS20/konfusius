import {
  Disclaimer,
  DisclaimerAttributeKey,
  DisclaimerState,
  DisclaimerStateStore,
} from '@models/disclaimer.model';
import { WcProduct, WcProductAttribute } from '@models/product.model';

export function getDisclaimer(p: WcProduct): Disclaimer {
  const attributes = p.attributes;
  return {
    content: attributes?.find(
      (attr: WcProductAttribute) =>
        attr.name === DisclaimerAttributeKey.CONTENT,
    )?.terms[0].name,

    textbox_content: attributes?.find(
      (attr: WcProductAttribute) =>
        attr.name === DisclaimerAttributeKey.TEXTBOX,
    )?.terms[0].name,
  };
}

export function getCurrentStateBySKU(
  store: DisclaimerStateStore,
  sku?: string,
): DisclaimerState | undefined {
  return sku ? store[sku] : undefined;
}
