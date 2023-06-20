import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http:HttpClient) {}

  getUniversities(){
    return this.http.get<any[]>("http://localhost:8080/api/university/university");
  }

  getUniversity(id:number){
    return this.http.get<any>(`http://localhost:8080/api/university/university/${id}`);
  }

  create(university:any){
    return this.http.post<any>("http://localhost:8080/api/university/university",university);
  }

  update(id:number,university:any){
    return this.http.put<any>(`http://localhost:8080/api/university/university/${id}`,university);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/university/university/${id}`);
  }

}
