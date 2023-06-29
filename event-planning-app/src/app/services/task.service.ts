import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  };

  getAllTasksByEvent(eventName: string): Observable<any> {
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.get(`http://localhost:8079/events/event/${encodedEventName}/tasks`);
  }

  createTask(eventName: string, task:Task): Observable<any>{
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.post(`http://localhost:8079/events/event/${encodedEventName}/tasks`, task);
  }

  updateTask(eventName: string,taskName:string, task:Task): Observable<any>{
    const encodedEventName = encodeURIComponent(eventName);
    const encodedTaskName = encodeURIComponent(taskName);
    return this.http.patch(`http://localhost:8079/events/event/${encodedEventName}/tasks/${encodedTaskName}`, task);
  }

  deleteTask(eventName: string,taskName:string, task:Task): Observable<any>{
    const encodedEventName = encodeURIComponent(eventName);
    const encodedTaskName = encodeURIComponent(taskName);
    return this.http.delete(`http://localhost:8079/events/event/${encodedEventName}/tasks/${encodedTaskName}`);
  }
}
