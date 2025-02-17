import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WcApiWrapperService {
  constructor(private http: HttpClient) {}
}
