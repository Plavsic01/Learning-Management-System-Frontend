import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  displayedColumns = ['id', 'first_name','last_name','dob','phone','jmbg','email','username','details'];
  isOpened:boolean = false;

  constructor(private userService:UserService,private router:Router,private route: ActivatedRoute){}


  ngOnInit(){      
    this.fetchUsers();      
  }

  data(element:any){    
    this.userForm.patchValue(element);
    this.showForm();
  }


  userForm = new FormGroup({
    id:new FormControl(),
    firstName:new FormControl(null,Validators.required),
    lastName:new FormControl(null,Validators.required),    
    dob:new FormControl(null,Validators.required),    
    phone:new FormControl(null,[Validators.required,Validators.minLength(9),Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)]),    
    jmbg:new FormControl(null,[Validators.required,Validators.pattern(/^(\d{13})$/)]),    
    email:new FormControl(null,[Validators.required,Validators.email]),    
    username:new FormControl(null,Validators.required),        
    password:new FormControl(null,Validators.required),    
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
      if(this.userForm.value.id != null && this.userForm.value.id != undefined){
        this.userService.update(this.userForm.value.id,this.userForm.value).subscribe((response => {
          this.fetchUsers();            
        }));

      }else{        
          this.userService.create(this.userForm.value).subscribe((response => {
          this.fetchUsers();            
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
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }
}
