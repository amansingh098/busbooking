import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [NgIf,NgFor,NgForOf,CommonModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'] // Corrected this line
})
export class BookingsComponent implements OnInit {
  booking: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getBookingDetails(userId);
    }
  }

  getBookingDetails(userId: string): void {
    this.http.get(`https://localhost:7219/api/Booking/user/${userId}`).subscribe(
      (data) => {
        this.booking = data;
      },
      (error) => {
        console.error('Error fetching booking details', error);
        if (error.status === 404) {
          alert('Booking not found. Please check the booking ID.');
        } else {
          alert('An error occurred while fetching booking details. Please try again later.');
        }
      }
    );
  }
}