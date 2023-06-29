import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from "../services/event.service";
import {Event} from "../model/event";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent {

  role!: string;
  adminEvents!:Event[];
  plannerEvents!:Event[];
  guestEvents!:Event[];
  user_email!:string;
  // isInitialized!: boolean;

  constructor(private router: Router, private eventService:EventService) {
  }

  ngOnInit(): void { //TODO!!!

    this.user_email = 'niya@test.com';
    this.eventService.getEventsByUser(this.user_email).subscribe({
      next: (data) => {
        this.adminEvents = data.admin;
        this.plannerEvents = data.planner;
        this.guestEvents = data.guest;
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  navigateToEvent(eventName: string): void {
    // Perform the navigation to the destination page using the eventId
    // Example:
    this.router.navigate(['dashboard', {name: eventName, role: this.role}]).then(r => r);
  }

  initializeChildComponent(role: string) {

    if (this.role === role) {
      this.role = '';
    } else this.role = role;
  }
}
