import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusService } from '../../service/bus.service';
import { Bus } from '../../Models/bus.model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  buses: Bus[] = [];

  constructor(private busService: BusService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.busService.getBuses().subscribe(
      (data: Bus[]) => {
        this.buses = data;
        
      },
      error => {
        console.error('Error fetching buses', error);
      }
    );
  }

  getColor(busId: number): string {
    const colors = ['blue', 'green', 'yellow', 'brown', 'purple', 'orange'];
    return colors[busId % colors.length];
  }
}