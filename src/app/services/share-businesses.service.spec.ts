import { TestBed } from '@angular/core/testing';

import { ShareBusinessesService } from './share-businesses.service';

describe('ShareBusinessesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareBusinessesService = TestBed.get(ShareBusinessesService);
    expect(service).toBeTruthy();
  });
});
