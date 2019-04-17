import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeInvoicesComponent } from './invoice-type-invoices.component';

describe('InvoiceTypeInvoicesComponent', () => {
  let component: InvoiceTypeInvoicesComponent;
  let fixture: ComponentFixture<InvoiceTypeInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceTypeInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTypeInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
