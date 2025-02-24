export interface WcCustomerInfo {
  billing_address: WcBillingAddress;
  shipping_address?: WcShippingAddress;
}

export interface WcBillingAddress {
  first_name: string;
  last_name: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email: string;
  phone: string;
}

export interface WcShippingAddress {
  first_name: string;
  last_name: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}
