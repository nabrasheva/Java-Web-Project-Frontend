import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "../welcome-page/welcome-page.component";
import {DashboardPageComponent} from "../dashboard-page/dashboard-page.component";
import {EventListComponent} from "../event-list/event-list.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {LoginComponent} from "../login/login.component";
import {SignupComponent} from "../signup/signup.component";
import {VerifyEmailComponent} from "../verify-email/verify-email.component";
import {ResetPasswordEmailComponent} from "../reset-password-email/reset-password-email.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {AuthGuardService} from "../services/authGuard.service";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'welcomePage', component: WelcomePageComponent, canActivate:[AuthGuardService]},
  { path: 'users/verifyEmail/:email', component: VerifyEmailComponent},
  { path: 'sendPasswordResetEmail', component: ResetPasswordEmailComponent},
  { path: 'resetPassword/:email', component: ResetPasswordComponent},
  { path: `dashboard`, component: DashboardPageComponent, canActivate:[AuthGuardService]},
  { path: 'profile', component: UserProfileComponent, canActivate:[AuthGuardService]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModuleModule { }
