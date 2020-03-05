import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const user = {
      email: "test123@abv.bg", 
      password: "John123"
    };
    this.authService.signIn(user.email, user.password);
  }
}
