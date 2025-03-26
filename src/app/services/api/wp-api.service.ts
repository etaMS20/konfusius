import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND, WP_SECRET, WP_USER } from '@config/http.config';
import { WPMediaCategory, WPMediaTag } from '@models/media.model';
@Injectable({
  providedIn: 'root',
})
export class WordPressApiService {
  private readonly apiUrl = BACKEND + '/wp/v2';
  private readonly headers: HttpHeaders;
  private readonly username = WP_USER;
  private readonly password = WP_SECRET;

  constructor(private readonly http: HttpClient) {
    const encodedCredentials = btoa(`${this.username}:${this.password}`);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    });
  }

  getPosts(ids?: Array<number>): Observable<any> {
    let params = new HttpParams();

    if (ids && ids.length > 0) {
      params = params.set('include', ids.join(','));
    }

    return this.http.get(`${this.apiUrl}/posts`, {
      headers: this.headers,
      params,
    });
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`, {
      headers: this.headers,
    });
  }

  getMediaImages(
    category?: WPMediaCategory | WPMediaCategory[],
    tag?: WPMediaTag | WPMediaTag[],
    perPage: number = 100,
  ): Observable<any> {
    const params: any = { per_page: perPage };
    if (category) {
      params.attachment_category = Array.isArray(category)
        ? category.join(',')
        : category;
    }
    if (tag) {
      params.attachment_tag = Array.isArray(tag) ? tag.join(',') : tag;
    }
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
