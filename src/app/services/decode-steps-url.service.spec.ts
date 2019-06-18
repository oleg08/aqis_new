import { TestBed } from '@angular/core/testing';

import { DecodeStepsUrlService } from './decode-steps-url.service';

describe('DecodeStepsUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecodeStepsUrlService = TestBed.get(DecodeStepsUrlService);
    expect(service).toBeTruthy();
  });
});
