import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent {

  role!:string;
  // isInitialized!: boolean;

  initializeChildComponent(role:string) {

    if(this.role == role)
    {
      this.role = '';
    }
    else this.role = role;
  }
}
