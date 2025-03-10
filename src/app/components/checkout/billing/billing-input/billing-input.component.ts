import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  output,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WcBillingAddress } from '../../../../models/customer.model';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatLabel } from '@angular/material/form-field';
import { WcCart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-billing',
  imports: [ReactiveFormsModule, NgIf, MatButtonModule, MatError, MatLabel],
  templateUrl: './billing-input.component.html',
  styleUrl: './billing-input.component.scss',
})
export class BillingComponent implements OnChanges {
  cart = input<WcCart | null>(null);
  @Output() formSubmit = new EventEmitter<WcBillingAddress>();
  billingForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.billingForm = this.fb.group({
      first_name: [null, [Validators.required, Validators.minLength(2)]],
      last_name: [null, [Validators.required, Validators.minLength(2)]],
      address_1: [null, Validators.required],
      address_2: [null],
      city: [null, Validators.required],
      state: [null],
      postcode: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      country: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnChanges() {
    const billingAddress = this.cart()?.billing_address;
    if (billingAddress) {
      this.setFormValues(billingAddress);
    }
  }

  setFormValues(billingAddress: WcBillingAddress) {
    this.billingForm.setValue({
      first_name: billingAddress.first_name,
      last_name: billingAddress.last_name,
      address_1: billingAddress.address_1,
      address_2: billingAddress.address_2,
      city: billingAddress.city,
      state: billingAddress.state,
      postcode: billingAddress.postcode,
      country: billingAddress.country,
      email: billingAddress.email,
      phone: billingAddress.phone,
    });
  }

  onSubmit() {
    if (this.billingForm.valid) {
      this.formSubmit.emit(this.billingForm.value);
    } else {
      this.markFormGroupTouched(this.billingForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
