import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { UniversityComponent } from './university/university/university.component';
import { FacultyComponent } from './university/faculty/faculty.component';
import { StudyProgramComponent } from './university/study-program/study-program.component';
import { YearOfStudyComponent } from './university/year-of-study/year-of-study.component';
import { SubjectComponent } from './university/subject/subject.component';
import { AddressComponent } from './adminPanel/address/address.component';
import { CityComponent } from './adminPanel/city/city.component';
import { CountryComponent } from './adminPanel/country/country.component';
import { auth } from './guard/auth.guard';
import { UserComponent } from './adminPanel/user/user.component';
import { PassedSubjectsComponent } from './student/passed-subjects/passed-subjects.component';
import { StudentSubjectsComponent } from './student/student-subjects/student-subjects.component';
// import { PrivilegeComponent } from './adminPanel/privilege/privilege.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:UniversityComponent},
  {path:"faculties",component:FacultyComponent},
  {path:"faculties/:id",component:FacultyComponent},
  {path:"study-programs",component:StudyProgramComponent},
  {path:"study-programs/:id",component:StudyProgramComponent},
  {path:"years-of-study",component:YearOfStudyComponent},
  {path:"years-of-study/:id",component:YearOfStudyComponent},
  {path:"subjects",component:SubjectComponent},
  {path:"subjects/:id",component:SubjectComponent},

  {path:"address",component:AddressComponent,data:{roles:["ROLE_ADMIN"]},
  canActivate:[auth]
  },
  {path:"cities",component:CityComponent,data:{roles:["ROLE_ADMIN"]},
  canActivate:[auth]
  },
  {path:"countries",component:CountryComponent,data:{roles:["ROLE_ADMIN"]},
  canActivate:[auth]
  },
  {path:"users",component:UserComponent,data:{roles:["ROLE_ADMIN"]},
  canActivate:[auth]
  },
  {path:"my-student",component:StudentSubjectsComponent,data:{roles:["ROLE_STUDENT"]},
  canActivate:[auth]
  },
  // {path:"privileges",component:PrivilegeComponent,data:{roles:["ROLE_ADMIN"]},
  // canActivate:[auth]
  // }
  { path: '**', redirectTo: '/' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
