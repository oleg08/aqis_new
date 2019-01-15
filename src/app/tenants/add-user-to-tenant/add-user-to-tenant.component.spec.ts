import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToTenantComponent } from './add-user-to-tenant.component';

describe('AddUserToTenantComponent', () => {
  let component: AddUserToTenantComponent;
  let fixture: ComponentFixture<AddUserToTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
