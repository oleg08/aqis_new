import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantInvoiceComponent } from './tenant-invoice.component';

describe('TenantInvoiceComponent', () => {
  let component: TenantInvoiceComponent;
  let fixture: ComponentFixture<TenantInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
