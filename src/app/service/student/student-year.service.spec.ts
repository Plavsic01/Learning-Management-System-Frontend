import { TestBed } from '@angular/core/testing';

import { StudentYearService } from './student-year.service';

describe('StudentYearService', () => {
  let service: StudentYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
