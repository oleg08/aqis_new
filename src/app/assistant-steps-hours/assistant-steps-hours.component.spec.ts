import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantStepsHoursComponent } from './assistant-steps-hours.component';

describe('AssistantStepsHoursComponent', () => {
  let component: AssistantStepsHoursComponent;
  let fixture: ComponentFixture<AssistantStepsHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantStepsHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantStepsHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
