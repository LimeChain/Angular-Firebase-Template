import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  public sentEmailForm: FormGroup;
  public email: string;
  constructor(
    private readonly fb: FormBuilder,
    private route: Router
  ) {
    this.sentEmailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
   }

   async sent() {
     await firebase.auth().sendPasswordResetEmail(this.email);
     alert('Email was sent !');
     this.route.navigate(['/signin']);
   }

}
