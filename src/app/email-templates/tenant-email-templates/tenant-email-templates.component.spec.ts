import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantEmailTemplatesComponent } from './tenant-email-templates.component';
import {AppTestingModule} from '../../app-testing-module';

describe('TenantEmailTemplatesComponent', () => {
  let component: TenantEmailTemplatesComponent;
  let fixture: ComponentFixture<TenantEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [AppTestingModule]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
//     fixture = TestBed.createComponent(TenantEmailTemplatesComponent);
    // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
