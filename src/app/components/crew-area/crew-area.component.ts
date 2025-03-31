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
import { WcLineItem, WcOrder } from '@models/order.model';
import { WcV3Service } from '@services/api/wc-v3.service';
import { DateFormatPipe } from '@pipes/date-format.pipe';
import { WcCartItem } from '@models/cart.model';
import { DISCLAIMER_PRODUCTS } from '@models/cross-sale.model';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from '@shared/status/order-status.component';
import { CustomEndpointsService } from '@services/api/custom-endpoints.service';
import { MatSelectModule } from '@angular/material/select';

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
  dataSource = new MatTableDataSource<WcOrder>([]);
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

  shiftFilter = '';
  contactFilter: string | null = null;
  statusFilter: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.endpoints.getOrders().subscribe((orders) => {
      this.dataSource.data = orders;
    });

    this.customEpS.listAllowedInvites().subscribe((response: string[]) => {
      this.contactPersons.set(response);
    });

    this.dataSource.filterPredicate = (order: WcOrder, filter: string) => {
      const parsedFilter = JSON.parse(filter);

      const shift = this.findMainItem(order.line_items) ?? '';
      this.dataSource.sortingDataAccessor = (order, property) => {
        if (property === 'name') {
          return `${order.billing.first_name} ${order.billing.last_name}`.toLowerCase();
        }
        return order[property as keyof WcOrder] || '';
      };

      const contactMatch =
        !parsedFilter.kontakt ||
        order.billing.billing_invite === parsedFilter.kontakt;
      const statusMatch =
        !parsedFilter.status || order.status === parsedFilter.status;
      const shiftMatch = shift
        .toLowerCase()
        .includes(parsedFilter.schicht.toLowerCase());

      return shiftMatch && contactMatch && statusMatch;
    };
  }

  findMainItem(items: Array<WcLineItem>) {
    return items.find((item) => !DISCLAIMER_PRODUCTS.has(item.product_id))
      ?.name;
  }

  findCrossItem(items: Array<WcLineItem>) {
    return items.find((item) => DISCLAIMER_PRODUCTS.has(item.product_id))?.name;
  }

  applyFilter() {
    const filterObj = {
      schicht: this.shiftFilter,
      kontakt: this.contactFilter,
      status: this.statusFilter,
    };
    this.dataSource.filter = JSON.stringify(filterObj);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
