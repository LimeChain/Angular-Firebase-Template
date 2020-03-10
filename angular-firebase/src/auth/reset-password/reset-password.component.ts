import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  mode: string;
  actionCode: string;
  newPassword: string;
  confirmPassword: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(async (params) => {
        if (!params) {
          this.router.navigate(['/home']);
        }
        this.mode = params.mode;
        this.actionCode = params.oobCode;
        if (this.mode === 'resetPassword') {
          const email = await this.authService.verifyPasswordResetCode(this.actionCode);
          if (email) {
            this.newPassword = 'Johny12345';
            this.confirmPassword = 'Johny12345';
            this.authService.resetPassword(this.newPassword, this.confirmPassword, this.actionCode, email);
          }
        } else {
          alert('Query parameters are missing !');
        }
    });
  }

}
