import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, throwError } from 'rxjs';
import { catchError, concatMap, takeUntil } from 'rxjs/operators';
import { DisableControlDirective } from '@directives/disable-control.directive';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { WcProduct, WcProductVariationDetails } from '@models/product.model';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { formatPrice } from '@utils/price.utils';
import { indicate } from '@utils/reactive-loading.utils';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CrossSaleOptionsComponent } from './cross-sale-options/cross-sale-options.component';
import { CrossSaleProduct } from '@models/cross-sale.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    DisableControlDirective,
    SafeHtmlPipe,
    MatProgressBarModule,
    CrossSaleOptionsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() product?: WcProduct;
  @Input() isProductVariable?: boolean;
  @Input() productVariations: Array<WcProductVariationDetails> = [];

  loadingCheckout$ = new Subject<boolean>(); // used for progress bar
  private readonly destroy$ = new Subject<void>();
  private readonly wcStore = inject(WcStoreAPI);
  private readonly fb = inject(FormBuilder);
  private readonly errorService = inject(ErrorDialogService);
  private readonly router = inject(Router);
  selectForm = this.fb.group({
    variationId: new FormControl<number | null>(null, [Validators.required]),
  });
  crossSaleItems = input<Array<WcProduct>>([]); // modern approach with new input API
  selectedCossSaleItemId = signal<CrossSaleProduct>(CrossSaleProduct.KONFUSIUS);

  constructor() {}

  ngOnInit(): void {
    this.selectForm.controls['variationId'].setValidators(
      this.isProductVariable ? [Validators.required] : [],
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      if (this.selectForm) {
        this.selectForm.controls['variationId'].setValidators(
          this.isProductVariable ? [Validators.required] : [],
        );
        this.selectForm.controls['variationId'].updateValueAndValidity();
        this.destroy$.next();
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get formattedPrice(): string {
    if (this.product)
      return formatPrice(
        this.product.prices.price,
        this.product.prices.currency_thousand_separator,
        this.product.prices.currency_decimal_separator,
        this.product.prices.currency_minor_unit,
        this.product.prices.currency_symbol,
      );
    else return '';
  }

  get isCheckoutValid(): boolean {
    if (this.isProductVariable) {
      return this.selectForm.valid;
    } else {
      return this.product?.is_in_stock ?? false;
    }
  }

  /** Listens for the event */
  onCrossSaleSelected(id: CrossSaleProduct): void {
    this.selectedCossSaleItemId.set(id);
  }

  checkout() {
    const checkoutId = this.isProductVariable
      ? this.selectForm.get('variationId')!.value
      : this.product?.id;

    if (checkoutId) {
      const batchIds = [checkoutId, this.selectedCossSaleItemId()];

      this.wcStore
        .deleteAllCartItems()
        .pipe(
          indicate(this.loadingCheckout$),
          concatMap(() => this.wcStore.batchItemsToCart(batchIds)),
          catchError((error) => {
            this.errorService.handleError(error);
            return throwError(() => error);
          }),
          takeUntil(this.destroy$),
        )
        .subscribe({
          complete: () => {
            // waiting for the addItem request to return OK
            this.router.navigate(['/checkout']);
          },
        });
    }
  }
}
