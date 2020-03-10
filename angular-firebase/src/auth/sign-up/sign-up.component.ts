import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public email: string;
  public password: string;
  constructor(
    private authService: AuthService,
    private readonly fb: FormBuilder,
    ) {
      this.signUpForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  ngOnInit() {
    // const user = {
    //   email: 'test123123@abv.bg',
    //   password: 'Johny123'
    // };
    // this.authService.signUp(user.email, user.password);
  }

  signUp() {
    console.log(1);
  }
}
