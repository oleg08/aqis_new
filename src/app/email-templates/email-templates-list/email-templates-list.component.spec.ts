import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplatesListComponent } from './email-templates-list.component';
import {AppTestingModule} from '../../app-testing-module';

describe('EmailTemplatesListComponent', () => {
  let component: EmailTemplatesListComponent;
  let fixture: ComponentFixture<EmailTemplatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
