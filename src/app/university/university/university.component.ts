import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address/address.service';
import { LoginService } from 'src/app/service/login/login.service';
import { UniversityService } from 'src/app/service/university/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent  {

  addresses:any[] = [];
  isOpened:boolean = false;
  allowEditAndDelete:boolean | undefined;
  
  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id', 'name','rectorId','dateOfEstablishment','phone','email','address','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  
  constructor(private universityService:UniversityService,private addressService:AddressService,
            public loginService:LoginService,private router:Router,private route: ActivatedRoute) {}
 
  ngOnInit(){
    this.fetchUniversities();
    this.getAddresses();
  }

  data(element:any){          
    this.universityForm.patchValue(element);
    this.showForm();
  }

  universityForm = new FormGroup({
    id:new FormControl(),
    name:new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.required,Validators.email]),
    dateOfEstablishment:new FormControl(null,Validators.required),
    phone:new FormControl(null,[Validators.required,Validators.minLength(9),Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)]),
    rectorId:new FormControl(null,Validators.required),
    // rector:new FormGroup({
    //   id:new FormControl(null,Validators.required)
    // }),
    address:new FormGroup({
      id:new FormControl(null,Validators.required)
    })});

  fetchUniversities(){
    this.universityService.getUniversities().subscribe(response=>{      
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getFacultyDetails(uniId:number){
    this.router.navigate([`/faculties/${uniId}`])
  }

  getAddresses(){
    this.addressService.getAddresses().subscribe((response=>{
      this.addresses = response;
      console.log(response);
      
    }))
  }

  create(){
    if(this.universityForm.valid){
      if(this.universityForm.value.id != null && this.universityForm.value.id != undefined){
        this.universityService.update(this.universityForm.value.id,this.universityForm.value).subscribe((response => {
          this.fetchUniversities();            
        }));

      }else{        
          this.universityService.create(this.universityForm.value).subscribe((response => {
          this.fetchUniversities();            
        }));            
      } 
    }
  }

  reset(){
    this.universityForm.reset();        
  }

  deleteUniversity(id:number){
    this.universityService.delete(id).subscribe((response)=>{
      this.fetchUniversities();
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }



}
