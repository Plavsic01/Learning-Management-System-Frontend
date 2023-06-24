import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { LoginService } from 'src/app/service/login/login.service';
import { SubjectMaterialService } from 'src/app/service/subjectMaterial/subject-material.service';

@Component({
  selector: 'app-subject-material',
  templateUrl: './subject-material.component.html',
  styleUrls: ['./subject-material.component.css']
})
export class SubjectMaterialComponent {

  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['id', 'title','author','isbn','numberOfPages','publisher','details'];
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
    
  isOpened:boolean = false;
  isLoaded:boolean = false;

  horizontalP:MatSnackBarHorizontalPosition = 'center';
  verticalP:MatSnackBarVerticalPosition = 'bottom';

  constructor(private subjectMaterial:SubjectMaterialService,public loginService:LoginService,private snackBar:MatSnackBar) {}
 
  ngOnInit(){  
    this.fetchSubjectMaterials();
  }

  data(element:any){          
    this.subjectMaterialForm.patchValue(element);
    this.showForm();
  }

  subjectMaterialForm = new FormGroup({
    id:new FormControl(),
    title:new FormControl(null,Validators.required),
    author:new FormControl(null,Validators.required), 
    isbn:new FormControl(null,Validators.required), 
    numberOfPages:new FormControl(null,Validators.required), 
    publisher:new FormControl(null,Validators.required),          
    
    });

    fetchSubjectMaterials(){
      this.subjectMaterial.getSubjectMaterials().subscribe((response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoaded = true;        
      }))
    }

    create(){
      if(this.subjectMaterialForm.valid){
        if(this.subjectMaterialForm.value.id != null && this.subjectMaterialForm.value.id != undefined){
          this.subjectMaterial.update(this.subjectMaterialForm.value.id,this.subjectMaterialForm.value).subscribe((response => {
            this.fetchSubjectMaterials();
            this.snackBar.open("Successfully updated entity!",'',{
              duration:2000,
              horizontalPosition:this.horizontalP,
              verticalPosition:this.verticalP,        
            })            
          }));
  
        }else{        
            this.subjectMaterial.create(this.subjectMaterialForm.value).subscribe((response => {
            this.fetchSubjectMaterials();
            this.snackBar.open("Successfully created new entity!",'',{
              duration:2000,
              horizontalPosition:this.horizontalP,
              verticalPosition:this.verticalP,        
            })            
          }));            
        } 
      }
    }
  
    reset(){
      this.subjectMaterialForm.reset();      
    }
  
    deleteSubjectMaterial(id:number){
      this.subjectMaterial.delete(id).subscribe((response)=>{
        this.fetchSubjectMaterials();
      })
    }
  
    showForm(){
      this.isOpened = !this.isOpened;
      if(!this.isOpened){
        this.reset();
      }
    }

    downloadPDF(bookId:number){
    
      this.subjectMaterial.getSubjectMaterial(bookId).subscribe((response => {
    
        console.log(response);
        
        let pdf = new jsPDF('p','pt','a4');
        let heading = `${response.title}`;
    
        let fontSize = 16;
      
        let textWidth = pdf.getStringUnitWidth(heading) * fontSize / pdf.internal.scaleFactor;
        let pageWidth = pdf.internal.pageSize.getWidth();
        let xPos = (pageWidth - textWidth) / 2;
        let yPos = 20;
      
        pdf.setFontSize(fontSize);
      
        pdf.text(heading ,xPos,yPos);
    
        pdf.line(10, 30, pdf.internal.pageSize.width - 10, 30);    
        
        pdf.text(`Author: ${response.author}`,10,60);

        pdf.text(`Isbn: ${response.isbn}`,10,90);

        pdf.text(`Number Of Pages: ${response.numberOfPages}`,10,120);

        pdf.text(`Publisher: ${response.publisher}`,10,150);
     
        pdf.save(`${response.title}.pdf`);
      }))
}

filter(event:any){
  this.dataSource.filter = event.target.value;
}

}
