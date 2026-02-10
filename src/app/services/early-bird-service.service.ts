import { inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';
import { WcV3Service } from './api/wc-v3.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class EarlyBirdService {
  private couponId = 2604;
  private readonly wcv3 = inject(WcV3Service);
  private DEADLINE: DateTime = DateTime.now();
  private STOCK: number = 0;
  isInStock: boolean = false;

  private activeSubject = new BehaviorSubject<boolean>(false);
  isActive$ = this.activeSubject.asObservable();

  constructor(private messageService: MessageService) {
    this.wcv3.getCouponById(this.couponId).subscribe((coupon) => {
      if (!coupon) {
        return;
      }
      const expiryDate = DateTime.fromISO(coupon.date_expires);
      this.DEADLINE = expiryDate;
      this.STOCK = coupon.usage_limit - coupon.usage_count;
      this.isInStock = this.STOCK > 0;
      this.checkStatus();
    });
  }

  checkStatus() {
    const isInStock = this.isInStock;
    const isEarly = DateTime.now() < this.DEADLINE;
    this.activeSubject.next(isEarly && isInStock);
  }

  getRemainingTime() {
    return this.DEADLINE.diffNow(['days', 'hours', 'minutes']);
  }

  showEarlyBirdMessage() {
    const key = 'global';
    this.messageService.clear(key);
    this.messageService.add({
      key,
      severity: 'info',
      summary: 'Early Bird Rabatt',
      detail: `Es gibt 10€ Rabatt für die ersten 50 Anmeldungen, damit wir schonmal gut planen können :).\n\n Dies gilt für alle Anmeldungen die bis zum ${this.DEADLINE.setLocale('de-DE').toLocaleString()} eingehen und den Umkostenbeitrag bis spätestens 2 Wochen nach der Anmeldung bei der Kontaktperson eingezahlt haben.`,
      sticky: true,
      icon: 'pi pi-ticket',
    });
  }
}
