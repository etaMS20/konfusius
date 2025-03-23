import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnDestroy,
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
import { DisableControlDirective } from '@directives/disable-control.directive';
import { CrossSaleProductId } from '@models/cross-sale.model';
import { WcProduct } from '@models/product.model';
import { SafeHtmlPipe } from '@pipes//safe-html.pipe';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cross-sale-options',
  imports: [
    MatRadioModule,
    CommonModule,
    ReactiveFormsModule,
    SafeHtmlPipe,
    DisableControlDirective,
  ],
  templateUrl: './cross-sale-options.component.html',
  styleUrl: './cross-sale-options.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrossSaleOptionsComponent implements OnInit, OnDestroy {
  @Output() crossSaleProductSelected = new EventEmitter<CrossSaleProductId>();
  @Input() crossSaleItems: Array<WcProduct> = [];
  disableOptionsForm = input.required<boolean>();
  destroy$ = new Subject<void>();

  private readonly fb = inject(FormBuilder);
  optionsForm = this.fb.group({
    variationId: new FormControl<CrossSaleProductId>(
      CrossSaleProductId.KONFUSIUS,
      [Validators.required],
    ),
  });

  ngOnInit() {
    this.onSelectionChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelectionChange() {
    this.crossSaleProductSelected.emit(
      this.optionsForm.value.variationId as CrossSaleProductId,
    );
  }
}
