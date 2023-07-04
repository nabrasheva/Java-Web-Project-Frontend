import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
  getAllTasksByEvent(eventName: string): Observable<any> {
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.get(`http://localhost:8079/events/event/${encodedEventName}/tasks`, { headers: this.headers });
  }

  getTask(eventName: string, taskName:string): Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);
    const encodedTaskName = encodeURIComponent(taskName);
    return this.http.get(`http://localhost:8079/events/event/${encodedEventName}/tasks/${encodedTaskName}`, { headers: this.headers });
  }

  createTask(eventName: string, task:any): Observable<any>{
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.post(`http://localhost:8079/events/event/${encodedEventName}/newTask`, task, { headers: this.headers });
  }

  updateTask(eventName: string,taskName:string, task:any): Observable<any>{
    const encodedEventName = encodeURIComponent(eventName);
    const encodedTaskName = encodeURIComponent(taskName);
    return this.http.patch(`http://localhost:8079/events/event/${encodedEventName}/tasks/${encodedTaskName}`, task, { headers: this.headers });
  }

  deleteTask(eventName: string,taskName:string): Observable<any>{
    const encodedEventName = encodeURIComponent(eventName);
    const encodedTaskName = encodeURIComponent(taskName);
    return this.http.delete(`http://localhost:8079/events/event/${encodedEventName}/tasks/${encodedTaskName}`, { headers: this.headers });
  }
}
