import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportsFiltersComponent } from './daily-reports-filters.component';
import {AppTestingModule} from '../../app-testing-module';

describe('DailyReportsFiltersComponent', () => {
  let component: DailyReportsFiltersComponent;
  let fixture: ComponentFixture<DailyReportsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(DailyReportsFiltersComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
