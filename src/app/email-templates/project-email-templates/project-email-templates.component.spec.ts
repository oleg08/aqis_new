import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmailTemplatesComponent } from './project-email-templates.component';

describe('ProjectEmailTemplatesComponent', () => {
  let component: ProjectEmailTemplatesComponent;
  let fixture: ComponentFixture<ProjectEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEmailTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
