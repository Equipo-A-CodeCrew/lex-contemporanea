import { TestBed } from '@angular/core/testing';

import { ExtractDataService } from './extract-data-service';

describe('ExtractDataService', () => {
  let service: ExtractDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
