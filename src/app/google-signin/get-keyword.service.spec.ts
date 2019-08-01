import { TestBed } from '@angular/core/testing';

import { GetKeywordService } from './get-keyword.service';

describe('GetKeywordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetKeywordService = TestBed.get(GetKeywordService);
    expect(service).toBeTruthy();
  });
});
