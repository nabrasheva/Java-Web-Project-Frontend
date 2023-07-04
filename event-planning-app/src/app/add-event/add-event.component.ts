import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Event} from "../model/event";
import {EventService} from "../services/event.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any, private eventService: EventService) {
  }

  public error: boolean = false;
  public errorMessage: string = '';


  minDate: Date = new Date(Date.now());

  @Output() event_row = new EventEmitter<any>();

  user_email!: string;

  eventForm: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      description: new FormControl('')
    }
    // }, {
    //   validators: formValidator
    // }
  );

  ngOnInit() {
    this.user_email = this.dialogData.email;
  }

  public showError(message:string): void {
    this.error = true;
    this.errorMessage = message;
  }

  public closeModal(): void {
    this.error = false;
    this.errorMessage = '';
  }

  public addEvent() {
    if(!this.eventForm.valid){
      return;
    }
    const newEvent: Event = this.eventForm.getRawValue();

    const year = newEvent.date.getFullYear();
    const month = String(newEvent.date.getMonth() + 1).padStart(2, '0');
    const day = String(newEvent.date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const eventJSON = {
      "name": newEvent.name,
      "date":formattedDate,
      "location" : newEvent.location,
      "description": newEvent.description
    }
    // let isError = false;
    this.eventService.createEvent(eventJSON, this.user_email).subscribe({
      next: (value) => {console.log(value);
        const newRow = {name: newEvent.name, date: formattedDate};
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
