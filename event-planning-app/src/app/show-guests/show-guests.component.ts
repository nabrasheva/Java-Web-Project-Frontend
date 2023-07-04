import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EventService} from "../services/event.service";
import {EventUserRowGuest} from "../model/event-user-row-guest";
import {EventUser} from "../model/event-user";
import {AddParticipantComponent} from "../add-participant/add-participant.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-show-guests',
  templateUrl: './show-guests.component.html',
  styleUrls: ['./show-guests.component.css']
})
export class ShowGuestsComponent implements OnInit {
  dataSource: MatTableDataSource<EventUserRowGuest> = new MatTableDataSource();

  displayedColumns: string[] = ['user_email', 'category', 'delete'];

  @Input() eventName!: string;
  private newParticipant!: EventUserRowGuest;

  constructor(private eventService: EventService, private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.eventService.getEventUsersByEventAndRole(this.eventName, 'guest').subscribe({
      next: value => {
        this.dataSource.data = value.map((eventUser: EventUser) => ({
          user_email: eventUser.user_email,
          category: eventUser.category
        }));
      },
      error: err => {
        console.log(err);
      }
    })

  }

  deleteGuest(element: any) {

  }

  addGuest() {
    const dialogRef = this.dialog.open(AddParticipantComponent, {
      data: {eventName: this.eventName, role: 'guest'}
    });

    dialogRef.componentInstance.emitter.subscribe((object: EventUserRowGuest) => {
      this.newParticipant = object;
      this.dataSource.data.push(this.newParticipant);
      this.dataSource._updateChangeSubscription();
      this.dialog.closeAll();
    })
  }

}
