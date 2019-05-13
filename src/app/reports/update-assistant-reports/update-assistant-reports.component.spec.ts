import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssistantReportsComponent } from './update-assistant-reports.component';
import {AppTestingModule} from '../../app-testing-module';

describe('UpdateAssistantReportsComponent', () => {
  let component: UpdateAssistantReportsComponent;
  let fixture: ComponentFixture<UpdateAssistantReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(UpdateAssistantReportsComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
