import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getUserByEmail(email:string):Observable<any>
  {
    return this.http.get(`http://localhost:8079/users/userInfo/${email}`, { headers: this.headers });
  }

  updateUser(email:string, user:any):Observable<any>
  {
    return this.http.patch(`http://localhost:8079/users/updateUser/${email}`, user, { headers: this.headers });
  }
}
