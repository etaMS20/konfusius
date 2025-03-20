import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private readonly SECRET = 'miau'; // don't change this during production

  constructor() {}

  // url-safe encryption
  encrypt(plainText: string): string {
    const b64 = CryptoJS.AES.encrypt(plainText, this.SECRET).toString();
    const e64 = CryptoJS.enc.Base64.parse(b64);
    const eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  }

  decrypt(cipherText: string): string {
    const reb64 = CryptoJS.enc.Hex.parse(cipherText);
    const bytes = reb64.toString(CryptoJS.enc.Base64);
    const decrypt = CryptoJS.AES.decrypt(bytes, this.SECRET);
    const plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  }
}
