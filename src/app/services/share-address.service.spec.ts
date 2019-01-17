import { TestBed } from '@angular/core/testing';

import { ShareAddressService } from './share-address.service';

describe('ShareAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareAddressService = TestBed.get(ShareAddressService);
    expect(service).toBeTruthy();
  });
});
