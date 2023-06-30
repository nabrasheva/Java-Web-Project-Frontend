import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddEventComponent} from "../add-event/add-event.component";
import {EventRow} from "../model/event-row";
import {MatTableDataSource} from "@angular/material/table";
import {UpdateEventComponent} from "../update-event/update-event.component";
import {Router} from "@angular/router";
import {Event} from "../model/event";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  constructor(private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef, private router: Router, private eventService: EventService) {
  }

  dataSource: MatTableDataSource<EventRow> = new MatTableDataSource();
  //   { name: 'Event1', date: '2023-06-21'},
  //   { name: 'Event2', date: '2023-06-21'},
  //   { name: 'Event3', date: '2023-06-21'},
  // ]) ;

  newEventRow!: EventRow;

  showButtons: boolean = false;

  @Input() role!: string;

  @Input() inputEvents!: Event[];

  @Input() user_email!: string;

  event!: EventRow;

  displayedColumns: string[] = ['name', 'date'];


  @Output() eventClicked: EventEmitter<string> = new EventEmitter<string>();

  onEventClick(eventName: string): void {
    this.eventClicked.emit(eventName);
  }

  updateEvent(toUpdateEventRow:EventRow) {

    let toUpdateEvent: Event = {} as Event;
    this.eventService.getEventByEventName(toUpdateEventRow.name).subscribe({
      next: value => {
        toUpdateEvent = value;

        const dialogRef: MatDialogRef<UpdateEventComponent, any> = this.dialog.open(UpdateEventComponent, {
          data: {event: toUpdateEvent}
        });

        dialogRef.componentInstance.event_row.subscribe((object: EventRow) => {
          //const updatedEventIndex = this.dataSource.data.findIndex(event => event.name === toUpdateEventName);
          const updatedEventIndex = this.dataSource.data.indexOf(toUpdateEventRow);
          if (updatedEventIndex !== -1) {
            this.dataSource.data[updatedEventIndex] = object;
            this.dataSource._updateChangeSubscription();
          }
          this.dialog.closeAll();
        });
      }
    });


  }


  ngOnInit(): void {
    if (this.role == 'admin') {
      this.showButtons = true;
      this.displayedColumns = ['name', 'date', 'update', 'delete'];
    }
    this.inputEvents.forEach(event => {
      this.dataSource.data.push({name: event.name, date: event.date.toLocaleString()});
    });
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      data: {email: this.user_email}
    });
    dialogRef.componentInstance.event_row.subscribe((object: EventRow) => {
      this.newEventRow = object;
      this.dataSource.data.push(this.newEventRow);
      this.dataSource._updateChangeSubscription();
      this.dialog.closeAll();
    });

  }

  deleteEvent(element: EventRow) {

    this.eventService.deleteEvent(element.name).subscribe({
        next: value => {
          console.log(value);
          const index = this.dataSource.data.indexOf(element);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        },
        error: err => {
          console.error(err);
        }
      }
    );
  }

}
