import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  isUserRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isUserRoute = this.router.url.startsWith('/user');
      }
    });
  }

  ngOnInit(): void {}

  logout(): void {
    // Remove token, role, and name from local storage or any other storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('Name');

    // Navigate to the login page
    this.router.navigate(['/Login']);
  }
}