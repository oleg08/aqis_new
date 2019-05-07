import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToTenantComponent } from './add-user-to-tenant.component';
import {AppTestingModule} from '../../app-testing-module';

describe('AddUserToTenantComponent', () => {
  let component: AddUserToTenantComponent;
  let fixture: ComponentFixture<AddUserToTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule]
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
