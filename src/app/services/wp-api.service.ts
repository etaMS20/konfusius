import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND } from '../../config/http.config';
import { WPCategory } from '../models/media.model';

// TODO: Setup caching
@Injectable({
  providedIn: 'root',
})
export class WordPressApiService {
  private readonly apiUrl = BACKEND + '/wp/v2';
  private readonly headers: HttpHeaders;
  private readonly username = 'angular_app';
  private readonly password = '2&H3XoY83A5LH^PHt9JuNVm';

  constructor(private readonly http: HttpClient) {
    const encodedCredentials = btoa(`${this.username}:${this.password}`);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    });
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`, { headers: this.headers });
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`, {
      headers: this.headers,
    });
  }

  getMediaImages(
    category?: WPCategory,
    perPage: number = 100,
  ): Observable<any> {
    const params: any = { per_page: perPage };
    if (category !== undefined) params.attachment_category = category;
    return this.http.get(`${this.apiUrl}/media`, {
      params,
      headers: this.headers,
    });
  }

  getMediaImageById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/media/${id}`, {
      headers: this.headers,
    });
  }
}
