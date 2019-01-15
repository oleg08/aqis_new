import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAllComponent } from './business-all.component';

describe('BusinessAllComponent', () => {
  let component: BusinessAllComponent;
  let fixture: ComponentFixture<BusinessAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
