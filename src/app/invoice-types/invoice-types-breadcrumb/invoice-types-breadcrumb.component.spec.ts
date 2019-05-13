import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypesBreadcrumbComponent } from './invoice-types-breadcrumb.component';
import {AppTestingModule} from '../../app-testing-module';

describe('InvoiceTypesBreadcrumbComponent', () => {
  let component: InvoiceTypesBreadcrumbComponent;
  let fixture: ComponentFixture<InvoiceTypesBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(InvoiceTypesBreadcrumbComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
