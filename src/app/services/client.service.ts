import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //https://localhost:5001/api/client

  controller = `${environment.apiUrl}client`;

constructor(private http: HttpClient) { }

getAll(): Observable<Client[]> {
  return this.http.get<Client[]>(this.controller);
}

getById(id: number): Observable<Client> {
  return this.http.get<Client>(`${this.controller}/${id}`);
  // return this.http.get<Client>(this.controller + "/" + id);
}

save(client: Client) {
  return this.http.post(this.controller, client);
}

delete(id: number): Observable<any> {
  return this.http.delete(`${this.controller}/${id}`);
}

}