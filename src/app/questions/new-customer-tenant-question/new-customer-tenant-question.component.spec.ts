import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerTenantQuestionComponent } from './new-customer-tenant-question.component';
import {AppTestingModule} from '../../app-testing-module';

describe('NewCustomerTenantQuestionComponent', () => {
  let component: NewCustomerTenantQuestionComponent;
  let fixture: ComponentFixture<NewCustomerTenantQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
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
