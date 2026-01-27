import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { HumanReadableDatePipe } from '@pipes/datetime.pipe';
import { EncryptionService } from '@services/encryption.service';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { WcOrder, WcPaymentGateway } from '@models/order.model';
import { WcV3Service } from '@services/api/wc-v3.service';
import { LocalStorageService } from '@storage/local-storage.service';
import { LsKeys } from '@models/storage.model';
import { OrderStatusComponent } from '@shared/status/order-status.component';
import { MatDividerModule } from '@angular/material/divider';
import { VariationIntervalPipe } from '@pipes/variation-interval.pipe';

@Component({
  selector: 'app-order-overview',
  imports: [
    CommonModule,
    HumanReadableDatePipe,
    MatIcon,
    MatTooltipModule,
    OrderStatusComponent,
    MatDividerModule,
    VariationIntervalPipe,
  ],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss',
})
export class OrderOverviewComponent implements OnInit, OnDestroy {
  private readonly wcApi = inject(WcV3Service);
  private readonly route = inject(ActivatedRoute);
  private readonly cryptoService = inject(EncryptionService);
  errorService = inject(ErrorDialogService);
  lsService = inject(LocalStorageService);
  private readonly destroy$ = new Subject<void>();

  order = signal<WcOrder | null>(null);
  error = signal<string | null>(null);
  orderId = signal<number | null>(null);
  gateway = signal<WcPaymentGateway | undefined>(undefined);
  loading = signal(true);

  ngOnInit(): void {
    // remove selected product and disclaimer state from storage after order is completed
    this.lsService.removeItem(LsKeys.PRD_SEL_ID);
    this.lsService.removeItem(LsKeys.DISC_STATE);

    this.route.paramMap.subscribe((params) => {
      const cypherId = params.get('id');
      if (cypherId) {
        const orderId = parseInt(this.cryptoService.decrypt(cypherId), 10);
        this.orderId.set(orderId);
        this.fetchOrderDetails(orderId);
      } else {
        this.loading.set(false);
      }
    });

    this.wcApi
      .getPaymentGateway('cod')
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((r) => {
        this.gateway.set(r);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchOrderDetails(orderId: number) {
    this.wcApi
      .getOrderById(orderId)
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        if (data) {
          this.order.set(data);
        }
        this.loading.set(false);
      });
  }

  get _order(): WcOrder {
    return this.order()!;
  }
}
