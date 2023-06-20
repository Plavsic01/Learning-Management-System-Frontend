import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  // dataSource!:MatTableDataSource<any>;
  // displayedColumns = ['id', 'name','ects','is_mandatory','number_of_lectures','number_of_practical_lectures','number_of_semesters','syllabus'];
  // @ViewChild(MatSort) sort!:MatSort;
  // @ViewChild(MatPaginator) paginator!:MatPaginator;
  
  id!:number;
  subjects:any[] = [];
  
  constructor(private subjectService:SubjectService,private router:Router,private route: ActivatedRoute,private subjectDetails:MatDialog) {}
 
  ngOnInit(){
    this.route.params.subscribe(param => {
      this.id = param["id"];
    })

    if(this.id != null || this.id != undefined){
        this.fetchSubjectsFromYearOfStudyId(this.id);
    }else{
      // this.fetchStudyPrograms();  
    }
  }

  fetchSubjectsFromYearOfStudyId(id:number){
    this.subjectService.getSubjectsFromYearOfStudyId(id).subscribe(response=>{  
      this.subjects = response;    
      // this.dataSource = new MatTableDataSource(response);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      console.log(response);
        
    });
  }

  // fetchStudyPrograms(){
  //   this.studyProgramService.getStudyPrograms().subscribe(response=>{      
  //     this.dataSource = new MatTableDataSource(response);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  showSubjectDetails(subjectId:number){
    this.subjectDetails.open(SubjectDetailsComponent,{
      data:this.subjects[subjectId]
    })
  }
}
