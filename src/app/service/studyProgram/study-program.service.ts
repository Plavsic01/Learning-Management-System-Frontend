import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudyProgramService {

  constructor(private http:HttpClient) {}

  getStudyPrograms(){
    return this.http.get<any[]>("http://localhost:8080/api/university/study-programs");
  }

  getStudyProgram(id:number){
    return this.http.get<any>(`http://localhost:8080/api/university/study-programs/${id}`);
  }

  getStudyProgramsFromFacultyId(id:number){
    return this.http.get<any>(`http://localhost:8080/api/university/study-programs/facultyId/${id}`);
  }

  create(studyProgram:any){
    return this.http.post<any>("http://localhost:8080/api/university/study-programs",studyProgram);
  }

  update(id:number,studyProgram:any){
    return this.http.put<any>(`http://localhost:8080/api/university/study-programs/${id}`,studyProgram);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/university/study-programs/${id}`);
  }
}
