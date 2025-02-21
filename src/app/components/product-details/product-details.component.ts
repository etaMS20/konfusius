import {
  Component,
  effect,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { WcProduct, KonfusiusShiftVar } from '../product/product.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CoCartService } from '../../services/co-cart.service';
import { MatButtonModule } from '@angular/material/button';

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
  ],
})
export class ProductDetailsComponent {
  @Input() product = signal<KonfusiusShiftVar | WcProduct | null>(null);
  private readonly cartService = inject(CoCartService);

  variations = signal<any[] | null>(null);

  constructor() {
    effect(() => {
      const currentProduct = this.product();
      if (currentProduct) {
        this.queryProductVariations(currentProduct);
      }
    });
  }

  queryProductVariations(newProduct: WcProduct) {
    this.cartService
      .listProductVariations(newProduct.id)
      .subscribe((response) => {
        this.variations.set(response.data.length > 0 ? response.data : null);
        console.log(this.variations());
      });
  }

  checkout() {
    console.log('Footer closed');
  }
}
