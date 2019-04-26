import { TestBed } from '@angular/core/testing';

import { GoogleAuthenticationMessagesService } from './google-authentication-messages.service';

describe('GoogleAuthenticationMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleAuthenticationMessagesService = TestBed.get(GoogleAuthenticationMessagesService);
    expect(service).toBeTruthy();
  });
});
