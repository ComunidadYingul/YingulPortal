import { TestBed, inject } from '@angular/core/testing';

import { UbicationService } from './ubication.service';

describe('UbicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UbicationService]
    });
  });

  it('should be created', inject([UbicationService], (service: UbicationService) => {
    expect(service).toBeTruthy();
  }));
});
