import { TestBed } from '@angular/core/testing';

import { EmailResponsesService } from './email-responses.service';

describe('EmailResponsesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailResponsesService = TestBed.get(EmailResponsesService);
    expect(service).toBeTruthy();
  });
});
