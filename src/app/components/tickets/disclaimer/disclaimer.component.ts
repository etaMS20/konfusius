import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  OnInit,
  Output,
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
  DisclaimerState,
  DisclaimerStateStore,
} from '@models/disclaimer.model';
import { LsKeys } from '@models/storage.model';
import { SafeHtmlPipe } from '@pipes//safe-html.pipe';
import { ClientDeviceService } from '@services/client-device.service';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from 'src/app/storage/local-storage.service';

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
  formG: FormGroup;
  deviceService = inject(ClientDeviceService);
  lsService = inject(LocalStorageService);
  disclaimer = input.required<Disclaimer>();
  productId = input.required<number>();

  /** inputs and outputs */
  disclaimerState$ = this.lsService.getItem$<DisclaimerState>(
    LsKeys.DISC_STATE,
  );
  @Output() abortDisclaimer: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private readonly destroy$ = new Subject<void>();
  showDisclaimer: boolean = false;

  constructor(private readonly fb: FormBuilder) {
    effect(() => {
      this.productId();
      this.lsService.removeItem(LsKeys.DISC_STATE);
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

    /** Disable background scroll for touch devices */
    this.deviceService.isTouchDevice
      .pipe(takeUntil(this.destroy$))
      .subscribe((isTouchDevice) => {
        document.body.style.overflow = isTouchDevice ? 'hidden' : '';
      });

    this.disclaimerState$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.showDisclaimer = !state?.understood;
      console.log(this.lsService.getItem(LsKeys.DISC_STATE));
    });
  }

  ngOnDestroy() {
    // trigger the slide-out animation
    document.body.style.overflow = '';
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.formG.valid) {
      this.lsService.setItem<DisclaimerState>(
        LsKeys.DISC_STATE,
        this.formG.value,
      );
    } else {
      this.formG.controls['understood'].markAllAsTouched();
    }
  }

  onClose(event: Event) {
    event.stopPropagation();
    this.formG.reset();
    this.lsService.setItem<DisclaimerStateStore>(
      LsKeys.DISC_STATE,
      this.formG.value,
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
