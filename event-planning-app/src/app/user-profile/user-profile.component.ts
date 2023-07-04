import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../model/user";
import {MatDialog} from "@angular/material/dialog";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit{
  user_email!:string;
  user_info!:User;
constructor(private userService:UserService, private dialog: MatDialog, private authService:AuthService) {
}
  ngOnInit(): void {
    this.user_email = localStorage.getItem('email') || '';

    this.userService.getUserByEmail(this.user_email).subscribe({
      next: value => {
        this.user_info = value;

        if(this.user_info.profilePictureUrl.length == 0)
        {
          this.user_info.profilePictureUrl = '';
        }
      },
      error:err => {
        console.log(err);
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
    logOut()
    {
      this.authService.logout();
    }
}
