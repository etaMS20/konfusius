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
} from 'angular-calendar';
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

registerLocaleData(localeDe);

@Component({
  selector: 'app-schedule',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CalendarModule, MatButtonToggleModule, FormsModule],
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

  view: CalendarView = CalendarView.Day;

  viewDates: Date[] = [
    new Date(2026, 4, 14),
    new Date(2026, 4, 15),
    new Date(2026, 4, 16),
    new Date(2026, 4, 17),
    new Date(2026, 4, 18),
  ];

  viewDate: Date = this.viewDates[0];
  private timeUtil = new WcTimeframeUtil(new Date(2026, 4, 0), this.viewDate);

  calendarEntries = signal<CalendarEvent[]>([]);

  ngOnInit() {
    this.loadProductsToCalendar();
  }

  ngAfterViewInit() {}

  private loadProductsToCalendar() {
    const anchorDate = this.viewDate;

    this.wcStoreApi
      .listProducts(50) // category 50 = "Variable Basic"
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        document.documentElement.style.setProperty(
          '--calendar-event-max-width',
          '200px',
        );
        this.productIds.set(products.map((p) => p.id));
        const colors = generateProductColors(this.productIds());
        const events: CalendarEvent[] = products.flatMap((p) => {
          const name = p.name;
          const timesWithIds = (p.variations ?? []).flatMap((v) =>
            v.attributes.map((item) => ({
              value: item.value,
              variationId: v.id,
            })),
          );

          return timesWithIds.map((t, idx) => ({
            id: t.variationId,
            title: `${name ?? 'Fehlerhafter Eintrag'} (${idx + 1})`,
            start:
              this.timeUtil.parseRelativeInterval(t.value).start ?? anchorDate,
            end: this.timeUtil.parseRelativeInterval(t.value).end ?? anchorDate,
            color: colors[p.id],
            cssClass: 'kf-calendar-event',
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
}
