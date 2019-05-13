import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAssistantComponent } from './progress-assistant.component';
import {AppTestingModule} from '../../app-testing-module';

describe('ProgressAssistantComponent', () => {
  let component: ProgressAssistantComponent;
  let fixture: ComponentFixture<ProgressAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(ProgressAssistantComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
