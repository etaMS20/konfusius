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
  ],
})
export class ProductDetailsComponent {
  @Input() product = signal<KonfusiusShiftVar | WcProduct | null>(null);
  private readonly cartService = inject(CoCartService);

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
    });
  }

  checkout() {
    // this.cartService.addProductToCart(this.)
    console.log(this.variationKey());
  }
}
