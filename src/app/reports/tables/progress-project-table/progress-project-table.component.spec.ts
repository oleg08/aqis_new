import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressProjectTableComponent } from './progress-project-table.component';
import {AppTestingModule} from '../../../app-testing-module';

describe('ProgressProjectTableComponent', () => {
  let component: ProgressProjectTableComponent;
  let fixture: ComponentFixture<ProgressProjectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
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
