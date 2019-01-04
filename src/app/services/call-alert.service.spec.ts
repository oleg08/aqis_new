import { TestBed } from '@angular/core/testing';

import { CallAlertService } from './call-alert.service';

describe('CallAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallAlertService = TestBed.get(CallAlertService);
    expect(service).toBeTruthy();
  });
});
