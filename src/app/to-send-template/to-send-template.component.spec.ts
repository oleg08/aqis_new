import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSendTemplateComponent } from './to-send-template.component';

describe('ToSendTemplateComponent', () => {
  let component: ToSendTemplateComponent;
  let fixture: ComponentFixture<ToSendTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToSendTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToSendTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
