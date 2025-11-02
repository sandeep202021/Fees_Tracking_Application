import { TestBed } from '@angular/core/testing';

import { PackagemasterService } from './packagemaster.service';

describe('PackagemasterService', () => {
  let service: PackagemasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagemasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
