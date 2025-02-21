import {
  Component,
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
  imports: [MatGridListModule, ProductComponent, NgFor, NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  @Output() productSelected = new EventEmitter<WcProduct | null>();

  productService = inject(ProductService);
  cartService = inject(CoCartService);
  productSelectionService = inject(ProductSelectionService);

  products = signal<Array<WcProduct>>([]);
  productsLoaded = signal<boolean>(false);
  selectedProduct = signal<WcProduct | null>(null);

  ngOnInit(): void {
    this.initProducts();
    this.selectedProduct.set(null);
    this.productSelected.emit(null);
  }

  isSelected(product: WcProduct): boolean {
    return this.selectedProduct() === product;
  }

  selectProduct(product: WcProduct) {
    const isSelected = this.isSelected(product);
    this.selectedProduct.set(isSelected ? null : product);
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
      this.productsLoaded.set(true);
    });
  }

  addProductToCart(id: number) {
    this.cartService.addProductToCart(id).subscribe((response) => {
      console.log(response);
    });
  }
}
