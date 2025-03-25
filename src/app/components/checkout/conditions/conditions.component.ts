import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DisclaimerState } from '@models/disclaimer.model';
import { WcPaymentGateway } from '@models/order.model';

@Component({
  selector: 'app-conditions',
  imports: [MatIconModule],
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.scss',
})
export class ConditionsComponent {
  disclaimerState = input<DisclaimerState>();
  paymentMethod = input<WcPaymentGateway>();
}
