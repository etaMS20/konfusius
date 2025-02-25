import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  SimpleChanges,
  computed,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { CommonModule } from '@angular/common';
import { ProductTypeLabels, WcProduct } from '../../models/product.model';
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
  productTooltip = computed(() => ProductTypeLabels[this.product.type]);

  constructor(private readonly dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSelected']) {
      this.isSelectedSignal.set(this.isSelected);
    }
  }

  onProductSelect(event: Event): void {
    event.stopPropagation();
    this.productSelected.emit();
  }

  openDetailsDialog(event: Event) {
    event.stopPropagation();
    this.dialog.open(ProductDialogComponent, {
      data: this.product,
      width: '60vw',
      height: '60vw',
      maxWidth: '2000px',
      maxHeight: '2000px',
    });
  }
}
