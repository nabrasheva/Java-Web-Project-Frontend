import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MaterialUIModule} from "./material-ui/material-ui.module";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { EventListComponent } from './event-list/event-list.component';
import { MatTableModule } from  '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateEventComponent } from './update-event/update-event.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    EventListComponent,
    AddEventComponent,
    UpdateEventComponent,
  ],
  imports: [
    BrowserModule,
    MaterialUIModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[MatTableModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
