import {Component, EventEmitter, Input, Output, OnInit, Inject} from '@angular/core';
import {EventRow} from "../model/event-row";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Event} from "../model/event";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  @Input() event!: EventRow;
  @Output() event_row = new EventEmitter<any>();

  // minDate: Date = new Date(Date.now());

  eventForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.event = this.dialogData.event;
    this.eventForm = this.formBuilder.group({
      name: [this.event.name],
      date: [this.event.date],
      location: [''],
      description: ['']
    });
  }
  private areDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  updateEvent() {
    const newEvent: Event = this.eventForm.getRawValue();

    let formattedDate;

    if(!this.areDatesEqual(new Date(newEvent.date), new Date(this.event.date)))
    {
      const year = newEvent.date.getFullYear();
      const month = String(newEvent.date.getMonth() + 1).padStart(2, '0');
      const day = String(newEvent.date.getDate()).padStart(2, '0');

       formattedDate = `${year}-${month}-${day}`;
    }
    else formattedDate = this.event.date;

    const newRow = {name: newEvent.name, date: formattedDate};
    this.event_row.emit(newRow);
    this.eventForm.reset();
  }
}
