import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyNotificationsComponent } from './faculty-notifications.component';

describe('FacultyNotificationsComponent', () => {
  let component: FacultyNotificationsComponent;
  let fixture: ComponentFixture<FacultyNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
