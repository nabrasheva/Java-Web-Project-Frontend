import {Component, Input} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EventService} from "../services/event.service";
import {EventUser} from "../model/event-user";
import {EventUserRowPlanner} from "../model/event-user-row-planner";

@Component({
  selector: 'app-show-planners',
  templateUrl: './show-planners.component.html',
  styleUrls: ['./show-planners.component.css']
})
export class ShowPlannersComponent {
  dataSource: MatTableDataSource<EventUserRowPlanner> = new MatTableDataSource();

  displayedColumns: string[] = ['user_email', 'delete'];

  @Input() eventName!:string;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {

    this.eventService.getEventUsersByEventAndRole(this.eventName, 'guest').subscribe({
      next:value => {
        this.dataSource.data = value.map((eventUser: EventUser) => ({
          user_email: eventUser.user_email
        }));
      },
      error:err => {
        console.log(err);
      }
    })

  }

  deletePlanner(element:any) {

  }

  addPlanner() {

  }
}
