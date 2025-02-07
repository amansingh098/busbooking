import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7219/api'; // Replace with your backend API URL
  private isLoggedIn = false;
  private userRole: string | null = null;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/Authentication/register-User`, user);
  }

  login(Name: string, Password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Authentication/login`, { Name, Password });
  }

  setLoginStatus(isLoggedIn: boolean, role: string | null) {
    this.isLoggedIn = isLoggedIn;
    this.userRole = role;
    if (isLoggedIn && role) {
      localStorage.setItem('token', 'your-jwt-token'); // Replace with actual token
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getRole(): string | null {
    return this.userRole;
  }
}