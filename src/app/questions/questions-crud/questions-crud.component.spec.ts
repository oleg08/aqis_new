import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCrudComponent } from './questions-crud.component';
import {AppTestingModule} from '../../app-testing-module';

describe('QuestionsCrudComponent', () => {
  let component: QuestionsCrudComponent;
  let fixture: ComponentFixture<QuestionsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
