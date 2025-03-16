import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { HumanReadableDatePipe } from '@pipes//datetime.pipe';
import { WcOrder } from 'src/app/models/order.model';
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

  order = signal<WcOrder | null>(null);
  error = signal<string | null>(null);
  orderId = signal<number | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const orderId = parseInt(id, 10);
        this.orderId.set(orderId);
        this.fetchOrderDetails(orderId);
      } else {
        this.loading.set(false);
      }
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
