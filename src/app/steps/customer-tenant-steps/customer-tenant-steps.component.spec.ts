import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTenantStepsComponent } from './customer-tenant-steps.component';

describe('CustomerTenantStepsComponent', () => {
  let component: CustomerTenantStepsComponent;
  let fixture: ComponentFixture<CustomerTenantStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTenantStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTenantStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
