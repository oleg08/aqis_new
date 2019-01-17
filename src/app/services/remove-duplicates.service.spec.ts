import { TestBed } from '@angular/core/testing';

import { RemoveDuplicatesService } from './remove-duplicates.service';

describe('RemoveDuplicatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveDuplicatesService = TestBed.get(RemoveDuplicatesService);
    expect(service).toBeTruthy();
  });
});
