import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND } from '../../config/http.config';

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

  // Create a new post
  createPost(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer YOUR_ACCESS_TOKEN`, // You need to handle authentication
    });

    return this.http.post(`${this.apiUrl}/posts`, postData, { headers });
  }

  // Update a post
  updatePost(id: number, postData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add the token or basic auth
    });

    return this.http.put(`${this.apiUrl}/posts/${id}`, postData, { headers });
  }

  // Delete a post
  deletePost(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add the token or basic auth
    });

    return this.http.delete(`${this.apiUrl}/posts/${id}`, { headers });
  }
}
