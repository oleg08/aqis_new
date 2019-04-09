import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantDailyReportsComponent } from './assistant-daily-reports.component';

describe('AssistantDailyReportsComponent', () => {
  let component: AssistantDailyReportsComponent;
  let fixture: ComponentFixture<AssistantDailyReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantDailyReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantDailyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
