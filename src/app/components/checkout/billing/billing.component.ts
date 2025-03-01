import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WcBillingAddress } from '../../../models/customer.model';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-billing',
  imports: [ReactiveFormsModule, NgIf, MatButtonModule, MatError, MatLabel],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent {
  @Output() formSubmit = new EventEmitter<WcBillingAddress>();
  billingForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.billingForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      address_1: ['', Validators.required],
      address_2: [''],
      city: ['', Validators.required],
      state: [''],
      postcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmit() {
    if (this.billingForm.valid) {
      const billingData: WcBillingAddress = this.billingForm.value;
      console.log(billingData);
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
