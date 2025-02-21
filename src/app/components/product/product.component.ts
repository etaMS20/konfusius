import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { CommonModule } from '@angular/common';
import { WcProduct } from './product.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [MatCardModule, MatExpansionModule, CommonModule, MatTooltipModule],
})
export class ProductComponent {
  @Input() product!: WcProduct;
  @Input() isSelected: boolean = false;
  @Output() productSelected = new EventEmitter<any>();
  isSelectedSignal = signal(this.isSelected);
  constructor(private readonly dialog: MatDialog) {}

  ngOnChanges(): void {
    this.isSelectedSignal.set(this.isSelected);
  }

  ngOnInit(): void {
    // Manually sync the signal with the initial state
    this.isSelectedSignal.set(this.isSelected);
  }

  onProductSelect(event: Event): void {
    this.productSelected.emit();
  }

  openDetailsDialog(event: Event) {
    event.stopPropagation();
    this.dialog.open(ProductDialogComponent, {
      data: this.product,
      width: '800px',
    });
  }
}
