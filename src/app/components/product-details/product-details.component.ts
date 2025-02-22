import {
  Component,
  computed,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import {
  WcProduct,
  KonfusiusShiftVar,
  WcProductTypes,
} from '../product/product.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CoCartService } from '../../services/co-cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DisableControlDirective } from '../../directives/disable-control.directive';

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
  @Input() product = signal<KonfusiusShiftVar | WcProduct | null>(null);
  private readonly cartService = inject(CoCartService);
  private readonly fb = inject(FormBuilder);
  selectForm: any;

  /** Signals */
  variations = signal<any[] | null>(null);
  variationKey = computed(() => {
    return Object.keys(this.product()!.attributes ?? []);
  });
  isProductVariable = computed(() => {
    return this.product()?.type === WcProductTypes.VARIABLE;
  });
  tooltipMessage = computed<string>(() => {
    return this.variations() ? '' : `${this.variationKey()} nicht verfügbar...`;
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
    this.cartService.listProductVariations(product.id).subscribe((response) => {
      this.variations.set(response.data.length > 0 ? response.data : null);

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
    this.cartService.addProductToCart(checkoutId);
  }
}
