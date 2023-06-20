import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentYearService {

  
  constructor(private http:HttpClient) {}

  getStudentYears(){
    return this.http.get<any[]>("http://localhost:8080/api/user/student-year/all");
  }

  getStudentYear(id:number){
    return this.http.get<any>(`http://localhost:8080/api/user/student-year/${id}`);
  }

  create(faculty:any){
    return this.http.post<any>("http://localhost:8080/api/user/student-year",faculty);
  }

  update(id:number,faculty:any){
    return this.http.put<any>(`http://localhost:8080/api/user/student-year/${id}`,faculty);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/user/student-year/${id}`);
  }
}
