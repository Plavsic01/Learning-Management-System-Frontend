import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address/address.service';
import { CityService } from 'src/app/service/city/city.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns = ['id', 'street','number','city_name','details'];

  address:any = {};
  cities:any[] = [];
  isOpened:boolean = false;

  constructor(private addressService:AddressService,private cityService:CityService,
                private router:Router,private route: ActivatedRoute){}


  ngOnInit(){  
    this.fetchAddresses();
    this.fetchCities();      
  }

  data(element:any){          
    this.addressForm.patchValue(element);
    this.showForm();
  }


  addressForm = new FormGroup({
    id:new FormControl(),
    street:new FormControl(null,Validators.required),
    number:new FormControl(null,Validators.required),
    city:new FormGroup({
      id:new FormControl(null,Validators.required)
    })});


  fetchAddresses(){
    this.addressService.getAddresses().subscribe(response=>{              
      this.dataSource = new MatTableDataSource(response);             
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  fetchCities(){
    this.cityService.getCities().subscribe(response=>{
      this.cities = response;
    })
  }

  create(){
    if(this.addressForm.valid){
      if(this.addressForm.value.id != null && this.addressForm.value.id != undefined){
        this.addressService.update(this.addressForm.value.id,this.addressForm.value).subscribe((response => {
          this.fetchAddresses();            
        }));

      }else{        
          this.addressService.create(this.addressForm.value).subscribe((response => {
          this.fetchAddresses();            
        }));            
      } 
    }
  }

  reset(){
    this.addressForm.reset();        
  }


  deleteAddress(id:number){
    this.addressService.delete(id).subscribe((response)=>{
      this.fetchAddresses();
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }

}
