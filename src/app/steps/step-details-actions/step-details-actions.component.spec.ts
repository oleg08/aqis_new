import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDetailsActionsComponent } from './step-details-actions.component';

describe('StepDetailsActionsComponent', () => {
  let component: StepDetailsActionsComponent;
  let fixture: ComponentFixture<StepDetailsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDetailsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDetailsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
