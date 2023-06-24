import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectMaterialService {

  constructor(private http:HttpClient) {}

 
  getSubjectMaterials(){
    return this.http.get<any[]>("http://localhost:8080/api/subject/subject-material");
  }

  getSubjectMaterial(id:number){
    return this.http.get<any>(`http://localhost:8080/api/subject/subject-material/${id}`);
  }

  create(subjectMaterial:any){
    return this.http.post<any>("http://localhost:8080/api/subject/subject-material",subjectMaterial);
  }

  update(id:number,subjectMaterial:any){
    return this.http.put<any>(`http://localhost:8080/api/subject/subject-material/${id}`,subjectMaterial);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/subject/subject-material/${id}`);
  }
}
