import { TestBed } from '@angular/core/testing';

import { CustomersSortDataService } from './customers-sort-data.service';

describe('CustomersSortDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomersSortDataService = TestBed.get(CustomersSortDataService);
    expect(service).toBeTruthy();
  });
});
