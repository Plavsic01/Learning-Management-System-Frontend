import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  constructor(private addressService:AddressService,private cityService:CityService,
                private router:Router,private route: ActivatedRoute,private snackBar:MatSnackBar){}


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
          this.snackBar.open("Successfully updated entity!",'',{
            duration:2000,
            horizontalPosition:this.horizontalP,
            verticalPosition:this.verticalP,        
          })             
        }));

      }else{        
          this.addressService.create(this.addressForm.value).subscribe((response => {
          this.fetchAddresses(); 
          this.snackBar.open("Successfully created new entity!",'',{
            duration:2000,
            horizontalPosition:this.horizontalP,
            verticalPosition:this.verticalP,        
          })            
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
    },(error:HttpErrorResponse) => {
      if(error.status === 400){
        this.snackBar.open("This entity cannot be deleted because it is used somewhere else! ❌",'',{
          duration:2000,
          horizontalPosition:this.horizontalP,
          verticalPosition:this.verticalP,        
        })        
      }
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }

}
