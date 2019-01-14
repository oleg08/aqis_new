import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuestionListComponent } from './select-question-list.component';

describe('SelectQuestionListComponent', () => {
  let component: SelectQuestionListComponent;
  let fixture: ComponentFixture<SelectQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
