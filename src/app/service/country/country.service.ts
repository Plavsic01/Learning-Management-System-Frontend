import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) {}

  getCountries(){
    return this.http.get<any[]>("http://192.168.1.105:8080/api/university/country");
  }

  getCountry(id:number){
    return this.http.get<any>(`http://192.168.1.105:8080/api/university/country/${id}`);
  }

  create(country:any){
    return this.http.post<any>("http://192.168.1.105:8080/api/university/country",country);
  }

  update(id:number,country:any){
    return this.http.put<any>(`http://192.168.1.105:8080/api/university/country/${id}`,country);
  }

  delete(id:number){
    return this.http.delete<any>(`http://192.168.1.105:8080/api/university/country/${id}`);
  }
}
