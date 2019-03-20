import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressProjectTableComponent } from './progress-project-table.component';

describe('ProgressProjectTableComponent', () => {
  let component: ProgressProjectTableComponent;
  let fixture: ComponentFixture<ProgressProjectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressProjectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressProjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
