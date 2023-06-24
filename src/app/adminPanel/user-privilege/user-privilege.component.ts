import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivilegesService } from 'src/app/service/privileges/privileges.service';
import { UserService } from 'src/app/service/user/user.service';
import { UserPrivilegesService } from 'src/app/service/userPrivileges/user-privileges.service';

@Component({
  selector: 'app-user-privilege',
  templateUrl: './user-privilege.component.html',
  styleUrls: ['./user-privilege.component.css']
})
export class UserPrivilegeComponent {

  users:any[] = [];
  privileges:any[] = [];

  dataSource!: MatTableDataSource<any>;  
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns = ['id','privileges','user','details'];
  isOpened:boolean = false;

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  constructor(private userPrivilegeService:UserPrivilegesService,private userService:UserService,private privilegeService:PrivilegesService,
            private router:Router,private route: ActivatedRoute,private snackBar:MatSnackBar){}


  ngOnInit(){      
    this.fetchUserPrivileges();
    this.getPrivileges();
    this.getUsers();      
  }

  data(element:any){    
    this.userPrivilegeForm.patchValue(element);
    this.showForm();
  }


  userPrivilegeForm = new FormGroup({
    id:new FormControl(),
    privileges:new FormGroup({
      id:new FormControl(null,Validators.required)
    }),
    user:new FormGroup({
      id:new FormControl(null,Validators.required)
    })});


    fetchUserPrivileges(){
    this.userPrivilegeService.getPrivileges().subscribe(response=>{              
      this.dataSource = new MatTableDataSource(response);                   
      this.dataSource.paginator = this.paginator;      
    });
  }

    getUsers(){
    this.userService.getUsers().subscribe(response=>{                    
      this.users = response;
    });
    }

  getPrivileges(){
    this.privilegeService.getPrivileges().subscribe(response=>{                    
      this.privileges = response;
    });
  }

  create(){
    if(this.userPrivilegeForm.valid){
      if(this.userPrivilegeForm.value.id != null && this.userPrivilegeForm.value.id != undefined){
        this.userPrivilegeService.update(this.userPrivilegeForm.value.id,this.userPrivilegeForm.value).subscribe((response => {
          this.fetchUserPrivileges();
          this.snackBar.open("Successfully updated entity!",'',{
            duration:2000,
            horizontalPosition:this.horizontalP,
            verticalPosition:this.verticalP,        
          })             
        }));

      }else{        
          this.userPrivilegeService.create(this.userPrivilegeForm.value).subscribe((response => {
          this.fetchUserPrivileges();
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
    this.userPrivilegeForm.reset();        
  }


  deleteUserPrivilege(id:number){
    this.userPrivilegeService.delete(id).subscribe((response)=>{
      this.fetchUserPrivileges();
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }
}
