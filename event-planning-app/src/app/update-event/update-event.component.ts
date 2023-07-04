import {Component, EventEmitter, Input, Output, OnInit, Inject} from '@angular/core';
import {EventRow} from "../model/event-row";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Event} from "../model/event";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  @Input() event!: Event;
  @Output() event_row = new EventEmitter<any>();

  // minDate: Date = new Date(Date.now());

  eventForm!: FormGroup;
  public error: boolean = false;
  public errorMessage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,private formBuilder: FormBuilder, private eventService: EventService) {}

  ngOnInit(): void {
    this.event = this.dialogData.event;
    this.eventForm = this.formBuilder.group({
      name: [this.event.name],
      date: [this.event.date],
      location: [this.event.location],
      description: [this.event.description]
    });
  }
  private areDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  public showError(message:string): void {
    this.error = true;
    this.errorMessage = message;
  }

  public closeModal(): void {
    this.error = false;
    this.errorMessage = '';
  }
  updateEvent() {
    const newEvent: Event = this.eventForm.getRawValue();

    let formattedDate:string;
    type eventJsonType = {[key: string] : string}
    const eventJSON:eventJsonType = { };

    if(!this.areDatesEqual(new Date(newEvent.date), new Date(this.event.date)))
    {
      const year = newEvent.date.getFullYear();
      const month = String(newEvent.date.getMonth() + 1).padStart(2, '0');
      const day = String(newEvent.date.getDate()).padStart(2, '0');

       formattedDate = `${year}-${month}-${day}`;
      eventJSON["date"] = formattedDate;
    }
    else formattedDate = this.event.date.toLocaleString();

    if(newEvent.description !== this.event.description)
    {
      eventJSON["description"] = newEvent.description;
    }
    if(newEvent.location !== this.event.location)
    {
      eventJSON["location"] = newEvent.location;
    }

    this.eventService.updateEvent(eventJSON, this.event.name).subscribe({
      next: value =>{
        console.log(value);
        const newRow= {name: this.event.name, date: formattedDate};
        this.event_row.emit(newRow);
        this.eventForm.reset();
      },
      error: err => {
        console.error(err);

        this.showError(err.error.Message);
      }
    });

  }
}
