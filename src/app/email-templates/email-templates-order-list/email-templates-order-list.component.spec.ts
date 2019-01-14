import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplatesOrderListComponent } from './email-templates-order-list.component';

describe('EmailTemplatesOrderListComponent', () => {
  let component: EmailTemplatesOrderListComponent;
  let fixture: ComponentFixture<EmailTemplatesOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplatesOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplatesOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
