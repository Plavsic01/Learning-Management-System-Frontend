import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-admin-notification-pop-up',
  templateUrl: './student-admin-notification-pop-up.component.html',
  styleUrls: ['./student-admin-notification-pop-up.component.css']
})
export class StudentAdminNotificationPopUpComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

}
