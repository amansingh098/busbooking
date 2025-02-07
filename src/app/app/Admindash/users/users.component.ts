import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  allAdminIds: any[] = [];
  selectedUserBookings: any[] | null = null;
  selectedUserId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchAllAdminIds();
  }

  fetchUsers(): void {
    this.http.get<any[]>('https://localhost:7219/api/Admin/users')
      .subscribe(data => {
        this.users = data;
      });
  }

  fetchAllAdminIds(): void {
    this.http.get<any[]>('https://localhost:7219/api/Admin/all-admin-ids')
      .subscribe(data => {
        this.allAdminIds = data;
      });
  }

  viewBookings(userId: number): void {
    this.selectedUserId = userId;
    this.http.get<any[]>(`https://localhost:7219/api/Admin/bookings/user/${userId}`)
      .subscribe(data => {
        this.selectedUserBookings = data;
      }, error => {
        this.selectedUserBookings = [];
      });
  }

  closeModal(): void {
    this.selectedUserBookings = null;
    this.selectedUserId = null;
  }
}