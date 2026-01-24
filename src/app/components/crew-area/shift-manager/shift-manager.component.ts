import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
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
import { FilterService, SelectItem } from 'primeng/api';

// Deine Models & Services
import { WcV3Service } from '@services/api/wc-v3.service';
import { CustomEndpointsService } from '@services/api/custom-endpoints.service';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';
import { OrderMin, LineItemMin } from '@models/types.model';
import { WC_ORDER_STATUSES, WcOrderStatus } from '@models/order.model';
import { DISCLAIMER_PRODUCTS } from '@models/cross-sale.model';
import { DateFormatPipe } from '@pipes/date-format.pipe';

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

  // Daten & Status
  orders = signal<OrderMin[]>([]);
  filteredOrders = signal<OrderMin[]>([]); // Für die Summenberechnung
  contactPersons = signal<string[]>([]);
  selectedOrders = signal<OrderMin[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  private readonly destroy$ = new Subject<void>();

  // Filter Optionen
  statuses = WC_ORDER_STATUSES.map((s) => ({
    label: s.toUpperCase(),
    value: s,
  }));

  constructor() {
    // Custom Filter-Logik für PrimeNG registrieren
    this.setupCustomFilters();
  }

  ngOnInit(): void {
    this.refreshCollection();
  }

  private setupCustomFilters() {
    // Beispiel für einen komplexen Filter (wie dein Invited_by)
    this.filterService.register(
      'custom-invite',
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
      .getOrdersByInvite('', ['2025'])
      .pipe(
        catchError((err) => this.handleError(err)),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.orders.set(data);
        this.filteredOrders.set(data);
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

  // Helper für die Template-Logik
  findMainItem(items: LineItemMin[]) {
    return (
      items.find((i) => !DISCLAIMER_PRODUCTS.has(i.product_id))?.name || ''
    );
  }

  findCrossItem(items: Array<LineItemMin>) {
    return items.find((item) => DISCLAIMER_PRODUCTS.has(item.product_id))?.name;
  }

  get sumPrice(): number {
    return this.filteredOrders().reduce((sum, o) => sum + Number(o.total), 0);
  }

  onFilter(event: any) {
    // PrimeNG Table gibt die aktuell gefilterten Daten zurück
    this.filteredOrders.set(event.filteredValue);
  }

  bulkUpdateStatus(status: WcOrderStatus) {
    const ids = this.selectedOrders().map((o) => o.id);
    this.wcV3
      .batchUpdateOrderStatus(ids, status)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(() => {
        this.refreshCollection();
        this.selectedOrders.set([]);
      });
  }

  private handleError(error: any) {
    this.errorService.handleError(error);
    return throwError(() => error);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
