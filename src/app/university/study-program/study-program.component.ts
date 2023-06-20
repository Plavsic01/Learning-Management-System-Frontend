import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from 'src/app/service/faculty/faculty.service';
import { LoginService } from 'src/app/service/login/login.service';
import { StudyProgramService } from 'src/app/service/studyProgram/study-program.service';

@Component({
  selector: 'app-study-program',
  templateUrl: './study-program.component.html',
  styleUrls: ['./study-program.component.css']
})
export class StudyProgramComponent {
  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id', 'coordinatorId','name','faculty','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  allowEditAndDelete:boolean | undefined;
  id!:number;
  isOpened:boolean = false;
  faculties:any[] = [];
  constructor(private studyProgramService:StudyProgramService,private facultyService:FacultyService,public loginService:LoginService,
    private router:Router,private route: ActivatedRoute) {}
 
  ngOnInit(){

    this.getFaculties();

    this.route.params.subscribe(param => {
      this.id = param["id"];
    })

    if(this.id != null || this.id != undefined){
      this.allowEditAndDelete = false;
        this.fetchStudyProgramsFromFacultyId(this.id);
    }else{      
      this.allowEditAndDelete = true;
      this.fetchStudyPrograms();  
    }
  }

  data(element:any){          
    this.studyProgramForm.patchValue(element);
    this.showForm();
  }
  

  studyProgramForm = new FormGroup({
    id:new FormControl(),
    name:new FormControl(null,Validators.required),
    coordinatorId:new FormControl(null,Validators.required),
    faculty:new FormGroup({
      id:new FormControl(null,Validators.required)
    })});

  fetchStudyProgramsFromFacultyId(id:number){
    this.studyProgramService.getStudyProgramsFromFacultyId(id).subscribe(response=>{      
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
    });
  }

  fetchStudyPrograms(){
    this.studyProgramService.getStudyPrograms().subscribe(response=>{      
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getFaculties(){
    this.facultyService.getFaculties().subscribe(response=>{      
      this.faculties = response;
    });
  }

  getYearsOfStudy(id:number){
    this.router.navigate([`/years-of-study/${id}`])
  }

  create(){
    if(this.studyProgramForm.valid){
      if(this.studyProgramForm.value.id != null && this.studyProgramForm.value.id != undefined){
        this.studyProgramService.update(this.studyProgramForm.value.id,this.studyProgramForm.value).subscribe((response => {
          this.fetchStudyPrograms();
        }));

      }else{        
          this.studyProgramService.create(this.studyProgramForm.value).subscribe((response => {
          this.fetchStudyPrograms();            
        }));            
      } 
    }
  }

  reset(){
    this.studyProgramForm.reset();        
  }

  deleteStudyProgram(id:number){
    this.studyProgramService.delete(id).subscribe((response)=>{
      this.fetchStudyPrograms();
    })
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }

}
