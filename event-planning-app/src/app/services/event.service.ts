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
    return this.http.get(`http://localhost:8079/events/${email}`, { headers: this.headers });
  }

  getEventByEventName(eventName:string): Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);

    return this.http.get(`http://localhost:8079/events/event/${encodedEventName}`, { headers: this.headers });
  }

  getEventUsersByEventAndRole(eventName:string, role:string): Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);

    return this.http.get(`http://localhost:8079/events/event/${encodedEventName}/roles/${role}`, { headers: this.headers })
  }
  createEvent(event:any, email:string): Observable<any> {
    return this.http.post<any>(`http://localhost:8079/events/newEvent/${email}`, event, { headers: this.headers });
  }

  updateEvent(event: any, eventName:string): Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.patch(`http://localhost:8079/events/event/${encodedEventName}`, event, { headers: this.headers });
  }


  deleteEvent(eventName:string): Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.delete(`http://localhost:8079/events/event/${encodedEventName}`, { headers: this.headers });
  }

  addUserToEvent(eventName:string, participant:any):Observable<any>
  {
    const encodedEventName = encodeURIComponent(eventName);
    return this.http.post(`http://localhost:8079/events/event/${encodedEventName}/newUser`, participant, { headers: this.headers });
  }
}
