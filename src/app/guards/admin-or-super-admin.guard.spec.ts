import { TestBed, async, inject } from '@angular/core/testing';

import { AdminOrSuperAdminGuard } from './admin-or-super-admin.guard';

describe('AdminOrSuperAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminOrSuperAdminGuard]
    });
  });

  it('should ...', inject([AdminOrSuperAdminGuard], (guard: AdminOrSuperAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
