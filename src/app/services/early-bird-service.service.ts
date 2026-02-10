import { computed, inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';
import { WcV3Service } from './api/wc-v3.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class EarlyBirdService {
  private couponId = 2604;
  private readonly wcv3 = inject(WcV3Service);
  private messageService = inject(MessageService);
  private DEADLINE: DateTime = DateTime.now();
  private STOCK: number = 0;
  isInStock: boolean = false;
  public isMessageVisible = false;
  public key = 'early-bird-toast';

  private activeSubject = new BehaviorSubject<boolean>(false);
  isActive$ = this.activeSubject.asObservable();

  private readonly message = computed(
    () => `Es gibt 10€ Rabatt für die ersten 50 Anmeldungen - Bedingung ist das der Umkostenbeitrag bis spätestens zum ${this.DEADLINE.setLocale('de-DE').toLocaleString()} bei der Kontaktperson eingeht - damit wir schonmal gut planen können :).
  Die Rabattierung erfolgt beim checkout automatisch, sofern noch Early Birds verfügbar sind.`,
  );

  constructor() {
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
    if (this.isMessageVisible) {
      return;
    }
    this.messageService.clear(this.key);
    this.messageService.add({
      key: this.key,
      severity: 'warn',
      summary: 'Early Bird Rabatt',
      detail: this.message(),
      sticky: true,
      icon: 'pi pi-ticket',
    });
    this.isMessageVisible = true;
  }
}
