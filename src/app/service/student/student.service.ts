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

  generateStudentsPDF(){        
    return this.http.get<any>("http://localhost:8080/api/user/students/generate/pdf",{responseType:'blob' as 'json'});
  }

  getStudentByUserId(id:number){    
    return this.http.get<any>(`http://localhost:8080/api/user/students/userId/${id}`);
  }

  createStudent(student:any){
    return this.http.post<any>("http://localhost:8080/api/user/students",student);
  }

  updateStudent(id:number,student:any){
    return this.http.put<any>(`http://localhost:8080/api/user/students/${id}`,student);
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
