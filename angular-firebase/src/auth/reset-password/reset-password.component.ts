import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public mode: string;
  public actionCode: string;
  public resetPasswordForm: FormGroup;
  public newPassword: string;
  public confirmPassword: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private readonly fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(async (params) => {
        if (!params) {
          this.router.navigate(['/home']);
        }
        this.mode = params.mode;
        this.actionCode = params.oobCode;
        if (this.mode !== 'resetPassword') {
          alert('Query parameters are missing !');
        }
    });
  }
  async resetPasswordButton() {
    const email = await this.authService.verifyPasswordResetCode(this.actionCode);
    await this.authService.resetPassword(this.newPassword, this.confirmPassword, this.actionCode, email);
    this.notificationService.success('Your password was changed !');
    this.router.navigate(['/signin']);
    }
}
