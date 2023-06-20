import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) {}

  getCities(){
    return this.http.get<any[]>("http://192.168.1.105:8080/api/university/city");
  }

  getCity(id:number){
    return this.http.get<any>(`http://192.168.1.105:8080/api/university/city/${id}`);
  }

  create(city:any){
    return this.http.post<any>("http://192.168.1.105:8080/api/university/city",city);
  }

  update(id:number,city:any){
    return this.http.put<any>(`http://192.168.1.105:8080/api/university/city/${id}`,city);
  }

  delete(id:number){
    return this.http.delete<any>(`http://192.168.1.105:8080/api/university/city/${id}`);
  }
}
