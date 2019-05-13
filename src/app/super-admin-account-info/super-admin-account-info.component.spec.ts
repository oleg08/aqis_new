import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAccountInfoComponent } from './super-admin-account-info.component';
import {AppTestingModule} from '../app-testing-module';

describe('SuperAdminAccountInfoComponent', () => {
  let component: SuperAdminAccountInfoComponent;
  let fixture: ComponentFixture<SuperAdminAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(SuperAdminAccountInfoComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
