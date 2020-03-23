import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { SignUpComponent } from 'src/auth/sign-up/sign-up.component';
import { SignInComponent } from 'src/auth/sign-in/sign-in.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoggedGuardGuard } from '../guards/logged-guard.guard';
import { VerifyEmailComponent } from '../auth/verify-email/verify-email.component';


const routes: Routes = [
  {
  path: '',
  pathMatch: 'full',
  redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'signup',
    component: SignUpComponent,
    pathMatch: 'full',
    canActivate: [LoggedGuardGuard]
  },
  { path: 'signin',
    component: SignInComponent,
    pathMatch: 'full',
    canActivate: [LoggedGuardGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    pathMatch: 'full',
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'verifyEmail',
    component: VerifyEmailComponent,
    pathMatch: 'full'
  }
];
const config: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
