import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddEventComponent} from "../add-event/add-event.component";
import {EventRow} from "../model/event-row";
import {MatTableDataSource} from "@angular/material/table";
import {UpdateEventComponent} from "../update-event/update-event.component";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  constructor(private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) { }

  dataSource: MatTableDataSource<EventRow> = new MatTableDataSource([
    { name: 'Event1', date: '2023-06-21'},
    { name: 'Event2', date: '2023-06-21'},
    { name: 'Event3', date: '2023-06-21'},
  ]) ;

  newEventRow!: EventRow;

  showButtons: boolean = false;

  @Input() role!: string;

  event!:EventRow;

  displayedColumns: string[] = ['name', 'date'];

  updateEvent(toUpdateEvent: EventRow) {
    const dialogRef: MatDialogRef<UpdateEventComponent, any> = this.dialog.open(UpdateEventComponent, {
      data: { event: toUpdateEvent }
    });

    dialogRef.componentInstance.event_row.subscribe((object: EventRow) => {
      const updatedEventIndex = this.dataSource.data.indexOf(toUpdateEvent);
      if (updatedEventIndex !== -1) {
        // Update the data for the event at the specified index
        this.dataSource.data[updatedEventIndex] = object;
        this.dataSource._updateChangeSubscription();
      }
      this.dialog.closeAll();
    });
  }


  ngOnInit() : void
  {
    if(this.role == 'admin')
    {
      this.showButtons = true;
      this.displayedColumns =  ['name', 'date', 'update', 'delete'];
    }
  }

  openPopupForm(): void {
    const dialogRef = this.dialog.open(AddEventComponent);
    dialogRef.componentInstance.event_row.subscribe((object: EventRow) => {
      this.newEventRow = object;
      this.dataSource.data.push(this.newEventRow);
      this.dataSource._updateChangeSubscription();
      this.dialog.closeAll();
    });

  }

  deleteEvent(element: EventRow) {
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

}
