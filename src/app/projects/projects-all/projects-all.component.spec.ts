import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllComponent } from './projects-all.component';
import {AppTestingModule} from '../../app-testing-module';

describe('ProjectsAllComponent', () => {
  let component: ProjectsAllComponent;
  let fixture: ComponentFixture<ProjectsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ProjectsAllComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
