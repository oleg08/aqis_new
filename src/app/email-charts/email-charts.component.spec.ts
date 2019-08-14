import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChartsComponent } from './email-charts.component';

describe('EmailChartsComponent', () => {
  let component: EmailChartsComponent;
  let fixture: ComponentFixture<EmailChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
