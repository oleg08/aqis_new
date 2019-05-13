import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepReportFilterComponent } from './step-report-filter.component';
import {AppTestingModule} from '../../app-testing-module';

describe('StepReportFilterComponent', () => {
  let component: StepReportFilterComponent;
  let fixture: ComponentFixture<StepReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(StepReportFilterComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
