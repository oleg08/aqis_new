import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTenantStepDetailsComponent } from './customer-tenant-step-details.component';

describe('CustomerTenantStepDetailsComponent', () => {
  let component: CustomerTenantStepDetailsComponent;
  let fixture: ComponentFixture<CustomerTenantStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTenantStepDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTenantStepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
