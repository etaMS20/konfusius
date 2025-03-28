import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WcProduct } from '@models/product.model';

@Component({
  selector: 'app-stock-check',
  imports: [CommonModule],
  templateUrl: './stock-check.component.html',
  styleUrl: './stock-check.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCheckComponent {
  product = input.required<WcProduct>();
}
