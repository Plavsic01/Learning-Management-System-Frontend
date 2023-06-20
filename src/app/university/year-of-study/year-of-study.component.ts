import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { YearOfStudyService } from 'src/app/service/YearOfStudy/year-of-study.service';
import { LoginService } from 'src/app/service/login/login.service';
import { StudyProgramService } from 'src/app/service/studyProgram/study-program.service';

@Component({
  selector: 'app-year-of-study',
  templateUrl: './year-of-study.component.html',
  styleUrls: ['./year-of-study.component.css']
})
export class YearOfStudyComponent {
  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id', 'year','number_of_subjects','study_program','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  
  allowEditAndDelete:boolean | undefined;
  id!:number;
  isOpened:boolean = false;
  studyPrograms:any[] = [];

  constructor(private yearOfStudyService:YearOfStudyService,private studyProgramService:StudyProgramService,public loginService:LoginService,
    private router:Router,private route: ActivatedRoute) {}
 
  ngOnInit(){
    this.fetchStudyPrograms();

    this.route.params.subscribe(param => {
      this.id = param["id"];
    })

    if(this.id != null || this.id != undefined){
      this.allowEditAndDelete = false;      
      this.getYearsOfStudyFromStudyProgramId(this.id);
    }else{
      this.fetchYearsOfStudy();      
      this.allowEditAndDelete = true;
    }
  }

  data(element:any){          
    this.yearOfStudyForm.patchValue(element);
    this.showForm();
  }

  yearOfStudyForm = new FormGroup({
    id:new FormControl(),
    year:new FormControl(null,Validators.required),    
    studyProgramId:new FormControl(null,Validators.required)   
    });

  getYearsOfStudyFromStudyProgramId(id:number){
    this.yearOfStudyService.getYearsOfStudyFromStudyProgramId(id).subscribe(response=>{      
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;                         
    });
  }

  fetchYearsOfStudy(){
    this.yearOfStudyService.getYearsOfStudy().subscribe(response=>{      
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;             
    });
  }

  fetchStudyPrograms(){
    this.studyProgramService.getStudyPrograms().subscribe(response=>{      
      this.studyPrograms = response;
    });
  }

  getSubjects(id:number){
    this.router.navigate([`/subjects/${id}`])
  }

  create(){
    if(this.yearOfStudyForm.valid){
      if(this.yearOfStudyForm.value.id != null && this.yearOfStudyForm.value.id != undefined){
        this.yearOfStudyService.update(this.yearOfStudyForm.value.id,this.yearOfStudyForm.value).subscribe((response => {
          this.fetchYearsOfStudy();            
        }));

      }else{        
          this.yearOfStudyService.create(this.yearOfStudyForm.value).subscribe((response => {
            this.fetchYearsOfStudy();                   
        }));            
      } 
    }
  }

  reset(){
    this.yearOfStudyForm.reset();        
  }

  deleteYearOfStudy(id:number){
    this.yearOfStudyService.delete(id).subscribe((response)=>{
      this.fetchYearsOfStudy();            
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }

}
