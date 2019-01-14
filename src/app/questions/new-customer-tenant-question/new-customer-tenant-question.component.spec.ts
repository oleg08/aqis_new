import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerTenantQuestionComponent } from './new-customer-tenant-question.component';

describe('NewCustomerTenantQuestionComponent', () => {
  let component: NewCustomerTenantQuestionComponent;
  let fixture: ComponentFixture<NewCustomerTenantQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomerTenantQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerTenantQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
