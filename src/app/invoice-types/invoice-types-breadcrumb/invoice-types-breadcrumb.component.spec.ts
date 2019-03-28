import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypesBreadcrumbComponent } from './invoice-types-breadcrumb.component';

describe('InvoiceTypesBreadcrumbComponent', () => {
  let component: InvoiceTypesBreadcrumbComponent;
  let fixture: ComponentFixture<InvoiceTypesBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceTypesBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTypesBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
