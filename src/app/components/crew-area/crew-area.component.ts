import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WcLineItem, WcOrder } from '@models/order.model';
import { WcV3Service } from '@services/api/wc-v3.service';
import { DateFormatPipe } from '@pipes/date-format.pipe';
import { WcCartItem } from '@models/cart.model';
import { DISCLAIMER_PRODUCTS } from '@models/cross-sale.model';
import { CommonModule } from '@angular/common';
import { OrderStatusComponent } from '@shared/status/order-status.component';

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
  ],
  templateUrl: './crew-area.component.html',
  styleUrl: './crew-area.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrewAreaComponent implements AfterViewInit, OnInit {
  endpoints = inject(WcV3Service);
  orderCollection = signal<Array<WcOrder>>([]);
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

  constructor() {}

  ngOnInit(): void {
    /*     this.endpoints
      .getOrdersByInvite('Alex', [2024, 2025])
      .subscribe((r) => this.orderCollection.set(r)); */

    this.endpoints.getOrders().subscribe((r) => {
      this.orderCollection.set(r);
    });
  }

  findMainItem(items: Array<WcLineItem>) {
    return items.find((item) => !DISCLAIMER_PRODUCTS.has(item.product_id))
      ?.name;
  }

  findCrossItem(items: Array<WcLineItem>) {
    return items.find((item) => DISCLAIMER_PRODUCTS.has(item.product_id))?.name;
  }

  ngAfterViewInit(): void {}
}
