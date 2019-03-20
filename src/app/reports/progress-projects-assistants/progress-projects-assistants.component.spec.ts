import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressProjectsAssistantsComponent } from './progress-projects-assistants.component';

describe('ProgressProjectsAssistantsComponent', () => {
  let component: ProgressProjectsAssistantsComponent;
  let fixture: ComponentFixture<ProgressProjectsAssistantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressProjectsAssistantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressProjectsAssistantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
