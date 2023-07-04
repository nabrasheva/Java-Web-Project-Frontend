import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email:string):Observable<any>
  {
    return this.http.get(`http://localhost:8079/users/userInfo/${email}`);
  }

  updateUser(email:string, user:any):Observable<any>
  {
    return this.http.patch(`http://localhost:8079/users/updateUser/georgi@test.com`, user);
  }
}
