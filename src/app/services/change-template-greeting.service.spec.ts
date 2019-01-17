import { TestBed } from '@angular/core/testing';

import { ChangeTemplateGreetingService } from './change-template-greeting.service';

describe('ChangeTemplateGreetingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeTemplateGreetingService = TestBed.get(ChangeTemplateGreetingService);
    expect(service).toBeTruthy();
  });
});
