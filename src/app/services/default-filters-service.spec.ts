import { TestBed } from '@angular/core/testing';

import { DefaultFiltersService } from './default-filters-service';

describe('DeafultFiltersService', () => {
  let service: DefaultFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
