import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuestionComponent } from './project-question.component';

describe('ProjectQuestionComponent', () => {
  let component: ProjectQuestionComponent;
  let fixture: ComponentFixture<ProjectQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
