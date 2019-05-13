import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplatePreviewComponent } from './email-template-preview.component';
import {AppTestingModule} from '../../app-testing-module';

describe('EmailTemplatePreviewComponent', () => {
  let component: EmailTemplatePreviewComponent;
  let fixture: ComponentFixture<EmailTemplatePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(EmailTemplatePreviewComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
