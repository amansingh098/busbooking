import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Name: string = '';
  Password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  onSubmit() {
    this.authService.login(this.Name, this.Password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem("userId",response.userId);
        const decodedToken = this.decodeToken(response.token);
        if (decodedToken) {
          const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          localStorage.setItem('Name', this.Name);
          localStorage.setItem('role', role);
         

          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'User') {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/unauthorized']);
          }
        } else {
          console.error('Invalid token');
        }
      },
      error => {
        console.error('Login failed', error);
        // Handle login error
      }
    );
  }
}