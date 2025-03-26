import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DisclaimerState } from '@models/disclaimer.model';

@Component({
  selector: 'app-conditions',
  imports: [MatIconModule, NgIf],
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.scss',
})
export class ConditionsComponent {
  disclaimerState = input<DisclaimerState>();
  paymentMethod = 'Bezahlung an Kontaktperson'; // TODO: this should be fetched, but fetching breaks the cart / session cookie for some reason
}
