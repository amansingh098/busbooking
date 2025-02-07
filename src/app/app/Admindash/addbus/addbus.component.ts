import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-addbus',
  standalone: true,
  imports: [FormsModule, HttpClientModule,NgFor,NgForOf],
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.css']
})export class AddBusComponent {
  obj: any[] = [];
  filteredBuses: any[] = [];
  searchTerm: string = '';

  bus = {
    busId: 0,
    busName: '',
    busNumber: '',
    routeId: 0
  };

  private apiUrl = 'https://localhost:7219/api/Admin';
  private busApiUrl = 'https://localhost:7219/api/Bus';

  constructor(private http: HttpClient) {}

  addBus() {
    this.http.post<any>(`${this.apiUrl}/add-bus`, this.bus).subscribe(response => {
      alert('Bus added successfully');
      console.log('Bus added successfully', response);
      this.fetchBuses();
    }, error => {
      alert('Error adding bus');
      console.error('Error adding bus', error);
    });
  }

  updateBus() {
    this.http.put<any>(`${this.apiUrl}/update-bus/${this.bus.busId}`, this.bus).subscribe(response => {
      alert('Bus updated successfully');
      console.log('Bus updated successfully', response);
      this.fetchBuses();
    }, error => {
      console.error('Error updating bus', error);
      alert('Error updating bus');
    });
  }

  deleteBus(busId: number) {
    this.http.delete<any>(`${this.apiUrl}/delete-bus/${busId}`).subscribe(response => {
      alert('Bus deleted successfully');
      console.log('Bus deleted successfully', response);
      this.fetchBuses();
    }, error => {
      alert('Error deleting bus');
      console.log('Error deleting bus', error);
    });
  }

  fetchBuses() {
    this.http.get<any[]>(`${this.busApiUrl}`).subscribe(result => {
      this.obj = result;
      this.filteredBuses = result;
    }, error => {
      alert('Error fetching buses');
      console.error('Error fetching buses', error);
    });
  }

  searchBus() {
    if (this.searchTerm) {
      this.http.get<any>(`${this.busApiUrl}/${this.searchTerm}`).subscribe(response => {
        this.filteredBuses = [response];
      }, error => {
        alert('Error searching bus');
        console.error('Error searching bus', error);
        this.filteredBuses = [];
      });
    } else {
      this.filteredBuses = this.obj;
    }
  }

  ngOnInit() {
    this.fetchBuses();
  }

  editBus(bus: any) {
    this.bus = { ...bus };
  }
}