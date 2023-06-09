import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address/address.service';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { LoginService } from 'src/app/service/login/login.service';
import { UniversityService } from 'src/app/service/university/university.service';
import { StudentAdminNotificationPopUpComponent } from './student-admin-notification-pop-up/student-admin-notification-pop-up.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent {

  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id', 'name','address','deanId','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  allowEditAndDelete:boolean | undefined;
  id!:number;
  addresses:any[] = [];
  universities:any[] = [];
  isOpened:boolean = false;

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private facultyService:FacultyService,private addressService:AddressService,private universityService:UniversityService,
    private notificationsDetails:MatDialog,public loginService:LoginService,private router:Router,private route: ActivatedRoute,
    private snackBar:MatSnackBar) {}
 
  ngOnInit(){  
    this.route.params.subscribe(param => {
      this.id = param["id"];
    })
    if(this.loginService.checkIfAllowed('ROLE_ADMIN')){
      this.getAddresses();
      this.getUniversities();
    }
    

    if(this.id != null || this.id != undefined){
      this.allowEditAndDelete = false;
      this.fetchFacultiesFromUniversity(this.id);
    }else{
      this.allowEditAndDelete = true;
      this.fetchFaculties();            
    }    
  }

  data(element:any){          
    this.facultyForm.patchValue(element);
    this.showForm();
  }

  facultyForm = new FormGroup({
    id:new FormControl(),
    name:new FormControl(null,Validators.required),
    deanId:new FormControl(null,Validators.required),          
    address:new FormGroup({
      id:new FormControl(null,Validators.required)
    }),
    university:new FormGroup({
      id:new FormControl(null,Validators.required)
    })});



  fetchFacultiesFromUniversity(id:number){
    this.facultyService.getFacultyFromUniversityId(id).subscribe(response=>{           
        
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  fetchFaculties(){
    this.facultyService.getFaculties().subscribe(response=>{       
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  getAddresses(){
    this.addressService.getAddresses().subscribe((response=>{
      this.addresses = response;      
    }))
  }

  getUniversities(){
    this.universityService.getUniversities().subscribe((response=>{
      this.universities = response;
    }))
  }

  getStudyPrograms(id:number){
    this.router.navigate([`/study-programs/${id}`])
  }

  create(){
    if(this.facultyForm.valid){
      if(this.facultyForm.value.id != null && this.facultyForm.value.id != undefined){
        this.facultyService.update(this.facultyForm.value.id,this.facultyForm.value).subscribe((response => {
          this.fetchFaculties();
          this.snackBar.open("Successfully updated entity!",'',{
            duration:2000,
            horizontalPosition:this.horizontalP,
            verticalPosition:this.verticalP,        
          })            
        }));

      }else{        
          this.facultyService.create(this.facultyForm.value).subscribe((response => {
          this.fetchFaculties();
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
    this.facultyForm.reset();      
  }

  deleteFaculty(id:number){
    this.facultyService.delete(id).subscribe((response)=>{
      this.fetchFaculties();
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

  showNotifications(facultyId:number){
    this.facultyService.getNotificationsFromFacultyId(facultyId).subscribe((response => {
      this.notificationsDetails.open(StudentAdminNotificationPopUpComponent,{
        data:response
      })
    }))    
  }

}
