import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "../welcome-page/welcome-page.component";
import {DashboardPageComponent} from "../dashboard-page/dashboard-page.component";
import {EventListComponent} from "../event-list/event-list.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
 // {path:'event-list', component: EventListComponent},
  { path: `dashboard`, component: DashboardPageComponent},
  {path: 'profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModuleModule { }