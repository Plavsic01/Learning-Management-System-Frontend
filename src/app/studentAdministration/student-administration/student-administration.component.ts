import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { YearOfStudyService } from 'src/app/service/YearOfStudy/year-of-study.service';
import { LoginService } from 'src/app/service/login/login.service';
import { StudentYearService } from 'src/app/service/student/student-year.service';
import { StudentService } from 'src/app/service/student/student.service';
import { StudentDetailsPopUpComponent } from '../student-details-pop-up/student-details-pop-up.component';

@Component({
  selector: 'app-student-administration',
  templateUrl: './student-administration.component.html',
  styleUrls: ['./student-administration.component.css']
})
export class StudentAdministrationComponent {

  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id', 'indexNo','dateOfEnrollment','year','studyProgram','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  isOpened:boolean = false;
  students:any[] = [];
  studentDetails:any = {};
  studentYears:any[] = [];
  yearsOfStudy:any[] = [];


  constructor(private studentService:StudentService,private yearOfStudyService:YearOfStudyService,
             private studentYearService:StudentYearService,public loginService:LoginService,
             private studentDetailsPopUp:MatDialog) {}

ngOnInit(){
  this.fetchStudentYear();
  this.fetchYearsOfStudy();
  this.fetchStudents();
}

data(element:any){             
  this.studentServiceForm.patchValue(element);
  this.showForm();
}

studentServiceForm = new FormGroup({
  id:new FormControl(),  
  student:new FormGroup({
    id:new FormControl(null,Validators.required)
  }),
  indexNo:new FormControl(null,[Validators.required,Validators.pattern(/^\d{4}\/\d{6}$/)]),
  dateOfEnrollment:new FormControl(null,Validators.required),  
  yearOfStudy:new FormGroup({
    id:new FormControl(null,Validators.required)
  }),
});

fetchStudents(){
  this.studentService.getStudents().subscribe((response =>{
    this.students = response;
  }))
}

fetchStudentYear(){
  this.studentYearService.getStudentYears().subscribe((response => {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.studentYears = response;        
  }))
}


fetchYearsOfStudy(){
  this.yearOfStudyService.getYearsOfStudy().subscribe((response => {
    this.yearsOfStudy = response;     
  }))
}

create(){
  if(this.studentServiceForm.valid){

    let selectedDate:any = new Date(this.studentServiceForm.value.dateOfEnrollment!);
            
      selectedDate.setHours(selectedDate!.getHours() + 2);

      this.studentServiceForm.value.dateOfEnrollment = selectedDate;

    let formValues = {
      "id":this.studentServiceForm.value.id,
      "indexNo":this.studentServiceForm.value.indexNo,
      "student":{"id":this.studentServiceForm.value.student?.id},
      "dateOfEnrollment":this.studentServiceForm.value.dateOfEnrollment,
      "yearOfStudyId":this.studentServiceForm.value.yearOfStudy?.id
    }

    if(this.studentServiceForm.value.id != null && this.studentServiceForm.value.id != undefined){
      this.studentYearService.update(this.studentServiceForm.value.id,formValues).subscribe((response => {
        this.fetchStudentYear();            
      }));

    }else{        
        this.studentYearService.create(formValues).subscribe((response => {
        this.fetchStudentYear();            
      })); 
      console.log(this.studentServiceForm.value);
                 
    } 
  }
}

reset(){
  this.studentServiceForm.reset();        
}

deleteStudentYear(id:number){
  this.studentYearService.delete(id).subscribe((response => {
    this.fetchStudentYear();
  }))
}

showForm(){
  this.isOpened = !this.isOpened;
  if(!this.isOpened){
    this.reset();
  }
}

showStudentDetails(studentId:number){
  this.studentService.getStudent(studentId).subscribe((response => {
    this.studentDetails = response;
    console.log(this.studentDetails);
    this.studentDetailsPopUp.open(StudentDetailsPopUpComponent,{
      data:this.studentDetails
    })
    
  }))
  
}


}
