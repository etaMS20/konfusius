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
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { ProductComponent } from './product/product.component';
import { LocalStorageKeys } from '@models/storage.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { crossSaleProductCat } from '@models/cross-sale.model';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { DisclaimerForm } from '@models/disclaimer.model';
import { DisclaimerStateService } from '@services/disclaimer-state.service';
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { createUrlTreeFromSnapshot } from '@angular/router';

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
  /** injectable */
  private readonly mappingService = inject(MappingService);
  private readonly errorService = inject(ErrorDialogService);
  private readonly wcStore = inject(WcStoreAPI);
  private readonly lsService = inject(LocalStorageService);
  private readonly disclaimerStateS = inject(DisclaimerStateService);

  /** basic variables */
  listVariations = ['instock']; // add 'outofstock' here, to show out-of-stock variations
  currentSelectedId?: number;
  currentSelectedSingle?: boolean;

  /** loading */
  viewLoading = true;
  productsLoading = signal<boolean>(false);

  /** observables and subjects */
  private readonly destroy$ = new Subject<void>();
  disclaimerState$ = this.lsService.getItem$<any>(
    LocalStorageKeys.DISCLAIMER_STATE,
  );
  selectedProductId$ = this.lsService.getItem$<number>(
    LocalStorageKeys.PRODUCT_SELECTED_ID,
  );

  /** signals */
  products = signal<Array<WcProduct>>([]);
  crossSaleProducts = signal<Array<WcProduct>>([]);
  selectedProduct = signal<WcProduct | undefined>(undefined);
  selectedProductVariations = signal<Array<WcProductVariationDetails> | []>([]);

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

  // set of products that are not variable
  singleProductSet = computed<Set<number>>(() => {
    return new Set(
      this.products()
        .filter((product) => product.type !== WcProductTypes.VARIABLE)
        .map((product) => product.id), // Extract IDs
    );
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
    this.queryCrossSaleOptions();
    this.initProducts().subscribe((response) => {
      const products = response.map((product: any) =>
        this.mappingService.mapProduct(product),
      );
      this.products.set(products);

      this.selectedProductId$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
        this.currentSelectedId = id;
        this.currentSelectedSingle =
          id !== undefined && this.singleProductSet().has(id);
        if (id) {
          this.selectedProduct.set(this.getSelectedProduct(id));
          this.selectProduct(id);
        }
      });
    });
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

  /**
   * Since we get the whole collection response on init,
   * in case the user selects a product thats variable,
   * we don't need to explicitly query the product again.
   * We just need to query the variations
   */
  getSelectedProduct(id: number): WcProduct | undefined {
    console.log(id);
    console.log(this.products());
    return this.products().find((p) => p.id === id);
  }

  private selectProduct(id?: number) {
    if (id) {
      this.productsLoading.set(true);

      if (this.currentSelectedSingle) {
        this.productsLoading.set(false);
      } else {
        this.wcStore
          .listProductVariations(id, this.listVariations)
          .pipe(
            takeUntil(this.destroy$),
            catchError((error) => {
              this.productsLoading.set(false);
              this.errorService.handleError(error);
              return throwError(() => error);
            }),
          )
          .subscribe((response) => {
            this.selectedProductVariations.set(
              response.length > 0 ? response : [],
            );
            this.productsLoading.set(false);
          });
      }
    }
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
      this.lsService.removeItem(LocalStorageKeys.PRODUCT_SELECTED_ID);
    } else {
      this.lsService.setItem(LocalStorageKeys.PRODUCT_SELECTED_ID, id);
    }
  }

  onCloseDisclaimer(event: boolean) {
    // unselect the product on close because disclaimer invalid
    this.selectedProduct.set(undefined);
    this.lsService.setItem(LocalStorageKeys.PRODUCT_SELECTED_ID, undefined);
  }

  onDisclaimerSubmitted(event: DisclaimerForm) {
    this.productsLoading.set(true);
    const currentSelected = this.currentSelectedId;
    if (currentSelected) {
      this.disclaimerStateS.pushDisclaimerState(currentSelected, event);
      // trigger signal chain to destroy disclaimer if valid disclaimer state, should also kill the loading animation
      this.onProductSelected(currentSelected);
    }
  }

  initProducts() {
    return this.wcStore
      .listProducts(this.getProductCat)
      .pipe(takeUntil(this.destroy$));
  }
}
