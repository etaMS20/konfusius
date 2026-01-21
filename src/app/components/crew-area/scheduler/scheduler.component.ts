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
import { WcTimeframeUtil } from '../time-mapper.util';
import { Subject, takeUntil } from 'rxjs';
import { CustomEventTitleFormatter } from '../title-formatter.provider';
import { CustomDateFormatter } from '../date-formatter.provider';
import { generateProductColors } from './colors.util';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

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
    MatRadioModule,
    MatIconButton,
    MatIcon,
    MatDivider,
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

  locale: string = 'de-DE';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  private productIds = signal<number[]>([]);

  view: CalendarView = CalendarView.Month;

  viewDate = signal<Date>(new Date(2026, 4, 15));

  private timeUtil = new WcTimeframeUtil(new Date(2026, 4, 0), this.viewDate());

  calendarEntries = signal<CalendarEvent[]>([]);

  activeDayIsOpen: boolean = true;

  ngOnInit() {
    this.loadProductsToCalendar();
  }

  ngAfterViewInit() {}

  private loadProductsToCalendar() {
    const anchorDate = this.viewDate;

    this.wcStoreApi
      .listProducts(50, 'title') // cat "Variable Basic" + sort by title
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.productIds.set(products.map((p) => p.id));
        const colors = generateProductColors(this.productIds());
        const events: CalendarEvent[] = products.flatMap((p) => {
          const name = p.name;
          const timesWithIds = (p.variations ?? []).flatMap((v) =>
            v.attributes.map((item) => ({
              value: item.value,
              variationId: v.id,
              productId: p.id, // "parent"
            })),
          );

          return timesWithIds.map((t, idx) => ({
            id: t.variationId,
            title: `${name ?? 'Fehlerhafter Eintrag'} ${idx + 1}`,
            start:
              this.timeUtil.parseRelativeInterval(t.value).start ?? anchorDate,
            end: this.timeUtil.parseRelativeInterval(t.value).end ?? anchorDate,
            color: colors[p.id],
            meta: {
              productId: t.productId,
            },
          }));
        });

        this.calendarEntries.set(events);
        this.loadMetaInformation();
      });
  }

  private loadMetaInformation() {
    this.productIds().forEach((id) => {
      this.wcStoreApi
        .listProductVariations(id as number, ['instock', 'outofstock'])
        .pipe(takeUntil(this.destroy$))
        .subscribe((variations) => {
          this.calendarEntries.update((entries) => {
            return entries.map((entry) => {
              const variation = variations.find((v) => v.id === entry.id);
              if (variation) {
                return {
                  ...entry,
                  meta: {
                    ...entry.meta,
                    stock: variation.stock_availability,
                  },
                };
              }
              return entry;
            });
          });
        });
    });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
    if (renderEvent.hourColumns) {
      renderEvent.hourColumns.forEach((column: any) => {
        if (column.events) {
          const factor = this.productIds().length;
          const widthPerProduct = 100 / factor;
          column.events.forEach((dayViewEvent: any) => {
            const productId = dayViewEvent.event.meta?.productId;
            const productIndex = this.productIds().indexOf(productId);

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
