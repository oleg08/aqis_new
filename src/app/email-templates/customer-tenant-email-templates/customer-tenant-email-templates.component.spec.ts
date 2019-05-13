import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTenantEmailTemplatesComponent } from './customer-tenant-email-templates.component';
import {AppTestingModule} from '../../app-testing-module';

describe('CustomerTenantEmailTemplatesComponent', () => {
  let component: CustomerTenantEmailTemplatesComponent;
  let fixture: ComponentFixture<CustomerTenantEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(CustomerTenantEmailTemplatesComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
