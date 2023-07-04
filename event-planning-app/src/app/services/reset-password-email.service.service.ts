import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Email} from "../model/email";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordEmailService {

  constructor(private http: HttpClient) {}

  sendPasswordResetEmail(emailDto: Email): Observable<any>{
    return this.http.post(`http://localhost:8079/sendPasswordResetEmail`, emailDto);
  }
}
