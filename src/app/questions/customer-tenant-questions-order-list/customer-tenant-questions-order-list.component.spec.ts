import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTenantQuestionsOrderListComponent } from './customer-tenant-questions-order-list.component';

describe('CustomerTenantQuestionsOrderListComponent', () => {
  let component: CustomerTenantQuestionsOrderListComponent;
  let fixture: ComponentFixture<CustomerTenantQuestionsOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTenantQuestionsOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTenantQuestionsOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
