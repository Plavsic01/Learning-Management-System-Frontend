import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { FacultyNotificationService } from 'src/app/service/faculty/facultyNotifications/faculty-notification.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-faculty-notifications',
  templateUrl: './faculty-notifications.component.html',
  styleUrls: ['./faculty-notifications.component.css']
})
export class FacultyNotificationsComponent {

  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id', 'title','description','dateOfNotification','faculty','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  isOpened:boolean = false;
  faculties:any[] = [];


  constructor(private facultyNotificationService:FacultyNotificationService,private facultyService:FacultyService,
             public loginService:LoginService) {}

  ngOnInit(){
    this.getFaculties();
    this.fetchNotifications();
  }

  data(element:any){             
    this.facultyNotificationForm.patchValue(element);
    this.showForm();
  }

  facultyNotificationForm = new FormGroup({
    id:new FormControl(),        
    title:new FormControl(null,Validators.required),
    description:new FormControl(null,Validators.required),
    dateOfNotification:new FormControl(null,Validators.required),  
    faculty:new FormGroup({
      id:new FormControl(null,Validators.required)
    }),
  });


  fetchNotifications(){
    this.facultyNotificationService.getNotifications().subscribe((response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(response);      
    }))
  }

  getFaculties(){
    this.facultyService.getFaculties().subscribe((response => {
      this.faculties = response;
    }))
  }


  create(){
    if(this.facultyNotificationForm.valid){

      let selectedDate:any = new Date(this.facultyNotificationForm.value.dateOfNotification!);
            
      selectedDate.setHours(selectedDate!.getHours() + 2);

      this.facultyNotificationForm.value.dateOfNotification = selectedDate;
      
      if(this.facultyNotificationForm.value.id != null && this.facultyNotificationForm.value.id != undefined){
        this.facultyNotificationService.update(this.facultyNotificationForm.value.id,this.facultyNotificationForm.value).subscribe((response => {
          this.fetchNotifications();
        }));
  
      }else{                          
          this.facultyNotificationService.create(this.facultyNotificationForm.value).subscribe((response => {
          this.fetchNotifications();
        })); 
        
      } 
    }
  }
  
  deleteNotification(id:number){
    this.facultyNotificationService.delete(id).subscribe((response => {
      this.fetchNotifications();
    }))
  }

  reset(){
    this.facultyNotificationForm.reset();        
  }
  
  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }

  
}
