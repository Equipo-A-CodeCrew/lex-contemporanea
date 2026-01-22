import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { BoeService } from './boe-service';
import { environment } from '../utils/environment';

describe('BoeService', () => {
  let service: BoeService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoeService, provideHttpClient()]
    });

    service = TestBed.inject(BoeService);
    http = TestBed.inject(HttpClient);
  });

  it('getSumario should call HttpClient.get with baseUrl', () => {
    const spy = spyOn(http, 'get').and.returnValue({} as any);

    service.getSumario();

    expect(spy).toHaveBeenCalledWith(environment.boeApiUrl);
  });
});
