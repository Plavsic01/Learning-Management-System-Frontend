import { TestBed } from '@angular/core/testing';

import { UserPrivilegesService } from './user-privileges.service';

describe('UserPrivilegesService', () => {
  let service: UserPrivilegesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPrivilegesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
