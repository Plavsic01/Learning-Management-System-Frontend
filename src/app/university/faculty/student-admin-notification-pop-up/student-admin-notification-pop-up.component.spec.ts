import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdminNotificationPopUpComponent } from './student-admin-notification-pop-up.component';

describe('StudentAdminNotificationPopUpComponent', () => {
  let component: StudentAdminNotificationPopUpComponent;
  let fixture: ComponentFixture<StudentAdminNotificationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdminNotificationPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAdminNotificationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
