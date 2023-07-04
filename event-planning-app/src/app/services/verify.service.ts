import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http: HttpClient) {}

  verifyEmail(email:string): Observable<any>{
    return this.http.patch(`http://localhost:8079/users/verifyEmail/${email}`, {});
  }

}
