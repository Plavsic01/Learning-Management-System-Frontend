import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/service/login/login.service';
import { StudentService } from 'src/app/service/student/student.service';
import { NotificationPopUpComponent } from '../notification-pop-up/notification-pop-up.component';
import { SubjectService } from 'src/app/service/subject/subject.service';

@Component({
  selector: 'app-current-subjects',
  templateUrl: './current-subjects.component.html',
  styleUrls: ['./current-subjects.component.css']
})
export class CurrentSubjectsComponent {

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  notifications:any[] = [];

  displayedColumns = ['id', 'name','finalGrade','ects','numberOfLectures','numberOfPracticalLectures','numberOfAttempts','details'];

  ngOnInit(){
    this.fetchCurrentSubjects();
  }

  constructor(public loginService:LoginService,private studentService:StudentService,
    private subjectService:SubjectService,private notificationDialog:MatDialog){}

  fetchCurrentSubjects(){
    this.studentService.getStudentByUserId(this.loginService.user.id).subscribe((response => {
      let studentId = response["id"];      
      this.studentService.getCurrentSubjects(studentId).subscribe((response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;  
        console.log(response);              
      }));      
    }));
  }

  showCurrentSubjectNotifications(subjectId:number){
    this.subjectService.getNotificationBySubjectId(subjectId).subscribe((response => {
      this.notificationDialog.open(NotificationPopUpComponent,{
        data:response
      })
    }))    
  }

}
