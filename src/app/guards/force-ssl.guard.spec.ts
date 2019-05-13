import { TestBed, async, inject } from '@angular/core/testing';

import { ForceSslGuard } from './force-ssl.guard';

describe('ForceSslGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForceSslGuard]
    });
  });

  // it('should ...', inject([ForceSslGuard], (guard: ForceSslGuard) => {
  //   expect(guard).toBeTruthy();
  // }));
});
