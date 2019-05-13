import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExportComponent } from './customer-export.component';
import {AppTestingModule} from '../../app-testing-module';

describe('CustomerExportComponent', () => {
  let component: CustomerExportComponent;
  let fixture: ComponentFixture<CustomerExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(CustomerExportComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
