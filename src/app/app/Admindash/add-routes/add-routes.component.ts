import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-add-routes',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgForOf, NgFor],
  templateUrl: './add-routes.component.html',
  styleUrls: ['./add-routes.component.css']
})
export class AddRoutesComponent {
  routes: any[] = [];
  filteredRoutes: any[] = [];
  searchTerm: string = '';
  searchSource: string = '';
  searchDestination: string = '';

  route = {
    routeId: 0,
    source: '',
    destination: ''
  };

  private apiUrl = 'https://localhost:7219/api/Admin';
  private routeApiUrl = 'https://localhost:7219/api/All';

  constructor(private http: HttpClient) {}

  addRoute() {
    this.http.post<any>(`${this.apiUrl}/add-route`, this.route).subscribe(response => {
      alert('Route added successfully');
      console.log('Route added successfully', response);
      this.fetchAllRoutes();
    }, error => {
      alert('Error adding route');
      console.error('Error adding route', error);
    });
  }

  updateRoute() {
    this.http.put<any>(`${this.apiUrl}/update-route/${this.route.routeId}`, this.route).subscribe(response => {
      alert('Route updated successfully');
      console.log('Route updated successfully', response);
      this.fetchAllRoutes();
    }, error => {
      console.error('Error updating route', error);
      alert('Error updating route');
    });
  }

  deleteRoute(routeId: number) {
    this.http.delete<any>(`${this.apiUrl}/delete-route/${routeId}`).subscribe(response => {
      alert('Route deleted successfully');
      console.log('Route deleted successfully', response);
      this.fetchAllRoutes();
    }, error => {
      alert('Error deleting route');
      console.log('Error deleting route', error);
    });
  }

  searchRouteById() {
    if (this.searchTerm) {
      this.http.get<any[]>(`${this.routeApiUrl}/${this.searchTerm}`).subscribe(response => {
        console.log(response);
        if(response.length == 0){
          alert(`No Route Id found for ${this.searchTerm}`);
        }
        this.filteredRoutes = response;
      }, error => {
        alert('Error searching route');
        console.error('Error searching route', error);
        this.filteredRoutes = [];
      });
    } else {
      this.filteredRoutes = [];
    }
  }

  searchRouteByLocation() {
    if (this.searchSource && this.searchDestination) {
      const url = `${this.routeApiUrl}/routes-by-location?source=${encodeURIComponent(this.searchSource)}&destination=${encodeURIComponent(this.searchDestination)}`;
      this.http.get<any[]>(url).subscribe(response => {
        this.filteredRoutes = response;
      }, error => {
        alert('Error searching route');
        console.error('Error searching route', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
        this.filteredRoutes = [];
      });
    } else {
      alert('Please provide both source and destination');
      this.filteredRoutes = [];
    }
  }

  fetchAllRoutes() {
    this.http.get<any[]>(this.routeApiUrl).subscribe(response => {
      this.filteredRoutes = response;
    }, error => {
      alert('Error fetching routes');
      console.error('Error fetching routes', error);
    });
  }

  ngOnInit() {
    this.fetchAllRoutes();
  }

  editRoute(route: any) {
    this.route = { ...route };
  }
}