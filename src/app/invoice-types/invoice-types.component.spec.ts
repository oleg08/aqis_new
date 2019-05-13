import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypesComponent } from './invoice-types.component';
import {AppTestingModule} from '../app-testing-module';

describe('InvoiceTypesComponent', () => {
  let component: InvoiceTypesComponent;
  let fixture: ComponentFixture<InvoiceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(InvoiceTypesComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
