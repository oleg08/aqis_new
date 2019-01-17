import { TestBed } from '@angular/core/testing';

import { TransformStatesService } from './transform-states.service';

describe('TransformStatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransformStatesService = TestBed.get(TransformStatesService);
    expect(service).toBeTruthy();
  });
});
