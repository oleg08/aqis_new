import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPreCustomerComponent } from './new-pre-customer.component';

describe('NewPreCustomerComponent', () => {
  let component: NewPreCustomerComponent;
  let fixture: ComponentFixture<NewPreCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPreCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPreCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
