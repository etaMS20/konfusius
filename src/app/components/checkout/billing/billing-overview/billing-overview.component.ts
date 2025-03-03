import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WcBillingAddress } from '../../../../models/customer.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-billing-overview',
  templateUrl: './billing-overview.component.html',
  styleUrls: ['./billing-overview.component.scss'],
  imports: [NgIf],
})
export class BillingOverviewComponent {
  @Input() billingData?: WcBillingAddress;
  @Output() edit = new EventEmitter<boolean>();

  editAddress() {
    this.edit.emit(true);
  }
}
