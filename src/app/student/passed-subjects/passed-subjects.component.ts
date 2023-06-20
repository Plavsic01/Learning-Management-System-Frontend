import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/service/login/login.service';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-passed-subjects',
  templateUrl: './passed-subjects.component.html',
  styleUrls: ['./passed-subjects.component.css']
})
export class PassedSubjectsComponent {

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  displayedColumns = ['id', 'name','points','finalGrade','ects','year','numberOfAttempts'];
  
  averageGrade:number = 0;
  totalEctsPoints:number = 0;

  ngOnInit(){
    this.fetchPassedSubjects();
  }

  constructor(public loginService:LoginService,private studentService:StudentService){}



  fetchPassedSubjects(){
    this.studentService.getStudentByUserId(this.loginService.user.id).subscribe((response => {
      let studentId = response["id"];      
      this.studentService.getPassedSubjects(studentId).subscribe((response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
        this.calcAverageGrade(response);
        this.calcEctsPoints(response);
        
      }));      
    }));
  }

  calcAverageGrade(response: any[]){    
    for(let subject of response){
      this.averageGrade += subject.finalGrade;        
    }
    this.averageGrade = this.averageGrade / response.length;
  }

  calcEctsPoints(response: any[]){    
    for(let r of response){
      this.totalEctsPoints += r['subject'].ects;      
    }
    
  }
}
