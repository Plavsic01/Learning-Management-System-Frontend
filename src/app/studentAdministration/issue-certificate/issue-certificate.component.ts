import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { LoginService } from 'src/app/service/login/login.service';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-issue-certificate',
  templateUrl: './issue-certificate.component.html',
  styleUrls: ['./issue-certificate.component.css']
})
export class IssueCertificateComponent {

students:any[] = [];

constructor(private studentService:StudentService,public loginService:LoginService){}

ngOnInit(){
  this.fetchStudents();
}



studentServiceForm = new FormGroup({
  id:new FormControl(),    
  student:new FormControl(null,Validators.required)  
});

createPDF(){
  let studentId:any = this.studentServiceForm.value.student;

  this.studentService.getStudent(studentId).subscribe((response => {

    console.log(response);
    
    let studentIndex = '';

    let studyPrograms = '';

    for(let r of response['studentYears']){
      studentIndex += `indexNo: ${r.indexNo}, `
      studyPrograms += `Study Program: ${r.yearOfStudy.studyProgram.name} ${r.yearOfStudy.year} year\n `;
    }

    let pdf = new jsPDF('l','pt','a4');
    let heading = 'Certificate';

    let fontSize = 16;
  
    let textWidth = pdf.getStringUnitWidth(heading) * fontSize / pdf.internal.scaleFactor;
    let pageWidth = pdf.internal.pageSize.getWidth();
    let xPos = (pageWidth - textWidth) / 2;
    let yPos = 20;
  
    pdf.setFontSize(fontSize);
  
    pdf.text(heading ,xPos,yPos);

    pdf.line(10, 30, pdf.internal.pageSize.width - 10, 30);    

    pdf.text(`This is to certify that ${response.user.firstName + ' ' + response.user.lastName} born on ${response.user.dob}, (${studentIndex})\n enrolled in ${studyPrograms}`,10,70)

    pdf.text("This certificate is issued for the purpose of regulating military duty, visa issuance, issuance of health insurance card,\n right to child allowance benefit, family pension, disability allowance, reduced bus fare and scholarship",10,190);
    
    pdf.save('student.pdf');
  }))


}




fetchStudents(){
  this.studentService.getStudents().subscribe((response => {
    this.students = response;
  }))
}

reset(){
  this.studentServiceForm.reset();        
}


}
