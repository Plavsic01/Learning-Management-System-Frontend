import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/service/country/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns = ['id', 'name','details'];
  isOpened:boolean = false;

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  constructor(private countryService:CountryService,private router:Router,private route: ActivatedRoute,private snackBar:MatSnackBar){}


  ngOnInit(){      
    this.fetchCountries();      
  }

  data(element:any){          
    this.countryForm.patchValue(element);
    this.showForm();
  }


  countryForm = new FormGroup({
    id:new FormControl(),
    name:new FormControl(null,Validators.required),    
    });


    fetchCountries(){
    this.countryService.getCountries().subscribe(response=>{              
      this.dataSource = new MatTableDataSource(response);             
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  create(){
    if(this.countryForm.valid){
      if(this.countryForm.value.id != null && this.countryForm.value.id != undefined){
        this.countryService.update(this.countryForm.value.id,this.countryForm.value).subscribe((response => {
          this.fetchCountries();
          this.snackBar.open("Successfully updated entity!",'',{
            duration:2000,
            horizontalPosition:this.horizontalP,
            verticalPosition:this.verticalP,        
          })            
        }));

      }else{        
          this.countryService.create(this.countryForm.value).subscribe((response => {
          this.fetchCountries();
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
    this.countryForm.reset();        
  }


  deleteCity(id:number){
    this.countryService.delete(id).subscribe((response)=>{
      this.fetchCountries();
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
