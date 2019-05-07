import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsCrudComponent } from './steps-crud.component';
import {AppTestingModule} from '../../app-testing-module';

describe('StepsCrudComponent', () => {
  let component: StepsCrudComponent;
  let fixture: ComponentFixture<StepsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
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
