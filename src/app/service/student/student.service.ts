import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) {}

  getStudents(){
    return this.http.get<any[]>("http://localhost:8080/api/user/students/all");
  }

  getStudent(id:number){
    return this.http.get<any>(`http://localhost:8080/api/user/students/${id}`);
  }

  getStudentByUserId(id:number){    
    return this.http.get<any>(`http://localhost:8080/api/user/students/userId/${id}`);
  }

  createStudent(faculty:any){
    return this.http.post<any>("http://localhost:8080/api/user/students",faculty);
  }

  updateStudent(id:number,faculty:any){
    return this.http.put<any>(`http://localhost:8080/api/user/students/${id}`,faculty);
  }

  deleteStudent(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/user/students/${id}`);
  }

  getCurrentSubjects(id:number){    
    return this.http.get<any>(`http://localhost:8080/api/subject/subject-enrollment/current-enrollment/${id}`);
  }

  getPassedSubjects(id:number){
    return this.http.get<any>(`http://localhost:8080/api/subject/subject-enrollment/passed/${id}`);
  }

  
}
