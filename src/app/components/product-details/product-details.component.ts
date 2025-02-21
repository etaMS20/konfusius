import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { WcProduct } from '../product/product.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

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
  private readonly productsService = inject(ProductService);
  selectedProduct$!: Observable<WcProduct | null>;

  ngOnInit(): void {
    this.selectedProduct$ = this.productsService.getSelectedProduct;
  }

  checkout() {
    // Logic to close the footer, e.g., hide it or emit an event to the parent component
    console.log('Footer closed');
  }
}
