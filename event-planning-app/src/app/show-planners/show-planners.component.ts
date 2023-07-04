import {Component, Input} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EventService} from "../services/event.service";
import {EventUser} from "../model/event-user";
import {EventUserRowPlanner} from "../model/event-user-row-planner";
import {MatDialog} from "@angular/material/dialog";
import {AddParticipantComponent} from "../add-participant/add-participant.component";

@Component({
  selector: 'app-show-planners',
  templateUrl: './show-planners.component.html',
  styleUrls: ['./show-planners.component.css']
})
export class ShowPlannersComponent {
  dataSource: MatTableDataSource<EventUserRowPlanner> = new MatTableDataSource();

  displayedColumns: string[] = ['user_email', 'delete'];
  newParticipant!:any;

  @Input() eventName!:string;
  constructor(private eventService: EventService, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.eventService.getEventUsersByEventAndRole(this.eventName, 'planner').subscribe({
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
    const dialogRef = this.dialog.open(AddParticipantComponent, {
      data: {eventName: this.eventName, role:'planner'}
    });

    dialogRef.componentInstance.emitter.subscribe((object:EventUserRowPlanner) =>{
      this.newParticipant = object;
      this.dataSource.data.push(this.newParticipant);
      this.dataSource._updateChangeSubscription();
      this.dialog.closeAll();
    })
  }
}
