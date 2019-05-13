import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNewComponent } from './step-new.component';
import {AppTestingModule} from '../../app-testing-module';

describe('StepNewComponent', () => {
  let component: StepNewComponent;
  let fixture: ComponentFixture<StepNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(StepNewComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
