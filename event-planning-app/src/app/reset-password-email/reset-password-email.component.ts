import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ResetPasswordEmailService} from "../services/reset-password-email.service.service";

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.css']
})
export class ResetPasswordEmailComponent {
  resetPasswordEmailForm: FormGroup;
  infoMessage!: string;
  isInfoMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resetPasswordEmailService: ResetPasswordEmailService,
    private router: Router
  ) {
    this.resetPasswordEmailForm = this.fb.group({
      email: ['', Validators.email]
    });
  }

  resetPasswordEmail(){
    if(!this.resetPasswordEmailForm.valid){
      return;
    }

    this.resetPasswordEmailService.sendPasswordResetEmail(this.resetPasswordEmailForm.value).subscribe({
      next: (value) => {
        this.showInfo(value.message);
      },
      error: err => {
        this.infoMessage = err.message;
      }
    });
  }

  public showInfo(message:string): void {
    this.isInfoMessage = true;
    this.infoMessage = message;
  }

  public closeModal(): void {
    this.isInfoMessage = false;
    this.infoMessage = '';
  }

}
