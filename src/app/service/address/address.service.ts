import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) {}

  getAddresses(){
    return this.http.get<any[]>("http://192.168.1.105:8080/api/university/address");
  }

  getAddress(id:number){
    return this.http.get<any>(`http://192.168.1.105:8080/api/university/address/${id}`);
  }

  create(address:any){
    return this.http.post<any>("http://192.168.1.105:8080/api/university/address",address);
  }

  update(id:number,address:any){
    return this.http.put<any>(`http://192.168.1.105:8080/api/university/address/${id}`,address);
  }

  delete(id:number){
    return this.http.delete<any>(`http://192.168.1.105:8080/api/university/address/${id}`);
  }
}
