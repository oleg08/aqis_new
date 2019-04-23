import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepReportFilterComponent } from './step-report-filter.component';

describe('StepReportFilterComponent', () => {
  let component: StepReportFilterComponent;
  let fixture: ComponentFixture<StepReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepReportFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
