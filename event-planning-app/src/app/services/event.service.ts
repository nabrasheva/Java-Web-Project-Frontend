import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEventsByUser(email:string): Observable<any> {
   // const encodedEmail = encodeURIComponent(email);
    return this.http.get(`http://localhost:8079/events/${email}`);
  }

  getEventByEventName(evenName:string): Observable<any>
  {
    return this.http.get(`http://localhost:8079/events/event/${evenName}`);
  }
  createEvent(event:any, email:string): Observable<any> {
    // const encodedEmail = encodeURIComponent(email);
    return this.http.post<any>(`http://localhost:8079/events/newEvent/${email}`, event);
  }

  updateEvent(event: any, eventName:string): Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.patch(`http://localhost:8079/events/event/${encodedEventName}`, event);
  }


  deleteEvent(eventName:string): Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.delete(`http://localhost:8079/events/event/${encodedEventName}`);
  }
}
