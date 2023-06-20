import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YearOfStudyService {

  constructor(private http:HttpClient) {}

  getYearsOfStudyFromStudyProgramId(id:number){
    return this.http.get<any[]>(`http://localhost:8080/api/subject/year-of-study/studyProgramId/${id}`);
  }

  getYearsOfStudy(){
    return this.http.get<any[]>("http://localhost:8080/api/subject/year-of-study");
  }

  getYearOfStudy(id:number){
    return this.http.get<any>(`http://localhost:8080/api/subject/year-of-study/${id}`);
  }

  create(yearOfStudy:any){
    return this.http.post<any>("http://localhost:8080/api/subject/year-of-study",yearOfStudy);
  }

  update(id:number,yearOfStudy:any){
    return this.http.put<any>(`http://localhost:8080/api/subject/year-of-study/${id}`,yearOfStudy);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/subject/year-of-study/${id}`);
  }
}
