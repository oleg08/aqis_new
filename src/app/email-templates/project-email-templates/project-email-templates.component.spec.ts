import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmailTemplatesComponent } from './project-email-templates.component';
import {AppTestingModule} from '../../app-testing-module';

describe('ProjectEmailTemplatesComponent', () => {
  let component: ProjectEmailTemplatesComponent;
  let fixture: ComponentFixture<ProjectEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ProjectEmailTemplatesComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
