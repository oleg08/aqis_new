import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsOrderListComponent } from './questions-order-list.component';

describe('QuestionsOrderListComponent', () => {
  let component: QuestionsOrderListComponent;
  let fixture: ComponentFixture<QuestionsOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
