import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAssistantFiltersComponent } from './progress-assistant-filters.component';

describe('ProgressAssistantFiltersComponent', () => {
  let component: ProgressAssistantFiltersComponent;
  let fixture: ComponentFixture<ProgressAssistantFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressAssistantFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressAssistantFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
