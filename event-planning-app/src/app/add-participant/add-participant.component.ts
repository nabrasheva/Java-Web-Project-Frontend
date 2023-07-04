import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit{

  role!:string;
  isGuest:boolean = false;
  participantForm!: FormGroup;
  eventName!:string;
  @Output() emitter = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any, private fb: FormBuilder, private eventService:EventService) {
  }

  ngOnInit() {
    this.role = this.dialogData.role;
  this.eventName = this.dialogData.eventName;
    if(this.role === 'guest')
    {
      this.isGuest = true;
      this.participantForm = this.fb.group({
        email:['', Validators.required],
        role:['GUEST'],
        category:['', Validators.required]
      });
    }
    else {
      this.participantForm = this.fb.group({
        email:[''],
        role:['PLANNER'],
        category:['NONE']
      });
    }
  }

  addParticipant() {
    if(!this.participantForm.valid){
      return;
    }
    const newParticipant = this.participantForm.getRawValue();

    this.eventService.addUserToEvent(this.eventName, newParticipant).subscribe({
      next:value => {
        console.log(value);
        if(this.role == 'guest')
        {
          this.emitter.emit({user_email:newParticipant.email, category:newParticipant.category});
        }
        else this.emitter.emit({user_email:newParticipant.email});
        this.participantForm.reset();
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
