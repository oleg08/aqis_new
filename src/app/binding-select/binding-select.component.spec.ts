import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingSelectComponent } from './binding-select.component';

describe('BindingSelectComponent', () => {
  let component: BindingSelectComponent;
  let fixture: ComponentFixture<BindingSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindingSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
