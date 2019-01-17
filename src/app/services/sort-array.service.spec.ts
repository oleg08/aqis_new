import { TestBed } from '@angular/core/testing';

import { SortArrayService } from './sort-array.service';

describe('SortArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SortArrayService = TestBed.get(SortArrayService);
    expect(service).toBeTruthy();
  });
});
