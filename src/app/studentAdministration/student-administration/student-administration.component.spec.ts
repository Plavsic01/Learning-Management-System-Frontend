import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdministrationComponent } from './student-administration.component';

describe('StudentAdministrationComponent', () => {
  let component: StudentAdministrationComponent;
  let fixture: ComponentFixture<StudentAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdministrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
