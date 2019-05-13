import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplatesOrderListComponent } from './email-templates-order-list.component';
import {AppTestingModule} from '../../app-testing-module';

describe('EmailTemplatesOrderListComponent', () => {
  let component: EmailTemplatesOrderListComponent;
  let fixture: ComponentFixture<EmailTemplatesOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(EmailTemplatesOrderListComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
