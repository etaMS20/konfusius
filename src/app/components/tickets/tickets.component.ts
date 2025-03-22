import {
  AfterViewInit,
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
import { catchError, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { ProductComponent } from './product/product.component';
import { LocalStorageKeys } from '@models/storage.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { crossSaleProductCat } from '@models/cross-sale.model';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';

@Component({
  selector: 'app-tickets',
  imports: [
    MatGridListModule,
    ProductDetailsComponent,
    MatGridListModule,
    ProductComponent,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly destroy$ = new Subject<void>();
  private readonly mappingService = inject(MappingService);
  private readonly errorService = inject(ErrorDialogService);
  wcStore = inject(WcStoreAPI);
  listVariations = ['instock']; // add 'outofstock' to show out-of-stock stuff

  /** loading */
  viewLoading = true;
  productsLoading = signal<boolean>(false);

  /** signals */
  products = signal<Array<WcProduct>>([]);
  crossSaleProducts = signal<Array<WcProduct>>([]);
  selectedProduct = signal<WcProduct | undefined>(undefined);
  isSelectedProductVariable = signal<boolean>(false);
  selectedProductVariations = signal<Array<WcProductVariationDetails> | []>([]);
  selectedProductId = computed(() => {
    return this.selectedProduct()?.id;
  });

  constructor() {}

  ngAfterViewInit(): void {
    this.viewLoading = false;
  }

  ngOnInit(): void {
    this.initProducts();
    this.queryCrossSaleOptions();

    const storedSelect = this.getStoredSelect();
    // query the product and set it as selected
    if (storedSelect) this.querySelectedProduct(storedSelect);
  }

  private queryCrossSaleOptions() {
    this.productsLoading.set(true);
    this.wcStore
      .listProducts(crossSaleProductCat)
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((r) => {
        this.crossSaleProducts.set(r);
        this.productsLoading.set(false);
      });
  }

  private querySelectedProduct(id: number) {
    this.productsLoading.set(true);
    this.wcStore
      .getProductById(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.productsLoading.set(false);
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
        switchMap((product) => {
          this.selectedProduct.set(product);
          this.productsLoading.set(false);
          this.isSelectedProductVariable.set(
            product.type === WcProductTypes.VARIABLE,
          );

          if (product.type === WcProductTypes.VARIABLE) {
            this.productsLoading.set(true);
            return this.wcStore.listProductVariations(id, this.listVariations);
          } else {
            return []; // Return an empty array if it's not a variable product
          }
        }),
        takeUntil(this.destroy$),
      )
      .pipe(
        catchError((error) => {
          this.productsLoading.set(false);
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe((response) => {
        this.selectedProductVariations.set(response.length > 0 ? response : []);
        this.productsLoading.set(false);
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        const products = response.map((product: any) =>
          this.mappingService.mapProduct(product),
        );
        this.products.set(products);
      });
  }
}
