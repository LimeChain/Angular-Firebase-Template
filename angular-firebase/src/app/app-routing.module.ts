import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from 'src/auth/sign-up/sign-up.component';
import { SignInComponent } from 'src/auth/sign-in/sign-in.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ResetPasswordEmailComponent } from '../auth/reset-password-email/reset-password-email.component';


const routes: Routes = [
  { path: 'signup',
    component: SignUpComponent,
    pathMatch: 'full'
  },
  { path: 'signin',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'resetPasswordEmail',
    component: ResetPasswordEmailComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
