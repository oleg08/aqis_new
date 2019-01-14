import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsListSelectedComponent } from './steps-list-selected.component';

describe('StepsListSelectedComponent', () => {
  let component: StepsListSelectedComponent;
  let fixture: ComponentFixture<StepsListSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsListSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsListSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
