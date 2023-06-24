import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/service/login/login.service';
import { StudentService } from 'src/app/service/student/student.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  isOpened:boolean = false;
  users:any[] = [];  
  
  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id','firstName','lastName','jmbg','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';
  
  constructor(public loginService:LoginService,private studentService:StudentService,private userService:UserService,private snackBar:MatSnackBar) {}
 
  ngOnInit(){
    this.getUsers();
    this.fetchStudents();
  }

  data(element:any){          
    this.studentForm.patchValue(element);
    this.showForm();
  }

  studentForm = new FormGroup({
    id:new FormControl(),        
    user:new FormGroup({
      id:new FormControl(null,Validators.required)
    })    
    });


  fetchStudents(){
    this.studentService.getStudents().subscribe((response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(response);
      
    }))
  }

  getUsers(){
    this.userService.getUsers().subscribe((response => {
      this.users = response;
    }))
  }

  create(){
    if(this.studentForm.valid){

      let student = {
        "id":this.studentForm.value.id,
        "userId":this.studentForm.value.user?.id
      }
      
      this.studentService.createStudent(student).subscribe((response => {
      this.fetchStudents();  
      this.snackBar.open("Successfully created new entity!",'',{
        duration:2000,
        horizontalPosition:this.horizontalP,
        verticalPosition:this.verticalP,        
      })                  
      }));            

      } 
    }
  
  reset(){
    this.studentForm.reset();        
  }

  deleteStudent(id:number){
    this.studentService.deleteStudent(id).subscribe((response)=>{
      this.fetchStudents();
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
