import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'king';

  isLoginRoute: boolean = false;
  isHomeRoute: boolean = false;
  isAboutRoute: boolean = false;
  isCreateRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = this.router.url.startsWith('/Login');
        this.isHomeRoute = this.router.url.startsWith('/Home');
        this.isAboutRoute = this.router.url.startsWith('/about');
        this.isCreateRoute = this.router.url.startsWith('/Create');
      }
    });
  }
}