import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor, NgIf } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { WcProduct } from '../../models/product.model';
import { LoadingService } from '../../services/loading.service';
import { ProductSelectionService } from '../../services/product-selection.service';
import { MappingService } from '@services/mapping.service';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { Subject } from 'rxjs';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-tickets',
  imports: [
    MatGridListModule,
    ProductDetailsComponent,
    LoadingIndicatorComponent,
    NgIf,
    MatGridListModule,
    ProductComponent,
    NgFor,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent implements OnInit, OnDestroy {
  private readonly loadingService = inject(LoadingService);
  private readonly destroy$ = new Subject<void>();
  mappingService = inject(MappingService);
  productSelectionService = inject(ProductSelectionService);
  wcStore = inject(WcStoreAPI);

  /** signals */
  products = signal<Array<WcProduct>>([]);
  productsLoaded = computed<boolean>(() => {
    return this.products().length > 0;
  });
  selectedProduct = signal<WcProduct | null>(null);
  productCat = signal<number>(22);

  constructor() {}

  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.productSelectionService.selectedProduct$.subscribe({
      next: (product) => {
        this.selectedProduct.set(product);
        this.loadingService.loadingOff();
      },
      error: () => {},
    });
    this.productCat.set(parseInt(localStorage.getItem('productCat') ?? '22'));
    this.initProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProductSelected(product: WcProduct): void {
    this.selectedProduct.set(product);
  }

  selectProduct(product: WcProduct) {
    const isSelected = this.isSelected(product);
    this.productSelectionService.setSelectedProduct(
      isSelected ? null : product,
    );
  }

  isSelected(product: WcProduct): boolean {
    return this.productSelectionService.getSelectedProduct() === product;
  }

  initProducts() {
    this.wcStore.listProducts(this.productCat()).subscribe((response) => {
      const products = response.map((product: any) =>
        this.mappingService.mapProduct(product),
      );
      this.products.set(products);
    });
  }
}
