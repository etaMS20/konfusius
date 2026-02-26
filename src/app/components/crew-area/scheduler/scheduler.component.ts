import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarModule,
  CalendarEventTitleFormatter,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarDayViewBeforeRenderEvent,
} from 'angular-calendar';
import { subDays, addDays, isSameDay, isSameMonth } from 'date-fns';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WcStoreAPI } from '@services/api/wc-store-api.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CustomEventTitleFormatter } from '../title-formatter.provider';
import { CustomDateFormatter } from '../date-formatter.provider';
import { generateProductColors } from './colors.util';
import { RadioButtonModule } from 'primeng/radiobutton';
import { KTimeUtilsService } from '@services/time-utils.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

registerLocaleData(localeDe);

@Component({
  selector: 'app-schedule',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CalendarModule,
    MatButtonToggleModule,
    FormsModule,
    RadioButtonModule,
    ProgressBarModule,
    ToolbarModule,
    ButtonModule,
  ],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class SchedulerComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
  private readonly wcStoreApi = inject(WcStoreAPI);
  public readonly timeUtil = inject(KTimeUtilsService);

  loading$ = new BehaviorSubject<boolean>(false);

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  private basicVariableProductIds = signal<number[]>([]);

  view: CalendarView = CalendarView.Month;

  viewDate = signal<Date>(this.timeUtil.festivalStart);

  calendarEntries = signal<CalendarEvent[]>([]);

  activeDayIsOpen: boolean = false;

  ngOnInit() {
    this.loading$.next(true);
    this.loadBasicVariationsToCalendar();
  }

  ngAfterViewInit() {}

  private loadBasicVariationsToCalendar() {
    this.wcStoreApi
      .listProducts([50], 'title') // sort by title
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.basicVariableProductIds.set(products.map((p) => p.id));
        const colors = generateProductColors(this.basicVariableProductIds());
        const events: CalendarEvent[] = products.flatMap((p) => {
          const name = p.name;
          const timesWithIds = (
            p.extensions.konfusius_shift?.variation_data ?? []
          ).map((v) => {
            return {
              productId: p.id,
              variationId: v.id,
              shiftInterval: v.time_interval,
              stock: v.stock_count,
              plannedStock: v.planned_stock,
            };
          });

          return timesWithIds.map((t, idx) => {
            const result = this.timeUtil.parseShiftInterval(t.shiftInterval);

            return {
              id: t.variationId,
              title: `${name ?? 'Fehlerhafter Eintrag'} ${idx + 1}`,
              start: result.start,
              end: result.end,
              color: colors[p.id],
              meta: {
                productId: t.productId,
                stock: t.stock,
                plannedStock: t.plannedStock,
              },
            };
          });
        });

        this.calendarEntries.update((existing) => [...existing, ...events]);
        this.loading$.next(false);
      });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
    if (renderEvent.hourColumns) {
      renderEvent.hourColumns.forEach((column: any) => {
        if (column.events) {
          const factor = this.basicVariableProductIds().length;
          const widthPerProduct = 100 / factor;
          column.events.forEach((dayViewEvent: any) => {
            const productId = dayViewEvent.event.meta?.productId;
            const productIndex =
              this.basicVariableProductIds().indexOf(productId);
            if (productIndex !== -1) {
              dayViewEvent.width = widthPerProduct;
              dayViewEvent.left = productIndex * widthPerProduct;
            }
          });
        }
      });
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate())) {
      if (
        (isSameDay(this.viewDate(), date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate.set(date);
    }
  }

  previousDay($event: MouseEvent): void {
    this.viewDate.set(subDays(this.viewDate(), 1));
  }

  nextDay($event: MouseEvent): void {
    this.viewDate.set(addDays(this.viewDate(), 1));
  }
}
