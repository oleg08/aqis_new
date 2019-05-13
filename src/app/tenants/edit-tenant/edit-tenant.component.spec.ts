import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenantComponent } from './edit-tenant.component';
import {AppTestingModule} from '../../app-testing-module';

describe('EditTenantComponent', () => {
  let component: EditTenantComponent;
  let fixture: ComponentFixture<EditTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(EditTenantComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
