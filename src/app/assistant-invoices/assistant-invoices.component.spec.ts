import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantInvoicesComponent } from './assistant-invoices.component';
import {AppTestingModule} from '../app-testing-module';

describe('AssistantInvoicesComponent', () => {
  let component: AssistantInvoicesComponent;
  let fixture: ComponentFixture<AssistantInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(AssistantInvoicesComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
