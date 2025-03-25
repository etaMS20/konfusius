import { Disclaimer, DisclaimerAttributeKey } from '@models/disclaimer.model';
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
