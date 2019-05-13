import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsOrderListComponent } from './questions-order-list.component';
import {AppTestingModule} from '../../app-testing-module';

describe('QuestionsOrderListComponent', () => {
  let component: QuestionsOrderListComponent;
  let fixture: ComponentFixture<QuestionsOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(QuestionsOrderListComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
