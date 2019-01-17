import { TestBed } from '@angular/core/testing';

import { ShareCategoriesService } from './share-categories.service';

describe('ShareCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareCategoriesService = TestBed.get(ShareCategoriesService);
    expect(service).toBeTruthy();
  });
});
