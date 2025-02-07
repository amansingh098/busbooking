import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddBusService {
  private apiUrl = 'https://localhost:7219/api/Admin/add-bus';

  constructor(private http: HttpClient) {}

  addBus(bus: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bus);
  }
}