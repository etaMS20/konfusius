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
import {
  WcProduct,
  WcProductTypes,
  WcProductVariationDetails,
} from '@models/product.model';
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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
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

interface VmLineItem {
  /** Undefined for newly added items not yet saved */
  id?: number;
  product_id: number;
  variation_id?: number;
  name: string;
  quantity: number;
  price: number;
  isNew: boolean;
}

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
    TooltipModule,
  ],
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.scss',
})
export class OrderEditComponent implements OnInit, OnDestroy {
  private readonly wcApi = inject(WcV3Service);
  private readonly storeApi = inject(WcStoreAPI);
  private readonly authService = inject(AuthService);
  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef, { optional: true });
  private readonly errorService = inject(ErrorDialogService);
  private readonly destroy$ = new Subject<void>();

  // --- View model (only active while in edit mode) ---

  vmBilling: Billing = {} as Billing;
  vmStatus: WcOrder['status'] = 'pending';
  vmLineItems = signal<VmLineItem[]>([]);

  vmTotal = computed(() =>
    this.vmLineItems().reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    ),
  );

  // --- Order state ---

  order = signal<WcOrder | null>(null);
  loading = signal(true);
  saving = signal(false);
  editMode = signal(false);

  // --- Product picker ---

  showAddItem = signal<'shift' | 'ticket' | null>(null);
  shiftProducts = signal<WcProduct[]>([]);
  ticketProducts = signal<WcProduct[]>([]);
  variations = signal<WcProductVariationDetails[]>([]);
  loadingVariations = signal(false);
  selectedProductId = signal<number | null>(null);
  selectedVariationId: number | null = null;

  currentPickerProducts = computed(() =>
    this.showAddItem() === 'shift'
      ? this.shiftProducts()
      : this.ticketProducts(),
  );

  isPickerLoading = computed(() => {
    const type = this.showAddItem();
    if (type === 'shift') return this.shiftProducts().length === 0;
    if (type === 'ticket') return this.ticketProducts().length === 0;
    return false;
  });

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

  hasShift = computed(() =>
    this.vmLineItems().some((i) =>
      this.shiftProducts().some((p) => p.id === i.product_id),
    ),
  );

  hasTicket = computed(() => {
    const ticketIds = new Set(this.ticketProducts().map((p) => p.id));
    return this.vmLineItems().some((i) => ticketIds.has(i.product_id));
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
        if (data) this.order.set(data);
        this.loading.set(false);
      });
  }

  enterEditMode(): void {
    const o = this.order();
    if (!o) return;

    this.vmBilling = { ...o.billing };
    this.vmStatus = o.status;
    this.vmLineItems.set(
      o.line_items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        variation_id: item.variation_id || undefined,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        isNew: false,
      })),
    );

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
    const o = this.order();
    if (!o) return;
    this.saving.set(true);

    // Diff: items in original but removed from vmLineItems → quantity 0
    const keptIds = new Set(
      this.vmLineItems()
        .filter((i) => i.id !== undefined)
        .map((i) => i.id!),
    );
    const removals = o.line_items
      .filter((item) => !keptIds.has(item.id))
      .map((item) => ({ id: item.id, quantity: 0 }));

    // New items added during edit
    const additions = this.vmLineItems()
      .filter((i) => i.isNew)
      .map((i) => {
        const entry: any = { product_id: i.product_id, quantity: i.quantity };
        if (i.variation_id) entry.variation_id = i.variation_id;
        return entry;
      });

    const payload: any = { billing: this.vmBilling, status: this.vmStatus };
    const lineItems = [...removals, ...additions];
    if (lineItems.length) payload.line_items = lineItems;

    this.wcApi
      .updateOrder(o.id, payload)
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
        this.ref?.close(true);
      });
  }

  removeLineItem(index: number): void {
    this.vmLineItems.update((items) => items.filter((_, i) => i !== index));
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
    const productId = this.selectedProductId();
    if (!productId) return;

    const product = this.currentPickerProducts().find(
      (p) => p.id === productId,
    );
    if (!product) return;
    if (this.selectedProductIsVariable() && !this.selectedVariationId) return;

    let name = product.name;
    let price =
      parseInt(product.prices.price) /
      Math.pow(10, product.prices.currency_minor_unit);

    if (this.selectedVariationId) {
      const variation = this.variations().find(
        (v) => v.id === this.selectedVariationId,
      );
      if (variation) {
        name = variation.name;
        price =
          parseInt(variation.prices.price) /
          Math.pow(10, variation.prices.currency_minor_unit);
      }
    }

    this.vmLineItems.update((items) => [
      ...items,
      {
        product_id: productId,
        variation_id: this.selectedVariationId ?? undefined,
        name,
        quantity: 1,
        price,
        isNew: true,
      },
    ]);

    this.resetPicker();
  }

  resetPicker(): void {
    this.showAddItem.set(null);
    this.selectedProductId.set(null);
    this.selectedVariationId = null;
    this.variations.set([]);
  }

  private loadProducts(type: 'shift' | 'ticket'): void {
    const already =
      type === 'shift' ? this.shiftProducts() : this.ticketProducts();
    if (already.length) return;

    const category =
      type === 'shift'
        ? this.authService.productCategory
        : [crossSaleProductCat];

    this.storeApi
      .listProducts(category, 'title', 'asc', 100)
      .pipe(
        catchError((err) => {
          this.errorService.handleError(err);
          return throwError(() => err);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((products) => {
        if (type === 'shift') this.shiftProducts.set(products);
        else this.ticketProducts.set(products);
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

  statusSeverity(status: string) {
    return STATUS_SEVERITY[status] ?? 'secondary';
  }
}
