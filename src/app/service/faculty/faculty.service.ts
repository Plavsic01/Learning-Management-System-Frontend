import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http:HttpClient) {}

  getFaculties(){
    return this.http.get<any[]>("http://localhost:8080/api/university/faculty");
  }

  getFaculty(id:number){
    return this.http.get<any>(`http://localhost:8080/api/university/faculty/${id}`);
  }

  getFacultyFromUniversityId(id:number){
    return this.http.get<any>(`http://localhost:8080/api/university/faculty/universityId/${id}`);
  }

  create(faculty:any){
    return this.http.post<any>("http://localhost:8080/api/university/faculty",faculty);
  }

  update(id:number,faculty:any){
    return this.http.put<any>(`http://localhost:8080/api/university/faculty/${id}`,faculty);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/university/university/${id}`);
  }
}
