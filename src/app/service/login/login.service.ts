import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _token : any = null;
  private _user : any = null;

  get token(){
    if(this._token == null){
      this._token = localStorage.getItem("token");
    }
    return this._token;
  }

  get user(){
    if(this.token && this._user == null){
      this._user = JSON.parse(atob(this.token.split(".")[1]));  
    }
    return this._user;
  }

  constructor(private http:HttpClient,private route:Router) {}

  
  login(user:any){
    return this.http.post("http://localhost:8080/api/user/login",user).pipe(tap((response:any)=>{
      this._token = response["token"];   
      this._user = JSON.parse(atob(this.token.split(".")[1]));
      localStorage.setItem("token",this.token);            
    }))
  }

  checkUserPrivileges(requiredPrivileges:any){
    if(this.user){  
      let index = 0;    
      for(let r of requiredPrivileges){        
        if(this.user["roles"][index]["authority"].includes(r)){
          return true;          
        }
        index++;
      } 
    }
    return false;
  }

  checkIfAllowed(userRole:string){
    if(this.user){
      for(let role of this.user.roles){
        if(role['authority'] === userRole){
          return true;
        }
      }
    }
    return false;
  }

  logOut(){
    this._user = null;
    this._token = null;
    localStorage.clear();
    this.route.navigate(['/']);
  }


}
