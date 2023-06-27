import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "../welcome-page/welcome-page.component";
import {DashboardPageComponent} from "../dashboard-page/dashboard-page.component";
import {EventListComponent} from "../event-list/event-list.component";

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
 // {path:'event-list', component: EventListComponent},
  { path: `dashboard`, component: DashboardPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModuleModule { }
