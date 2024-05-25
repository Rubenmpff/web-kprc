import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Email } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private controller = `${environment.apiUrl}email`;

  constructor(private http: HttpClient) { }

  sendEmail(email: Email): Observable<any> {
    return this.http.post(this.controller, email);
  }
}