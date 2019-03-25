import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAccountInfoComponent } from './super-admin-account-info.component';

describe('SuperAdminAccountInfoComponent', () => {
  let component: SuperAdminAccountInfoComponent;
  let fixture: ComponentFixture<SuperAdminAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
