import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
    ) {
        this.signInForm = this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
        });
    }

  async signIn() {
    const login = await this.authService.signIn(this.email, this.password);
    if (login === false) {
      this.modalService.open(this.emailModal);
      this.router.navigate(['/signin']);
      return;
    }
    this.router.navigate(['/']);
  }
}
