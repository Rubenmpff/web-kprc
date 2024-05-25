import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Client } from '../models/Client';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  }

  private getCurrentUser(): any {
    const token = this.cookieService.get('currentUserToken');
    return token ? { token } : null;
  }

  public get currentUserValue(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(map(response => {
        if (response && response.token) {
          this.cookieService.set('currentUserToken', response.token, 1, '/', undefined, true, 'Strict');
          this.currentUserSubject.next({ token: response.token });
        }
        return response;
      }));
  }

  logout(): void {
    this.cookieService.delete('currentUserToken', '/');
    this.currentUserSubject.next(null);
  }

  register(client: Client): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, client);
  }

  public isAuthenticated(): boolean {
    const token = this.cookieService.get('currentUserToken');
    return !!token;
  }
}