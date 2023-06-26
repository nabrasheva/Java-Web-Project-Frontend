import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Event} from "../model/event";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  minDate: Date = new Date(Date.now());

  @Output() event_row = new EventEmitter<any>();

  eventForm: FormGroup = new FormGroup({
      name: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl(''),
      description: new FormControl('')
    }
    // }, {
    //   validators: formValidator
    // }
  );

  public addEvent() {
    const newEvent: Event = this.eventForm.getRawValue();

    const year = newEvent.date.getFullYear();
    const month = String(newEvent.date.getMonth() + 1).padStart(2, '0');
    const day = String(newEvent.date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const newRow = {name: newEvent.name, date: formattedDate};
    this.event_row.emit(newRow);
    this.eventForm.reset();

  }

}
