import { TestBed } from '@angular/core/testing';

import { SetRangeDateService } from './set-range-date.service';

describe('SetRangeDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetRangeDateService = TestBed.get(SetRangeDateService);
    expect(service).toBeTruthy();
  });
});
