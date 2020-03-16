import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private loggedUserSubscription: Subscription;
  public loggedUser: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
     ) {}

  ngOnInit(): void {
    this.loggedUserSubscription = this.authService.loggedUserData$.subscribe(async (data) => this.loggedUser = await data);
  }
  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.notificationService.success('Successfully logout');
    this.router.navigate(['/signin']);
  }
}
