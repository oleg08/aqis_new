import { TestBed } from '@angular/core/testing';

import { InvoiceTypesPeriodsDataService } from './invoice-types-periods-data.service';

describe('InvoiceTypesPeriodsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceTypesPeriodsDataService = TestBed.get(InvoiceTypesPeriodsDataService);
    expect(service).toBeTruthy();
  });
});
