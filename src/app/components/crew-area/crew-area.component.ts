import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DateFormatPipe } from '@pipes/date-format.pipe';
import { DISCLAIMER_PRODUCTS } from '@models/cross-sale.model';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from '@shared/status/order-status.component';
import { CustomEndpointsService } from '@services/api/custom-endpoints.service';
import { MatSelectModule } from '@angular/material/select';
import { LineItemMin, OrderMin } from '@models/types.model';
import { WC_ORDER_STATUSES, WcOrderStatus } from '@models/order.model';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WcV3Service } from '@services/api/wc-v3.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { indicate } from '@utils/reactive-loading.utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-crew-area',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DateFormatPipe,
    CommonModule,
    OrderStatusComponent,
    MatSelectModule,
    MatSort,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './crew-area.component.html',
  styleUrl: './crew-area.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrewAreaComponent implements AfterViewInit, OnInit, OnDestroy {
  wcV3 = inject(WcV3Service);
  customEpS = inject(CustomEndpointsService);
  contactPersons = signal<Array<string>>([]);
  dataSource = new MatTableDataSource<OrderMin>([]);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: Array<string> = [
    'id',
    'date_created',
    'name',
    'email',
    'invited_by',
    'items_main',
    'items_cross',
    'total_price',
    'order_status',
    'select',
  ];
  selection = new SelectionModel<OrderMin>(true, []);
  loading$ = new Subject<boolean>();
  private readonly destroy$ = new Subject<void>();

  statuses = WC_ORDER_STATUSES;
  shiftFilter = '';
  nameFilter = '';
  contactFilter: string | null = null;
  statusFilter: WcOrderStatus[] = this.statuses.filter(
    (status) =>
      !new Set(['pending', 'refunded', 'failed', 'processing']).has(status),
  );

  constructor(private readonly errorService: ErrorDialogService) {}

  ngOnInit(): void {
    this.refreshCollection();

    /** filter predicate */
    this.dataSource.filterPredicate = (order: OrderMin, filter: string) => {
      const parsedFilter = JSON.parse(filter);

      const shift = this.findMainItem(order.line_items) ?? '';

      const contactMatch =
        !parsedFilter.invited_by ||
        order.billing.billing_invite === parsedFilter.invited_by;

      const statusMatch =
        !parsedFilter.order_status ||
        parsedFilter.order_status.length === 0 ||
        parsedFilter.order_status.includes(order.status);

      const shiftMatch =
        !parsedFilter.items_main ||
        shift.toLowerCase().includes(parsedFilter.items_main);

      const nameMatch =
        !parsedFilter.name ||
        order.billing.full_name.toLowerCase().includes(parsedFilter.name);

      return shiftMatch && contactMatch && statusMatch && nameMatch;
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private refreshCollection() {
    this.loading$.next(true);

    this.customEpS // endpoint can be improved
      .getOrdersByInvite('', ['2025'])
      .pipe(
        indicate(this.loading$),
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((orders) => {
        this.dataSource.data = orders;
      });

    this.customEpS
      .listAllowedInvites()
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((response: string[]) => {
        this.contactPersons.set(response);
      });
  }

  findMainItem(items: Array<LineItemMin>) {
    return items.find((item) => !DISCLAIMER_PRODUCTS.has(item.product_id))
      ?.name;
  }

  findCrossItem(items: Array<LineItemMin>) {
    return items.find((item) => DISCLAIMER_PRODUCTS.has(item.product_id))?.name;
  }

  applyFilter() {
    const filterObj = {
      name: this.nameFilter.trim().toLowerCase(),
      items_main: this.shiftFilter.trim().toLowerCase(),
      invited_by: this.contactFilter,
      order_status: this.statusFilter.length ? this.statusFilter : null,
    };
    this.dataSource.filter = JSON.stringify(filterObj);
  }

  toggleRow(order: OrderMin) {
    this.selection.toggle(order);
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  isPartialSelection() {
    return this.selection.selected.length > 0 && !this.isAllSelected();
  }

  // toggle all rows
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((order: OrderMin) =>
        this.selection.select(order),
      );
    }
  }

  bulkUpdateStatus(status: WcOrderStatus) {
    const selectedOrders = this.selection.selected.map((order) => order.id);
    this.wcV3
      .batchUpdateOrderStatus(selectedOrders, status)
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      )
      .subscribe(() => {
        this.refreshCollection();
        this.selection.clear(); // reset selection
      });
  }

  selectAll(event: Event) {
    if (!event.bubbles) {
      this.statusFilter = []; // Unselect all if already all are selected
    } else {
      this.statusFilter = [...this.statuses]; // Select all if not already selected
    }
    this.applyFilter(); // Apply the filter after the change
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.sort.active = 'date_created'; // default sort column
    this.sort.direction = 'desc'; // default sort direction to descending
    this.sort.sortChange.emit(); // trigger sorting

    this.dataSource.sortingDataAccessor = (order, property) => {
      switch (property) {
        case 'total_price':
          return parseInt(order.total);
        case 'date_created':
          return order.date_created.toLowerCase();
        default:
          return '';
      }
    };
  }
}
