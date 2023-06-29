import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MaterialUIModule} from "./material-ui/material-ui.module";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { EventListComponent } from './event-list/event-list.component';
// import { MatTableModule } from  '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateEventComponent } from './update-event/update-event.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {AppRoutingModuleModule} from "./app-routing-module/app-routing-module.module";
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ShowGuestsComponent } from './show-guests/show-guests.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatCardModule} from "@angular/material/card";
import { HttpClientModule } from '@angular/common/http';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    EventListComponent,
    AddEventComponent,
    UpdateEventComponent,
    DashboardPageComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    ShowGuestsComponent,
    UserProfileComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    MaterialUIModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModuleModule,
    MatCardModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  exports:[ CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
