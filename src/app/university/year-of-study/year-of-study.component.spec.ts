import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearOfStudyComponent } from './year-of-study.component';

describe('YearOfStudyComponent', () => {
  let component: YearOfStudyComponent;
  let fixture: ComponentFixture<YearOfStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearOfStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
