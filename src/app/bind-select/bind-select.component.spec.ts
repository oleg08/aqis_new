import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindSelectComponent } from './bind-select.component';

describe('BindSelectComponent', () => {
  let component: BindSelectComponent;
  let fixture: ComponentFixture<BindSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
