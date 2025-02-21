import { Component, inject, Input, input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { WcProduct, WcProductVariations } from '../product/product.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CoCartService } from '../../services/co-cart.service';

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
  ],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: WcProduct | null = null;
  private readonly cartService = inject(CoCartService);

  selectedProductVariations?: WcProductVariations;

  ngOnInit(): void {
    this.cartService
      .listProductVariations(1547)
      .subscribe((variations) => (this.selectedProductVariations = variations));
  }

  checkout() {
    // Logic to close the footer, e.g., hide it or emit an event to the parent component
    console.log('Footer closed');
  }
}
