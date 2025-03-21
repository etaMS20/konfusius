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
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {
  WcProduct,
  WcProductTypes,
  WcProductVariationDetails,
} from '@models/product.model';
import { MappingService } from '@services/mapping.service';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { Subject, takeUntil } from 'rxjs';
import { ProductComponent } from './product/product.component';
import { LocalStorageKeys } from '@models/storage.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { indicate } from '@utils/reactive-loading.utils';

@Component({
  selector: 'app-tickets',
  imports: [
    MatGridListModule,
    ProductDetailsComponent,
    MatGridListModule,
    ProductComponent,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  mappingService = inject(MappingService);
  wcStore = inject(WcStoreAPI);
  listVariations = ['instock']; // add 'outofstock' to show out-of-stock stuff

  /** loading */
  loading$ = new Subject<boolean>();
  variationsAreLoading = signal<boolean>(false);

  /** signals */
  products = signal<Array<WcProduct>>([]);
  selectedProduct = signal<WcProduct | undefined>(undefined);
  isSelectedProductVariable = signal<boolean>(false);
  selectedProductVariations = signal<Array<WcProductVariationDetails> | []>([]);
  selectedProductId = computed(() => {
    return this.selectedProduct()?.id;
  });

  constructor() {}

  ngOnInit(): void {
    this.initProducts();

    const storedSelect = this.getStoredSelect();
    // query the product and set it as selected
    if (storedSelect) this.querySelectedProduct(storedSelect);
  }

  querySelectedProduct(id: number) {
    this.variationsAreLoading.set(true);
    this.wcStore
      .getProductById(id)
      .pipe(indicate(this.loading$), takeUntil(this.destroy$))
      .subscribe((r) => {
        this.selectedProduct.set(r);
        this.isSelectedProductVariable.set(r.type === WcProductTypes.VARIABLE);
      });

    this.wcStore
      .listProductVariations(id, this.listVariations)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.selectedProductVariations.set(response.length > 0 ? response : []);
        this.variationsAreLoading.set(false);
      });
  }

  private getStoredSelect(): number | undefined {
    const storedItem = localStorage.getItem(
      LocalStorageKeys.PRODUCT_SELECTED_ID,
    );
    let storedId = undefined;
    if (storedItem) storedId = parseInt(storedItem, 10);
    return storedId;
  }

  get getProductCat(): number {
    const storedCat = localStorage.getItem(LocalStorageKeys.USER_PRODUCT_CAT);
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
      localStorage.removeItem(LocalStorageKeys.PRODUCT_SELECTED_ID);
    } else {
      id ? this.querySelectedProduct(id) : new Error();
      localStorage.setItem(LocalStorageKeys.PRODUCT_SELECTED_ID, id.toString());
    }
  }

  initProducts() {
    this.wcStore
      .listProducts(this.getProductCat)
      .pipe(indicate(this.loading$), takeUntil(this.destroy$))
      .subscribe((response) => {
        const products = response.map((product: any) =>
          this.mappingService.mapProduct(product),
        );
        this.products.set(products);
      });
  }
}
