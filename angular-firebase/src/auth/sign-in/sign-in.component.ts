import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const user = {
      email: 'test123123@abv.bg',
      password: 'Johny12345'
    };
    this.authService.signIn(user.email, user.password);
  }
}
