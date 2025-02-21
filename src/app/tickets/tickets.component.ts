import { Component, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { WcProduct } from '../components/product/product.model';
import { ProductSelectionService } from '../services/product-selection.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tickets',
  imports: [
    MatGridListModule,
    ProductListComponent,
    ProductDetailsComponent,
    NgIf,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent {
  selectedProduct = signal<WcProduct | null>(null);

  constructor(
    private readonly productSelectionService: ProductSelectionService
  ) {}

  ngOnInit(): void {
    this.productSelectionService.selectedProduct$.subscribe((product) => {
      this.selectedProduct.set(product);
    });
  }

  onProductSelected(product: WcProduct): void {
    this.selectedProduct.set(product);
  }
}
