import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPopUpComponent } from './notification-pop-up.component';

describe('NotificationPopUpComponent', () => {
  let component: NotificationPopUpComponent;
  let fixture: ComponentFixture<NotificationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
