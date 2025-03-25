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
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { ProductComponent } from './product/product.component';
import { LsKeys } from '@models/storage.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { crossSaleProductCat } from '@models/cross-sale.model';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { Disclaimer } from '@models/disclaimer.model';
import { LocalStorageService } from 'src/app/storage/local-storage.service';
import { getDisclaimer } from '@utils/disclaimer.utils';

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

  /** basic variables */
  listVariations = ['instock']; // add 'outofstock' here, to show out-of-stock variations
  currentSelectedId?: number;
  currentSelectedSingle?: boolean;
  currentSelectedSKU?: string;
  showDisclaimer: boolean = true; // in the base case: show the disclaimer

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
        this.showDisclaimer = true;
        this.currentSelectedId = id;
        this.currentSelectedSingle =
          id !== undefined && this.singleProductSet().has(id);
        this.selectProduct(id);
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
    const storedCat = localStorage.getItem(LsKeys.USER_PRODUCT_CAT);
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
