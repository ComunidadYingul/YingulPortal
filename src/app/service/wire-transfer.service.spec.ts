import { TestBed, inject } from '@angular/core/testing';

import { WireTransferService } from './wire-transfer.service';

describe('WireTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WireTransferService]
    });
  });

  it('should be created', inject([WireTransferService], (service: WireTransferService) => {
    expect(service).toBeTruthy();
  }));
});
