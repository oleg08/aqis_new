import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvoiceTypeComponent } from './new-invoice-type.component';
import {AppTestingModule} from '../../app-testing-module';

describe('NewInvoiceTypeComponent', () => {
  let component: NewInvoiceTypeComponent;
  let fixture: ComponentFixture<NewInvoiceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(NewInvoiceTypeComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
