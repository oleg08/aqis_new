import { TestBed } from '@angular/core/testing';

import { StandardizedBusinessesService } from './standardized-businesses.service';

describe('StandardizedBusinessesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandardizedBusinessesService = TestBed.get(StandardizedBusinessesService);
    expect(service).toBeTruthy();
  });
});
