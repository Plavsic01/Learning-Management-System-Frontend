import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns = ['id', 'firstName','lastName','dob','phone','jmbg','email','username','details'];
  isOpened:boolean = false;
  
  constructor(private userService:UserService,private snackBar:MatSnackBar){}

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(){      
    this.fetchUsers();      
  }

  data(element:any){
    delete element['password'];
    this.userForm.patchValue(element);
    this.showForm();
  }


  userForm = new FormGroup({
    id:new FormControl(),
    firstName:new FormControl(null,Validators.required),
    lastName:new FormControl(null,Validators.required),    
    dob:new FormControl(null,Validators.required),    
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)]),    
    jmbg:new FormControl(null,[Validators.required,Validators.pattern(/^(\d{13})$/)]),    
    email:new FormControl(null,[Validators.required,Validators.email]),    
    username:new FormControl(null,Validators.required),            
    password:new FormControl(null,[Validators.maxLength(15)])    
    });


    fetchUsers(){
    this.userService.getUsers().subscribe(response=>{              
      this.dataSource = new MatTableDataSource(response);             
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  create(){
    if(this.userForm.valid){

      let selectedDate:any = new Date(this.userForm.value.dob!);
            
      selectedDate.setHours(selectedDate!.getHours() + 2);

      this.userForm.value.dob = selectedDate;

      if(this.userForm.value.id != null && this.userForm.value.id != undefined){

        if(this.userForm.value.password == null || this.userForm.value.password == ''){
          this.userService.getUser(this.userForm.value.id).subscribe((response => {
            this.userForm.value.password = response['password'];
            this.userService.update(this.userForm.value.id,this.userForm.value).subscribe((response => {
              this.fetchUsers();      
              this.snackBar.open("Successfully updated entity!",'',{
                duration:2000,
                horizontalPosition:this.horizontalP,
                verticalPosition:this.verticalP,        
              })      
            }));
          }))
        }else{
          this.userService.update(this.userForm.value.id,this.userForm.value).subscribe((response => {
            this.fetchUsers();
            this.snackBar.open("Successfully updated entity!",'',{
              duration:2000,
              horizontalPosition:this.horizontalP,
              verticalPosition:this.verticalP,        
            })            
          }));
        }             
      }else{        
          this.userService.create(this.userForm.value).subscribe((response => {
          this.fetchUsers();    
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
    this.userForm.reset();        
  }


  deleteUser(id:number){
    this.userService.delete(id).subscribe((response)=>{
      this.fetchUsers();
    },(error:HttpErrorResponse) => {
      if(error.status === 400){
        this.snackBar.open("This entity cannot be deleted because it is used somewhere else! ❌",'',{
          duration:2000,
          horizontalPosition:this.horizontalP,
          verticalPosition:this.verticalP,        
        })        
      }
    }
    )
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }
}
