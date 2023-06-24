import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/service/city/city.service';
import { CountryService } from 'src/app/service/country/country.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns = ['id', 'name','country','details'];

  city:any = {};
  countries:any[] = [];
  isOpened:boolean = false;

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  constructor(private cityService:CityService,private countryService:CountryService,
                private router:Router,private route: ActivatedRoute,private snackBar:MatSnackBar){}


  ngOnInit(){  
    this.fetchCities();
    this.fetchCountries();      
  }

    data(element:any){          
      this.cityForm.patchValue(element);
      this.showForm();
  }


  cityForm = new FormGroup({
    id:new FormControl(),
    name:new FormControl(null,Validators.required),    
    country:new FormGroup({
      id:new FormControl(null,Validators.required)
    })});


  fetchCities(){
    this.cityService.getCities().subscribe(response=>{              
      this.dataSource = new MatTableDataSource(response);             
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  fetchCountries(){
    this.countryService.getCountries().subscribe(response=>{
      this.countries = response;
    })
  }

  create(){
    if(this.cityForm.valid){
      if(this.cityForm.value.id != null && this.cityForm.value.id != undefined){
        this.cityService.update(this.cityForm.value.id,this.cityForm.value).subscribe((response => {
          this.fetchCities();
          this.snackBar.open("Successfully updated entity!",'',{
            duration:2000,
            horizontalPosition:this.horizontalP,
            verticalPosition:this.verticalP,        
          })            
        }));

      }else{        
          this.cityService.create(this.cityForm.value).subscribe((response => {
          this.fetchCities();
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
    this.cityForm.reset();        
  }


  deleteCity(id:number){
    this.cityService.delete(id).subscribe((response)=>{
      this.fetchCities();
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


