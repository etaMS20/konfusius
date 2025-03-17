import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND, WP_SECRET, WP_USER } from '@config/http.config';
import { WPMediaCategory, WPMediaTag } from '@models/media.model';
import { ErrorDialogService } from '@shared/errors/error-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class WordPressApiService {
  private readonly apiUrl = BACKEND + '/wp/v2';
  private readonly headers: HttpHeaders;
  private readonly errorService = inject(ErrorDialogService);
  private readonly username = WP_USER;
  private readonly password = WP_SECRET;

  constructor(private readonly http: HttpClient) {
    const encodedCredentials = btoa(`${this.username}:${this.password}`);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${encodedCredentials}`,
    });
  }

  getPosts(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/posts`, { headers: this.headers })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
  }

  getPostById(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/posts/${id}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
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
    return this.http
      .get(`${this.apiUrl}/media`, {
        params,
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
  }

  getMediaImageById(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/media/${id}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          this.errorService.handleError(error);
          return throwError(() => error);
        }),
      );
  }
}
