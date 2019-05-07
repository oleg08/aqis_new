import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsListComponent } from './steps-list.component';
import {AppTestingModule} from '../../app-testing-module';

describe('StepsListComponent', () => {
  let component: StepsListComponent;
  let fixture: ComponentFixture<StepsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
