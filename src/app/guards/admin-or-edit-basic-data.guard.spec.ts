import { TestBed, async, inject } from '@angular/core/testing';

import { AdminOrEditBasicDataGuard } from './admin-or-edit-basic-data.guard';

describe('AdminOrEditBasicDataGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminOrEditBasicDataGuard]
    });
  });

  it('should ...', inject([AdminOrEditBasicDataGuard], (guard: AdminOrEditBasicDataGuard) => {
    expect(guard).toBeTruthy();
  }));
});
