import { TestBed } from '@angular/core/testing';

import { GetEmailTemplatesService } from './get-email-templates.service';

describe('GetEmailTemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetEmailTemplatesService = TestBed.get(GetEmailTemplatesService);
    expect(service).toBeTruthy();
  });
});
