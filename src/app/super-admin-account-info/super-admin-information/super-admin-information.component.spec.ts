import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminInformationComponent } from './super-admin-information.component';

describe('SuperAdminInformationComponent', () => {
  let component: SuperAdminInformationComponent;
  let fixture: ComponentFixture<SuperAdminInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
