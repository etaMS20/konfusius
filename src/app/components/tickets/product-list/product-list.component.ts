import { NgFor } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductSelectionService } from '../../../services/product-selection.service';
import { WcStoreAPI } from '../../../services/api/wc-store-api.service';
import { ProductComponent } from '../product/product.component';
import { WcProduct } from '../../../models/product.model';
import { MappingService } from '../../../services/mapping.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'product-list',
  imports: [MatGridListModule, ProductComponent, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  productCat = input<number | undefined>(undefined);
  @Output() productSelected = new EventEmitter<WcProduct | null>();
  @Output() productsLoading = new EventEmitter<boolean>(true);

  mappingService = inject(MappingService);
  productSelectionService = inject(ProductSelectionService);
  wcStore = inject(WcStoreAPI);

  products = signal<Array<WcProduct>>([]);
  productsLoaded = computed<boolean>(() => {
    return this.products().length > 0;
  });

  private readonly destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.initProducts();
    this.productSelected.emit(null);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isSelected(product: WcProduct): boolean {
    return this.productSelectionService.getSelectedProduct() === product;
  }

  selectProduct(product: WcProduct) {
    const isSelected = this.isSelected(product);
    this.productSelectionService.setSelectedProduct(
      isSelected ? null : product,
    );
    this.productSelected.emit(isSelected ? null : product);
  }

  initProducts() {
    this.wcStore.listProducts(this.productCat()).subscribe((response) => {
      const products = response.map((product: any) =>
        this.mappingService.mapProduct(product),
      );
      this.products.set(products);
      this.productsLoading.emit(false);
    });
  }
}
