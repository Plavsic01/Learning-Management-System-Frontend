import { Component } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { StudentService } from '../service/student/student.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private studentService:StudentService,public loginService:LoginService){}

  generateStudentPDF(){
    this.studentService.generateStudentsPDF().subscribe((blob:Blob) => {
      this.saveBlobAsPDF(blob,"students.pdf");
    })
  }

  generateXML() {

    let studentXML = ``;
    let studentEnrollmentXML = ``;

      this.studentService.getStudents().subscribe((response => {
        console.log(response);
    
        for(let student of response){   
          

          for(let studentEnrollment of student.studentYears){
            studentEnrollmentXML += `<studentEnrollment>\n    <indexNumber>${studentEnrollment.indexNo}</indexNumber>\n    <studyProgram>${studentEnrollment.yearOfStudy.studyProgram.name}</studyProgram>\n    <year>${studentEnrollment.yearOfStudy.year}</year>\n  </studentEnrollment>`;
          }
                         
          studentXML += `\n <student>\n  <firstName>${student.user.firstName}</firstName>\n  <lastName>${student.user.lastName}</lastName>\n  <jmbg>${student.user.jmbg}</jmbg>\n  <phoneNumber>${student.user.phone}</phoneNumber>\n  <email>${student.user.email}</email>\n  ${studentEnrollmentXML}\n </student>\n`

          studentEnrollmentXML = ``;
        }
        
        const version = '1.0';
      
        const xmlString = `<?xml version="${version}" encoding="UTF-8"?>\n<students>\n${studentXML}\n</students>`;
        
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmlString);
        downloadLink.download = 'example.xml';
        downloadLink.click();

      }))

    }



  saveBlobAsPDF(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

}
