import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';

import { WC_ORDER_STATUSES, WcOrder } from '@models/order.model';
import { WcV3Service } from '@services/api/wc-v3.service';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { WcProduct, WcProductTypes, WcProductVariationDetails } from '@models/product.model';
import { crossSaleProductCat } from '@models/cross-sale.model';
import { AuthService } from '@services/auth.service';
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
  private readonly storeApi = inject(WcStoreAPI);
  private readonly authService = inject(AuthService);
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

  // Product picker state
  showAddItem = signal<'shift' | 'ticket' | null>(null);
  shiftProducts = signal<WcProduct[]>([]);
  ticketProducts = signal<WcProduct[]>([]);
  loadingProducts = signal(false);

  selectedProductId = signal<number | null>(null);
  variations = signal<WcProductVariationDetails[]>([]);
  loadingVariations = signal(false);
  selectedVariationId: number | null = null;

  currentPickerProducts = computed(() =>
    this.showAddItem() === 'shift' ? this.shiftProducts() : this.ticketProducts(),
  );

  selectedProductIsVariable = computed(() => {
    const id = this.selectedProductId();
    if (!id) return false;
    return (
      this.currentPickerProducts().find((p) => p.id === id)?.type ===
      WcProductTypes.VARIABLE
    );
  });

  canConfirmAdd = computed(() => {
    if (!this.selectedProductId()) return false;
    if (this.selectedProductIsVariable()) return !!this.selectedVariationId;
    return true;
  });

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

  enterEditMode(): void {
    const o = this.order();
    if (o) {
      this.vmEdit = {
        billing: { ...o.billing },
        status: o.status,
      };
    }
    this.resetPicker();
    this.loadProducts('shift');
    this.loadProducts('ticket');
    this.editMode.set(true);
  }

  cancelEditMode(): void {
    this.resetPicker();
    this.editMode.set(false);
  }

  saveChanges(): void {
    if (!this.order()) return;
    this.saving.set(true);
    this.wcApi
      .updateOrder(this.order()!.id, this.vmEdit)
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          this.saving.set(false);
          return throwError(() => err);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((updatedOrder) => {
        this.order.set(updatedOrder);
        this.saving.set(false);
        this.editMode.set(false);
      });
  }

  removeLineItem(itemId: number): void {
    if (!this.order()) return;
    this.wcApi
      .updateOrder(this.order()!.id, {
        line_items: [{ id: itemId, quantity: 0 } as any],
      })
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          return throwError(() => err);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((updatedOrder) => {
        this.order.set(updatedOrder);
      });
  }

  openPicker(type: 'shift' | 'ticket'): void {
    this.resetPicker();
    this.showAddItem.set(type);
  }

  onProductSelected(productId: number): void {
    this.selectedProductId.set(productId);
    this.selectedVariationId = null;
    this.variations.set([]);

    if (
      this.currentPickerProducts().find((p) => p.id === productId)?.type ===
      WcProductTypes.VARIABLE
    ) {
      this.loadVariations(productId);
    }
  }

  confirmAddLineItem(): void {
    if (!this.selectedProductId() || !this.order()) return;
    if (this.selectedProductIsVariable() && !this.selectedVariationId) return;

    const lineItem: any = { product_id: this.selectedProductId(), quantity: 1 };
    if (this.selectedVariationId) {
      lineItem.variation_id = this.selectedVariationId;
    }

    this.wcApi
      .updateOrder(this.order()!.id, { line_items: [lineItem] })
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          return throwError(() => err);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((updatedOrder) => {
        this.order.set(updatedOrder);
        this.resetPicker();
      });
  }

  private loadProducts(type: 'shift' | 'ticket'): void {
    const already = type === 'shift' ? this.shiftProducts() : this.ticketProducts();
    if (already.length) return;

    const category =
      type === 'shift' ? this.authService.productCategory : [crossSaleProductCat];

    this.loadingProducts.set(true);
    this.storeApi
      .listProducts(category, 'title', 'asc', 100)
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          this.loadingProducts.set(false);
          return throwError(() => err);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((products) => {
        if (type === 'shift') this.shiftProducts.set(products);
        else this.ticketProducts.set(products);
        this.loadingProducts.set(false);
      });
  }

  private loadVariations(productId: number): void {
    this.loadingVariations.set(true);
    this.storeApi
      .listProductVariations(productId)
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          this.loadingVariations.set(false);
          return throwError(() => err);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((variations) => {
        this.variations.set(variations);
        this.loadingVariations.set(false);
      });
  }

  resetPicker(): void {
    this.showAddItem.set(null);
    this.selectedProductId.set(null);
    this.selectedVariationId = null;
    this.variations.set([]);
  }

  statusSeverity(status: string) {
    return STATUS_SEVERITY[status] ?? 'secondary';
  }
}
