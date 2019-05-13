import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPreCustomerComponent } from './new-pre-customer.component';
import {AppTestingModule} from '../../app-testing-module';

describe('NewPreCustomerComponent', () => {
  let component: NewPreCustomerComponent;
  let fixture: ComponentFixture<NewPreCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(NewPreCustomerComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
