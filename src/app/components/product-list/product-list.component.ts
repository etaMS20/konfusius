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
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'product-list',
  imports: [MatGridListModule, ProductComponent, NgFor, NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  @Output() productsLoadedChange = new EventEmitter<boolean>();
  productService = inject(ProductService);
  cartService = inject(CartService);

  products = signal<Array<WcProduct>>([]);
  productsLoaded = signal<boolean>(false);
  selectedProduct = signal<WcProduct | null>(null);

  ngOnInit(): void {
    this.queryProducts();
    this.productService.getSelectedProduct.subscribe((product) => {
      this.selectedProduct.set(product);
    });
  }

  isSelected(product: WcProduct): boolean {
    return this.selectedProduct() === product;
  }

  selectProduct(product: WcProduct) {
    this.productService.setSelectedProduct(
      this.isSelected(product) ? null : product
    );
  }

  queryProducts() {
    this.productService.listAllProducts.subscribe((products) => {
      this.products.set(products);
      this.productsLoaded.set(true);
      console.log('Product:', this.products());
    });
  }

  queryProduct(id: number) {
    this.productService.getProductById(id).subscribe((product) => {
      console.log('Product:', product);
    });
  }

  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe((response) => {
      console.log(response);
    });
  }
}
