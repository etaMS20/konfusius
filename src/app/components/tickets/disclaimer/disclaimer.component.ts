import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { DisclaimerForm } from '@models/disclaimer.model';
import { WcProduct, WcProductAttribute } from '@models/product.model';
import { SafeHtmlPipe } from '@pipes//safe-html.pipe';
import { ClientDeviceService } from '@services/client-device.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

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
export class DisclaimerComponent implements OnInit, OnDestroy, OnInit {
  /** inputs and outputs */
  product = input<WcProduct>();
  content = computed(() => {
    const p = this.product();
    if (p) {
      return p.attributes?.find(
        (attr: WcProductAttribute) => attr.name === 'disclaimer',
      )?.terms[0].name;
    } else return undefined;
  });
  textBoxContent = computed(() => {
    const p = this.product();
    if (p) {
      return p.attributes?.find(
        (attr: WcProductAttribute) => attr.name === 'disclaimer_textbox',
      )?.terms[0].name;
    } else return undefined;
  });
  disclaimerId = input<number>();
  @Output() abortDisclaimer: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() formValuesSubmit: EventEmitter<DisclaimerForm> =
    new EventEmitter<any>();

  private readonly destroy$ = new Subject<void>();
  showDisclaimer: boolean = false;
  isDestroyed: boolean = false;
  deviceService = inject(ClientDeviceService);

  fb = inject(FormBuilder);
  formG: FormGroup;

  constructor() {
    this.formG = this.fb.group({
      understood: [false, [Validators.requiredTrue]],
      experience: [null, [Validators.maxLength(300)]],
    });

    /** Disable background scroll for touch devices */
    this.deviceService.isTouchDevice
      .pipe(takeUntil(this.destroy$))
      .subscribe((isTouchDevice) => {
        if (isTouchDevice) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
  }

  ngOnInit() {
    // trigger the slide-in animation
    this.showDisclaimer = true;
  }

  ngOnDestroy() {
    // trigger the slide-out animation
    this.isDestroyed = true;
    document.body.style.overflow = '';
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.formG.valid) {
      this.formValuesSubmit.emit(this.formG.value);
    } else {
      this.formG.controls['understood'].markAllAsTouched();
    }
  }

  onClose(event: Event) {
    event.stopPropagation();
    this.abortDisclaimer.emit(event.bubbles);
    this.isDestroyed = event.bubbles;
  }

  hasError(control: FormControl, errorType: string): boolean {
    return control.hasError(errorType) && control.touched;
  }

  get understood(): FormControl {
    return this.formG.controls['understood'] as FormControl;
  }
}
