import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from 'src/auth/sign-up/sign-up.component';
import { SignInComponent } from 'src/auth/sign-in/sign-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token-interceptor';
import * as firebase from 'firebase';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from '../home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifyEmailComponent } from '../auth/verify-email/verify-email.component';
import { ToastComponent } from '../toast/toast.component';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    HomeComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
