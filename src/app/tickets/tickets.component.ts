import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { WcProduct } from '../components/product/product.model';
import { ProductSelectionService } from '../services/product-selection.service';

@Component({
  selector: 'app-tickets',
  imports: [MatGridListModule, ProductListComponent, ProductDetailsComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent {
  selectedProduct: WcProduct | null = null;

  constructor(
    private readonly productSelectionService: ProductSelectionService
  ) {}

  ngOnInit(): void {
    this.productSelectionService.selectedProduct$.subscribe((product) => {
      this.selectedProduct = product;
    });
  }

  onProductSelected(product: WcProduct): void {
    this.selectedProduct = product;
  }
}
