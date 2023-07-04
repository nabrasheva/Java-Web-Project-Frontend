import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SignupService } from "../services/signup.service";
import {PasswordRequest} from "../model/password";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  errorMessage: string = '';
  passwordMismatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      // passwordGroup: this.fb.group({
      password: ['', Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')],
      confirmPassword: ['', Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')], //},
      //{ validators: this.passwordMatchValidator}),
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      address: ['']
    })
  }

  signup(){
    if(!this.signupForm.valid){
      return;
    }
//TODO при delete user da se izchistva ot local storage neshtata otnovo
    this.errorMessage = '';

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.signupService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => {
        if (err.status === 409) { // HTTP 409 Conflict status code indicates duplicate email
          this.errorMessage = 'User with this email already exists';
        } else {
          this.errorMessage = 'An error occurred during signup';
        }
      }
    });
  }
}
