import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import { LoginRequest } from "../model/login";
import {Router} from "@angular/router";
import {SignupRequest} from "../model/signup";


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(
    private router: Router,
    private http:HttpClient
  ) {}

  signup(signupRequest: SignupRequest): Observable<any>{
    return this.http.post('http://localhost:8079/users/signup', signupRequest);
  }
}
