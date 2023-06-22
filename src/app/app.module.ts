import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginInterceptor } from './interceptor/login.interceptor';
import { LoginComponent } from './login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';


import { UniversityComponent } from './university/university/university.component';
import { FacultyComponent } from './university/faculty/faculty.component';
import { StudyProgramComponent } from './university/study-program/study-program.component';
import { YearOfStudyComponent } from './university/year-of-study/year-of-study.component';
import { SubjectComponent } from './university/subject/subject.component';
import { SubjectDetailsComponent } from './university/subject/subject-details/subject-details.component';
import { AddressComponent } from './adminPanel/address/address.component';
import { CityComponent } from './adminPanel/city/city.component';
import { CountryComponent } from './adminPanel/country/country.component';
import { UserComponent } from './adminPanel/user/user.component';
import { PrivilegeComponent } from './adminPanel/privilege/privilege.component';
import { UserPrivilegeComponent } from './adminPanel/user-privilege/user-privilege.component';
import { PassedSubjectsComponent } from './student/passed-subjects/passed-subjects.component';
import { CurrentSubjectsComponent } from './student/current-subjects/current-subjects.component';
import { StudentSubjectsComponent } from './student/student-subjects/student-subjects.component';
import { NotificationPopUpComponent } from './student/notification-pop-up/notification-pop-up.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { StudentAdministrationComponent } from './studentAdministration/student-administration/student-administration.component';
import { StudentDetailsPopUpComponent } from './studentAdministration/student-details-pop-up/student-details-pop-up.component';
import { StudentAdminNotificationPopUpComponent } from './university/faculty/student-admin-notification-pop-up/student-admin-notification-pop-up.component';
import { FacultyNotificationsComponent } from './studentAdministration/faculty-notifications/faculty-notifications.component';
import { IssueCertificateComponent } from './studentAdministration/issue-certificate/issue-certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UniversityComponent,
    FacultyComponent,
    StudyProgramComponent,
    YearOfStudyComponent,
    SubjectComponent,
    SubjectDetailsComponent,
    AddressComponent,
    CityComponent,
    CountryComponent,
    UserComponent,
    PrivilegeComponent,
    UserPrivilegeComponent,
    PassedSubjectsComponent,
    CurrentSubjectsComponent,
    StudentSubjectsComponent,
    NotificationPopUpComponent,
    MyProfileComponent,
    StudentAdministrationComponent,
    StudentDetailsPopUpComponent,
    StudentAdminNotificationPopUpComponent,
    FacultyNotificationsComponent,
    IssueCertificateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,    
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    ScrollingModule,
  
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:LoginInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
