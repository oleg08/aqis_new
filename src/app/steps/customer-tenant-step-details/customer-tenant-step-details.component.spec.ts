import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTenantStepDetailsComponent } from './customer-tenant-step-details.component';
import {AppTestingModule} from '../../app-testing-module';

describe('CustomerTenantStepDetailsComponent', () => {
  let component: CustomerTenantStepDetailsComponent;
  let fixture: ComponentFixture<CustomerTenantStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
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
