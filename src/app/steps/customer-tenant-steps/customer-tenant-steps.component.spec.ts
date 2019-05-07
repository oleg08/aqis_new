import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTenantStepsComponent } from './customer-tenant-steps.component';
import {AppTestingModule} from '../../app-testing-module';

describe('CustomerTenantStepsComponent', () => {
  let component: CustomerTenantStepsComponent;
  let fixture: ComponentFixture<CustomerTenantStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
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
