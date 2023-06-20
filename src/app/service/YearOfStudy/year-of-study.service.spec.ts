import { TestBed } from '@angular/core/testing';

import { YearOfStudyService } from './year-of-study.service';

describe('YearOfStudyService', () => {
  let service: YearOfStudyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearOfStudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
