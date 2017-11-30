import { TestBed, inject } from '@angular/core/testing';

import { QueryServiceService } from './query-service.service';

describe('QueryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryServiceService]
    });
  });

  it('should be created', inject([QueryServiceService], (service: QueryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
