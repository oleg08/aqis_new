import { TestBed } from '@angular/core/testing';

import { PassProjectIdService } from './pass-project-id.service';

describe('PassProjectIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassProjectIdService = TestBed.get(PassProjectIdService);
    expect(service).toBeTruthy();
  });
});
