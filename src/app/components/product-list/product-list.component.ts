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
import { WcProduct } from '../product/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { CoCartService } from '../../services/co-cart.service';
import { ProductSelectionService } from '../../services/product-selection.service';

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
  cartService = inject(CoCartService);
  productSelectionService = inject(ProductSelectionService);

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
    this.cartService.listProducts().subscribe((response) => {
      const products = response.data.products.map((product: any) =>
        this.productService.mapProduct(product)
      );
      this.products.set(products);
      this.productsLoading.emit(false);
    });
  }
}
