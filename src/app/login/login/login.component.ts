import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  durationInSeconds = 5;

  loginForm = new FormGroup({
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required)
  })

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  constructor(private loginService:LoginService,private snackBar:MatSnackBar,private router:Router){}


  login(){
    if(this.loginForm.valid){
    this.loginService.login(this.loginForm.value).subscribe(r => {

      this.snackBar.open("Successfully Logged In 🎉",'',{
        duration:2000,
        horizontalPosition:this.horizontalP,
        verticalPosition:this.verticalP,        
      })
      this.router.navigate(["/"]);

    },(error:HttpErrorResponse) => {
      if(error.status === 403){
        this.snackBar.open("Wrong Credentials ❌",'',{
          duration:2000,
          horizontalPosition:this.horizontalP,
          verticalPosition:this.verticalP,        
        })        
      }
    })

  }else if(this.loginForm.get('username')?.invalid || this.loginForm.get('password')?.invalid){
    this.snackBar.open("Please fill in all fields ✏️",'',{
      duration:2000,
      horizontalPosition:this.horizontalP,
      verticalPosition:this.verticalP,        
    })
  }
  }
}
