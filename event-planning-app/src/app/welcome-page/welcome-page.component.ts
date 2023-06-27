import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent {

  role!:string;
  // isInitialized!: boolean;

  constructor(private router: Router) {}
  navigateToEvent(eventName: string): void {
    // Perform the navigation to the destination page using the eventId
    // Example:
    this.router.navigate(['dashboard', {name:eventName, role:this.role}]).then(r => r);
  }

  initializeChildComponent(role:string) {

    if(this.role == role)
    {
      this.role = '';
    }
    else this.role = role;
  }
}
