import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplatesActionsComponent } from './email-templates-actions.component';
import {AppTestingModule} from '../../app-testing-module';

describe('EmailTemplatesActionsComponent', () => {
  let component: EmailTemplatesActionsComponent;
  let fixture: ComponentFixture<EmailTemplatesActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(EmailTemplatesActionsComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
