import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsCrudComponent } from './steps-crud.component';

describe('StepsCrudComponent', () => {
  let component: StepsCrudComponent;
  let fixture: ComponentFixture<StepsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
