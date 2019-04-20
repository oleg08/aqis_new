import { TestBed } from '@angular/core/testing';

import { AssistantInvoicesDataService } from './assistant-invoices-data.service';

describe('AssistantInvoicesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssistantInvoicesDataService = TestBed.get(AssistantInvoicesDataService);
    expect(service).toBeTruthy();
  });
});
