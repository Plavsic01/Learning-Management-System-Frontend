import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsPopUpComponent } from './student-details-pop-up.component';

describe('StudentDetailsPopUpComponent', () => {
  let component: StudentDetailsPopUpComponent;
  let fixture: ComponentFixture<StudentDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
