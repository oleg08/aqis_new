import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeImageLoadingComponent } from './invoice-type-image-loading.component';

describe('InvoiceTypeImageLoadingComponent', () => {
  let component: InvoiceTypeImageLoadingComponent;
  let fixture: ComponentFixture<InvoiceTypeImageLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceTypeImageLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTypeImageLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
