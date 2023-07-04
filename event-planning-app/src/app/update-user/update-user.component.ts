import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "../model/user";
import {UserService} from "../services/user.service";
import {UserData} from "../model/user-data";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  userForm!: FormGroup;
  user!:User;
  public error: boolean = false;
  public errorMessage: string = '';

  @Output() user_emit = new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any,private fb: FormBuilder, private userService:UserService) {
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
  updateUser() {
    const newUser: UserData = this.userForm.getRawValue();
    let formattedDate:string;
    type userJsonType = {[key: string] : string}
    const userJSON:userJsonType = { };

    if(!this.areDatesEqual(new Date(newUser.dateOfBirth), new Date(this.user.dateOfBirth)))
    {
      const year = newUser.dateOfBirth.getFullYear();
      const month = String(newUser.dateOfBirth.getMonth() + 1).padStart(2, '0');
      const day = String(newUser.dateOfBirth.getDate()).padStart(2, '0');

      formattedDate = `${year}-${month}-${day}`;
      userJSON["dateOfBirth"] = formattedDate;
    }
    else formattedDate = this.user.dateOfBirth.toLocaleString();

    if(newUser.username != this.user.username)
    {
      userJSON["username"] = newUser.username;
    }

    if(newUser.firstName != this.user.firstName)
    {
      userJSON["firstName"] = newUser.firstName;
    }
    if(newUser.lastName != this.user.lastName)
    {
      userJSON["lastName"] = newUser.lastName;
    }
    if(newUser.profilePictureUrl != this.user.profilePictureUrl)
    {
      userJSON["profilePictureUrl"] = newUser.profilePictureUrl;
    }
    if(newUser.address != this.user.address)
    {
      userJSON["address"] = newUser.address;
    }

    this.userService.updateUser(this.user.email, userJSON).subscribe({
      next: value => {
        console.log(value);
        this.user_emit.emit(value);
        this.userForm.reset();
      },
      error: err => {
        console.log(err);
        this.showError(err.error.Message);
      }
    })
  }

  ngOnInit(): void {
    this.user = this.dialogData.user;
    this.userForm = this.fb.group({
      username: [this.user.username],
      firstName: [this.user.firstName],
      lastName:[this.user.lastName],
      profilePictureUrl: [this.user.profilePictureUrl],
      dateOfBirth: [this.user.dateOfBirth],
      address:[this.user.address]
    })
  }
}
