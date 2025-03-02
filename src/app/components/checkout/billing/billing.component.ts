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
