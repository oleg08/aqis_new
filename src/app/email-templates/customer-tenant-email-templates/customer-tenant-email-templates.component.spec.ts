import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CustomerTenantEmailTemplatesComponent } from './customer-tenant-email-templates.component';

describe('CustomerTenantEmailTemplatesComponent', () => {
  let component: CustomerTenantEmailTemplatesComponent;
  let fixture: ComponentFixture<CustomerTenantEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ CustomerTenantEmailTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTenantEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
