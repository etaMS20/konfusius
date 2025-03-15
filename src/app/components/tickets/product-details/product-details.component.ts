import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  Input,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { DisableControlDirective } from '../../../directives/disable-control.directive';
import { ErrorDialogService } from '../../shared/errors/error-dialog.service';
import { WcStoreAPI } from '../../../services/api/wc-store-api.service';
import { WcProduct, WcProductTypes } from '../../../models/product.model';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

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
  ],
})
export class ProductDetailsComponent {
  product = input<WcProduct | null>(null);
  private readonly wcStore = inject(WcStoreAPI);
  private readonly fb = inject(FormBuilder);
  private readonly errorService = inject(ErrorDialogService);
  private readonly router = inject(Router);
  listVariations = ['instock']; // add 'outofstock' to show out-of-stock stuff
  selectForm: any;

  /** Signals */
  variations = signal<any[] | null>(null);
  isProductVariable = computed(() => {
    return this.product()?.type === WcProductTypes.VARIABLE;
  });
  tooltipMessage = computed<string>(() => {
    return this.variations()
      ? ''
      : `Es sind leider keine Zeiten mehr für diese Schicht verfügbar`;
  });

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.selectForm = this.fb.group({
      variationId: new FormControl<number | null>(null, [Validators.required]),
    });

    effect(() => {
      if (this.isProductVariable()) {
        this.queryProductVariations();
      }
      this.selectForm.reset();
      this.cdr.detectChanges();
    });
  }

  queryProductVariations() {
    if (this.product())
      this.wcStore
        .listProductVariations(this.product()!.id, this.listVariations)
        .subscribe((response) => {
          this.variations.set(response.length > 0 ? response : null);
          if (this.selectForm) {
            this.selectForm.controls.variationId.setValidators(
              this.variations() ? [Validators.required] : [],
            );
            this.selectForm.controls.variationId.updateValueAndValidity();
          }
        });
  }

  formatPrice(
    price?: string,
    decimalSeparator: string = ',',
    decimalPlaces: number = 2,
    thousandSeparator: string = '.',
  ): string {
    let numericPrice = parseFloat(price ?? 'NaN');
    const factor = Math.pow(10, decimalPlaces);
    const formattedPrice = (numericPrice / factor).toFixed(decimalPlaces);
    let [integerPart, decimalPart] = formattedPrice.split('.');
    integerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator,
    );
    return `${integerPart}${decimalSeparator}${decimalPart}`;
  }

  get isFormValid(): boolean {
    if (this.isProductVariable()) {
      return this.selectForm.valid;
    } else {
      return this.product()!.is_in_stock;
    }
  }

  checkout() {
    const checkoutId = this.isProductVariable()
      ? this.selectForm.get('variationId').value
      : this.product()?.id;

    this.wcStore
      .deleteAllCartItems()
      .pipe(
        concatMap(() => this.wcStore.addItemToCart(checkoutId)),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe({
        next: (response) => {},
        complete: () => {
          // waiting for the addItem request to return OK
          this.router.navigate(['/checkout']);
        },
      });
  }
}
