import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-details-pop-up',
  templateUrl: './student-details-pop-up.component.html',
  styleUrls: ['./student-details-pop-up.component.css']
})
export class StudentDetailsPopUpComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
}
