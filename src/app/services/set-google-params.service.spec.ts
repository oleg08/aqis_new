import { TestBed } from '@angular/core/testing';

import { SetGoogleParamsService } from './set-google-params.service';

describe('SetGoogleParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetGoogleParamsService = TestBed.get(SetGoogleParamsService);
    expect(service).toBeTruthy();
  });
});
