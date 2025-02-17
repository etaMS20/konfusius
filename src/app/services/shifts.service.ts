import { inject, Injectable } from '@angular/core';
import { IMAGE_MAP, WcProduct } from '../components/shift/shift.model';
import { WcApiWrapperService } from './wc-api-wrapper.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  wcHttp = inject(WcApiWrapperService);
  shifts: Observable<Array<WcProduct>>;

  constructor() {
    this.shifts = this.wcHttp.getProducts(22);
  }

  mapProduct(product: any): WcProduct {
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      stock_quantity: product.stock_quantity,
      stock_status: product.stock_status,
      imagePath: product.id in IMAGE_MAP ? IMAGE_MAP[product.id] : undefined,
    };
  }

  get getShiftsBackend() {
    return this.shifts.pipe(
      map((products: any[]) => products.map(this.mapProduct)),
      catchError((err) => {
        console.error('Error fetching shifts:', err);
        throw err;
      })
    );
  }
}
