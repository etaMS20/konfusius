import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Subject,
  catchError,
  finalize,
  takeUntil,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import { ShiftManagerToolbarComponent } from './shift-manager-toolbar/shift-manager-toolbar.component';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { FilterService } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';

// Deine Models & Services
import { WcV3Service } from '@services/api/wc-v3.service';
import { CustomEndpointsService } from '@services/api/custom-endpoints.service';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { OrderMin, LineItemMin } from '@models/types.model';
import { WC_ORDER_STATUSES, WcOrderStatus } from '@models/order.model';
import { DateFormatPipe } from '@pipes/date-format.pipe';
import { OrderStatusComponent } from '@shared/status/order-status.component';
import { findCrossItem, findMainItem } from '@utils/oder.utils';

@Component({
  selector: 'kf-shift-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    CheckboxModule,
    ProgressSpinnerModule,
    TooltipModule,
    DateFormatPipe,
    ShiftManagerToolbarComponent,
    OrderStatusComponent,
    ListboxModule,
  ],
  templateUrl: './shift-manager.component.html',
  styleUrl: './shift-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShiftManagerComponent implements OnInit, OnDestroy {
  private wcV3 = inject(WcV3Service);
  private customEpS = inject(CustomEndpointsService);
  private errorService = inject(ErrorDialogService);
  private filterService = inject(FilterService);

  scopeYears = signal<string[]>(['2026']);

  /** Raw coming from API */
  orders = signal<OrderMin[]>([]);

  /** Current keyword filter state */
  keywordFilter = signal<string>('');
  selectedFields = signal<string[]>(['name', 'email', 'shift']);

  private readonly FILTER_MAP: Record<string, string[]> = {
    name: ['billing.full_name'],
    email: ['billing.email'],
    shift: ['main_item_name', 'cross_item_name'],
  };

  /** implements the global filter */
  filteredOrders = computed(() => {
    const term = this.keywordFilter().toLowerCase().trim();
    const selected = this.selectedFields();
    const data = this.orders();

    if (!term || !selected.length) return data;

    return this.orders().filter((order) => {
      const pathsToSearch = selected.flatMap(
        (key) => this.FILTER_MAP[key] || [key],
      );
      return pathsToSearch.some((path) => {
        const value = this.getNestedValue(order, path);
        return String(value ?? '')
          .toLowerCase()
          .includes(term);
      });
    });
  });

  private getNestedValue(obj: OrderMin, path: string): unknown {
    return path.split('.').reduce((acc: any, key: string) => acc?.[key], obj);
  }

  selectedOrders = signal<OrderMin[]>([]);
  contactPersons = signal<string[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  private readonly destroy$ = new Subject<void>();

  statuses = WC_ORDER_STATUSES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));

  constructor() {
    this.setupCustomFilters();
  }

  ngOnInit(): void {
    this.refreshCollection();
  }

  private setupCustomFilters() {
    this.filterService.register(
      'statusContains',
      (value: any, filter: any): boolean => {
        if (filter === undefined || filter === null || filter.trim() === '')
          return true;
        return value === filter;
      },
    );
  }

  private refreshCollection() {
    this.loading$.next(true);

    // API Calls
    this.customEpS
      .getOrdersByInvite('', this.scopeYears())
      .pipe(
        catchError((err) => this.handleError(err)),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        // Enrich order data model for easier access and less run time computation
        const enrichedData = data.map((order) => ({
          ...order,
          main_item_name: findMainItem(order.line_items),
          cross_item_name: findCrossItem(order.line_items),
        }));
        this.orders.set(enrichedData);
      });

    this.customEpS
      .listAllowedInvites()
      .pipe(
        catchError((err) => this.handleError(err)),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$),
      )
      .subscribe((res) => this.contactPersons.set(res));
  }

  bulkUpdateStatus(status: WcOrderStatus) {
    this.loading$.next(true);
    const ids = this.selectedOrders().map((o) => o.id);
    this.wcV3
      .batchUpdateOrderStatus(ids, status)
      .pipe(
        catchError((err) => this.handleError(err)),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.refreshCollection();
        this.selectedOrders.set([]);
      });
  }

  private handleError(error: any) {
    this.errorService.handleError(error);
    this.orders.set([]);
    return throwError(() => error);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  pageRange = signal({ first: 0, rows: 10 });
  pageSum = computed(() => {
    const data = this.filteredOrders();
    const { first, rows } = this.pageRange();

    return data
      .slice(first, first + rows)
      .reduce((acc, order) => acc + (Number(order.total) || 0), 0);
  });

  totalFilteredSum = computed(() => {
    return this.filteredOrders().reduce(
      (acc, order) => acc + (Number(order.total) || 0),
      0,
    );
  });

  onPageChange(event: any) {
    this.pageRange.set({ first: event.first, rows: event.rows });
  }

  onScopeYearChange(years: string[]) {
    this.scopeYears.set(years);
    this.refreshCollection();
  }

  copyToClipboard(value: string | number) {
    navigator.clipboard.writeText(value.toString()).then(() => {
      // Optional: Erfolgserlebnis via Toast
      // this.messageService.add({ severity: 'success', summary: 'Kopiert', detail: 'In die Zwischenablage kopiert' });
      console.log('Kopiert:', value);
    });
  }
}
