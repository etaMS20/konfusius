import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  SimpleChanges,
  computed,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { ProductTypeLabels, WcProduct } from '@models/product.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { DialogPopupComponent } from '@shared/dialog-popup/dialog-popup.component';
import { BaseDialogData } from '@models/types.model';
import { StockCheckComponent } from './stock-check/stock-check.component';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    MatCardModule,
    MatExpansionModule,
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    StockCheckComponent,
  ],
})
export class ProductComponent implements OnInit {
  @Input() product?: WcProduct;
  @Input() selectedProductId?: number; // communicated by parent
  @Output() productSelected = new EventEmitter<number | null>();

  isSelectedSignal = signal(this.isProductSelected());
  productTooltip = computed(() =>
    this.product?.type ? ProductTypeLabels[this.product.type] : '',
  );

  constructor(private readonly dialog: MatDialog) {}

  /** Check if the product is selected */
  isProductSelected(): boolean {
    return this.selectedProductId === this.product?.id;
  }

  ngOnInit(): void {
    this.isSelectedSignal.set(this.isProductSelected());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProductId']) {
      this.isSelectedSignal.set(this.isProductSelected());
    }
  }

  onProductSelect(event: Event): void {
    event.stopPropagation();

    if (this.isProductSelected()) {
      this.productSelected.emit(null); // Emitting null means "deselect"
    } else {
      this.productSelected.emit(this.product?.id); // Otherwise, select the product
    }
  }

  openDetailsDialog(event: Event) {
    event.stopPropagation();
    const data: BaseDialogData = {
      title: this.product?.name,
      content: this.product?.description,
      imageMeta: {
        src: this.product?.images[0].src as string,
      },
    };
    this.dialog.open(DialogPopupComponent, {
      data: data,
      width: '60vw',
      height: '70vh',
      maxWidth: '800px',
      maxHeight: '800px',
      minWidth: '350px',
    });
  }
}
