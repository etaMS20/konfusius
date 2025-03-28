import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss',
})
export class OrderStatusComponent {
  orderStatus = input.required<string>();

  get cssClass(): string {
    return this.orderStatus() ? this.orderStatus().toLowerCase() : '';
  }
}
