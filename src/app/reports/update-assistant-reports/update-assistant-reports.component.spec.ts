import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssistantReportsComponent } from './update-assistant-reports.component';

describe('UpdateAssistantReportsComponent', () => {
  let component: UpdateAssistantReportsComponent;
  let fixture: ComponentFixture<UpdateAssistantReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssistantReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssistantReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
