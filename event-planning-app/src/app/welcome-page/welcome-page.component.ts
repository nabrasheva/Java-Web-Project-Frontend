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


  constructor(private router: Router, private eventService: EventService) {
  }

  ngOnInit(): void { //TODO!!!

    this.user_email = localStorage.getItem('email') || '';

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

    this.router.navigate(['dashboard', {name: eventName, role: this.role, user_email: this.user_email}]).then(r => r);
  }

  initializeChildComponent(role: string) {

    if (this.role === role) {
      this.role = '';
    } else this.role = role;
  }
}
