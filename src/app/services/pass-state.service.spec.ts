import { TestBed } from '@angular/core/testing';

import { PassStateService } from './pass-state.service';

describe('PassStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassStateService = TestBed.get(PassStateService);
    expect(service).toBeTruthy();
  });
});
