import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BusDTO } from './BusDTO';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass, NgIf, NgClass, NgStyle,RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  busesWithRoutes: BusDTO[] = [];
  selectedBus: BusDTO | null = null;
  selectedSeat: string | null = null;
  availableSeats: string[] = [];
  bookedSeats: string[] = [];
  allSeats: string[] = []; // Add this line

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBusesWithRoutes();
  }

  getBusesWithRoutes(): void {
    this.http.get<any>('https://localhost:7219/api/All/BusesWithRoutes').subscribe(data => {
      console.log('Buses with Routes:', data); // Debugging statement
      this.busesWithRoutes = this.transformData(data.$values || data); // Ensure it's an array and transform data
    });
  }

  transformData(data: any[]): BusDTO[] {
    return data.map(item => {
      const routes = item.Routes || {}; // Ensure routes is defined
      return new BusDTO(
        item.BusId,
        item.BusName,
        item.BusNumber,
        item.RouteId,
        routes.Source || 'Unknown', // Provide a default value if source is undefined
        routes.Destination || 'Unknown', // Provide a default value if destination is undefined
        item.Boarding || 'N/A', // Map boarding time
        item.Departure || 'N/A', // Map departure time
        item.Duration || 'N/A', // Map duration
        item.Arrival || 'N/A' // Map arrival time
      );
    });
  }

  selectBus(bus: BusDTO): void {
    console.log('Bus selected:', bus); // Debugging statement
    this.selectedBus = bus;
    this.getSeatAvailability(bus.busId);
    this.openModal();
  }

  getSeatAvailability(busId: number): void {
    this.http.get<any>(`https://localhost:7219/api/Bus/seat-availability/${busId}`).subscribe(data => {
      console.log('Seat availability:', data); // Debugging statement
      this.availableSeats = data.availableSeats;
      this.bookedSeats = data.bookedSeats;
      this.allSeats = [...data.availableSeats, ...data.bookedSeats]; // Combine available and booked seats
    });
  }

  openModal(): void {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  closeModal(): void {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
    this.selectedBus = null;
    this.selectedSeat = null;
  }

  selectSeat(seat: string): void {
    this.selectedSeat = seat;
  }

  bookSeat(): void {
    if (this.selectedBus && this.selectedSeat) {
      const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
      const bookingData = {
        busId: this.selectedBus.busId,
        seatNo: this.selectedSeat,
        userId: userId
      };

      this.http.post('https://localhost:7219/api/Bus/book-Bus', bookingData).subscribe(response => {
        console.log('Booking response:', response);
        this.closeModal();
      }, error => {
        console.error('Booking error:', error);
      });

      console.log(`Booking seat ${this.selectedSeat} for bus ${this.selectedBus.busName}`);
    }
  }
}