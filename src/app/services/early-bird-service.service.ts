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
  private activeSubject = new BehaviorSubject<boolean>(false);
  isActive$ = this.activeSubject.asObservable();

  constructor(private messageService: MessageService) {
    this.wcv3.getCouponById(this.couponId).subscribe((coupon) => {
      const expiryDate = DateTime.fromISO(coupon.date_expires);
      this.DEADLINE = expiryDate;
      this.checkStatus();
    });
  }

  checkStatus() {
    const isEarly = DateTime.now() < this.DEADLINE;
    this.activeSubject.next(isEarly);
  }

  getRemainingTime() {
    return this.DEADLINE.diffNow(['days', 'hours', 'minutes']);
  }

  showEarlyBirdMessage() {
    this.messageService.add({
      severity: 'info',
      summary: 'Early Bird Rabatt',
      detail: `10€ Rabatt bis zum ${this.DEADLINE.toLocaleString()}`,
      sticky: true,
      icon: 'pi pi-ticket',
    });
  }
}
