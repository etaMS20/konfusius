import { inject, Injectable } from '@angular/core';
import { Shift } from '../components/shift/shift.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSUMER_KEY, CONSUMER_SECRET } from '../../config/http.config';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  http = inject(HttpClient);
  shifts: Array<Shift>;
  shiftsBe?: Array<Shift>;

  constructor() {
    this.shifts = [
      {
        title: 'Kiosk',
        imagePath: '/kiosk_1.png',
        description: 'This is a detailed description.',
        available: true,
      },
      {
        title: 'Bar',
        imagePath: '/bar.png',
        description: 'This is a detailed description.',
        available: true,
      },
      {
        title: 'Abbau',
        imagePath: '/abbau.png',
        description: 'This is a detailed description.',
        available: true,
      },
      {
        title: '/Awareness',
        imagePath: 'awareness.png',
        description: 'This is a detailed description.',
        available: true,
      },
    ];
  }

  get getShiftsBackend() {
    const authHeader = 'Basic ' + btoa(CONSUMER_KEY + ':' + CONSUMER_SECRET);
    const headers = new HttpHeaders().set('Authorization', authHeader);

    return this.http.get<any>('/wp-json/wc/v3', {
      headers,
    });
  }
}
