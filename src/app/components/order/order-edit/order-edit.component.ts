import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';

import { WC_ORDER_STATUSES, WcOrder, WcOrderStatus } from '@models/order.model';
import { WcV3Service } from '@services/api/wc-v3.service';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { Billing } from '@models/customer.model';

const STATUS_SEVERITY: Record<
  string,
  'success' | 'info' | 'warn' | 'danger' | 'secondary'
> = {
  completed: 'success',
  processing: 'info',
  pending: 'warn',
  cancelled: 'danger',
  refunded: 'secondary',
  failed: 'danger',
  'on-hold': 'warn',
};

@Component({
  selector: 'app-order-overview',
  imports: [
    CommonModule,
    FormsModule,
    TagModule,
    DividerModule,
    TableModule,
    SelectModule,
    ButtonModule,
    SkeletonModule,
    InputGroupModule,
    InputTextModule,
    ToolbarModule,
  ],
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.scss',
})
export class OrderEditComponent implements OnInit, OnDestroy {
  private readonly wcApi = inject(WcV3Service);
  private readonly config = inject(DynamicDialogConfig);
  private readonly errorService = inject(ErrorDialogService);
  private readonly destroy$ = new Subject<void>();

  vmEdit: Pick<WcOrder, 'billing' | 'status'> = {
    billing: {} as Billing,
    status: 'pending',
  };

  order = signal<WcOrder | null>(null);
  loading = signal(true);
  saving = signal(false);
  editMode = signal<Boolean>(this.config.data?.editMode ?? false);

  statusOptions = [...WC_ORDER_STATUSES].map((status) => ({
    label: status,
    value: status,
  }));

  ngOnInit(): void {
    const orderId: number = this.config.data?.orderId;
    if (orderId) {
      this.fetchOrderDetails(orderId);
    } else {
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchOrderDetails(orderId: number): void {
    this.wcApi
      .getOrderById(orderId)
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          return throwError(() => err);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        if (data) {
          this.order.set(data);
          this.vmEdit = {
            billing: { ...data.billing },
            status: data.status,
          };
        }
        this.loading.set(false);
      });
  }

  saveChanges(): void {
    if (!this.order()) return;
    this.wcApi
      .updateOrder(this.order()!.id, this.vmEdit)
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          return throwError(() => err);
        }),
      )
      .subscribe((updatedOrder) => {
        this.order.set(updatedOrder);
        this.editMode.set(false);
      });
  }

  replaceLineItem(itemId: number): void {
    // TODO: line item replacement logic
  }

  removeLineItem(itemId: number): void {
    // TODO: remove from order via wcApi
  }

  addLineItem(): void {
    // TODO: open product select, then add to order via wcApi
  }

  statusSeverity(status: string) {
    return STATUS_SEVERITY[status] ?? 'secondary';
  }
}
