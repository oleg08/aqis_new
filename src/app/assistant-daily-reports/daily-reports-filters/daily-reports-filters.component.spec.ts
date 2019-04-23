import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportsFiltersComponent } from './daily-reports-filters.component';

describe('DailyReportsFiltersComponent', () => {
  let component: DailyReportsFiltersComponent;
  let fixture: ComponentFixture<DailyReportsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyReportsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyReportsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
