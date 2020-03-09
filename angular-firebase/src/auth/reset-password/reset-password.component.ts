import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  mode: string;
  actionCode: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (!params) {
          this.router.navigate(['/home']);
        }
        this.mode = params.mode;
        this.actionCode = params.oobCode;
        if (this.mode === 'resetPassword') {
          this.authService.verifyPasswordResetCode(this.actionCode);
        } else {
          console.log('Query parameters are missing !');
        }
    });
  }

}
