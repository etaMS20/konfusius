import { inject, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { WcProduct } from '../components/product/product.model';
import { WcApiWrapper } from './wc-wrapper.service';
import CoCart from '@cocart/cocart-rest-api';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  wcHttp = inject(WcApiWrapper);
  coCartHttp = new CoCart({
    url: 'https://konfusius.org',
    consumerKey: '',
    consumerSecret: '',
  });

  constructor() {}

  addProductToCart(id: string): Observable<WcProduct> {
    return from(this.coCartHttp.post('cart/add-item', { id }, null));
  }
}
