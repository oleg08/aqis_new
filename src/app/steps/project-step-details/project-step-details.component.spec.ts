import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepDetailsComponent } from './project-step-details.component';
import {AppTestingModule} from '../../app-testing-module';

describe('ProjectStepDetailsComponent', () => {
  let component: ProjectStepDetailsComponent;
  let fixture: ComponentFixture<ProjectStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ProjectStepDetailsComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
