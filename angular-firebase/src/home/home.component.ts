import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private loggedUserSubscription: Subscription;
  loggedUser;
  constructor(private authService: AuthService, private router: Router) {
    console.log(1);
   }

  ngOnInit(): void {
    this.loggedUserSubscription = this.authService.loggedUserData$.subscribe(async (data) => this.loggedUser = await data);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
