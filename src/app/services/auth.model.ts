export interface GuestAuth {
  success: boolean;
  token: string;
  user_id: string;
  token_data: any;
  nonce: string;
}
