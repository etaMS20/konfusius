import { NgFor } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductSelectionService } from '../../services/product-selection.service';
import { ProductService } from '../../services/product.service';
import { WcStoreAPI } from '../../services/wc-store-api.service';
import { ProductComponent } from '../product/product.component';
import { WcProduct } from '../../models/product.model';

@Component({
  selector: 'product-list',
  imports: [MatGridListModule, ProductComponent, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  @Output() productSelected = new EventEmitter<WcProduct | null>();
  @Output() productsLoading = new EventEmitter<boolean>(true);

  productService = inject(ProductService);
  productSelectionService = inject(ProductSelectionService);
  wcStore = inject(WcStoreAPI);

  products = signal<Array<WcProduct>>([]);
  productsLoaded = computed<boolean>(() => {
    return this.products().length > 0;
  });

  ngOnInit(): void {
    this.initProducts();
    this.productSelected.emit(null);
  }

  isSelected(product: WcProduct): boolean {
    return this.productSelectionService.getSelectedProduct() === product;
  }

  selectProduct(product: WcProduct) {
    const isSelected = this.isSelected(product);
    this.productSelectionService.setSelectedProduct(
      isSelected ? null : product
    );
    this.productSelected.emit(isSelected ? null : product);
  }

  initProducts() {
    this.wcStore.listProducts().subscribe((response) => {
      const products = response.map((product: any) =>
        this.productService.mapProduct(product)
      );
      this.products.set(products);
      this.productsLoading.emit(false);
    });
  }

  testCheckout() {
    const billing = {
      first_name: 'Peter',
      last_name: 'Venkman',
      company: '',
      address_1: '550 Central Park West',
      address_2: 'Corner Penthouse Spook Central',
      city: 'New York',
      state: 'NY',
      postcode: '10023',
      country: 'US',
      email: 'admin@example.com',
      phone: '555-2368',
    };
    this.wcStore.checkout(billing).subscribe((r) => console.log(r));
  }
}
