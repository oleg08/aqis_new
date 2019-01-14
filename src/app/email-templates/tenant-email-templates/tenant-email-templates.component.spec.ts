import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantEmailTemplatesComponent } from './tenant-email-templates.component';

describe('TenantEmailTemplatesComponent', () => {
  let component: TenantEmailTemplatesComponent;
  let fixture: ComponentFixture<TenantEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantEmailTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
