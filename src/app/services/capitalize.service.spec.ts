import { TestBed } from '@angular/core/testing';

import { CapitalizeService } from './capitalize.service';

describe('CapitalizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapitalizeService = TestBed.get(CapitalizeService);
    expect(service).toBeTruthy();
  });
});
