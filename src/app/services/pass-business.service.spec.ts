import { TestBed } from '@angular/core/testing';

import { PassBusinessService } from './pass-business.service';

describe('PassBusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassBusinessService = TestBed.get(PassBusinessService);
    expect(service).toBeTruthy();
  });
});
