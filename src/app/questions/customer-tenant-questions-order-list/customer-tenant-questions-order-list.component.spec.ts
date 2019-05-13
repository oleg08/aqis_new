import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTenantQuestionsOrderListComponent } from './customer-tenant-questions-order-list.component';
import {AppTestingModule} from '../../app-testing-module';

describe('CustomerTenantQuestionsOrderListComponent', () => {
  let component: CustomerTenantQuestionsOrderListComponent;
  let fixture: ComponentFixture<CustomerTenantQuestionsOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(CustomerTenantQuestionsOrderListComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
