import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) {}

  getSubjectsFromYearOfStudyId(id:number){
    return this.http.get<any>(`http://localhost:8080/api/subject/subjects/yearOfStudyId/${id}`);    
  }

  getSubjects(){
    return this.http.get<any[]>("http://localhost:8080/api/subject/subjects");
  }

  getSubject(id:number){
    return this.http.get<any>(`http://localhost:8080/api/subject/subjects/${id}`);
  }

  getNotificationBySubjectId(id:number){
    return this.http.get<any>(`http://localhost:8080/api/subject/notification/subjectId/${id}`);
  }

  create(yearOfStudy:any){
    return this.http.post<any>("http://localhost:8080/api/subject/subjects",yearOfStudy);
  }

  update(id:number,yearOfStudy:any){
    return this.http.put<any>(`http://localhost:8080/api/subject/subjects/${id}`,yearOfStudy);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/subject/subjects/${id}`);
  }


}
