import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../Models/bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'https://localhost:7219/api/Bus'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }
}