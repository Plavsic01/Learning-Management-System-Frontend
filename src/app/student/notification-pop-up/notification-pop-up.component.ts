import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-pop-up',
  templateUrl: './notification-pop-up.component.html',
  styleUrls: ['./notification-pop-up.component.css']
})
export class NotificationPopUpComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

}
