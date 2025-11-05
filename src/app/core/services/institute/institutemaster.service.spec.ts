import { TestBed } from '@angular/core/testing';

import { InstitutemasterService } from './institutemaster.service';

describe('InstitutemasterService', () => {
  let service: InstitutemasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutemasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
