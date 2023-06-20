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

 
  generateStudentXML(){
    
  }

  saveBlobAsPDF(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

}
