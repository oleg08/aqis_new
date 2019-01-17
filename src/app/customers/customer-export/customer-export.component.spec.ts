import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExportComponent } from './customer-export.component';

describe('CustomerExportComponent', () => {
  let component: CustomerExportComponent;
  let fixture: ComponentFixture<CustomerExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
