import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login/login.service';
import { StudentService } from 'src/app/service/student/student.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  currentUser:any = {};
  isOpened:boolean = false;

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(){  
    this.fetchCurrentUserData();
  }

  constructor(private userService:UserService,private studentService:StudentService,public loginService:LoginService,
    private snackBar:MatSnackBar){}

  data(element:any){
    delete element['password'];          
    this.myProfileForm.patchValue(element);
    this.showForm();
  }

  myProfileForm = new FormGroup({
    id:new FormControl(),        
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.maxLength(15)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)])
    
    });



  fetchCurrentUserData(){
    if(this.loginService.checkUserPrivileges(["ROLE_STUDENT"])){
      this.studentService.getStudentByUserId(this.loginService.user.id).subscribe((response => {
        this.studentService.getStudent(response.id).subscribe((r => {            
            this.currentUser = r;                        
        }))        
     }))
    }else if(this.loginService.checkUserPrivileges(["ROLE_ADMIN"])){
        this.userService.getUser(this.loginService.user.id).subscribe((response => {
          this.currentUser = response;
        }))
    }else if(this.loginService.checkUserPrivileges(["ROLE_STUDENT_ADMINISTRATION"])){
      this.userService.getUser(this.loginService.user.id).subscribe((response => {
        this.currentUser = response;
      }))
    }   
  }

  create(){
    if(this.myProfileForm.valid){       
      
      if(this.myProfileForm.value.password == null || this.myProfileForm.value.password == ''){

        this.userService.getUser(this.loginService.user.id).subscribe((response => {
          this.myProfileForm.value.password = response['password'];

          this.userService.update(this.loginService.user.id,this.myProfileForm.value).subscribe((response => {
            this.fetchCurrentUserData();
            this.snackBar.open("Successfully Updated Profile 🎉",'',{
              duration:2000,
              horizontalPosition:this.horizontalP,
              verticalPosition:this.verticalP,        
            })            
          }));          
        }))

      }else{
        this.userService.update(this.loginService.user.id,this.myProfileForm.value).subscribe((response => {
          this.fetchCurrentUserData(); 
          this.snackBar.open("Successfully Updated Profile 🎉",'',{
            duration:2000,
            horizontalPosition:this.horizontalP,
            verticalPosition:this.verticalP,        
          })            
        }));
      }
      }          
    } 
    
  reset(){
    this.myProfileForm.reset();      
  }
  
  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }

}
