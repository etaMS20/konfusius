import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {
  Disclaimer,
  DisclaimerFormControl,
  DisclaimerStateStore,
} from '@models/disclaimer.model';
import { WcProduct } from '@models/product.model';
import { LsKeys } from '@models/storage.model';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { ClientDeviceService } from '@services/client-device.service';
import { getCurrentStateBySKU } from '@utils/disclaimer.utils';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '@storage/local-storage.service';

@Component({
  selector: 'app-disclaimer',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
    MatFormFieldModule,
    MatCheckboxModule,
    SafeHtmlPipe,
    MatIcon,
  ],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerComponent implements OnDestroy {
  formG!: FormGroup;
  deviceService = inject(ClientDeviceService);
  lsService = inject(LocalStorageService);
  disclaimer = input.required<Disclaimer>();
  currentStore = signal<DisclaimerStateStore>(
    this.lsService.getItem(LsKeys.DISC_STATE) ?? {},
  );
  product = input.required<WcProduct>();

  /** inputs and outputs */
  @Output() abortDisclaimer: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() submitDisclaimer: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder) {
    /** Disable background scroll for touch devices */
    this.deviceService.isTouchDevice
      .pipe(takeUntil(this.destroy$))
      .subscribe((isTouchDevice) => {
        document.body.style.overflow = isTouchDevice ? 'hidden' : '';
      });

    this.formG = this.fb.group<DisclaimerFormControl>({
      understood: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
      experience: new FormControl(undefined, {
        nonNullable: true,
        validators: [Validators.maxLength(300)],
      }),
    });

    // on productId change -> also change the current form values
    effect(() => {
      this.formG.controls['understood'].setValue(false); // reset to false
      this.formG.controls['experience'].setValue(
        getCurrentStateBySKU(this.currentStore(), this.product().sku)
          ?.experience,
      );
      this.formG.controls['understood'].markAllAsTouched(); // mark touched
    });
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.formG.valid) {
      const currentStore = this.currentStore() || {};
      this.lsService.setItem<DisclaimerStateStore>(
        LsKeys.DISC_STATE,
        Object.assign(currentStore, { [this.product().sku]: this.formG.value }),
      );
      this.submitDisclaimer.emit(true); // tell parent that disclaimer got submitted
    }
  }

  onClose(event: Event) {
    event.stopPropagation();
    const currentStore = this.currentStore() || {};
    this.formG.reset();
    this.lsService.setItem<DisclaimerStateStore>(
      LsKeys.DISC_STATE,
      Object.assign(currentStore, { [this.product().sku]: this.formG.value }),
    );
    this.abortDisclaimer.emit();
  }

  hasError(control: FormControl, errorType: string): boolean {
    return control.hasError(errorType) && control.touched;
  }

  get understood(): FormControl {
    return this.formG.controls['understood'] as FormControl;
  }
}
