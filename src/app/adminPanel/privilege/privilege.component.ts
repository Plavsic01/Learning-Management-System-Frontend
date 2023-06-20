import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivilegesService } from 'src/app/service/privileges/privileges.service';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns = ['id','roleName','details'];
  isOpened:boolean = false;

  constructor(private privilegeService:PrivilegesService,private router:Router,private route: ActivatedRoute){}


  ngOnInit(){      
    this.fetchPrivileges();      
  }

  data(element:any){    
    this.privilegeForm.patchValue(element);
    this.showForm();
  }


  privilegeForm = new FormGroup({
    id:new FormControl(),
    roleName:new FormControl(null,Validators.required)   
    });


    fetchPrivileges(){
    this.privilegeService.getPrivileges().subscribe(response=>{              
      this.dataSource = new MatTableDataSource(response);             
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }

  create(){
    if(this.privilegeForm.valid){
      if(this.privilegeForm.value.id != null && this.privilegeForm.value.id != undefined){
        this.privilegeService.update(this.privilegeForm.value.id,this.privilegeForm.value).subscribe((response => {
          this.fetchPrivileges();            
        }));

      }else{        
          this.privilegeService.create(this.privilegeForm.value).subscribe((response => {
          this.fetchPrivileges();            
        }));            
      } 
    }
  }

  reset(){
    this.privilegeForm.reset();        
  }


  deletePrivilege(id:number){
    this.privilegeService.delete(id).subscribe((response)=>{
      this.fetchPrivileges();
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }
}
