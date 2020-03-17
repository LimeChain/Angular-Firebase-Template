import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @ViewChild('emailModal') emailModal: ElementRef;
  public signInForm: FormGroup;
  public email: string;
  public password: string;
  constructor(
    private authService: AuthService,
    private readonly fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService
    ) {
        this.signInForm = this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
        });
    }

  async signIn() {
    try {
      this.spinner.show();
      const checkEmailVerified = await this.authService.checkUserEmailVerified(this.email, this.password);
      if (checkEmailVerified) {
        this.authService.signIn().subscribe((data) => {
          console.log(data);
          this.spinner.hide();
          this.notificationService.success('Successfully logged!');
          this.router.navigate(['']);
        }, (e) => {
          this.spinner.hide();
          this.notificationService.error(e.error.message);
        });
      } else if (checkEmailVerified === false) {
        this.spinner.hide();
        this.modalService.open(this.emailModal);
        this.router.navigate(['/signin']);
      }
    } catch (e) {
      this.spinner.hide();
      this.notificationService.error(e.message);
    }
    }
}
