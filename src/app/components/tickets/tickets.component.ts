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
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { ProductComponent } from './product/product.component';
import { LsKeys } from '@models/storage.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { crossSaleProductCat } from '@models/cross-sale.model';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { Disclaimer } from '@models/disclaimer.model';
import { LocalStorageService } from '@storage/local-storage.service';
import { getDisclaimer } from '@utils/disclaimer.utils';
import { MatButtonModule } from '@angular/material/button';
import { EarlyBirdService } from '@services/early-bird-service.service';

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
    MatButtonModule,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit, OnDestroy, AfterViewInit {
  /** injectable */
  private readonly errorService = inject(ErrorDialogService);
  private readonly wcStore = inject(WcStoreAPI);
  private readonly lsService = inject(LocalStorageService);
  earlyBirdService = inject(EarlyBirdService);

  /** basic variables */
  listVariations = ['instock']; // add 'outofstock' here, to show out-of-stock variations
  currentSelectedId?: number;
  currentSelectedSingle?: boolean;
  currentSelectedSKU?: string;
  showDisclaimer: boolean = true; // flag to enable disclaimers globally

  /** loading */
  viewLoading = true;
  productsLoading = signal<boolean>(false);

  /** observables and subjects */
  private readonly destroy$ = new Subject<void>();
  selectedProductId$ = this.lsService.getItem$<number>(LsKeys.PRD_SEL_ID);

  /** signals */
  products = signal<Array<WcProduct>>([]);
  crossSaleProducts = signal<Array<WcProduct>>([]);
  selectedProduct = signal<WcProduct | undefined>(undefined);
  selectedProductVariations = signal<Array<WcProductVariationDetails> | []>([]);

  selectedProdDisclaimer = computed<Disclaimer | undefined>(() => {
    const product = this.selectedProduct();
    return product ? getDisclaimer(product) : undefined;
  });

  // set of products that are not variable as signal
  singleProductSet = computed<Set<number>>(() => {
    return new Set(
      this.products()
        .filter((product) => product.type !== WcProductTypes.VARIABLE)
        .map((product) => product.id), // extract Ids
    );
  });

  // TODO: note
  /**
   * The cleanest approach here would probably be to define a parent FC and having the mat-cards as main-controls.
   * Otherwise, since we query the product on select anyways (which could also be avoided probably),
   * we might want to destroy the productDetails on select.
   * Current approach works perfectly fine however so thats something to consider in the future.
   */

  constructor() {
    this.earlyBirdService.isActive$.subscribe((active) => {
      if (active) {
        this.earlyBirdService.showEarlyBirdMessage();
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewLoading = false;
  }

  ngOnInit(): void {
    this.queryCrossSaleOptions();
    this.initProducts().subscribe((response) => {
      const products = response;
      this.products.set(products);

      this.selectedProductId$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
        this.selectedProductVariations.set([]); // reset variations on new product selection to avoid showing old ones in the select component until the new ones are loaded
        this.showDisclaimer = true;
        this.currentSelectedId = id;
        this.currentSelectedSingle =
          id !== undefined && this.singleProductSet().has(id);
        this.selectProduct(id); // variations will be fetched again here
      });
    });
  }

  private queryCrossSaleOptions() {
    this.productsLoading.set(true);
    this.wcStore
      .listProducts(crossSaleProductCat, 'price')
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

  getSelectedProduct(id?: number): WcProduct | undefined {
    return this.products().find((p) => p.id === id);
  }

  private selectProduct(id?: number) {
    this.selectedProduct.set(this.getSelectedProduct(id));
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
    const storedCat = this.lsService.getItem<number>(LsKeys.USER_PRODUCT_CAT);
    return storedCat ?? 22;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Listens for the event, implements unselect logic */
  onProductSelected(id: number | null): void {
    if (id === null) {
      this.selectedProduct.set(undefined);
      this.lsService.removeItem(LsKeys.PRD_SEL_ID);
    } else {
      this.lsService.setItem(LsKeys.PRD_SEL_ID, id); // this triggers the subscription
    }
  }

  onCloseDisclaimer() {
    // unselect the product which will also destroy the disclaimer
    this.lsService.removeItem(LsKeys.PRD_SEL_ID);
  }

  onDisclaimerSubmit() {
    // destroy disclaimer on submit
    this.showDisclaimer = false;
  }

  initProducts() {
    return this.wcStore.listProducts(this.getProductCat).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        this.productsLoading.set(false);
        this.errorService.handleError(error);
        return throwError(() => error);
      }),
    );
  }
}
