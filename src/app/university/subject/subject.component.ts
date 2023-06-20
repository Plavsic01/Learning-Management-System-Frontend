import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { YearOfStudyService } from 'src/app/service/YearOfStudy/year-of-study.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {  
  id!:number;  
  subjects:any[] = [];
  allowEditAndDelete:boolean | undefined;
  isOpened:boolean = false;
  yearsOfStudy:any[] = [];
  
  constructor(private subjectService:SubjectService,private yearOfStudyService:YearOfStudyService,
             private router:Router,private route: ActivatedRoute,private subjectDetails:MatDialog) {}
 
  ngOnInit(){

    this.fetchYearsOfStudy();

    this.route.params.subscribe(param => {
      this.id = param["id"];
    })

    if(this.id != null || this.id != undefined){
        this.allowEditAndDelete = false;
        this.fetchSubjectsFromYearOfStudyId(this.id);
    }else{
      this.allowEditAndDelete = true;
      this.fetchSubjects();
    }
  }

  data(element:any){          
    this.subjectForm.patchValue(element);
    this.showForm();
  }

  subjectForm = new FormGroup({
    id:new FormControl(),
    name:new FormControl(null,Validators.required),
    mandatorySubject:new FormControl(false,Validators.required),
    ects:new FormControl(null,Validators.required),
    numberOfSemesters:new FormControl(null,Validators.required),
    numberOfLectures:new FormControl(null,Validators.required),    
    numberOfPracticalLectures:new FormControl(null,Validators.required),    
    yearOfStudy:new FormGroup({
      id:new FormControl(null,Validators.required)
    }),
    syllabus:new FormControl(null,Validators.required)
    });

  fetchSubjectsFromYearOfStudyId(id:number){
    this.subjectService.getSubjectsFromYearOfStudyId(id).subscribe(response=>{  
      this.subjects = response;          
      console.log(response);    
    });
  }

  showSubjectDetails(subjectId:number){
    this.subjectDetails.open(SubjectDetailsComponent,{
      data:this.subjects[subjectId]
    })
  }

  fetchSubjects(){
    this.subjectService.getSubjects().subscribe((response => {
      this.subjects = response;
    }))
  }

  fetchYearsOfStudy(){
    this.yearOfStudyService.getYearsOfStudy().subscribe((response => {
      this.yearsOfStudy = response;
    }))
  }

  deleteSubject(id:number){
    this.subjectService.delete(id).subscribe((response => {
      this.fetchSubjects();
    }))
  }

  create(){
    if(this.subjectForm.valid){
      if(this.subjectForm.value.id != null && this.subjectForm.value.id != undefined){
        this.subjectService.update(this.subjectForm.value.id,this.subjectForm.value).subscribe((response => {
          this.fetchSubjects();
        }));
        
      }else{        
          this.subjectService.create(this.subjectForm.value).subscribe((response => {
          this.fetchSubjects();            
        }));            
      } 
    }
  }

  reset(){
    this.subjectForm.reset();        
  }

  showForm(){
    this.isOpened = !this.isOpened;
    if(!this.isOpened){
      this.reset();
    }
  }

}
