import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { DisclaimerForm } from '@models/disclaimer.model';
import { DisclaimerStateService } from '@services/disclaimer-state.service';

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
    DisclaimerComponent,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly destroy$ = new Subject<void>();
  private readonly mappingService = inject(MappingService);
  private readonly errorService = inject(ErrorDialogService);
  private readonly disclaimerStateS = inject(DisclaimerStateService);
  private readonly wcStore = inject(WcStoreAPI);
  listVariations = ['instock']; // add 'outofstock' here, to show out-of-stock variations

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
  selectedProductHasDisclaimer = computed(() => {
    return this.disclaimerStateS.hasProductDisclaimer(
      this.selectedProduct()?.id,
    );
  });
  /** returns true, if the selectedProduct is marked as having a disclaimer and its valid */
  selectedProductValidDisclaimer = computed(() => {
    if (this.selectedProductHasDisclaimer()) {
      return this.disclaimerStateS.validateDisclaimerState(
        this.selectedProduct()!.id,
      );
    } else return false;
  });
  /** on signal change, will set the disclaimer for the product */
  setDisclaimer = effect(() => {
    const product = this.selectedProduct();
    if (this.selectedProductHasDisclaimer()) {
      this.disclaimerStateS.setDisclaimer(product!);
    }
  });

  // TODO
  /**
   * The cleanest approach here would probably be to define a parent FC and having the mat-cards as main-controls.
   * Otherwise, since we query the product on select anyways (which could also be avoided probably),
   * we might want to destroy the productDetails on select
   */

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

          if (product.type === WcProductTypes.VARIABLE) {
            this.isSelectedProductVariable.set(true);
            this.productsLoading.set(true);
            return this.wcStore.listProductVariations(id, this.listVariations);
          } else {
            this.isSelectedProductVariable.set(false);
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

  onCloseDisclaimer(event: boolean) {
    // unselect the product on close because disclaimer invalid
    this.selectedProduct.set(undefined);
  }

  onDisclaimerSubmitted(event: DisclaimerForm) {
    this.productsLoading.set(true);
    const currentSelected = this.selectedProductId();
    if (currentSelected) {
      this.disclaimerStateS.pushDisclaimerState(currentSelected, event);
      // trigger signal chain to destroy disclaimer if valid disclaimer state, should also kill the loading animation
      this.onProductSelected(currentSelected);
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
