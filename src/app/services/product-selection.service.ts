import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WcProduct } from '../components/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductSelectionService {
  private readonly selectedProductSubject =
    new BehaviorSubject<WcProduct | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  setSelectedProduct(product: WcProduct | null): void {
    this.selectedProductSubject.next(product);
  }

  getSelectedProduct(): WcProduct | null {
    return this.selectedProductSubject.getValue();
  }
}
