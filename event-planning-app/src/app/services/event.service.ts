import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getEventsByUser(email:string): Observable<any> {
   // const encodedEmail = encodeURIComponent(email);
    return this.http.get(`http://localhost:8079/events/${email}`, { headers: this.headers });
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
