import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeDetailsComponent } from './invoice-type-details.component';

describe('InvoiceTypeDetailsComponent', () => {
  let component: InvoiceTypeDetailsComponent;
  let fixture: ComponentFixture<InvoiceTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
