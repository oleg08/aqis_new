import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminInformationComponent } from './super-admin-information.component';
import {AppTestingModule} from '../../app-testing-module';

describe('SuperAdminInformationComponent', () => {
  let component: SuperAdminInformationComponent;
  let fixture: ComponentFixture<SuperAdminInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(SuperAdminInformationComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
