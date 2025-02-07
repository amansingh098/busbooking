import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {

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
