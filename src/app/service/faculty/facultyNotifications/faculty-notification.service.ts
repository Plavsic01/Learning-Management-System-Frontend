import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacultyNotificationService {

  constructor(private http:HttpClient) {}

  getNotifications(){
    return this.http.get<any[]>("http://localhost:8080/api/university/notification");
  }

  getNotification(id:number){
    return this.http.get<any>(`http://localhost:8080/api/university/notification/${id}`);
  }

  create(notification:any){
    return this.http.post<any>("http://localhost:8080/api/university/notification",notification);
  }

  update(id:number,notification:any){
    return this.http.put<any>(`http://localhost:8080/api/university/notification/${id}`,notification);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/university/notification/${id}`);
  }
}
