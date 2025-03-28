import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { HumanReadableDatePipe } from '@pipes//datetime.pipe';
import { EncryptionService } from '@services/encryption.service';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { catchError, throwError } from 'rxjs';
import { WcOrder, WcPaymentGateway } from 'src/app/models/order.model';
import { WcV3Service } from 'src/app/services/api/wc-v3.service';

@Component({
  selector: 'app-order-overview',
  imports: [CommonModule, HumanReadableDatePipe, MatIcon, MatTooltipModule],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss',
})
export class OrderOverviewComponent implements OnInit {
  private readonly wcApi = inject(WcV3Service);
  private readonly route = inject(ActivatedRoute);
  private readonly cryptoService = inject(EncryptionService);
  errorService = inject(ErrorDialogService);

  order = signal<WcOrder | null>(null);
  error = signal<string | null>(null);
  orderId = signal<number | null>(null);
  gateway = signal<WcPaymentGateway | undefined>(undefined);
  loading = signal(true);

  ngOnInit(): void {
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
      )
      .subscribe((r) => {
        this.gateway.set(r);
      });
  }

  fetchOrderDetails(orderId: number) {
    this.wcApi.getOrderById(orderId).subscribe((data) => {
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
