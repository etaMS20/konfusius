import { NgFor } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductSelectionService } from '../../../services/product-selection.service';
import { ProductService } from '../../../services/product.service';
import { WcStoreAPI } from '../../../services/wc-store-api.service';
import { ProductComponent } from '../product/product.component';
import { WcProduct } from '../../../models/product.model';

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

  cols: number = 5;

  ngOnInit(): void {
    this.initProducts();
    this.productSelected.emit(null);
    this.updateCols();
  }

  updateCols(): void {
    const width = window.innerWidth;

    if (width <= 600) {
      this.cols = 2; // small screens (e.g., mobile)
    } else if (width <= 960) {
      this.cols = 3; // medium screens (e.g., tablets)
    } else if (width <= 1280) {
      this.cols = 4; // larger screens (e.g., small laptops)
    } else if (width <= 1920) {
      this.cols = 5; // FHD screens (e.g., standard desktops)
    } else if (width <= 3840) {
      this.cols = 6; // 4K screens (3840px wide)
    } else {
      this.cols = 7; // ultra-wide monitors
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateCols();
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
