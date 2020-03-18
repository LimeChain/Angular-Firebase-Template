import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.css']
})
export class ResetPasswordEmailComponent {
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
