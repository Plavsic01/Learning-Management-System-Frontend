import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  getUsers(){
    return this.http.get<any[]>("http://localhost:8080/api/user/users/all");
  }

  getUser(id:number){
    return this.http.get<any>(`http://localhost:8080/api/user/users/${id}`);
  }

  getUserByUsername(name:string){
    return this.http.get<any>(`http://localhost:8080/api/user/users/?username=${name}`);
  }

  create(user:any){
    return this.http.post<any>("http://localhost:8080/api/user/users",user);
  }

  update(id:number,user:any){
    return this.http.put<any>(`http://localhost:8080/api/user/users/${id}`,user);
  }

  delete(id:number){
    return this.http.delete<any>(`http://localhost:8080/api/user/users/${id}`);
  }
}
