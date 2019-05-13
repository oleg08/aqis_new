import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeEditComponent } from './invoice-type-edit.component';
import {AppTestingModule} from '../../app-testing-module';

describe('InvoiceTypeEditComponent', () => {
  let component: InvoiceTypeEditComponent;
  let fixture: ComponentFixture<InvoiceTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(InvoiceTypeEditComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
