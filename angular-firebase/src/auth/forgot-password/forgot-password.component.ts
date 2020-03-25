import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

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
    private route: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.sentEmailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
   }

   async sent() {
     await this.authService.sentResetPasswordEmail(this.email);
     this.notificationService.success('Email was sent!');
     this.route.navigate(['/signin']);
   }

}
