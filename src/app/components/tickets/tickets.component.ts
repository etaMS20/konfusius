import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import {
  WcProduct,
  WcProductTypes,
  WcProductVariationDetails,
} from '@models/product.model';
import { LoadingService } from '@services/loading.service';
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
    MatGridListModule,
    ProductComponent,
    NgFor,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit, OnDestroy {
  private readonly loadingService = inject(LoadingService);
  private readonly destroy$ = new Subject<void>();
  mappingService = inject(MappingService);
  wcStore = inject(WcStoreAPI);
  listVariations = ['instock'];

  /** signals */
  products = signal<Array<WcProduct>>([]);
  selectedProduct = signal<WcProduct | undefined>(undefined);
  isSelectedProductVariable = computed(() => {
    return this.selectedProduct()?.type === WcProductTypes.VARIABLE;
  });
  selectedProductVariations = signal<Array<WcProductVariationDetails> | []>([]);
  selectedProductId = computed(() => {
    return this.selectedProduct()?.id;
  });
  productCat = signal<number>(22);

  constructor() {}

  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.initProducts();

    const storedSelect = this.getStoredSelect();
    // query the product and set it as selected
    if (storedSelect) this.querySelectedProduct(storedSelect);

    this.productCat.set(this.getProductCat());
    this.loadingService.loadingOff();
  }

  querySelectedProduct(id: number) {
    this.loadingService.loadingOn();
    this.wcStore
      .getProductById(id)
      .subscribe((r) => this.selectedProduct.set(r));
    this.wcStore
      .listProductVariations(id, this.listVariations)
      .subscribe((response) => {
        this.selectedProductVariations.set(response.length > 0 ? response : []);
        this.loadingService.loadingOff();
      });
  }

  private getStoredSelect(): number | undefined {
    const storedItem = localStorage.getItem('selectedProductId');
    let storedId = undefined;
    if (storedItem) storedId = parseInt(storedItem, 10);
    return storedId;
  }

  private getProductCat(): number {
    const storedCat = localStorage.getItem('productCat');
    return storedCat ? parseInt(storedCat) : 22;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Listens for the event, implements unselect logic */
  onProductSelected(id: number | null): void {
    if (id === null) {
      this.selectedProduct.set(undefined);
      localStorage.removeItem('selectedProductId');
    } else {
      id ? this.querySelectedProduct(id) : new Error();
      localStorage.setItem('selectedProductId', id.toString());
    }
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
