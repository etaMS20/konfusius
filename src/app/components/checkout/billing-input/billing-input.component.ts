import {
  Component,
  EventEmitter,
  input,
  type OnChanges,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  type FormControl,
  type FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { WcBillingAddress } from '@models/customer.model';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import type { WcCart } from '@models/cart.model';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import type { BlogPost } from '@models/blog-post.model';
import { BaseDialogData } from '@models/types.model';
import { DialogPopupComponent } from '@shared/dialog-popup/dialog-popup.component';

export interface FormOutput {
  billingAddress: WcBillingAddress;
  invited_by: string;
  consent: boolean;
  comments: string;
}

@Component({
  selector: 'app-billing',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    MatButtonModule,
    MatError,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDivider,
    MatCheckboxModule,
  ],
  templateUrl: './billing-input.component.html',
  styleUrl: './billing-input.component.scss',
  standalone: true,
})
export class BillingComponent implements OnChanges {
  cart = input<WcCart | null>(null);
  rules = input<BlogPost | undefined>(undefined);
  allowedInvitedByOptions = input<string[]>([]);
  commentPlaceholder =
    'Du hast eine verrückte Idee, die du uns mitteilen möchtest? Dann lass es uns wissen! <3';

  @Output() formSubmit = new EventEmitter<FormOutput>();
  formGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
  ) {
    this.formGroup = this.createFormGroup();
  }

  // Getters for easier form control access
  get billingAddress(): FormGroup {
    return this.formGroup.get('billingAddress') as FormGroup;
  }

  get firstName(): FormControl {
    return this.billingAddress.get('first_name') as FormControl;
  }

  get lastName(): FormControl {
    return this.billingAddress.get('last_name') as FormControl;
  }

  get address1(): FormControl {
    return this.billingAddress.get('address_1') as FormControl;
  }

  get city(): FormControl {
    return this.billingAddress.get('city') as FormControl;
  }

  get state(): FormControl {
    return this.billingAddress.get('state') as FormControl;
  }

  get postcode(): FormControl {
    return this.billingAddress.get('postcode') as FormControl;
  }

  get country(): FormControl {
    return this.billingAddress.get('country') as FormControl;
  }

  get email(): FormControl {
    return this.billingAddress.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.billingAddress.get('phone') as FormControl;
  }

  get invitedBy(): FormControl {
    return this.formGroup.get('invited_by') as FormControl;
  }

  get consent(): FormControl {
    return this.formGroup.get('consent') as FormControl;
  }

  get comments(): FormControl {
    return this.formGroup.get('comments') as FormControl;
  }

  // Form validation helpers
  hasError(control: FormControl, errorType: string): boolean {
    return control.hasError(errorType) && control.touched;
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      billingAddress: this.fb.group({
        first_name: [null, [Validators.required, Validators.minLength(2)]],
        last_name: [null, [Validators.required, Validators.minLength(2)]],
        address_1: [null, Validators.required],
        address_2: [null],
        city: [null, Validators.required],
        state: [null],
        postcode: [
          null,
          [Validators.required, Validators.pattern('^[0-9]{3,10}$')],
        ],
        country: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        phone: [null, [Validators.pattern('^[0-9]+$')]],
      }),
      invited_by: [null, Validators.required],
      consent: [false, Validators.requiredTrue], // Must be true to submit
      comments: [null],
    });
  }

  ngOnChanges() {
    const billingAddress = this.cart()?.billing_address;
    if (billingAddress) {
      this.setFormValues(billingAddress);
    }
  }

  setFormValues(billingAddress: WcBillingAddress) {
    this.formGroup.patchValue({
      billingAddress: {
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
      },
      invited_by: null,
      consent: false,
      comments: null,
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // Combine the billing address with other form values
      const formData = {
        billingAddress: this.billingAddress.value,
        invited_by: this.invitedBy.value,
        consent: this.consent.value,
        comments: this.comments.value,
      };
      this.formSubmit.emit(formData);
    } else {
      this.markFormGroupTouched(this.formGroup);
    }
  }

  openRulesDialog(event: Event) {
    const data: BaseDialogData = {
      title: 'Konfuse Gebote',
      content: this.rules()?.content.rendered,
    };
    event.stopPropagation();
    this.dialog.open(DialogPopupComponent, {
      data: data,
      width: '60vw',
      height: '70vh',
      maxWidth: '800px',
      maxHeight: '800px',
      minWidth: '350px',
    });
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
