import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../model/user";
import {MatDialog} from "@angular/material/dialog";
import {AddTaskComponent} from "../add-task/add-task.component";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {UserData} from "../model/user-data";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit{
  user_email!:string;
  user_info!:User;
constructor(private userService:UserService, private dialog: MatDialog) {
}
  ngOnInit(): void {
    this.user_email = 'niya@test.com';

    this.userService.getUserByEmail(this.user_email).subscribe({
      next: value => {
        this.user_info = value;
      }
    })
  }

  updateUser() {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {user:this.user_info}
    });

    dialogRef.componentInstance.user_emit.subscribe((object: User) =>{
      this.user_info = object;
      this.dialog.closeAll();
    })
  }
}
