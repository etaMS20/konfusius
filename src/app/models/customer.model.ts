export interface WcBillingAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode: string;
  country: string;
  email: string;
  phone?: string;
}

export interface WcShippingAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
}

export interface BillingExtra {
  billing_invite: string;
  billing_gebote: string;
  billing_disclaimer_experience: string;
  billing_disclaimer_confirmed: string;
  billing_food_intolerance: string;
}

export type Billing = WcBillingAddress & BillingExtra;
