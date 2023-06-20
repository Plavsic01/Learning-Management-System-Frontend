import { Component } from '@angular/core';
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


  ngOnInit(){  
    this.fetchCurrentUserData();
  }

  constructor(private userService:UserService,private studentService:StudentService,public loginService:LoginService){}


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
    }
    
  }

}
