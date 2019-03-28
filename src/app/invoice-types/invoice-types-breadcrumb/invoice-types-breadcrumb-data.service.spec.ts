import { TestBed } from '@angular/core/testing';

import { InvoiceTypesBreadcrumbDataService } from './invoice-types-breadcrumb-data.service';

describe('InvoiceTypesBreadcrumbDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceTypesBreadcrumbDataService = TestBed.get(InvoiceTypesBreadcrumbDataService);
    expect(service).toBeTruthy();
  });
});
