import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../../app/Models/user.model';
import { Router, RouterLink } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  user :User= {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirmed: ''
  };

  constructor(private authService: AuthService, private router: Router) { } // Inject the Router

  onSubmit() {
    this.authService.register(this.user).subscribe({ // Use object for subscribe
      next: (response) => { // Use next for success
        console.log('Registration successful', response);
        this.router.navigate(['/Login']); // Navigate to the login page.  Adjust the path as needed.
      },
      error: (error) => { // Use error for errors
        console.error('Registration failed', error);
        // Handle registration error (e.g., display error message to the user)
      }
    });
  }
}