import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { WcProduct } from '../components/product/product.model';
import { ProductSelectionService } from '../services/product-selection.service';
import { NgIf } from '@angular/common';
import { LoadingIndicatorComponent } from '../components/loading-indicator/loading-indicator.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-tickets',
  imports: [
    MatGridListModule,
    ProductListComponent,
    ProductDetailsComponent,
    LoadingIndicatorComponent,
    NgIf,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
})
export class TicketsComponent {
  selectedProduct = signal<WcProduct | null>(null);
  private readonly loadingService = inject(LoadingService);

  constructor(
    private readonly productSelectionService: ProductSelectionService
  ) {}

  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.productSelectionService.selectedProduct$.subscribe({
      next: (product) => {
        this.selectedProduct.set(product);
        setTimeout(() => {
          this.loadingService.loadingOff();
        }, 500);
      },
      error: () => {},
    });
  }

  onProductSelected(product: WcProduct): void {
    this.selectedProduct.set(product);
  }
}
