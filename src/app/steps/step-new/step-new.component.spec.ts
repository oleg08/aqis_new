import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNewComponent } from './step-new.component';

describe('StepNewComponent', () => {
  let component: StepNewComponent;
  let fixture: ComponentFixture<StepNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
