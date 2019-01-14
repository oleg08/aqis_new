import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplatesActionsComponent } from './email-templates-actions.component';

describe('EmailTemplatesActionsComponent', () => {
  let component: EmailTemplatesActionsComponent;
  let fixture: ComponentFixture<EmailTemplatesActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplatesActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplatesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
