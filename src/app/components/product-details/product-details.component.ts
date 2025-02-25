import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  Input,
  signal,
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
import { throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { DisableControlDirective } from '../../directives/disable-control.directive';
import { ErrorDialogService } from '../../errors/error-dialog.service';
import { WcStoreAPI } from '../../services/wc-store-api.service';
import { WcProduct, WcProductTypes } from '../../models/product.model';

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
  ],
})
export class ProductDetailsComponent {
  @Input() product = signal<WcProduct | null>(null);
  private readonly wcStore = inject(WcStoreAPI);
  private readonly fb = inject(FormBuilder);
  private readonly errorService = inject(ErrorDialogService);
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

  constructor() {
    this.selectForm = this.fb.group({
      variationId: new FormControl<number | null>(null, [Validators.required]),
    });

    effect(() => {
      const currentProduct = this.product();
      if (currentProduct) {
        this.queryProductVariations(currentProduct);
      }
    });
  }

  queryProductVariations(product: WcProduct) {
    this.wcStore
      .listProductVariations(product.id, ['instock', 'outofstock'])
      .subscribe((response) => {
        // only list variations that are in stock
        this.variations.set(response.length > 0 ? response : null);
        console.log(this.variations());

        if (this.selectForm) {
          this.selectForm.controls.variationId.setValidators(
            this.variations() ? [Validators.required] : []
          );
          this.selectForm.controls.variationId.updateValueAndValidity();
        }
      });
  }

  checkout() {
    const checkoutId = this.selectForm.get('variationId').value;

    this.wcStore
      .deleteAllCartItems()
      .pipe(
        concatMap(() => this.wcStore.addItemToCart(checkoutId)),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => console.log(response),
      });
  }
}
