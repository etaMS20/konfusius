import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { WcV3Service } from '@services/api/wc-v3.service';
import { DateFormatPipe } from '@pipes/date-format.pipe';
import { DISCLAIMER_PRODUCTS } from '@models/cross-sale.model';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from '@shared/status/order-status.component';
import { CustomEndpointsService } from '@services/api/custom-endpoints.service';
import { MatSelectModule } from '@angular/material/select';
import { LineItemMin, OrderMin } from '@models/types.model';
import { WC_ORDER_STATUSES, WcOrderStatus } from '@models/order.model';

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
  ],
  templateUrl: './crew-area.component.html',
  styleUrl: './crew-area.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrewAreaComponent implements AfterViewInit, OnInit {
  endpoints = inject(WcV3Service);
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
  ];

  statuses = WC_ORDER_STATUSES;
  shiftFilter = '';
  nameFilter = '';
  contactFilter: string | null = null;
  statusFilter: WcOrderStatus | null = null;

  constructor() {}

  ngOnInit(): void {
    //TODO: This can be improved
    this.customEpS.getOrdersByInvite('', ['2025']).subscribe((orders) => {
      this.dataSource.data = orders;
    });

    this.customEpS.listAllowedInvites().subscribe((response: string[]) => {
      this.contactPersons.set(response);
    });

    /** filter predicate */
    this.dataSource.filterPredicate = (order: OrderMin, filter: string) => {
      const parsedFilter = JSON.parse(filter);

      const shift = this.findMainItem(order.line_items) ?? '';

      const contactMatch =
        !parsedFilter.invited_by ||
        order.billing.billing_invite === parsedFilter.invited_by;

      const statusMatch =
        !parsedFilter.order_status ||
        order.status === parsedFilter.order_status;

      const shiftMatch =
        !parsedFilter.items_main ||
        shift.toLowerCase().includes(parsedFilter.items_main);

      const nameMatch =
        !parsedFilter.name ||
        order.billing.full_name.toLowerCase().includes(parsedFilter.name);

      return shiftMatch && contactMatch && statusMatch && nameMatch;
    };
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
      order_status: this.statusFilter,
    };
    this.dataSource.filter = JSON.stringify(filterObj);
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
