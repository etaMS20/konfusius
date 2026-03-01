import { computed, inject, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';
import { WcV3Service } from './api/wc-v3.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class EarlyBirdService {
  private couponId = 2604;
  public couponCode = signal<string | null>(null);
  private readonly wcv3 = inject(WcV3Service);
  private messageService = inject(MessageService);
  private DEADLINE: DateTime = DateTime.now();
  private STOCK: number = 0;
  isInStock: boolean = false;
  public isMessageVisible = false;
  public key = 'early-bird-toast';

  private activeSubject = new BehaviorSubject<boolean>(false);
  isActive$ = this.activeSubject.asObservable();

  private message: string = '';

  constructor() {
    this.wcv3.getCouponById(this.couponId).subscribe((coupon) => {
      if (!coupon) {
        return;
      }
      const expiryDate = DateTime.fromISO(coupon.date_expires);
      this.DEADLINE = expiryDate;
      this.STOCK = coupon.usage_limit - coupon.usage_count;
      this.message = coupon.description || '';
      this.isInStock = this.STOCK > 0;
      this.couponCode.set(coupon.code);
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
      detail: this.message,
      sticky: true,
      icon: 'pi pi-ticket',
    });
    this.isMessageVisible = true;
  }
}
