import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public signUpForm: FormGroup;
  public email: string;
  public password: string;
  constructor(
    private authService: AuthService,
    private readonly fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService
    ) {
      this.signUpForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
      });
    }

  async signUp() {
      try {
        this.spinner.show();
        await this.authService.signUp(this.email, this.password);
        this.spinner.hide();
        this.router.navigate(['/signin']);
      } catch (e) {
        this.spinner.hide();
        this.notificationService.error(e.message);
      }
  }
}
