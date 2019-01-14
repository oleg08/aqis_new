import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmailTemplatesComponent } from './main-email-templates.component';

describe('MainEmailTemplatesComponent', () => {
  let component: MainEmailTemplatesComponent;
  let fixture: ComponentFixture<MainEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEmailTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
