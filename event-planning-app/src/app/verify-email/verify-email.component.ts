import {Component, OnInit} from '@angular/core';
import {VerifyService} from "../services/verify.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit{

  message!: string;
  email!: string;

  constructor(private verifyService: VerifyService,
              private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.email = params['email']);
    this.verifyService.verifyEmail(this.email).subscribe({
      next: (value) => {
        this.message = value.message;
      },
      error: err  => {
        this.message = err.message;
      }
    });
  }

}
