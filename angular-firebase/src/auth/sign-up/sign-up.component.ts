import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const user = {
      email: 'test0aa0ssSaa1ks@abv.bg',
      password: 'John123'
    };
    this.authService.signUp(user.email, user.password);
  }
}
