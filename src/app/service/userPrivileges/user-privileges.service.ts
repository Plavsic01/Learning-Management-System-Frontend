import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPrivilegesService {

  constructor(private http:HttpClient) {}

  getPrivileges(){
    return this.http.get<any[]>("http://localhost:8080/api/user/user-privileges");
  }

  getPrivilege(id:number){
    return this.http.get<any>(`http://localhost:8080/api/user/user-privileges/${id}`);
  }

  create(user:any){
    return this.http.post<any>("http://localhost:8080/api/user/user-privileges",user);
  }

  update(id:number,user:any){
    return this.http.put<any>(`http://localhost:8080/api/user/user-privileges/${id}`,user);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/user/user-privileges/${id}`);
  }
}
