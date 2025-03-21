import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CrossSaleProduct } from '@models/cross-sale.model';
import { WcProduct } from '@models/product.model';
import { SafeHtmlPipe } from '@pipes//safe-html.pipe';

@Component({
  selector: 'app-cross-sale-options',
  imports: [MatRadioModule, CommonModule, ReactiveFormsModule, SafeHtmlPipe],
  templateUrl: './cross-sale-options.component.html',
  styleUrl: './cross-sale-options.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrossSaleOptionsComponent {
  @Output() crossSaleProductSelected = new EventEmitter<CrossSaleProduct>();
  @Input() crossSaleItems: Array<WcProduct> = [];

  private readonly fb = inject(FormBuilder);
  optionsForm = this.fb.group({
    variationId: new FormControl<CrossSaleProduct>(CrossSaleProduct.KONFUSIUS, [
      Validators.required,
    ]),
  });

  onSelectionChange() {
    this.crossSaleProductSelected.emit(
      this.optionsForm.value.variationId as CrossSaleProduct,
    );
  }
}
