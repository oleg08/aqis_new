import { TestBed } from '@angular/core/testing';

import { GendersService } from './genders.service';

describe('GendersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GendersService = TestBed.get(GendersService);
    expect(service).toBeTruthy();
  });
});
