import { TestBed } from '@angular/core/testing';

import { AssignOriginalValueService } from './assign-original-value.service';

describe('AssignOriginalValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignOriginalValueService = TestBed.get(AssignOriginalValueService);
    expect(service).toBeTruthy();
  });
});
