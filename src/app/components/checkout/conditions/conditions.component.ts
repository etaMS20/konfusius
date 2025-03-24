import { Component, input } from '@angular/core';
import { DisclaimerForm } from '@models/disclaimer.model';
import { WcPaymentGateway } from '@models/order.model';

@Component({
  selector: 'app-conditions',
  imports: [],
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.scss',
})
export class ConditionsComponent {
  disclaimerState = input<DisclaimerForm>();
  paymentMethod = input<WcPaymentGateway>();
}
