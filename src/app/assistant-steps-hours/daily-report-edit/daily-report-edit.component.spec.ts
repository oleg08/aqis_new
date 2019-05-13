import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportEditComponent } from './daily-report-edit.component';
import {AppTestingModule} from '../../app-testing-module';

describe('DailyReportEditComponent', () => {
  let component: DailyReportEditComponent;
  let fixture: ComponentFixture<DailyReportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(DailyReportEditComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
