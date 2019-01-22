import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepDetailsComponent } from './project-step-details.component';

describe('ProjectStepDetailsComponent', () => {
  let component: ProjectStepDetailsComponent;
  let fixture: ComponentFixture<ProjectStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStepDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
