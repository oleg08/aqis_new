import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminBillingInfoComponent } from './super-admin-billing-info.component';
import {AppTestingModule} from '../../app-testing-module';

describe('SuperAdminBillingInfoComponent', () => {
  let component: SuperAdminBillingInfoComponent;
  let fixture: ComponentFixture<SuperAdminBillingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(SuperAdminBillingInfoComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
