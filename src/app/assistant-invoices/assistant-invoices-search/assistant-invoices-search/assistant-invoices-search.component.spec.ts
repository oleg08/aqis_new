import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantInvoicesSearchComponent } from './assistant-invoices-search.component';
import {AppTestingModule} from '../../../app-testing-module';

describe('AssistantInvoicesSearchComponent', () => {
  let component: AssistantInvoicesSearchComponent;
  let fixture: ComponentFixture<AssistantInvoicesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(AssistantInvoicesSearchComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
