import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAssistantComponent } from './progress-assistant.component';

describe('ProgressAssistantComponent', () => {
  let component: ProgressAssistantComponent;
  let fixture: ComponentFixture<ProgressAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
