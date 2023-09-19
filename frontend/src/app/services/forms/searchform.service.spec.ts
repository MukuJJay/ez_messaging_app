import { TestBed } from '@angular/core/testing';

import { SearchformService } from './searchform.service';

describe('SearchformService', () => {
  let service: SearchformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
